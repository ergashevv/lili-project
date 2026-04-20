'use server'

import { createBrandIntakeEntry } from '@/lib/brand-intake-store'
import {
  getBrandIntakeFixHighlightedFieldsMessage,
  normalizeWebsiteInput,
  validateBrandIntakeField,
} from '@/lib/brand-intake-validation'
import { normalizeBrandIntakeLanguage } from '@/lib/brand-intake-types'
import { revalidatePath } from 'next/cache'

type SaveBrandIntakeResult = {
  success: boolean
  error?: string
}

function safeRevalidatePath(path: string) {
  try {
    revalidatePath(path)
  } catch {
    // Cache revalidation is best-effort here so the action can also be tested
    // in standalone scripts outside the Next.js request context.
  }
}

function readText(formData: FormData, key: string) {
  const value = formData.get(key)
  if (typeof value !== 'string') return ''
  return value.trim()
}

export async function saveBrandIntake(formData: FormData): Promise<SaveBrandIntakeResult> {
  const language = normalizeBrandIntakeLanguage(readText(formData, 'language'))
  const brandName = readText(formData, 'brandName')
  const contactName = readText(formData, 'contactName')
  const email = readText(formData, 'email')
  const websiteInput = readText(formData, 'website')

  const requiredErrors = [
    validateBrandIntakeField('brandName', brandName, language),
    validateBrandIntakeField('contactName', contactName, language),
    validateBrandIntakeField('email', email, language),
    validateBrandIntakeField('website', websiteInput, language),
    validateBrandIntakeField('requiredPages', readText(formData, 'requiredPages'), language),
    validateBrandIntakeField('primaryColor', readText(formData, 'primaryColor'), language),
    validateBrandIntakeField('secondaryColor', readText(formData, 'secondaryColor'), language),
    validateBrandIntakeField('accentColor', readText(formData, 'accentColor'), language),
  ].filter(Boolean)

  if (requiredErrors.length > 0) {
    return { success: false, error: getBrandIntakeFixHighlightedFieldsMessage(language) }
  }

  const phone = readText(formData, 'phone')
  const website = normalizeWebsiteInput(websiteInput)

  const answers = {
    primaryColor: readText(formData, 'primaryColor'),
    secondaryColor: readText(formData, 'secondaryColor'),
    accentColor: readText(formData, 'accentColor'),
    typography: readText(formData, 'typography'),
    requiredPages: readText(formData, 'requiredPages'),
    preferredTone: readText(formData, 'preferredTone'),
    socialLinks: readText(formData, 'socialLinks'),
    notes: readText(formData, 'notes'),
  }

  await createBrandIntakeEntry({
    brandName,
    contactName,
    email,
    phone: phone || null,
    website: website || null,
    answers,
  })

  safeRevalidatePath('/dashboard')
  safeRevalidatePath('/admin/brand-intake')
  safeRevalidatePath('/admin')

  return { success: true }
}
