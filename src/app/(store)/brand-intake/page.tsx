import type { Metadata } from 'next'
import { BrandIntakePageClient } from './BrandIntakePageClient'

export const metadata: Metadata = {
  title: 'Brand Intake | Lili',
  description:
    'Fill out the brand intake form without signing in. The page is available in Uzbek, Russian, and English, and your answers are saved to the dashboard.',
}

export default function BrandIntakePage() {
  return <BrandIntakePageClient />
}
