import {
  BRAND_INTAKE_DEFAULTS,
  BRAND_INTAKE_FIELD_NAMES,
  type BrandIntakeFieldName,
  type BrandIntakeLanguage,
} from './brand-intake-types'

const VALIDATION_MESSAGES: Record<
  BrandIntakeLanguage,
  {
    brandNameRequired: string
    contactNameRequired: string
    emailRequired: string
    emailInvalid: string
    phoneInvalid: string
    websiteRequired: string
    websiteInvalid: string
    requiredPagesRequired: string
    colorInvalid: string
    fixHighlightedFields: string
  }
> = {
  uz: {
    brandNameRequired: 'Brand nomi majburiy.',
    contactNameRequired: 'Aloqa qilinadigan shaxs majburiy.',
    emailRequired: 'Email manzil majburiy.',
    emailInvalid: 'name@example.com ko‘rinishida kiriting.',
    phoneInvalid: 'Telefon raqamini to‘g‘ri kiriting.',
    websiteRequired: 'Website domain majburiy.',
    websiteInvalid: 'lili.uz yoki https://lili.uz ko‘rinishida kiriting.',
    requiredPagesRequired: 'Saytga kerak bo‘lgan sahifalarni kiriting.',
    colorInvalid: 'Rangni palitradan tanlang.',
    fixHighlightedFields: 'Belgilangan maydonlarni to‘g‘rilab qayta urinib ko‘ring.',
  },
  ru: {
    brandNameRequired: 'Название бренда обязательно.',
    contactNameRequired: 'Контактное лицо обязательно.',
    emailRequired: 'Email обязателен.',
    emailInvalid: 'Введите адрес в формате name@example.com.',
    phoneInvalid: 'Введите корректный номер телефона.',
    websiteRequired: 'Website / domain обязателен.',
    websiteInvalid: 'Введите в формате lili.uz или https://lili.uz.',
    requiredPagesRequired: 'Укажите нужные страницы сайта.',
    colorInvalid: 'Выберите цвет из палитры.',
    fixHighlightedFields: 'Исправьте выделенные поля и попробуйте еще раз.',
  },
  en: {
    brandNameRequired: 'Brand name is required.',
    contactNameRequired: 'Contact person is required.',
    emailRequired: 'Email address is required.',
    emailInvalid: 'Enter a valid email like name@example.com.',
    phoneInvalid: 'Enter a valid phone number.',
    websiteRequired: 'Website domain is required.',
    websiteInvalid: 'Use a domain like lili.uz or a full URL like https://lili.uz.',
    requiredPagesRequired: 'Add the pages you want on the site.',
    colorInvalid: 'Choose a color from the picker.',
    fixHighlightedFields: 'Please fix the highlighted fields and try again.',
  },
}

function getMessages(language: BrandIntakeLanguage) {
  return VALIDATION_MESSAGES[language]
}

export function createBrandIntakeDraft() {
  return BRAND_INTAKE_FIELD_NAMES.reduce<Record<string, string>>((draft, name) => {
    draft[name] = Object.hasOwn(BRAND_INTAKE_DEFAULTS, name)
      ? BRAND_INTAKE_DEFAULTS[name as keyof typeof BRAND_INTAKE_DEFAULTS]
      : ''
    return draft
  }, {})
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[+\d][\d\s()-]{6,}$/
const COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/

function isNonEmpty(value: string) {
  return value.trim().length > 0
}

function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(value.trim())
}

function isValidWebsite(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return false

  try {
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
    new URL(withProtocol)
    return true
  } catch {
    return false
  }
}

function isValidPhone(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return true

  return PHONE_PATTERN.test(trimmed)
}

function isValidColor(value: string) {
  return COLOR_PATTERN.test(value.trim())
}

export function validateBrandIntakeField(
  name: BrandIntakeFieldName | string,
  value: string,
  language: BrandIntakeLanguage = 'en',
) {
  const trimmed = value.trim()
  const messages = getMessages(language)

  if (name === 'brandName') {
    if (!isNonEmpty(trimmed)) return messages.brandNameRequired
    return ''
  }

  if (name === 'contactName') {
    if (!isNonEmpty(trimmed)) return messages.contactNameRequired
    return ''
  }

  if (name === 'email') {
    if (!isNonEmpty(trimmed)) return messages.emailRequired
    if (!isValidEmail(trimmed)) return messages.emailInvalid
    return ''
  }

  if (name === 'phone') {
    if (!isValidPhone(trimmed)) return messages.phoneInvalid
    return ''
  }

  if (name === 'website') {
    if (!isNonEmpty(trimmed)) return messages.websiteRequired
    if (!isValidWebsite(trimmed)) {
      return messages.websiteInvalid
    }
    return ''
  }

  if (name === 'requiredPages') {
    if (!isNonEmpty(trimmed)) return messages.requiredPagesRequired
    return ''
  }

  if (name === 'primaryColor' || name === 'secondaryColor' || name === 'accentColor') {
    if (!isValidColor(trimmed)) return messages.colorInvalid
    return ''
  }

  return ''
}

export function validateBrandIntakeForm(values: Record<string, string>, language: BrandIntakeLanguage = 'en') {
  const errors: Record<string, string> = {}

  BRAND_INTAKE_FIELD_NAMES.forEach((name) => {
    const error = validateBrandIntakeField(name, values[name] || '', language)
    if (error) errors[name] = error
  })

  return errors
}

export function normalizeWebsiteInput(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return ''
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

export function getBrandIntakeFixHighlightedFieldsMessage(language: BrandIntakeLanguage) {
  return getMessages(language).fixHighlightedFields
}
