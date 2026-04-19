'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

type SaveBrandIntakeResult = {
  success: boolean
  error?: string
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

  if (!brandName || !contactName || !email) {
    return { success: false, error: 'Brand name, contact name, and email are required.' }
  }

  const phone = readText(formData, 'phone')
  const website = readText(formData, 'website')

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

  await prisma.brandIntake.create({
    data: {
      brandName,
      contactName,
      email,
      phone: phone || null,
      website: website || null,
      answers,
    },
  })

  revalidatePath('/admin/brand-intake')

  return { success: true }
}
