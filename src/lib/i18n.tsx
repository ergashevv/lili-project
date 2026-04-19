'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'uz' | 'ru'

interface I18nContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  uz: {
    'home.hero.title': 'Nafis Ayollar Kolleksiyasi',
    'home.hero.subtitle': "Har bir ayolning o‘ziga xos go‘zalligini namoyon etuvchi premium liboslar. Yangi to‘plamni kashf eting.",
    'home.hero.cta': "Kolleksiyani ko'rish",
    'nav.home': 'Bosh sahifa',
    'nav.categories': 'Kategoriyalar',
    'nav.login': 'Kirish',
    'nav.logout': 'Chiqish',
    'product.order': 'Xarid qilish',
    'product.addToCart': "Savatga qo'shish",
    'product.details': 'Tafsilotlar',
    'product.color': 'Rang',
    'product.size': 'O‘lcham',
    'product.sizeGuide': 'O‘lchamlar jadvali',
    'form.name': 'Ismingiz',
    'form.phone': 'Telefon raqamingiz',
    'form.address': 'Yetkazib berish manzili',
    'form.optional': '(ixtiyoriy)',
    'form.submit': 'Yuborish',
    'order.success': 'Buyurtmangiz qabul qilindi!',
    'order.success.desc': "Menejerimiz qisqa vaqt ichida siz bilan bog‘lanadi.",
    'common.close': 'Yopish',
    'common.loading': 'Yuklanmoqda...',
    'categories.all': 'Barcha kategoriyalar',
    'product.quality': "100% Sifat kafolati",
    'product.delivery': "O‘zbekiston bo‘ylab yetkazib berish xizmati",
    'category.breadcrumb.home': 'Bosh sahifa',
    'category.breadcrumb.categories': 'Kategoriyalar',
    'category.products': 'ta mahsulot',
    'category.empty': 'Ushbu bo‘limda hozircha mahsulotlar mavjud emas.',
    'category.back': '← Orqaga',
    'home.featured.tagline': 'Trendda',
    'home.featured.title': 'Yangi kolleksiya',
    'home.features.shipping.title': 'Tezkor yetkazib berish',
    'home.features.shipping.desc': "O‘zbekistonning barcha hududlariga ishonchli va tezkor yetkazib berish.",
    'home.features.quality.title': 'Premium sifat',
    'home.features.quality.desc': 'Eng sara matolardan tayyorlangan eksklyuziv liboslar',
    'home.features.support.title': "Doimiy qo'llab-quvvatlash",
    'home.features.support.desc': "Mijozlarimiz uchun 24/7 tezkor yordam va maslahatlar",
    'home.story.title': 'Simpaty — nafosat timsoli',
    'home.story.desc': "Bizning maqsadimiz — har bir ayolning o‘ziga xos go‘zalligini ochib berishdir. Har bir libos noziklik, qulaylik va yuqori sifatni o‘zida mujassam etadi. Maxsus kolleksiyalarimiz orqali o‘zingizga bo‘lgan ishonchni his qiling.",
    'home.story.btn': 'Batafsil',
    'auth.login.title': 'Kirish',
    'auth.login.subtitle': "Xush kelibsiz! Davom etish uchun tizimga kiring",
    'auth.login.submit': 'Kirish',
    'auth.login.loading': 'Yuklanmoqda...',
    'auth.login.error': "Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring",
    'auth.login.footer': "Hisobingiz yo'qmi?",
    'auth.login.footerLink': "Ro‘yxatdan o‘tish",
    'auth.signup.title': "Ro'yxatdan o'tish",
    'auth.signup.subtitle': "Ro'yxatdan o'ting va yangi imkoniyatlardan bahramand bo'ling",
    'auth.signup.submit': "Ro'yxatdan o'tish",
    'auth.signup.loading': 'Yuklanmoqda...',
    'auth.signup.error': "Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring",
    'auth.signup.footer': 'Hisobingiz bormi?',
    'auth.signup.footerLink': 'Kirish',
    'nav.about': 'Brend haqida',
    'nav.contacts': 'Kontaktlar',
    'nav.delivery': 'Yetkazib berish',
    'nav.search': 'Qidiruv',
    'nav.wishlist': 'Sevimlilar',
    'nav.cart': 'Savat',
    'search.placeholder': 'Mahsulot qidirish...',
    'search.loading': 'Qidirilmoqda...',
    'search.noResults': 'Hech narsa topilmadi.',
    'search.viewAll': "Barcha natijalarni ko'rish",
    'search.popular': 'Ommabop kategoriyalar',
    'category.shopNow': 'Sotib olish',
    'profile.title': 'Mening profilim',
    'profile.info': "Shaxsiy ma’lumotlar",
    'profile.orders': 'Buyurtmalar tarixi',
    'profile.noOrders': 'Sizda hali buyurtmalar mavjud emas',
    'profile.joined': "Ro‘yxatdan o‘tgan sana",
    'filter.title': 'Filtr va saralash',
    'filter.sort.title': 'Saralash',
    'filter.sort.newest': 'Avval yangilari',
    'filter.sort.price_asc': 'Narx bo‘yicha: Arzonroq',
    'filter.sort.price_desc': 'Narx bo‘yicha: Qimmatroq',
    'filter.color': 'Rang',
    'filter.size': 'O‘lcham',
    'filter.subcategory': 'Bo‘lim',
    'filter.clear': 'Tozalash',
    'filter.apply': 'Saqlash',
    'cart.checkout': 'Buyurtmani rasmiylashtirish',
    'cart.empty': 'Savatda hozircha mahsulotlar yo‘q',
    'cart.total': 'Jami',
  },
  ru: {
    'home.hero.title': 'Женская одежда премиум-класса',
    'home.hero.subtitle': 'Изысканность и утонченность для уверенных в себе женщин. Откройте для себя новую коллекцию.',
    'home.hero.cta': 'Смотреть коллекцию',
    'nav.home': 'Главная',
    'nav.categories': 'Категории',
    'nav.login': 'Войти',
    'nav.logout': 'Выйти',
    'product.order': 'Заказать',
    'product.addToCart': 'В корзину',
    'product.details': 'Детали',
    'product.color': 'Цвет',
    'product.size': 'Размер',
    'product.sizeGuide': 'Узнайте свой размер',
    'form.name': 'Ваше имя',
    'form.phone': 'Номер телефона',
    'form.address': 'Адрес доставки',
    'form.optional': '(Необязательно)',
    'form.submit': 'Отправить',
    'order.success': 'Заказ успешно оформлен!',
    'order.success.desc': 'В ближайшее время наши менеджеры свяжутся с вами.',
    'common.close': 'Закрыть',
    'common.loading': 'Подождите...',
    'categories.all': 'Все категории',
    'product.quality': '100% Гарантия качества',
    'product.delivery': 'Доставка по всему Узбекистану',
    'category.breadcrumb.home': 'Главная',
    'category.breadcrumb.categories': 'Категории',
    'category.products': 'товаров',
    'category.empty': 'В этой категории пока нет товаров.',
    'category.back': '← Категории',
    'home.featured.tagline': 'В тренде',
    'home.featured.title': 'Новая Коллекция',
    'home.features.shipping.title': 'Быстрая доставка',
    'home.features.shipping.desc': 'Быстрая и надежная доставка во все регионы',
    'home.features.quality.title': 'Премиальное качество',
    'home.features.quality.desc': 'Эксклюзивная одежда из лучших тканей',
    'home.features.support.title': 'Поддержка 24/7',
    'home.features.support.desc': 'Постоянная помощь и консультации для наших клиентов',
    'home.story.title': 'Simpaty - это утонченность',
    'home.story.desc': 'Наша цель - раскрыть уникальную красоту каждой женщины. Каждое платье сочетает в себе элегантность, комфорт и высокое качество. Почувствуйте уверенность в себе с нашими специальными коллекциями.',
    'home.story.btn': 'Подробнее',
    'auth.login.title': 'Вход в аккаунт',
    'auth.login.subtitle': 'Введите свои данные, чтобы войти в систему',
    'auth.login.submit': 'Войти',
    'auth.login.loading': 'Подождите...',
    'auth.login.error': 'Системная ошибка. Попробуйте ещё раз',
    'auth.login.footer': 'Нет аккаунта?',
    'auth.login.footerLink': 'Зарегистрироваться',
    'auth.signup.title': 'Регистрация',
    'auth.signup.subtitle': 'Заполните форму, чтобы создать новый аккаунт',
    'auth.signup.submit': 'Зарегистрироваться',
    'auth.signup.loading': 'Подождите...',
    'auth.signup.error': 'Системная ошибка. Попробуйте ещё раз',
    'auth.signup.footer': 'Уже есть аккаунт?',
    'auth.signup.footerLink': 'Войти',
    'nav.about': 'О бренде',
    'nav.contacts': 'Контакты',
    'nav.delivery': 'Доставка',
    'nav.search': 'Поиск',
    'nav.wishlist': 'Избранное',
    'nav.cart': 'Корзина',
    'search.placeholder': 'Поиск товаров...',
    'search.loading': 'Поиск...',
    'search.noResults': 'Ничего не найдено.',
    'search.viewAll': 'Посмотреть все результаты',
    'search.popular': 'Популярные категории',
    'category.shopNow': 'Купить сейчас',
    'profile.title': 'Мой профиль',
    'profile.info': 'Личные данные',
    'profile.orders': 'История заказов',
    'profile.noOrders': 'У вас пока нет заказов',
    'profile.joined': 'Дата регистрации',
    'filter.title': 'Фильтр и Сортировка',
    'filter.sort.title': 'Сортировка',
    'filter.sort.newest': 'Сначала новые',
    'filter.sort.price_asc': 'Цена: Дешевле',
    'filter.sort.price_desc': 'Цена: Дороже',
    'filter.color': 'Цвет',
    'filter.size': 'Размер',
    'filter.subcategory': 'Подкатегория',
    'filter.clear': 'Очистить',
    'filter.apply': 'Применить',
    'cart.checkout': 'Оформить заказ',
    'cart.empty': 'В корзине пока нет товаров',
    'cart.total': 'Итого',
  },
}

const I18nContext = createContext<I18nContextType>({
  lang: 'ru',
  setLang: () => {},
  t: (key) => key,
})

export const useI18n = () => useContext(I18nContext)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('ru')

  // After the component mounts (client-only), sync to the saved preference.
  // We use startTransition so the state update is non-urgent (avoids cascading render warning).
  useEffect(() => {
    const saved = localStorage.getItem('simpaty-lang') as Language
    if (saved === 'uz' || saved === 'ru') {
      React.startTransition(() => setLang(saved))
    }
  }, [])

  const handleSetLang = (newLang: Language) => {
    setLang(newLang)
    localStorage.setItem('simpaty-lang', newLang)
    document.documentElement.lang = newLang
  }

  const t = (key: string) => translations[lang][key] || key

  return (
    <I18nContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}
