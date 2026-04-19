export const BRAND_INTAKE_DEFAULTS = {
  primaryColor: '#800020',
  secondaryColor: '#d4af37',
  accentColor: '#f8f1ea',
}

export const BRAND_INTAKE_FIELD_NAMES = [
  'brandName',
  'contactName',
  'email',
  'phone',
  'website',
  'requiredPages',
  'primaryColor',
  'secondaryColor',
  'accentColor',
  'typography',
  'preferredTone',
  'socialLinks',
  'notes',
] as const

export function createBrandIntakeDraft() {
  return BRAND_INTAKE_FIELD_NAMES.reduce<Record<string, string>>(
    (draft, name) => {
      draft[name] = Object.hasOwn(BRAND_INTAKE_DEFAULTS, name)
        ? BRAND_INTAKE_DEFAULTS[name as keyof typeof BRAND_INTAKE_DEFAULTS]
        : ''
      return draft
    },
    {},
  )
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

export function validateBrandIntakeField(name: string, value: string) {
  const trimmed = value.trim()

  if (name === 'brandName') {
    if (!isNonEmpty(trimmed)) return 'Brand name is required.'
    return ''
  }

  if (name === 'contactName') {
    if (!isNonEmpty(trimmed)) return 'Contact person is required.'
    return ''
  }

  if (name === 'email') {
    if (!isNonEmpty(trimmed)) return 'Email address is required.'
    if (!isValidEmail(trimmed)) return 'Enter a valid email like name@example.com.'
    return ''
  }

  if (name === 'phone') {
    if (!isValidPhone(trimmed)) return 'Enter a valid phone number.'
    return ''
  }

  if (name === 'website') {
    if (!isNonEmpty(trimmed)) return 'Website domain is required.'
    if (!isValidWebsite(trimmed)) {
      return 'Use a domain like lili.uz or a full URL like https://lili.uz.'
    }
    return ''
  }

  if (name === 'requiredPages') {
    if (!isNonEmpty(trimmed)) return 'Add the pages you want on the site.'
    return ''
  }

  if (name === 'primaryColor' || name === 'secondaryColor' || name === 'accentColor') {
    if (!isValidColor(trimmed)) return 'Choose a color from the picker.'
    return ''
  }

  return ''
}

export function validateBrandIntakeForm(values: Record<string, string>) {
  const errors: Record<string, string> = {}

  BRAND_INTAKE_FIELD_NAMES.forEach((name) => {
    const error = validateBrandIntakeField(name, values[name] || '')
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
