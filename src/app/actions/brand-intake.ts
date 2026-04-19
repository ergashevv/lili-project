'use server'

import { createBrandIntakeEntry } from '@/lib/brand-intake-store'
import { normalizeWebsiteInput, validateBrandIntakeField } from '@/lib/brand-intake-validation'
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
  const brandName = readText(formData, 'brandName')
  const contactName = readText(formData, 'contactName')
  const email = readText(formData, 'email')
  const websiteInput = readText(formData, 'website')

  const requiredErrors = [
    validateBrandIntakeField('brandName', brandName),
    validateBrandIntakeField('contactName', contactName),
    validateBrandIntakeField('email', email),
    validateBrandIntakeField('website', websiteInput),
    validateBrandIntakeField('primaryColor', readText(formData, 'primaryColor')),
    validateBrandIntakeField('secondaryColor', readText(formData, 'secondaryColor')),
    validateBrandIntakeField('accentColor', readText(formData, 'accentColor')),
  ].filter(Boolean)

  if (requiredErrors.length > 0) {
    return { success: false, error: 'Please fix the highlighted fields and try again.' }
  }

  const phone = readText(formData, 'phone')
  const website = normalizeWebsiteInput(websiteInput)

  const answers = {
    companyName: readText(formData, 'companyName'),
    country: readText(formData, 'country'),
    city: readText(formData, 'city'),
    launchDate: readText(formData, 'launchDate'),
    industry: readText(formData, 'industry'),
    tagline: readText(formData, 'tagline'),
    mission: readText(formData, 'mission'),
    vision: readText(formData, 'vision'),
    values: readText(formData, 'values'),
    brandPersonality: readText(formData, 'brandPersonality'),
    preferredTone: readText(formData, 'preferredTone'),
    primaryAudience: readText(formData, 'primaryAudience'),
    customerGoals: readText(formData, 'customerGoals'),
    customerPainPoints: readText(formData, 'customerPainPoints'),
    primaryColor: readText(formData, 'primaryColor'),
    secondaryColor: readText(formData, 'secondaryColor'),
    accentColor: readText(formData, 'accentColor'),
    typography: readText(formData, 'typography'),
    photographyStyle: readText(formData, 'photographyStyle'),
    referenceWebsites: readText(formData, 'referenceWebsites'),
    requiredPages: readText(formData, 'requiredPages'),
    heroTitle: readText(formData, 'heroTitle'),
    heroSubtitle: readText(formData, 'heroSubtitle'),
    keyFeatures: readText(formData, 'keyFeatures'),
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

  safeRevalidatePath('/admin/brand-intake')
  safeRevalidatePath('/admin')

  return { success: true }
}
