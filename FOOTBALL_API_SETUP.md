# 🏆 Football API Setup Guide

Bu hujjat sizga football API kalitlarini olish va loyihangizga qo'shish bo'yicha ko'rsatmalar beradi.

## 📋 API Kalitlarini Olish

### 1. **Football-Data.org** (Tavsiya etiladi - Bepul)

**URL**: https://www.football-data.org/

**Qadamlar**:
1. Saytga o'ting va "Get API Key" tugmasini bosing
2. Email manzilingizni kiriting
3. Email orqali API kalit keladi
4. Bepul versiyada kuniga 10 so'rov chegarasi bor

**Narxi**: Bepul (limited), $10-50/oy

**Qo'llab-quvvatlaydi**: Premier League, La Liga, Bundesliga, Serie A, Champions League

---

### 2. **API-Football.com**

**URL**: https://www.api-football.com/

**Qadamlar**:
1. Saytga ro'yxatdan o'ting
2. Subscription plan tanlang ($10-99/oy)
3. Kalit avtomatik beriladi

**Narxi**: $10-99/oy

**Qo'llab-quvvatlaydi**: 100+ liga, 200+ mamlakat

---

### 3. **LiveScore API** (RapidAPI orqali)

**URL**: https://rapidapi.com/apidojo/api/livescore6/

**Qadamlar**:
1. RapidAPI.com ga ro'yxatdan o'ting
2. LiveScore6 API ni qidiring
3. "Subscribe to Test" tugmasini bosing (bepul)
4. API kalit RapidAPI dashboard da ko'rinadi

**Narxi**: Bepul (limited)

**Qo'llab-quvvatlaydi**: Live scores, statistics

---

### 4. **SofaScore API** (RapidAPI orqali)

**URL**: https://rapidapi.com/tipsters/api/sofascore/

**Qadamlar**:
1. RapidAPI.com da SofaScore ni toping
2. Subscription plan tanlang ($10-50/oy)
3. API kalit beriladi

**Narxi**: $10-50/oy

**Qo'llab-quvvatlaydi**: Live scores, statistics, odds

## 🔧 API Kalitlarini Loyihaga Qo'shish

### 1. Environment File Yaratish

Loyiha papkasida `.env` faylini yarating:

```bash
# .env fayli (Vite format - VITE_ bilan boshlanishi kerak)
VITE_FOOTBALL_API_KEY=your_api_key_here
VITE_FOOTBALL_DATA_API_KEY=your_football_data_api_key_here
VITE_API_FOOTBALL_KEY=your_api_football_key_here
VITE_RAPIDAPI_KEY=your_rapidapi_key_here
VITE_RAPIDAPI_HOST=api-football-v1.p.rapidapi.com
```

### 2. API Kalitlarini Qo'shish

Har bir API uchun kalitlarni `.env` fayliga qo'shing:

```env
# Football-Data.org API
VITE_FOOTBALL_DATA_API_KEY=1234567890abcdef

# API-Football.com API
VITE_API_FOOTBALL_KEY=your_api_football_key_here

# RapidAPI Keys
VITE_RAPIDAPI_KEY=your_rapidapi_key_here
VITE_RAPIDAPI_HOST=api-football-v1.p.rapidapi.com
```

### 3. Loyihani Qayta Ishga Tushirish

API kalitlarini qo'shganingizdan so'ng loyihani qayta ishga tushiring:

```bash
npm start
```

## 🚀 API Integratsiyasi

Loyihangizda quyidagi API lar avtomatik ishlaydi:

### Football-Data.org
- Eng yaxshi bepul variant
- Ko'p ligalarni qo'llab-quvvatlaydi
- Yaxshi hujjatlar

### API-Football.com
- Keng qamrovli ma'lumotlar
- Real-time yangilanishlar
- Professional xizmat

### LiveScore (RapidAPI)
- Live scores
- Tezkor yangilanishlar
- Bepul versiyasi mavjud

## 📊 API Chegaralari

| API | Bepul Chegara | Pullik Chegara |
|-----|---------------|----------------|
| Football-Data.org | 10 so'rov/kun | 1000+ so'rov/kun |
| API-Football.com | Yo'q | 1000+ so'rov/kun |
| LiveScore | 100 so'rov/oy | 1000+ so'rov/kun |
| SofaScore | Yo'q | 1000+ so'rov/kun |

## 🔍 API Kalitlarini Tekshirish

API kalitlaringiz to'g'ri ishlayotganini tekshirish uchun:

1. Browser Developer Tools oching (F12)
2. Console tab ga o'ting
3. Xatolik xabarlarini ko'ring
4. API so'rovlari to'g'ri ishlayotganini tekshiring

## 🛠️ Xatoliklarni Tuzatish

### API Kalit Topilmadi
```
Warning: Football-Data.org API key not found
```
**Yechim**: `.env` faylida API kalit to'g'ri ko'rsatilganini tekshiring

### CORS Xatosi
```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```
**Yechim**: API provider tomonidan CORS sozlamalarini tekshiring

### Rate Limit Xatosi
```
429 Too Many Requests
```
**Yechim**: API so'rovlar sonini kamaytiring yoki pullik versiyaga o'ting

### Vite Environment Variable Xatosi
```
Uncaught ReferenceError: process is not defined
```
**Yechim**: `process.env` o'rniga `import.meta.env` ishlating va `VITE_` prefiksini qo'shing

## 📞 Yordam

Agar muammolar bo'lsa:

1. **Football-Data.org**: support@football-data.org
2. **API-Football.com**: support@api-football.com
3. **RapidAPI**: https://rapidapi.com/support

## 🎯 Tavsiyalar

1. **Boshlash uchun**: Football-Data.org bilan boshlang (bepul)
2. **Professional loyihalar uchun**: API-Football.com
3. **Live scores uchun**: LiveScore API
4. **Keng qamrovli ma'lumotlar uchun**: SofaScore

## ⚠️ Muhim Eslatmalar

1. **Vite da environment variable lar `VITE_` bilan boshlanishi kerak**
2. **`process.env` o'rniga `import.meta.env` ishlating**
3. **API kalitlaringizni hech kim bilan ulashmang**
4. **`.env` faylini GitHub ga yuklamang!**

---

**Misol**: `.env` faylida `VITE_FOOTBALL_API_KEY=your_key_here` ko'rinishida bo'lishi kerak 