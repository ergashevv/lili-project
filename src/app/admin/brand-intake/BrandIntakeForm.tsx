'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { saveBrandIntake } from '@/app/actions/brand-intake'
import {
  BRAND_INTAKE_DEFAULTS,
  createBrandIntakeDraft,
  validateBrandIntakeField,
  validateBrandIntakeForm,
} from '@/lib/brand-intake-validation'
import styles from './BrandIntakePage.module.css'

type FieldType = 'text' | 'email' | 'date' | 'color'

type Field = {
  name: string
  label: string
  description: string
  helper?: string
  placeholder?: string
  required?: boolean
  type?: FieldType
  kind?: 'input' | 'textarea'
  rows?: number
}

type Section = {
  id: string
  number: string
  title: string
  summary: string
  fields: Field[]
}

const sections: Section[] = [
  {
    id: 'brand-basics',
    number: '01',
    title: 'Brand basics',
    summary: 'Who the brand is and how we can reach the right person.',
    fields: [
      {
        name: 'brandName',
        label: 'Brand name',
        description: 'Header logo, browser title, and footer identity',
        required: true,
        placeholder: 'Lili',
        helper: 'Use the name customers should remember first.',
      },
      {
        name: 'companyName',
        label: 'Company / legal name',
        description: 'Footer legal text, invoices, and company records',
        placeholder: 'Optional',
      },
      {
        name: 'contactName',
        label: 'Contact person',
        description: 'Project ownership and admin follow-up',
        required: true,
        placeholder: 'Full name',
      },
      {
        name: 'email',
        label: 'Email address',
        description: 'Reply inbox, contact area, and admin notifications',
        type: 'email',
        required: true,
        placeholder: 'name@example.com',
        helper: 'Use a real email address. We will reply here.',
      },
      {
        name: 'phone',
        label: 'Phone / WhatsApp',
        description: 'Header contact strip, footer, and quick support',
        placeholder: '+998 90 000 00 00',
        helper: 'Optional, but useful for quick contact.',
      },
      {
        name: 'website',
        label: 'Website domain',
        description: 'Footer, SEO metadata, and trust signals',
        type: 'text',
        placeholder: 'lili.uz',
        helper: 'Just type the domain. No https:// is needed.',
      },
    ],
  },
  {
    id: 'brand-story',
    number: '02',
    title: 'Brand story',
    summary: 'What the brand stands for and how it should sound.',
    fields: [
      {
        name: 'industry',
        label: 'Industry / business type',
        description: 'Homepage positioning, SEO copy, and section headlines',
        required: true,
        placeholder: 'Fashion, beauty, lifestyle...',
      },
      {
        name: 'tagline',
        label: 'Short slogan',
        description: 'Hero subheading, social banners, and brand lockups',
        placeholder: 'A short brand line',
      },
      {
        name: 'mission',
        label: 'Brand story',
        description: 'About page, intro copy, and mission section',
        placeholder: 'Why does this brand exist?',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'vision',
        label: 'Brand vision',
        description: 'About page future vision and long-term direction',
        placeholder: 'What is the long-term goal?',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'values',
        label: 'Core values',
        description: 'Trust section, brand story, and tone guide',
        placeholder: 'Luxury, trust, quality, speed...',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'brandPersonality',
        label: 'Brand personality',
        description: 'Site-wide copy style and visual mood',
        placeholder: 'Minimal, bold, elegant, warm...',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'preferredTone',
        label: 'Writing style',
        description: 'Buttons, banners, descriptions, and customer messages',
        placeholder: 'Formal, friendly, premium, playful...',
        kind: 'textarea',
        rows: 4,
      },
    ],
  },
  {
    id: 'audience',
    number: '03',
    title: 'Audience',
    summary: 'Who the site is for and what they need from it.',
    fields: [
      {
        name: 'primaryAudience',
        label: 'Who the site is for',
        description: 'Hero messaging, page targeting, and conversion copy',
        required: true,
        placeholder: 'Who are the customers?',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'customerGoals',
        label: 'What they want',
        description: 'Benefit sections, call-to-action copy, and offers',
        placeholder: 'What are they trying to achieve?',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'customerPainPoints',
        label: 'What they struggle with',
        description: 'FAQ, objection handling, and persuasive messaging',
        placeholder: 'What problems should the site solve?',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'country',
        label: 'Country / region',
        description: 'Footer, contact area, and launch planning',
        placeholder: 'Uzbekistan, Tashkent...',
      },
      {
        name: 'city',
        label: 'City',
        description: 'Contact details and local trust signals',
        placeholder: 'Tashkent',
      },
      {
        name: 'launchDate',
        label: 'Launch date',
        description: 'Project timeline and rollout planning',
        type: 'date',
      },
    ],
  },
  {
    id: 'visual-identity',
    number: '04',
    title: 'Visual identity',
    summary: 'How the website should look, feel, and photograph.',
    fields: [
      {
        name: 'primaryColor',
        label: 'Main color',
        description: 'Buttons, links, highlights, and brand accents',
        type: 'color',
        helper: 'Pick the main brand color visually.',
      },
      {
        name: 'secondaryColor',
        label: 'Support color',
        description: 'Secondary accents, cards, and supporting blocks',
        type: 'color',
        helper: 'This color supports the main color in smaller areas.',
      },
      {
        name: 'accentColor',
        label: 'Accent color',
        description: 'Badges, emphasis points, and small highlights',
        type: 'color',
        helper: 'Use this for small details and emphasis only.',
      },
      {
        name: 'typography',
        label: 'Font direction',
        description: 'Headings, body text, and editorial hierarchy',
        placeholder: 'Serif, modern, editorial...',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'photographyStyle',
        label: 'Photography style',
        description: 'Hero banners, product images, and campaign visuals',
        placeholder: 'Studio, lifestyle, luxury, minimal...',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'referenceWebsites',
        label: 'Reference websites',
        description: 'Design reference and layout inspiration',
        placeholder: 'Paste links to brands you like',
        kind: 'textarea',
        rows: 4,
      },
    ],
  },
  {
    id: 'website-content',
    number: '05',
    title: 'Website content',
    summary: 'Which pages and homepage messages should be included.',
    fields: [
      {
        name: 'requiredPages',
        label: 'Pages to include',
        description: 'Navigation menu, sitemap, and footer links',
        required: true,
        placeholder: 'About, Products, FAQ, Contact...',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'heroTitle',
        label: 'Homepage headline',
        description: 'Homepage hero heading',
        required: true,
        placeholder: 'Main hero heading',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'heroSubtitle',
        label: 'Homepage intro text',
        description: 'Homepage hero subheading and intro paragraph',
        placeholder: 'Short supporting text',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'keyFeatures',
        label: 'Key selling points',
        description: 'Trust section, feature cards, and conversion blocks',
        placeholder: 'Delivery, quality, support...',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'socialLinks',
        label: 'Social links',
        description: 'Footer, contact bar, and social proof area',
        placeholder: 'Instagram, Telegram, TikTok...',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'notes',
        label: 'Extra notes',
        description: 'Internal notes for the build team',
        placeholder: 'Anything else we should know?',
        kind: 'textarea',
        rows: 4,
      },
    ],
  },
]

