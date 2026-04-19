'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { saveBrandIntake } from '@/app/actions/brand-intake'
import styles from './BrandIntakePage.module.css'

type Field = {
  name: string
  label: string
  placeholder?: string
  required?: boolean
  type?: 'text' | 'email' | 'url' | 'date'
  kind?: 'input' | 'textarea'
  rows?: number
}

const sections: Array<{ title: string; description: string; fields: Field[] }> = [
  {
    title: 'Brand Basics',
    description: 'Who is this brand, and who should we contact?',
    fields: [
      { name: 'brandName', label: 'Brand name', required: true, placeholder: 'Lili' },
      { name: 'companyName', label: 'Company / legal name', placeholder: 'Optional' },
      { name: 'contactName', label: 'Contact person', required: true, placeholder: 'Full name' },
      { name: 'email', label: 'Email address', type: 'email', required: true, placeholder: 'name@example.com' },
      { name: 'phone', label: 'Phone / WhatsApp', placeholder: '+998 90 000 00 00' },
      { name: 'website', label: 'Website / domain', type: 'url', placeholder: 'https://example.com' },
    ],
  },
  {
    title: 'Brand Direction',
    description: 'Explain the brand story and the feeling it should create.',
    fields: [
      { name: 'industry', label: 'Industry / niche', required: true, placeholder: 'Fashion, beauty, lifestyle...' },
      { name: 'tagline', label: 'Tagline / slogan', placeholder: 'Short brand line' },
      { name: 'mission', label: 'Mission', placeholder: 'Why does this brand exist?', kind: 'textarea', rows: 4 },
      { name: 'vision', label: 'Vision', placeholder: 'What is the long-term goal?', kind: 'textarea', rows: 4 },
      { name: 'values', label: 'Core values', placeholder: 'Luxury, trust, quality, speed...', kind: 'textarea', rows: 4 },
      { name: 'brandPersonality', label: 'Brand personality', placeholder: 'Minimal, bold, elegant, warm...', kind: 'textarea', rows: 4 },
      { name: 'preferredTone', label: 'Tone of voice', placeholder: 'Formal, friendly, premium, playful...', kind: 'textarea', rows: 4 },
    ],
  },
  {
    title: 'Audience',
    description: 'Tell us who the website is for.',
    fields: [
      { name: 'primaryAudience', label: 'Primary audience', required: true, placeholder: 'Who are the customers?', kind: 'textarea', rows: 4 },
      { name: 'customerGoals', label: 'Customer goals', placeholder: 'What are they trying to achieve?', kind: 'textarea', rows: 4 },
      { name: 'customerPainPoints', label: 'Customer pain points', placeholder: 'What problems should the site solve?', kind: 'textarea', rows: 4 },
      { name: 'country', label: 'Country / region', placeholder: 'Uzbekistan, Tashkent...' },
      { name: 'city', label: 'City', placeholder: 'Tashkent' },
      { name: 'launchDate', label: 'Target launch date', type: 'date' },
    ],
  },
  {
    title: 'Visual Identity',
    description: 'Share the look and feel you want the site to communicate.',
    fields: [
      { name: 'primaryColor', label: 'Primary color', placeholder: '#800020' },
      { name: 'secondaryColor', label: 'Secondary color', placeholder: '#d4af37' },
      { name: 'accentColor', label: 'Accent color', placeholder: '#ffffff' },
      { name: 'typography', label: 'Typography preferences', placeholder: 'Serif, modern, editorial...', kind: 'textarea', rows: 4 },
      { name: 'photographyStyle', label: 'Photography style', placeholder: 'Studio, lifestyle, luxury, minimal...', kind: 'textarea', rows: 4 },
      { name: 'referenceWebsites', label: 'Reference websites', placeholder: 'Paste links to brands you like', kind: 'textarea', rows: 4 },
    ],
  },
  {
    title: 'Website Content',
    description: 'What should the homepage and main pages include?',
    fields: [
      { name: 'requiredPages', label: 'Required pages', placeholder: 'About, Products, FAQ, Contact...', kind: 'textarea', rows: 4 },
      { name: 'heroTitle', label: 'Homepage hero title', placeholder: 'Main hero heading', kind: 'textarea', rows: 4 },
      { name: 'heroSubtitle', label: 'Homepage hero subtitle', placeholder: 'Short supporting text', kind: 'textarea', rows: 4 },
      { name: 'keyFeatures', label: 'Key features / trust points', placeholder: 'Delivery, quality, support...', kind: 'textarea', rows: 4 },
      { name: 'socialLinks', label: 'Social links', placeholder: 'Instagram, Telegram, TikTok...', kind: 'textarea', rows: 4 },
      { name: 'notes', label: 'Additional notes', placeholder: 'Anything else we should know?', kind: 'textarea', rows: 4 },
    ],
  },
]

export function BrandIntakeForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = React.useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')
    setMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const result = await saveBrandIntake(formData)
      if (!result.success) {
        setStatus('error')
        setMessage(result.error || 'Something went wrong.')
        return
      }

      form.reset()
      router.refresh()
      setStatus('success')
      setMessage('Saved successfully. The brand intake has been stored in the database.')
    } catch {
      setStatus('error')
      setMessage('Unexpected error while saving the form.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {sections.map((section) => (
        <section key={section.title} className={styles.card}>
          <div className={styles.sectionHeader}>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </div>

          <div className={styles.fieldGrid}>
            {section.fields.map((field) => (
              <label key={field.name} className={styles.field}>
                <span>
                  {field.label}
                  {field.required ? ' *' : ''}
                </span>
                {field.kind === 'textarea' ? (
                  <textarea
                    name={field.name}
                    rows={field.rows || 4}
                    required={field.required}
                    placeholder={field.placeholder}
                    className={styles.textarea}
                  />
                ) : field.type === 'date' ? (
                  <input
                    name={field.name}
                    type="date"
                    required={field.required}
                    className={styles.input}
                  />
                ) : (
                  <input
                    name={field.name}
                    type={field.type || 'text'}
                    required={field.required}
                    placeholder={field.placeholder}
                    className={styles.input}
                  />
                )}
              </label>
            ))}
          </div>
        </section>
      ))}

      <div className={styles.alertArea}>
        {status === 'success' && <div className={styles.success}>{message}</div>}
        {status === 'error' && <div className={styles.error}>{message}</div>}
      </div>

      <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Brand Intake'}
      </button>
    </form>
  )
}
