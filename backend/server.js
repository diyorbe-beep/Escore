const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Data folder
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

// Superadmin va admin ma'lumotlari
const SUPERADMIN = {
  id: 'superadmin-1',
  name: 'Asosiy Admin',
  email: 'superadmin@mail.com',
  password: 'admin123',
  role: 'superadmin'
};
const ADMIN = {
  id: 'admin-1',
  name: 'Admin',
  email: 'admin@mail.com',
  password: 'admin123',
  role: 'admin'
};

// Helper: read/write JSON
function readData(file) {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}
function writeData(file, data) {
  const filePath = path.join(dataDir, file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// --- Superadmin va adminni har doim mavjud qilish ---
function ensureSuperadminAndAdmin() {
  // users.json
  let users = readData('users.json');
  let changed = false;
  if (!users.find(u => u.email === SUPERADMIN.email)) {
    users.unshift({ ...SUPERADMIN });
    changed = true;
  }
  if (!users.find(u => u.email === ADMIN.email)) {
    users.unshift({ ...ADMIN });
    changed = true;
  }
  if (changed) writeData('users.json', users);
  // admins.json
  let admins = readData('admins.json');
  let adminsChanged = false;
  if (!admins.find(a => a.email === SUPERADMIN.email)) {
    admins.unshift({ id: SUPERADMIN.id, name: SUPERADMIN.name, email: SUPERADMIN.email, role: SUPERADMIN.role });
    adminsChanged = true;
  }
  if (!admins.find(a => a.email === ADMIN.email)) {
    admins.push({ id: ADMIN.id, name: ADMIN.name, email: ADMIN.email, role: ADMIN.role });
    adminsChanged = true;
  }
  if (adminsChanged) writeData('admins.json', admins);
}
ensureSuperadminAndAdmin();

// --- News endpoints ---
app.get('/api/news', (req, res) => {
  const news = readData('news.json');
  res.json(news.filter(n => !n.deleted));
});

app.post('/api/news', (req, res) => {
  const { title, content, image, status } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Title va content majburiy' });
  const news = readData('news.json');
  const newNews = {
    id: uuidv4(),
    title,
    content,
    image: image || null,
    status: status || 'Draft',
    deleted: false,
    publishedAt: new Date().toISOString()
  };
  news.unshift(newNews);
  writeData('news.json', news);
  res.status(201).json(newNews);
});

app.delete('/api/news/:id', (req, res) => {
  const { id } = req.params;
  let news = readData('news.json');
  news = news.map(n => n.id === id ? { ...n, deleted: true } : n);
  writeData('news.json', news);
  res.json({ success: true });
});

// --- Admin endpoints (faqat superadmin qo'sha oladi) ---
app.get('/api/admins', (req, res) => {
  let admins = readData('admins.json');
  // Superadmin har doim birinchi bo'lib qaytadi
  if (!admins.find(a => a.email === SUPERADMIN.email)) {
    admins.unshift({ id: SUPERADMIN.id, name: SUPERADMIN.name, email: SUPERADMIN.email, role: SUPERADMIN.role });
  }
  res.json(admins);
});

app.post('/api/admins', (req, res) => {
  const { name, email, role = 'admin', superadminToken } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Ism va email majburiy' });
  if (email === SUPERADMIN.email) return res.status(400).json({ error: 'Superadminni qo\'shib bo\'lmaydi' });
  // Faqat superadmin tokeni bilan admin yoki jurnalist qo'shish mumkin
  if (role !== 'admin' && role !== 'journalist') return res.status(400).json({ error: 'Faqat admin yoki jurnalist qo\'shish mumkin' });
  if (superadminToken !== SUPERADMIN.password) return res.status(403).json({ error: 'Faqat superadmin admin yoki jurnalist qo\'sha oladi' });
  const admins = readData('admins.json');
  if (admins.find(a => a.email === email)) return res.status(400).json({ error: 'Bu email admin sifatida mavjud' });
  const newAdmin = { id: uuidv4(), name, email, role };
  admins.push(newAdmin);
  writeData('admins.json', admins);
  // users.json ga ham qo'shamiz
  let users = readData('users.json');
  users.push({ id: newAdmin.id, name, email, password: 'admin123', role });
  writeData('users.json', users);
  res.status(201).json(newAdmin);
});

app.delete('/api/admins/:id', (req, res) => {
  let admins = readData('admins.json');
  // Superadminni o'chirishga yo'l qo'ymaymiz
  admins = admins.filter(a => a.id !== req.params.id && a.email !== SUPERADMIN.email);
  // Lekin superadmin har doim bo'lishi kerak
  if (!admins.find(a => a.email === SUPERADMIN.email)) {
    admins.unshift({ id: SUPERADMIN.id, name: SUPERADMIN.name, email: SUPERADMIN.email, role: SUPERADMIN.role });
  }
  writeData('admins.json', admins);
  res.json({ success: true });
});

// --- User Auth (faqat user roli register bo'ladi) ---
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Barcha maydonlar majburiy' });
  if (email === SUPERADMIN.email || email === ADMIN.email) return res.status(400).json({ error: 'Bu email band' });
  const users = readData('users.json');
  if (users.find(u => u.email === email)) return res.status(400).json({ error: 'Email band' });
  const newUser = { id: uuidv4(), name, email, password, role: 'user' };
  users.push(newUser);
  writeData('users.json', users);
  res.status(201).json({ message: 'Ro\'yxatdan o\'tildi', user: newUser });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const users = readData('users.json');
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Email yoki parol xato' });
  // Demo token
  const token = uuidv4();
  res.json({ token, user });
});

// --- Matches (oddiy demo) ---
app.get('/api/matches', (req, res) => {
  const matches = readData('matches.json');
  res.json(matches);
});

// --- Polls (oddiy demo) ---
app.get('/api/polls', (req, res) => {
  const polls = readData('polls.json');
  res.json(polls);
});

// Yangi poll qo'shish (faqat admin/superadmin)
app.post('/api/polls', (req, res) => {
  const { question, options, role } = req.body;
  if (!question || !Array.isArray(options) || options.length < 2) {
    return res.status(400).json({ error: 'Savol va kamida 2 ta variant majburiy' });
  }
  if (role !== 'admin' && role !== 'superadmin') {
    return res.status(403).json({ error: 'Faqat admin yoki superadmin so‘rovnoma qo‘sha oladi' });
  }
  const polls = readData('polls.json');
  const votes = {};
  options.forEach(opt => { votes[opt] = 0; });
  const newPoll = {
    id: uuidv4(),
    question,
    votes,
    createdAt: new Date().toISOString()
  };
  polls.unshift(newPoll);
  writeData('polls.json', polls);
  res.status(201).json(newPoll);
});

app.post('/api/polls/vote', (req, res) => {
  const { pollId, option } = req.body;
  let polls = readData('polls.json');
  const poll = polls.find(p => p.id === pollId);
  if (!poll) return res.status(404).json({ error: 'Poll topilmadi' });
  poll.votes[option] = (poll.votes[option] || 0) + 1;
  writeData('polls.json', polls);
  res.json({ success: true });
});

// --- User profile (oddiy demo) ---
app.get('/api/user/:id', (req, res) => {
  const users = readData('users.json');
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User topilmadi' });
  res.json(user);
});

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rasm yuklash endpointi
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Fayl topilmadi' });
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

app.listen(PORT, () => {
  console.log(`eScore backend running on http://localhost:${PORT}`);
}); 