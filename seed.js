/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding started...");

  // Admin user
  const email = 'admin@simpaty.uz';
  const password = 'simpaty_admin';
  const passwordHash = await bcrypt.hash(password, 10);
  
  await prisma.user.upsert({
    where: { email },
    update: {
      passwordHash,
      role: 'ADMIN',
      name: 'Simpaty'
    },
    create: {
      email,
      name: 'Simpaty',
      passwordHash,
      role: 'ADMIN',
    },
  });

  // Categories
  const categoriesData = [
    {
      slug: 'new-in',
      nameUz: 'Yangi To\'plam',
      nameRu: 'Новинки',
      imageUrl: '/hero-new-collection.png',
      mainColor: '#F5F5F5',
      secondaryColor: '#000000',
      isActive: true,
    },
    {
      slug: 'evening-wear',
      nameUz: 'Oqshom Liboslari',
      nameRu: 'Вечерние Наряды',
      imageUrl: '/cat-evening.png',
      mainColor: '#1A1A24',
      secondaryColor: '#D4AF37',
      isActive: true,
    },
    {
      slug: 'outerwear',
      nameUz: 'Ustki Kiyimlar',
      nameRu: 'Верхняя Одежда',
      imageUrl: '/cat-outerwear.png',
      mainColor: '#3F4E4F',
      secondaryColor: '#A27B5C',
      isActive: true,
    },
    {
      slug: 'accessories',
      nameUz: 'Aksessuarlar',
      nameRu: 'Аксессуары',
      imageUrl: '/cat-accessories.png',
      mainColor: '#8B4513',
      secondaryColor: '#FFF8DC',
      isActive: true,
    },
    {
      slug: 'shoes',
      nameUz: 'Poyabzallar',
      nameRu: 'Обувь',
      imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=1600',
      mainColor: '#2C3E50',
      secondaryColor: '#BDC3C7',
      isActive: true,
    }
  ];

  const categories = [];
  for (const cat of categoriesData) {
    const createdCat = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categories.push(createdCat);
  }

  // SubCategories
  const subCategoriesData = [
    { categoryId: categories[0].id, slug: 'trending-now', nameUz: 'Hozirgi Trend', nameRu: 'В Тренде' },
    { categoryId: categories[1].id, slug: 'long-dresses', nameUz: "Uzun Ko'ylaklar", nameRu: 'Длинные Платья' },
    { categoryId: categories[1].id, slug: 'cocktail-dresses', nameUz: "Kokteyl Ko'ylaklar", nameRu: 'Коктейльные Платья' },
    { categoryId: categories[2].id, slug: 'wool-coats', nameUz: 'Junli Paltolar', nameRu: 'Шерстяные Пальто' },
    { categoryId: categories[2].id, slug: 'jackets', nameUz: 'Kurtkalar', nameRu: 'Куртки' },
    { categoryId: categories[3].id, slug: 'leather-bags', nameUz: 'Charm Sumkalar', nameRu: 'Кожаные Сумки' },
    { categoryId: categories[4].id, slug: 'heels', nameUz: 'Tufli va Hiller', nameRu: 'Туфли и Каблуки' },
  ];

  const subCategories = [];
  for (const sub of subCategoriesData) {
    const createdSub = await prisma.subCategory.upsert({
      where: { slug: sub.slug },
      update: sub,
      create: sub,
    });
    subCategories.push(createdSub);
  }

  // Products
  const productsData = [
    // NEW IN
    {
      categoryId: categories[0].id,
      subCategoryId: subCategories[0].id,
      slug: 'minimalist-wool-blazer',
      nameUz: "Minimalistik Junli Blazer",
      nameRu: 'Минималистичный Шерстяной Блейзер',
      descriptionUz: "Yengil va sifatli jundan tayyorlangan, zamonaviy ayollar uchun mukammal bichimdagi blazer. Har qanday obrazga nafosat qo'shadi.",
      descriptionRu: "Блейзер идеального кроя из легкой и качественной шерсти для современных женщин. Добавит изысканности любому образу.",
      price: 1450000,
      primaryImage: '/hero-new-collection.png',
      images: ['/hero-new-collection.png'],
      colors: ['Cream', 'Black', 'Taupe'],
      sizes: ['S', 'M', 'L'],
      details: {
        materialUz: "100% Jun",
        materialRu: "100% Шерсть",
        liningUz: "Ipak",
        liningRu: "Шелк",
        fitUz: "Oversize",
        fitRu: "Оверсайз"
      },
      isActive: true,
    },
    // EVENING WEAR
    {
      categoryId: categories[1].id,
      subCategoryId: subCategories[1].id,
      slug: 'royal-silk-gown',
      nameUz: "Shohona Ipak Libos",
      nameRu: 'Королевское Шелковое Платье',
      descriptionUz: "Tandagi mayin ipak va sirli qora rang sizga haqiqiy malika qiyofasini beradi. Oqshomning eng yorqin yulduzi bo'ling.",
      descriptionRu: "Мягкий шелк и таинственный черный цвет подарят вам образ истинной королевы. Станьте ярчайшей звездой вечера.",
      price: 2100000,
      primaryImage: '/cat-evening.png',
      images: ['/cat-evening.png'],
      colors: ['Black', 'Navy', 'Emerald'],
      sizes: ['XS', 'S', 'M', 'L'],
      details: {
        fabricUz: "Asl Ipak",
        fabricRu: "Натуральный Шелк",
        lengthUz: "Maksi",
        lengthRu: "Макси",
        styleUz: "Ochiq yelka",
        styleRu: "Открытые плечи"
      },
      isActive: true,
    },
    {
      categoryId: categories[1].id,
      subCategoryId: subCategories[2].id,
      slug: 'sparkling-cocktail-dress',
      nameUz: "Yaltiroq Kokteyl Ko'ylagi",
      nameRu: 'Блестящее Коктейльное Платье',
      descriptionUz: "Bayramlar va maxsus kechalar uchun mos keluvchi yaltiroq libos. Diqqat markazida bo'lishni xovush ko'ruvchilar uchun.",
      descriptionRu: "Блестящее платье, подходящее для праздников и особых вечеров. Для тех, кто любит быть в центре внимания.",
      price: 980000,
      primaryImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1000',
      images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1000'],
      colors: ['Silver', 'Gold', 'Rose Gold'],
      sizes: ['S', 'M'],
      details: {
        fabricUz: "Lureks va To'r",
        fabricRu: "Люрекс и Сетка",
        lengthUz: "Mini",
        lengthRu: "Мини"
      },
      isActive: true,
    },
    // OUTERWEAR
    {
      categoryId: categories[2].id,
      subCategoryId: subCategories[3].id,
      slug: 'classic-camel-coat',
      nameUz: "Klassik Tuya Rangi Palto",
      nameRu: 'Классическое Пальто Цвета Кэмел',
      descriptionUz: "Vaqt o'tishi bilan qiymatini yo'qotmaydigan klassik palto. Har bir ayol garderobida bo'lishi shart bo'lgan element.",
      descriptionRu: "Классическое пальто, которое не теряет своей ценности со временем. Обязательный элемент гардероба каждой женщины.",
      price: 1850000,
      primaryImage: '/cat-outerwear.png',
      images: ['/cat-outerwear.png'],
      colors: ['Camel', 'Beige'],
      sizes: ['M', 'L', 'XL'],
      details: {
        materialUz: "Kashmir va Jun",
        materialRu: "Кашемир и Шерсть",
        tempUz: "-10°C gacha",
        tempRu: "до -10°C"
      },
      isActive: true,
    },
    {
      categoryId: categories[2].id,
      subCategoryId: subCategories[4].id,
      slug: 'oversized-padded-jacket',
      nameUz: "Yirik Bichimdagi Kurtka",
      nameRu: 'Куртка Оверсайз',
      descriptionUz: "Sovuq kunlarda ham o'zingizni issiq va zamonaviy his eting. Zamonaviy shahar uslubidagi yirik kurtka.",
      descriptionRu: "Чувствуйте себя тепло и стильно даже в холодные дни. Куртка оверсайз в современном городском стиле.",
      price: 1200000,
      primaryImage: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1000',
      images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1000'],
      colors: ['Grey', 'Black'],
      sizes: ['S', 'M', 'L'],
      details: {
        fillUz: "Ekologik Par",
        fillRu: "Эко-пух",
        waterproofUz: "Ha",
        waterproofRu: "Да"
      },
      isActive: true,
    },
    // ACCESSORIES
    {
      categoryId: categories[3].id,
      subCategoryId: subCategories[5].id,
      slug: 'premium-leather-tote',
      nameUz: "Premium Charm Sumka",
      nameRu: 'Кожаная Сумка Премиум-Класса',
      descriptionUz: "Sifatli charmdan tayyorlangan, har kungi ehtiyojlar uchun keng va qulay sumka. Elegant dizayn va funksionallik.",
      descriptionRu: "Вместительная и удобная сумка из качественной кожи для повседневных нужд. Элегантный дизайн и функциональность.",
      price: 1150000,
      primaryImage: '/cat-accessories.png',
      images: ['/cat-accessories.png'],
      colors: ['Brown', 'Black'],
      details: {
        materialUz: "Haqiqiy Charm",
        materialRu: "Натуральная Кожа",
        sizeUz: "35x25x15 sm",
        sizeRu: "35x25x15 см"
      },
      isActive: true,
    },
    {
      categoryId: categories[3].id,
      slug: 'silk-scarf-collection',
      nameUz: "Ipak Sharflar To'plami",
      nameRu: 'Коллекция Шелковых Шарфов',
      descriptionUz: "Nozik ipak sharflar sizning obrazingizga yakuniy nafislikni hadya etadi. Turli xil ranglar mavjud.",
      descriptionRu: "Нежные шелковые шарфы придадут завершающую изысканность вашему образу. Доступны в различных цветах.",
      price: 250000,
      primaryImage: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=1000',
      images: ['https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=1000'],
      colors: ['Floral', 'Abstract', 'Geometric'],
      details: {
        materialUz: "100% Ipak",
        materialRu: "100% Шелк",
        dimensionUz: "90x90 sm",
        dimensionRu: "90x90 см"
      },
      isActive: true,
    },
    // SHOES
    {
      categoryId: categories[4].id,
      subCategoryId: subCategories[6].id,
      slug: 'elegant-stiletto-heels',
      nameUz: "Nafis Stiletto Tuflilari",
      nameRu: 'Элегантные Туфли-Стилеты',
      descriptionUz: "Klassik va aslzoda dizayn. Tantanali marosimlar uchun eng yaxshi tanlov.",
      descriptionRu: "Классический и благородный дизайн. Лучший выбор для торжественных мероприятий.",
      price: 950000,
      primaryImage: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&q=80&w=1000',
      images: ['https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&q=80&w=1000'],
      colors: ['Nude', 'Black', 'Red'],
      sizes: ['36', '37', '38', '39'],
      details: {
        heelUz: "10 sm",
        heelRu: "10 см",
        materialUz: "Charm",
        materialRu: "Кожа"
      },
      isActive: true,
    },
    {
      categoryId: categories[4].id,
      slug: 'leather-ankle-boots',
      nameUz: "Charm Botinkalar",
      nameRu: 'Кожаные Ботильоны',
      descriptionUz: "Kuzgi shahar sayrlari uchun qulay va bardoshli charm botinkalar. Ham shim, ham yubka bilan mos keladi.",
      descriptionRu: "Удобные и прочные кожаные ботильоны для осенних прогулок по городу. Сочетаются как с брюками, так и с юбками.",
      price: 1350000,
      primaryImage: 'https://images.unsplash.com/photo-1520639889457-41d06e22bc21?auto=format&fit=crop&q=80&w=1000',
      images: ['https://images.unsplash.com/photo-1520639889457-41d06e22bc21?auto=format&fit=crop&q=80&w=1000'],
      colors: ['Black', 'Burgundy'],
      sizes: ['37', '38', '39', '40'],
      details: {
        soleUz: "Rezina",
        soleRu: "Резина",
        materialUz: "Haqiqiy Charm",
        materialRu: "Натуральная Кожа"
      },
      isActive: true,
    }

  ];

  for (const prod of productsData) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: prod,
      create: prod,
    });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

