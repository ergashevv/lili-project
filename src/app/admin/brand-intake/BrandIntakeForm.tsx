'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { saveBrandIntake } from '@/app/actions/brand-intake'
import styles from './BrandIntakePage.module.css'

type Field = {
  name: string
  label: string
  siteArea: string
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
      {
        name: 'brandName',
        label: 'Brand name',
        siteArea: 'Header logo, browser title, and footer identity',
        required: true,
        placeholder: 'Lili',
      },
      {
        name: 'companyName',
        label: 'Company / legal name',
        siteArea: 'Footer legal text, invoices, and company records',
        placeholder: 'Optional',
      },
      {
        name: 'contactName',
        label: 'Contact person',
        siteArea: 'Admin contact and project ownership',
        required: true,
        placeholder: 'Full name',
      },
      {
        name: 'email',
        label: 'Email address',
        siteArea: 'Contact section, reply inbox, and admin notifications',
        type: 'email',
        required: true,
        placeholder: 'name@example.com',
      },
      {
        name: 'phone',
        label: 'Phone / WhatsApp',
        siteArea: 'Header contact strip, footer, and quick support CTA',
        placeholder: '+998 90 000 00 00',
      },
      {
        name: 'website',
        label: 'Website / domain',
        siteArea: 'Footer, SEO metadata, and trust signals',
        type: 'url',
        placeholder: 'https://example.com',
      },
    ],
  },
  {
    title: 'Brand Direction',
    description: 'Explain the brand story and the feeling it should create.',
    fields: [
      {
        name: 'industry',
        label: 'Industry / niche',
        siteArea: 'Homepage positioning, SEO copy, and section headlines',
        required: true,
        placeholder: 'Fashion, beauty, lifestyle...',
      },
      {
        name: 'tagline',
        label: 'Tagline / slogan',
        siteArea: 'Hero subheading, social banners, and brand lockups',
        placeholder: 'Short brand line',
      },
      {
        name: 'mission',
        label: 'Mission',
        siteArea: 'About page mission block and brand story section',
        placeholder: 'Why does this brand exist?',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'vision',
        label: 'Vision',
        siteArea: 'About page future vision block and long-term strategy',
        placeholder: 'What is the long-term goal?',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'values',
        label: 'Core values',
        siteArea: 'Trust section, brand story, and tone guide',
        placeholder: 'Luxury, trust, quality, speed...',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'brandPersonality',
        label: 'Brand personality',
        siteArea: 'Site-wide copy style and visual mood',
        placeholder: 'Minimal, bold, elegant, warm...',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'preferredTone',
        label: 'Tone of voice',
        siteArea: 'Buttons, banners, descriptions, and customer messages',
        placeholder: 'Formal, friendly, premium, playful...',
        kind: 'textarea',
        rows: 4,
      },
    ],
  },
  {
    title: 'Audience',
    description: 'Tell us who the website is for.',
    fields: [
      {
        name: 'primaryAudience',
        label: 'Primary audience',
        siteArea: 'Hero messaging, page targeting, and conversion copy',
        required: true,
        placeholder: 'Who are the customers?',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'customerGoals',
        label: 'Customer goals',
        siteArea: 'Benefit sections, call-to-action copy, and offers',
        placeholder: 'What are they trying to achieve?',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'customerPainPoints',
        label: 'Customer pain points',
        siteArea: 'FAQ, objection handling, and persuasive messaging',
        placeholder: 'What problems should the site solve?',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'country',
        label: 'Country / region',
        siteArea: 'Footer, contact area, and launch planning',
        placeholder: 'Uzbekistan, Tashkent...',
      },
      {
        name: 'city',
        label: 'City',
        siteArea: 'Contact details and local trust signals',
        placeholder: 'Tashkent',
      },
      {
        name: 'launchDate',
        label: 'Target launch date',
        siteArea: 'Project timeline and rollout planning',
        type: 'date',
      },
    ],
  },
  {
    title: 'Visual Identity',
    description: 'Share the look and feel you want the site to communicate.',
    fields: [
      {
        name: 'primaryColor',
        label: 'Primary color',
        siteArea: 'Buttons, links, highlights, and brand accents',
        placeholder: '#800020',
      },
      {
        name: 'secondaryColor',
        label: 'Secondary color',
        siteArea: 'Secondary accents, cards, and supporting blocks',
        placeholder: '#d4af37',
      },
      {
        name: 'accentColor',
        label: 'Accent color',
        siteArea: 'Badges, emphasis points, and small highlights',
        placeholder: '#ffffff',
      },
      {
        name: 'typography',
        label: 'Typography preferences',
        siteArea: 'Headings, body text, and editorial hierarchy',
        placeholder: 'Serif, modern, editorial...',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'photographyStyle',
        label: 'Photography style',
        siteArea: 'Hero banners, product images, and campaign visuals',
        placeholder: 'Studio, lifestyle, luxury, minimal...',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'referenceWebsites',
        label: 'Reference websites',
        siteArea: 'Design reference and layout inspiration',
        placeholder: 'Paste links to brands you like',
        kind: 'textarea',
        rows: 4,
      },
    ],
  },
  {
    title: 'Website Content',
    description: 'What should the homepage and main pages include?',
    fields: [
      {
        name: 'requiredPages',
        label: 'Required pages',
        siteArea: 'Navigation menu, sitemap, and footer links',
        placeholder: 'About, Products, FAQ, Contact...',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'heroTitle',
        label: 'Homepage hero title',
        siteArea: 'Homepage hero heading',
        placeholder: 'Main hero heading',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'heroSubtitle',
        label: 'Homepage hero subtitle',
        siteArea: 'Homepage hero subheading and intro paragraph',
        placeholder: 'Short supporting text',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'keyFeatures',
        label: 'Key features / trust points',
        siteArea: 'Trust section, feature cards, and conversion blocks',
        placeholder: 'Delivery, quality, support...',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'socialLinks',
        label: 'Social links',
        siteArea: 'Footer, contact bar, and social proof area',
        placeholder: 'Instagram, Telegram, TikTok...',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'notes',
        label: 'Additional notes',
        siteArea: 'Internal notes for the build team',
        placeholder: 'Anything else we should know?',
        kind: 'textarea',
        rows: 4,
      },
    ],
  },
]

