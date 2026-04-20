export type BrandIntakeLanguage = 'uz' | 'ru' | 'en'

export type BrandIntakeFieldName =
  | 'brandName'
  | 'contactName'
  | 'email'
  | 'phone'
  | 'website'
  | 'requiredPages'
  | 'primaryColor'
  | 'secondaryColor'
  | 'accentColor'
  | 'typography'
  | 'preferredTone'
  | 'socialLinks'
  | 'notes'

export const BRAND_INTAKE_FIELD_NAMES: BrandIntakeFieldName[] = [
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
]

export const BRAND_INTAKE_DEFAULTS = {
  primaryColor: '#800020',
  secondaryColor: '#d4af37',
  accentColor: '#f8f1ea',
} as const

export function normalizeBrandIntakeLanguage(value: string | null | undefined): BrandIntakeLanguage {
  if (value === 'uz' || value === 'ru' || value === 'en') {
    return value
  }

  return 'en'
}
