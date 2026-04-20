import type { BrandIntakeFieldName, BrandIntakeLanguage } from './brand-intake-types'

export type BrandIntakeFieldType = 'text' | 'email' | 'color'

export type BrandIntakeFieldCopy = {
  name: BrandIntakeFieldName
  label: string
  helper: string
  placeholder?: string
  required?: boolean
  type?: BrandIntakeFieldType
  kind?: 'input' | 'textarea'
  rows?: number
}

export type BrandIntakeGroupCopy = {
  title: string
  description: string
  fields: BrandIntakeFieldCopy[]
}

export type BrandIntakePageCopy = {
  badge: string
  title: string
  subtitle: string
  heroNote: string
  languageLabel: string
  languageHint: string
  languageOptions: Record<BrandIntakeLanguage, string>
}

export type BrandIntakeFormCopy = {
  submitLabel: string
  savingLabel: string
  readyLabel: string
  guidance: string
  successMessage: string
  errorMessage: string
  colorPickerNote: string
  groups: BrandIntakeGroupCopy[]
}

export type BrandIntakeCopy = {
  page: BrandIntakePageCopy
  form: BrandIntakeFormCopy
}

export const BRAND_INTAKE_COPY: Record<BrandIntakeLanguage, BrandIntakeCopy> = {
  uz: {
    page: {
      badge: 'Ochiq brend anketasi',
      title: 'Brendingiz haqida ma’lumot bering',
      subtitle:
        'Tilni tanlang va formani yuqoridan pastga qarab to‘ldiring. Siz bergan javoblar dashboardga tushadi.',
      heroNote: 'Login kerak emas. Faqat bilganingizni kiriting.',
      languageLabel: 'Tilni tanlang',
      languageHint: 'Bir xil forma 3 tilda: O‘zbek, Rus va Ingliz.',
      languageOptions: {
        uz: 'O‘zbek',
        ru: 'Русский',
        en: 'English',
      },
    },
    form: {
      submitLabel: 'Brend anketasini yuborish',
      savingLabel: 'Saqlanmoqda...',
      readyLabel: 'Saqlashga tayyor',
      guidance: 'Forma sodda. Faqat bilgan narsangizni yozing va yuboring.',
      successMessage: 'Rahmat. Sizning brend anketangiz dashboardga yuborildi.',
      errorMessage: 'Formani yuborib bo‘lmadi. Iltimos, qayta urinib ko‘ring.',
      colorPickerNote: 'Rangni ko‘zingiz bilan tanlang. Kod yozish shart emas.',
      groups: [
        {
          title: 'Brend asoslari',
          description: 'Brend kimligi va kim bilan bog‘lanishimiz kerakligini yozing.',
          fields: [
            {
              name: 'brandName',
              label: 'Brand nomi',
              helper: 'Bu nom sayt sarlavhasi, logo va footerda ko‘rinadi.',
              placeholder: 'Lili',
              required: true,
            },
            {
              name: 'contactName',
              label: 'Aloqa qilinadigan shaxs',
              helper: 'Sayt ustida ishlayotganimizda bog‘lanadigan odam.',
              placeholder: 'To‘liq ism',
              required: true,
            },
            {
              name: 'email',
              label: 'Email manzil',
              helper: 'Bu manzil orqali loyiha yangiliklarini yuboramiz.',
              placeholder: 'name@example.com',
              type: 'email',
              required: true,
            },
            {
              name: 'phone',
              label: 'Telefon / WhatsApp',
              helper: 'Ixtiyoriy, lekin tezroq aloqa uchun foydali.',
              placeholder: '+998 90 000 00 00',
            },
            {
              name: 'website',
              label: 'Website / domain',
              helper: 'Faqat domen yozing, masalan lili.uz, yoki to‘liq havolani kiriting.',
              placeholder: 'lili.uz',
              required: true,
            },
          ],
        },
        {
          title: 'Sayt sahifalari',
          description: 'Saytda qaysi sahifalar bo‘lishini yozing.',
          fields: [
            {
              name: 'requiredPages',
              label: 'Kerakli sahifalar',
              helper: 'Sahifalarni vergul bilan yoki alohida qatorlarda yozing.',
              placeholder: 'Bosh sahifa, Biz haqimizda, Do‘kon, FAQ, Kontaktlar',
              kind: 'textarea',
              rows: 5,
              required: true,
            },
          ],
        },
        {
          title: 'Brend uslubi',
          description: 'Ranglar va umumiy ko‘rinish haqida ma’lumot bering.',
          fields: [
            {
              name: 'primaryColor',
              label: 'Asosiy rang',
              helper: 'Tugmalar, linklar va asosiy urg‘ular uchun ishlatiladi.',
              type: 'color',
              required: true,
            },
            {
              name: 'secondaryColor',
              label: 'Yordamchi rang',
              helper: 'Kartalar, chegaralar va yumshoq urg‘ular uchun.',
              type: 'color',
              required: true,
            },
            {
              name: 'accentColor',
              label: 'Aksent rang',
              helper: 'Badge va mayda detallar uchun kichik rang.',
              type: 'color',
              required: true,
            },
            {
              name: 'typography',
              label: 'Shrift uslubi',
              helper: 'Qanday shrift kayfiyati kerak: zamonaviy, nafis, serif, toza va hokazo.',
              placeholder: 'Zamonaviy, nafis, o‘qilishi oson...',
              kind: 'textarea',
              rows: 4,
            },
            {
              name: 'preferredTone',
              label: 'Matn uslubi',
              helper: 'Sayt qanday ohangda gapirsin? Samimiy, premium, sodda, dadil va hokazo.',
              placeholder: 'Iliq, premium, sodda...',
              kind: 'textarea',
              rows: 4,
            },
          ],
        },
        {
          title: 'Linklar va izohlar',
          description: 'Ijtimoiy tarmoqlar va qo‘shimcha ko‘rsatmalarni yozing.',
          fields: [
            {
              name: 'socialLinks',
              label: 'Social linklar',
              helper: 'Instagram, Telegram, TikTok yoki boshqa profil nomlari/havolalari.',
              placeholder: 'Instagram, Telegram, TikTok...',
              kind: 'textarea',
              rows: 4,
            },
            {
              name: 'notes',
              label: 'Qo‘shimcha izohlar',
              helper: 'Boshlashdan oldin bilishimiz kerak bo‘lgan boshqa narsa.',
              placeholder: 'Jamoa uchun ixtiyoriy izohlar',
              kind: 'textarea',
              rows: 4,
            },
          ],
        },
      ],
    },
  },
  ru: {
    page: {
      badge: 'Открытая анкета бренда',
      title: 'Расскажите о вашем бренде',
      subtitle:
        'Выберите язык и заполните форму сверху вниз. Ваши ответы сразу попадут в dashboard.',
      heroNote: 'Вход не нужен. Просто заполните то, что знаете.',
      languageLabel: 'Выберите язык',
      languageHint: 'Одна и та же форма доступна на 3 языках: узбекский, русский и английский.',
      languageOptions: {
        uz: 'O‘zbek',
        ru: 'Русский',
        en: 'English',
      },
    },
    form: {
      submitLabel: 'Отправить анкету бренда',
      savingLabel: 'Сохранение...',
      readyLabel: 'Готово к сохранению',
      guidance: 'Форма простая. Введите только то, что знаете, и отправьте.',
      successMessage: 'Спасибо. Ваша анкета бренда отправлена в dashboard.',
      errorMessage: 'Не удалось отправить форму. Пожалуйста, попробуйте еще раз.',
      colorPickerNote: 'Выберите цвет визуально. Код вводить не нужно.',
      groups: [
        {
          title: 'Основы бренда',
          description: 'Кто бренд и с кем нам нужно связаться.',
          fields: [
            {
              name: 'brandName',
              label: 'Название бренда',
              helper: 'Это имя появится в шапке сайта, в логотипе и в footer.',
              placeholder: 'Lili',
              required: true,
            },
            {
              name: 'contactName',
              label: 'Контактное лицо',
              helper: 'Человек, с которым мы будем общаться во время разработки.',
              placeholder: 'Полное имя',
              required: true,
            },
            {
              name: 'email',
              label: 'Email',
              helper: 'На этот адрес мы отправим обновления по проекту.',
              placeholder: 'name@example.com',
              type: 'email',
              required: true,
            },
            {
              name: 'phone',
              label: 'Телефон / WhatsApp',
              helper: 'Необязательно, но удобно для быстрой связи.',
              placeholder: '+998 90 000 00 00',
            },
            {
              name: 'website',
              label: 'Website / domain',
              helper: 'Введите только домен, например lili.uz, или вставьте полный URL.',
              placeholder: 'lili.uz',
              required: true,
            },
          ],
        },
        {
          title: 'Страницы сайта',
          description: 'Укажите, какие страницы должны быть на сайте.',
          fields: [
            {
              name: 'requiredPages',
              label: 'Нужные страницы',
              helper: 'Перечислите страницы через запятую или в отдельных строках.',
              placeholder: 'Главная, О нас, Магазин, FAQ, Контакты',
              kind: 'textarea',
              rows: 5,
              required: true,
            },
          ],
        },
        {
          title: 'Стиль бренда',
          description: 'Цвета и общее визуальное направление.',
          fields: [
            {
              name: 'primaryColor',
              label: 'Основной цвет',
              helper: 'Используется для кнопок, ссылок и акцентов.',
              type: 'color',
              required: true,
            },
            {
              name: 'secondaryColor',
              label: 'Дополнительный цвет',
              helper: 'Для карточек, рамок и мягких акцентов.',
              type: 'color',
              required: true,
            },
            {
              name: 'accentColor',
              label: 'Акцентный цвет',
              helper: 'Небольшой цвет для бейджей и деталей.',
              type: 'color',
              required: true,
            },
            {
              name: 'typography',
              label: 'Стиль шрифта',
              helper: 'Какое настроение должен иметь шрифт: современный, элегантный, serif, чистый и т.д.',
              placeholder: 'Современный, элегантный, легко читаемый...',
              kind: 'textarea',
              rows: 4,
            },
            {
              name: 'preferredTone',
              label: 'Стиль текста',
              helper: 'Как должен звучать сайт? Дружелюбно, премиально, просто, смело и т.д.',
              placeholder: 'Теплый, премиальный, простой...',
              kind: 'textarea',
              rows: 4,
            },
          ],
        },
        {
          title: 'Ссылки и заметки',
          description: 'Поделитесь ссылками на соцсети и дополнительными инструкциями.',
          fields: [
            {
              name: 'socialLinks',
              label: 'Ссылки на соцсети',
              helper: 'Instagram, Telegram, TikTok или любые другие профили и ссылки.',
              placeholder: 'Instagram, Telegram, TikTok...',
              kind: 'textarea',
              rows: 4,
            },
            {
              name: 'notes',
              label: 'Дополнительные заметки',
              helper: 'Все, что нам важно знать перед стартом.',
              placeholder: 'Необязательные заметки для команды',
              kind: 'textarea',
              rows: 4,
            },
          ],
        },
      ],
    },
  },
  en: {
    page: {
      badge: 'Public Brand Intake',
      title: 'Tell us about your brand',
      subtitle:
        'Choose a language and fill the form from top to bottom. Your answers will be saved to the dashboard.',
      heroNote: 'No login needed. Just share what you know.',
      languageLabel: 'Choose a language',
      languageHint: 'The same form is available in Uzbek, Russian, and English.',
      languageOptions: {
        uz: 'O‘zbek',
        ru: 'Русский',
        en: 'English',
      },
    },
    form: {
      submitLabel: 'Submit brand intake',
      savingLabel: 'Saving...',
      readyLabel: 'Ready to save',
      guidance: 'The form stays simple. Fill only what you know and submit.',
      successMessage: 'Thanks. Your brand intake has been saved to the dashboard.',
      errorMessage: 'Could not save the form. Please try again.',
      colorPickerNote: 'Pick the color visually. No code needed.',
      groups: [
        {
          title: 'Brand basics',
          description: 'Who the brand is and who we should contact.',
          fields: [
            {
              name: 'brandName',
              label: 'Brand name',
              helper: 'This is the name that will appear in the header, logo, and footer.',
              placeholder: 'Lili',
              required: true,
            },
            {
              name: 'contactName',
              label: 'Contact person',
              helper: 'The person we should speak with while building the site.',
              placeholder: 'Full name',
              required: true,
            },
            {
              name: 'email',
              label: 'Email address',
              helper: 'We will use this for follow-up and project updates.',
              placeholder: 'name@example.com',
              type: 'email',
              required: true,
            },
            {
              name: 'phone',
              label: 'Phone / WhatsApp',
              helper: 'Optional, but helpful for faster communication.',
              placeholder: '+998 90 000 00 00',
            },
            {
              name: 'website',
              label: 'Website / domain',
              helper: 'Type the domain only, like lili.uz, or paste the full URL.',
              placeholder: 'lili.uz',
              required: true,
            },
          ],
        },
        {
          title: 'Site pages',
          description: 'Tell us which pages should exist on the website.',
          fields: [
            {
              name: 'requiredPages',
              label: 'Pages to include',
              helper: 'Separate pages with commas or one page per line.',
              placeholder: 'Home, About, Shop, FAQ, Contact',
              kind: 'textarea',
              rows: 5,
              required: true,
            },
          ],
        },
        {
          title: 'Brand style',
          description: 'Pick colors and describe the look you want.',
          fields: [
            {
              name: 'primaryColor',
              label: 'Main color',
              helper: 'This color will be used for buttons, links, and highlights.',
              type: 'color',
              required: true,
            },
            {
              name: 'secondaryColor',
              label: 'Support color',
              helper: 'A second color for cards, borders, and softer accents.',
              type: 'color',
              required: true,
            },
            {
              name: 'accentColor',
              label: 'Accent color',
              helper: 'A small accent color for badges and details.',
              type: 'color',
              required: true,
            },
            {
              name: 'typography',
              label: 'Font style',
              helper: 'Describe the font mood you want: modern, elegant, serif, clean, and so on.',
              placeholder: 'Modern, elegant, readable...',
              kind: 'textarea',
              rows: 4,
            },
            {
              name: 'preferredTone',
              label: 'Text style',
              helper: 'How should the website sound? Friendly, premium, simple, bold, and so on.',
              placeholder: 'Warm, premium, clear...',
              kind: 'textarea',
              rows: 4,
            },
          ],
        },
        {
          title: 'Links and notes',
          description: 'Share any social profiles and extra instructions.',
          fields: [
            {
              name: 'socialLinks',
              label: 'Social links',
              helper: 'Instagram, Telegram, TikTok, or any other profile names or links.',
              placeholder: 'Instagram, Telegram, TikTok...',
              kind: 'textarea',
              rows: 4,
            },
            {
              name: 'notes',
              label: 'Extra notes',
              helper: 'Anything else we should know before we start.',
              placeholder: 'Optional notes for the team',
              kind: 'textarea',
              rows: 4,
            },
          ],
        },
      ],
    },
  },
}

export function formatBrandIntakeFilledSummary(language: BrandIntakeLanguage, filled: number, total: number) {
  if (language === 'uz') {
    return `${total} ta muhim maydondan ${filled} tasi to‘ldirildi`
  }

  if (language === 'ru') {
    return `Заполнено ${filled} из ${total} обязательных полей`
  }

  return `${filled} of ${total} essential fields filled`
}

export function getBrandIntakeLanguageLabel(language: BrandIntakeLanguage) {
  return BRAND_INTAKE_COPY.en.page.languageOptions[language]
}