export function BrandIntakeForm(props: BrandIntakeFormViewProps) {
  return <BrandIntakeFormView {...props} />
}

interface BrandIntakeFormViewProps {
  submitLabel?: string
  successMessage?: string
  errorMessage?: string
  showPreview?: boolean
}

function BrandIntakeFormView({
  submitLabel = 'Save Brand Intake',
  successMessage = 'Saved successfully. The brand intake has been stored in the database.',
  errorMessage = 'Unexpected error while saving the form.',
  showPreview = false,
}: BrandIntakeFormViewProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = React.useState('')
  const [draft, setDraft] = React.useState<Record<string, string>>({})

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget
    setDraft((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')
    setMessage('')

    const formData = new FormData(event.currentTarget)

    try {
      const result = await saveBrandIntake(formData)
      if (!result.success) {
        setStatus('error')
        setMessage(result.error || errorMessage)
        return
      }

      setDraft({})
      router.refresh()
      setStatus('success')
      setMessage(successMessage)
    } catch {
      setStatus('error')
      setMessage(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const content = (
    <form className={styles.form} onSubmit={handleSubmit}>
      {sections.map((section) => (
        <section key={section.title} className={styles.card}>
          <div className={styles.sectionHeader}>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </div>

          <div className={styles.fieldGrid}>
            {section.fields.map((field) => {
              const value = draft[field.name] ?? ''

              return (
                <label key={field.name} className={styles.field}>
                  <div className={styles.fieldMeta}>
                    <span>
                      {field.label}
                      {field.required ? ' *' : ''}
                    </span>
                    <small>{field.siteArea}</small>
                  </div>
                  {field.kind === 'textarea' ? (
                    <textarea
                      name={field.name}
                      rows={field.rows || 4}
                      required={field.required}
                      placeholder={field.placeholder}
                      className={styles.textarea}
                      value={value}
                      onChange={handleFieldChange}
                    />
                  ) : field.type === 'date' ? (
                    <input
                      name={field.name}
                      type="date"
                      required={field.required}
                      className={styles.input}
                      value={value}
                      onChange={handleFieldChange}
                    />
                  ) : (
                    <input
                      name={field.name}
                      type={field.type || 'text'}
                      required={field.required}
                      placeholder={field.placeholder}
                      className={styles.input}
                      value={value}
                      onChange={handleFieldChange}
                    />
                  )}
                </label>
              )
            })}
          </div>
        </section>
      ))}

      <div className={styles.alertArea}>
        {status === 'success' && <div className={styles.success}>{message}</div>}
        {status === 'error' && <div className={styles.error}>{message}</div>}
      </div>

      <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  )

  if (!showPreview) {
    return content
  }

  const toList = (value: string) =>
    value
      .split(/\r?\n|,|;/)
      .map((item) => item.trim())
      .filter(Boolean)

  const heroTitle = draft.heroTitle?.trim() || 'Your hero headline will appear here'
  const heroSubtitle =
    draft.heroSubtitle?.trim() ||
    'Add a concise supporting line that explains what the brand offers.'
  const brandName = draft.brandName?.trim() || 'Brand name'
  const tagline = draft.tagline?.trim() || 'Short brand slogan'
  const industry = draft.industry?.trim() || 'Industry / niche'
  const audience = draft.primaryAudience?.trim() || 'Primary audience'
  const pages = toList(draft.requiredPages || 'Home, About, Shop, FAQ, Contact')
  const features = toList(draft.keyFeatures || 'Quality, delivery, support')
  const socialLinks = toList(draft.socialLinks || 'Instagram, Telegram, TikTok')
  const references = toList(draft.referenceWebsites || 'Reference websites will appear here')
  const launchDate = draft.launchDate?.trim() || 'Not set yet'
  const primaryColor = draft.primaryColor?.trim() || '#800020'
  const secondaryColor = draft.secondaryColor?.trim() || '#d4af37'
  const accentColor = draft.accentColor?.trim() || '#f8f1ea'
  const typography = draft.typography?.trim() || 'Typography preferences'
  const brandPersonality = draft.brandPersonality?.trim() || 'Brand personality'
  const preferredTone = draft.preferredTone?.trim() || 'Tone of voice'

  return (
    <div className={styles.intakeLayout}>
      {content}

      <aside className={styles.previewPanel} aria-live="polite">
        <div className={styles.previewCard}>
          <div className={styles.previewHeader}>
            <span className={styles.previewEyebrow}>Live preview</span>
            <h3>Where your answers will show up on the site</h3>
            <p>
              This panel updates as you type so the client can see which part of
              the website each field controls.
            </p>
          </div>

          <div className={styles.previewMockSite}>
            <div className={styles.previewTopBar}>
              <div>
                <div className={styles.previewBrand}>{brandName}</div>
                <div className={styles.previewTagline}>{tagline}</div>
              </div>
              <div className={styles.previewColorRow}>
                <span style={{ backgroundColor: primaryColor }} />
                <span style={{ backgroundColor: secondaryColor }} />
                <span style={{ backgroundColor: accentColor }} />
              </div>
            </div>

            <div className={styles.previewHeroBlock}>
              <span className={styles.previewLabel}>{industry}</span>
              <h4>{heroTitle}</h4>
              <p>{heroSubtitle}</p>
              <div className={styles.previewPills}>
                <span>{audience}</span>
                <span>{preferredTone}</span>
              </div>
            </div>

            <div className={styles.previewSectionBlock}>
              <h5>Navigation / sitemap</h5>
              <div className={styles.previewChipList}>
                {pages.map((page) => (
                  <span key={page}>{page}</span>
                ))}
              </div>
            </div>

            <div className={styles.previewSectionBlock}>
              <h5>Trust / feature section</h5>
              <div className={styles.previewChipList}>
                {features.map((feature) => (
                  <span key={feature}>{feature}</span>
                ))}
              </div>
            </div>

            <div className={styles.previewSectionBlock}>
              <h5>Visual direction</h5>
              <p>{typography}</p>
              <p>{brandPersonality}</p>
            </div>

            <div className={styles.previewFooter}>
              <div>
                <strong>Launch date</strong>
                <span>{launchDate}</span>
              </div>
              <div>
                <strong>Social links</strong>
                <span>{socialLinks.join(' · ')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.mapCard}>
          <h3>Field to site mapping</h3>
          <p>Each field below shows the exact site area it affects.</p>
          <div className={styles.mapList}>
            {sections.flatMap((section) =>
              section.fields.map((field) => (
                <div key={field.name} className={styles.mapItem}>
                  <strong>{field.label}</strong>
                  <span>{field.siteArea}</span>
                </div>
              )),
            )}
          </div>

          <div className={styles.referenceBlock}>
            <strong>Reference websites</strong>
            <span>{references.join(' · ')}</span>
          </div>
        </div>
      </aside>
    </div>
  )
}