const requiredFieldNames = [
  'brandName',
  'contactName',
  'email',
  'industry',
  'primaryAudience',
  'heroTitle',
  'requiredPages',
] as const

const previewFallbackPages = ['Home', 'About', 'Shop', 'FAQ', 'Contact']
const previewFallbackSocial = ['Instagram', 'Telegram', 'TikTok']
const previewFallbackFeatures = ['Quality', 'Delivery', 'Support']

function splitList(value: string) {
  return value
    .split(/\r?\n|,|;/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function getDraftValue(draft: Record<string, string>, key: string, fallback = '') {
  return draft[key]?.trim() || fallback
}

function joinDescribedBy(...ids: Array<string | undefined>) {
  return ids.filter(Boolean).join(' ') || undefined
}

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
  const [submitAttempted, setSubmitAttempted] = React.useState(false)
  const [draft, setDraft] = React.useState<Record<string, string>>(() => createBrandIntakeDraft())
  const [touched, setTouched] = React.useState<Record<string, boolean>>({})
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget
    setDraft((current) => ({ ...current, [name]: value }))
    setTouched((current) => ({ ...current, [name]: true }))
    setErrors((current) => ({
      ...current,
      [name]: validateBrandIntakeField(name, value),
    }))
  }

  const handleFieldBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget
    setTouched((current) => ({ ...current, [name]: true }))
    setErrors((current) => ({
      ...current,
      [name]: validateBrandIntakeField(name, value),
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')
    setMessage('')

    const validationErrors = validateBrandIntakeForm(draft)
    setErrors(validationErrors)
    setTouched(
      sections.reduce<Record<string, boolean>>((accumulator, section) => {
        section.fields.forEach((field) => {
          accumulator[field.name] = true
        })
        return accumulator
      }, {}),
    )
    setSubmitAttempted(true)

    if (Object.keys(validationErrors).length > 0) {
      setStatus('error')
      setMessage('Please fix the highlighted fields before submitting.')
      setIsSubmitting(false)
      return
    }

    const formData = new FormData(event.currentTarget)

    try {
      const result = await saveBrandIntake(formData)
      if (!result.success) {
        setStatus('error')
        setMessage(result.error || errorMessage)
        return
      }

      setDraft(createBrandIntakeDraft())
      setTouched({})
      setErrors({})
      setSubmitAttempted(false)
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

  const requiredFilled = requiredFieldNames.filter((name) => getDraftValue(draft, name).length > 0).length
  const completionPercent = Math.round((requiredFilled / requiredFieldNames.length) * 100)

  const brandName = getDraftValue(draft, 'brandName', 'Your brand')
  const brandInitial = brandName.charAt(0).toUpperCase() || 'L'
  const domain = getDraftValue(draft, 'website', 'yourdomain.com')
  const contactName = getDraftValue(draft, 'contactName', 'Contact person')
  const companyName = getDraftValue(draft, 'companyName', 'Company / legal name')
  const email = getDraftValue(draft, 'email', 'name@example.com')
  const phone = getDraftValue(draft, 'phone', '+998 90 000 00 00')
  const city = getDraftValue(draft, 'city', 'Tashkent')
  const country = getDraftValue(draft, 'country', 'Uzbekistan')
  const launchDate = getDraftValue(draft, 'launchDate', 'Not set yet')
  const industry = getDraftValue(draft, 'industry', 'Fashion, beauty, lifestyle')
  const heroTitle = getDraftValue(draft, 'heroTitle', 'A clear headline for the homepage')
  const heroSubtitle = getDraftValue(draft, 'heroSubtitle', 'A short intro that explains the brand in plain words.')
  const typography = getDraftValue(draft, 'typography', 'Modern, readable, and elegant')
  const preferredTone = getDraftValue(draft, 'preferredTone', 'Warm and confident')
  const brandPersonality = getDraftValue(draft, 'brandPersonality', 'Minimal and premium')
  const photographyStyle = getDraftValue(draft, 'photographyStyle', 'Studio and lifestyle photography')
  const notes = getDraftValue(draft, 'notes', 'Any extra notes go here.')

  const pages = splitList(draft.requiredPages)
  const socialLinks = splitList(draft.socialLinks)
  const keyFeatures = splitList(draft.keyFeatures)
  const references = splitList(draft.referenceWebsites)
  const audience = getDraftValue(draft, 'primaryAudience', 'Who the site is for')
  const customerGoals = getDraftValue(draft, 'customerGoals', 'What they want')
  const customerPainPoints = getDraftValue(draft, 'customerPainPoints', 'What they struggle with')

  const previewPages = pages.length > 0 ? pages : previewFallbackPages
  const previewSocialLinks = socialLinks.length > 0 ? socialLinks : previewFallbackSocial
  const previewFeatures = keyFeatures.length > 0 ? keyFeatures : previewFallbackFeatures

  const renderField = (field: Field) => {
    const value =
      draft[field.name] ??
      (field.type === 'color'
        ? BRAND_INTAKE_DEFAULTS[field.name as keyof typeof BRAND_INTAKE_DEFAULTS] || '#ffffff'
        : '')
    const error = errors[field.name]
    const isInvalid = Boolean(error) && (touched[field.name] || submitAttempted)
    const helperId = `${field.name}-helper`
    const errorId = `${field.name}-error`
    const describedBy = joinDescribedBy(field.helper ? helperId : undefined, isInvalid ? errorId : undefined)

    return (
      <article
        key={field.name}
        className={`${styles.fieldCard} ${isInvalid ? styles.fieldCardInvalid : ''}`}
      >
        <div className={styles.fieldCopy}>
          <label htmlFor={field.name} className={styles.fieldLabel}>
            {field.label}
            {field.required ? ' *' : ''}
          </label>
          <p className={styles.fieldDescription}>Appears in: {field.description}</p>
          {field.helper && (
            <p id={helperId} className={styles.fieldHelp}>
              {field.helper}
            </p>
          )}
        </div>

        {field.kind === 'textarea' ? (
          <textarea
            id={field.name}
            name={field.name}
            rows={field.rows || 4}
            required={field.required}
            placeholder={field.placeholder}
            className={styles.textarea}
            value={value}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            aria-invalid={isInvalid}
            aria-describedby={describedBy}
          />
        ) : field.type === 'color' ? (
          <div className={styles.colorPickerRow}>
            <input
              id={field.name}
              name={field.name}
              type="color"
              required={field.required}
              className={styles.colorPickerInput}
              value={value}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
              aria-invalid={isInvalid}
              aria-describedby={describedBy}
              aria-label={field.label}
            />
            <div className={styles.colorPickerCopy}>
              <strong>{field.label}</strong>
              <span>Pick the shade visually. No hex code needed.</span>
              <div className={styles.colorSwatchLine}>
                <span className={styles.colorSwatch} style={{ backgroundColor: value }} />
                <small>This color will shape buttons, highlights, and accents.</small>
              </div>
            </div>
          </div>
        ) : field.type === 'date' ? (
          <input
            id={field.name}
            name={field.name}
            type="date"
            required={field.required}
            className={styles.input}
            value={value}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            aria-invalid={isInvalid}
            aria-describedby={describedBy}
          />
        ) : (
          <input
            id={field.name}
            name={field.name}
            type={field.type || 'text'}
            autoComplete={field.name === 'email' ? 'email' : field.name === 'phone' ? 'tel' : 'off'}
            required={field.required}
            placeholder={field.placeholder}
            className={styles.input}
            value={value}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            aria-invalid={isInvalid}
            aria-describedby={describedBy}
          />
        )}

        {isInvalid && (
          <p className={styles.fieldError} id={errorId}>
            {error}
          </p>
        )}
      </article>
    )
  }

  const formContent = (
    <div className={styles.editorColumn}>
      <div className={styles.progressStrip} aria-label="Form progress">
        <div className={styles.progressCard}>
          <strong>{completionPercent}%</strong>
          <span>Required fields filled</span>
        </div>
        <div className={styles.progressCard}>
          <strong>{sections.length}</strong>
          <span>Guided sections</span>
        </div>
        <div className={styles.progressCard}>
          <strong>Live</strong>
          <span>Preview updates while you type</span>
        </div>
      </div>

      <nav className={styles.sectionNav} aria-label="Brand intake sections">
        {sections.map((section) => (
          <a key={section.id} href={`#${section.id}`} className={styles.sectionNavItem}>
            <span>{section.number}</span>
            <strong>{section.title}</strong>
            <em>{section.summary}</em>
          </a>
        ))}
      </nav>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {sections.map((section) => (
          <section key={section.id} id={section.id} className={styles.sectionPanel}>
            <div className={styles.sectionPanelHeader}>
              <div className={styles.sectionBadge}>{section.number}</div>
              <div className={styles.sectionHeaderCopy}>
                <h2>{section.title}</h2>
                <p>{section.summary}</p>
              </div>
            </div>

            <div className={styles.fieldStack}>{section.fields.map(renderField)}</div>
          </section>
        ))}

        <div className={styles.submitBar}>
          <div className={styles.submitCopy}>
            <span>Ready to save</span>
            <strong>
              {requiredFilled} of {requiredFieldNames.length} essentials filled
            </strong>
            <p>The rest can stay rough. We only need the first version to move forward.</p>
          </div>

          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : submitLabel}
          </button>
        </div>

        <div className={styles.alertArea}>
          {status === 'success' && <div className={styles.success}>{message}</div>}
          {status === 'error' && <div className={styles.error}>{message}</div>}
        </div>
      </form>
    </div>
  )

  if (!showPreview) {
    return formContent
  }

  return (
    <div className={styles.workspace}>
      {formContent}

      <aside className={styles.previewColumn} aria-live="polite">
        <div className={styles.previewFrame}>
          <div className={styles.previewTopBar}>
            <div className={styles.previewDots} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className={styles.previewUrl}>{brandName} / live website preview</div>
            <div className={styles.previewBadge}>{completionPercent}% brief filled</div>
          </div>

          <div
            className={styles.previewCanvas}
            style={
              {
                '--preview-primary': BRAND_INTAKE_DEFAULTS.primaryColor,
                '--preview-secondary': BRAND_INTAKE_DEFAULTS.secondaryColor,
                '--preview-accent': BRAND_INTAKE_DEFAULTS.accentColor,
                '--preview-primary-dynamic': draft.primaryColor || BRAND_INTAKE_DEFAULTS.primaryColor,
                '--preview-secondary-dynamic': draft.secondaryColor || BRAND_INTAKE_DEFAULTS.secondaryColor,
                '--preview-accent-dynamic': draft.accentColor || BRAND_INTAKE_DEFAULTS.accentColor,
              } as React.CSSProperties
            }
          >
            <header className={styles.previewHeader}>
              <div className={styles.previewBrand}>
                <span
                  className={styles.previewBrandMark}
                  style={{ backgroundColor: draft.primaryColor || BRAND_INTAKE_DEFAULTS.primaryColor }}
                >
                  {brandInitial}
                </span>
                <div>
                  <strong>{brandName}</strong>
                  <span>{domain}</span>
                </div>
              </div>

              <nav className={styles.previewNav} aria-label="Preview navigation">
                {previewPages.map((page) => (
                  <span key={page}>{page}</span>
                ))}
              </nav>
            </header>

            <section className={styles.previewHero}>
              <div className={styles.previewHeroCopy}>
                <span className={styles.previewEyebrow}>{industry}</span>
                <h4>{heroTitle}</h4>
                <p>{heroSubtitle}</p>

                <div className={styles.previewHeroActions}>
                  <span className={styles.previewButton}>Primary action</span>
                  <span className={styles.previewButtonGhost}>Secondary action</span>
                </div>

                <div className={styles.previewHeroMeta}>
                  <span>{preferredTone}</span>
                  <span>{brandPersonality}</span>
                  <span>{typography}</span>
                </div>
              </div>

              <div className={styles.previewHeroPanel}>
                <div className={styles.previewColorCard}>
                  <span>Colors</span>
                  <div className={styles.previewColorList}>
                    <div className={styles.previewColorRow}>
                      <i style={{ backgroundColor: draft.primaryColor || BRAND_INTAKE_DEFAULTS.primaryColor }} />
                      <b>Main color</b>
                    </div>
                    <div className={styles.previewColorRow}>
                      <i style={{ backgroundColor: draft.secondaryColor || BRAND_INTAKE_DEFAULTS.secondaryColor }} />
                      <b>Support color</b>
                    </div>
                    <div className={styles.previewColorRow}>
                      <i style={{ backgroundColor: draft.accentColor || BRAND_INTAKE_DEFAULTS.accentColor }} />
                      <b>Accent color</b>
                    </div>
                  </div>
                </div>

                <div className={styles.previewInfoCard}>
                  <span>Photography</span>
                  <strong>{photographyStyle}</strong>
                  <p>{references.length > 0 ? references[0] : 'Reference websites will appear here.'}</p>
                </div>
              </div>
            </section>

            <section className={styles.previewSectionGrid}>
              <article className={styles.previewSectionCard}>
                <span>Pages to build</span>
                <div className={styles.previewChipList}>
                  {previewPages.map((page) => (
                    <span key={page}>{page}</span>
                  ))}
                </div>
                <p>This menu will appear in the header and footer.</p>
              </article>

              <article className={styles.previewSectionCard}>
                <span>Audience</span>
                <strong>{audience}</strong>
                <p>{customerGoals}</p>
                <p>{customerPainPoints}</p>
              </article>

              <article className={styles.previewSectionCard}>
                <span>Contact block</span>
                <strong>{contactName}</strong>
                <p>{companyName}</p>
                <p>{email}</p>
                <p>{phone}</p>
                <p>
                  {city}, {country}
                </p>
              </article>

              <article className={styles.previewSectionCard}>
                <span>Social links</span>
                <div className={styles.previewChipList}>
                  {previewSocialLinks.map((link) => (
                    <span key={link}>{link}</span>
                  ))}
                </div>
                <p>{socialLinks.length > 0 ? socialLinks.join(' · ') : 'No social links yet'}</p>
              </article>
            </section>

            <footer className={styles.previewFooter}>
              <div className={styles.previewFooterBlock}>
                <span>Domain</span>
                <strong>{domain}</strong>
              </div>
              <div className={styles.previewFooterBlock}>
                <span>Launch</span>
                <strong>{launchDate}</strong>
              </div>
              <div className={styles.previewFooterBlock}>
                <span>Notes</span>
                <strong>{previewFeatures.join(' · ')}</strong>
                <strong>{notes}</strong>
              </div>
            </footer>
          </div>
        </div>
      </aside>
    </div>
  )
}
