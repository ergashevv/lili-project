# Simpaty - Ayollar Kiyimi E-commerce

Ushbu loyiha Vercel'ga moslangan va to'liq full stack usulida (Next.js 15, Prisma ORM, Vercel Blob) yaratilgan.

## Texnologiyalar

- **Next.js (App Router)** - Tezkor va SEO-mos frontend uchun.
- **Framer Motion** - "Silliq (smooth)" vizual animatsiyalar berish uchun.
- **Prisma + PostgreSQL** - Ma'lumotlar bazasi sifatida (Neon va Vercel Postgres ulanishi tayyor).
- **Vercel Blob** - Rasmlarni bevosita Admin panelidan Vercel tarmoqlariga original tarzda saqlash uchun.
- **CSS Modules** - Tailwind o'rniga moslashuvchan CSS.

## Maxsus Imkoniyatlar

1. **Dinamik Ranglar**: Har bir kategoriya Admin paneldan kiritilgan "Asosiy rang" (masalan, bordoviy) asosida o'z interfeysiga ega bo'ladi. Foydalanuvchi aynan shu kategoriya sahifasiga kirsa, butun app ranglari moslashadi (Dinamik CSS Variables).
2. **Soddalashtirilgan Auth**: Loyiha shartlariga muvofiq faqat email va parol bilan ro'yxatdan o'tish (`jose` server tokenlari orqali) va avtorizatsiya.
3. **Sotib Olish Tizimi (Savat yo'q)**: Foydalanuvchi har bir mahsulotni to'g'ridan to'g'ri "Buyurtma berish" qilib, Admin konsoliga yuboradi!

## Loyihani Ishga Tushirish

1. `.env` faylga shaxsiy Vercel Blob va Postgres ma'lumotlarini kiriting:

```env
POSTGRES_URL="neon-yoki-vercel-url"
BLOB_READ_WRITE_TOKEN="vercel-blob-token"
JWT_SECRET="xavfsiz-maxfiy-kalitizingiz"
```

2. Ma'lumotlar bazasini yangilang (Jadvallarni yaratish):

```bash
npx prisma db push
```

3. Loyihani mahalliy (localhost) da ishga tushiring:

```bash
npm run dev
```

4. Loyiha URLi `http://localhost:3000`. Birinchi ochilgan (ro'yxatdan o'tgan) foydalanuvchi avtomatik ravishda **ADMIN** hisoblanib, unga `http://localhost:3000/admin` panelga kirish ruxsat etiladi!
