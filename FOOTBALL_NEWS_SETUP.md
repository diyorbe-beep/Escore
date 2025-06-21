# Football News API Setup Guide

## API Integration

Bu loyihada NewsAPI.org dan foydalanib futbol yangiliklari olinadi. API bepul versiyasi mavjud va kundalik 100 so'rov chegarasi bor.

## API Kalitini Olish

1. [NewsAPI.org](https://newsapi.org/) saytiga o'ting
2. "Get API Key" tugmasini bosing
3. Bepul ro'yxatdan o'ting
4. API kalitingizni oling (masalan: `abc123def456ghi789`)

## API Kalitini Sozlash

1. `src/services/FootballNewsService.js` faylini oching
2. 4-qatorda `your_api_key_here` ni o'z API kalitingiz bilan almashtiring:

```javascript
const NEWS_API_KEY = 'abc123def456ghi789'; // O'z API kalitingizni kiriting
```

## API Xususiyatlari

### Bepul Versiya
- Kundalik 100 so'rov chegarasi
- Faqat development uchun
- HTTP so'rovlari

### Pullik Versiya (Agar kerak bo'lsa)
- Cheksiz so'rovlar
- HTTPS so'rovlari
- Production uchun tavsiya etiladi

## Qo'llab-quvvatlanadigan Filtrlash

- **Barcha yangiliklar**: Umumiy futbol yangiliklari
- **Premier League**: Angliya Premier Ligasi
- **La Liga**: Ispaniya La Ligasi
- **Serie A**: Italiya Serie A
- **Bundesliga**: Germaniya Bundesligasi
- **Champions League**: Yevropa Chempionlar Ligasi

## Fallback Ma'lumotlar

Agar API ishlamasa yoki xatolik yuz bersa, tizim avtomatik ravishda fallback ma'lumotlarni ko'rsatadi. Bu foydalanuvchi tajribasini saqlaydi.

## Xavfsizlik

⚠️ **Muhim**: API kalitingizni hech qachon GitHub yoki boshqa ommaviy joylarda nashr etmang. Agar kalit oshkor bo'lsa, uni darhol o'zgartiring.

## Muammolarni Hal Qilish

### API kalit ishlamayapti
1. API kalit to'g'ri kiritilganini tekshiring
2. Kundalik chegarani oshirganingizni tekshiring
3. Internet aloqasini tekshiring

### Yangiliklar yuklanmayapti
1. Console da xatolik xabarlarini tekshiring
2. API kalit to'g'ri ishlayotganini tekshiring
3. Fallback ma'lumotlar ko'rsatilayotganini tekshiring

## Qo'shimcha Ma'lumotlar

- [NewsAPI Documentation](https://newsapi.org/docs)
- [API Endpoints](https://newsapi.org/docs/endpoints)
- [Error Codes](https://newsapi.org/docs/errors) 