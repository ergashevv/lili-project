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

type FieldPreview = {
  title: string
  description: string
  example: string
  appearsIn: string[]
  sectionLabel: string
}

function getFieldPreview(fieldName: string, draft: Record<string, string>): FieldPreview {
  const value = (key: string, fallback: string) => draft[key]?.trim() || fallback

  switch (fieldName) {
    case 'companyName':
      return {
        title: 'Legal company name',
        description: 'Use the official company name if it is different from the brand name.',
        example: value('companyName', 'Optional legal company name'),
        appearsIn: ['Footer legal text', 'Invoices', 'Admin records'],
        sectionLabel: 'Business identity',
      }
    case 'contactName':
      return {
        title: 'Contact person',
        description: 'This is the person we will speak to about the project.',
        example: value('contactName', 'Full name'),
        appearsIn: ['Admin contact', 'Project follow-up', 'Internal notes'],
        sectionLabel: 'Project contact',
      }
    case 'email':
      return {
        title: 'Email address',
        description: 'We will use this for replies and admin notifications.',
        example: value('email', 'name@example.com'),
        appearsIn: ['Contact section', 'Reply inbox', 'Notifications'],
        sectionLabel: 'Communication',
      }
    case 'phone':
      return {
        title: 'Phone / WhatsApp',
        description: 'This is the number clients can use to contact the brand fast.',
        example: value('phone', '+998 90 000 00 00'),
        appearsIn: ['Header contact', 'Footer', 'Quick support button'],
        sectionLabel: 'Communication',
      }
    case 'website':
      return {
        title: 'Website / domain',
        description: 'If the brand already has a site, we use it as a trust signal.',
        example: value('website', 'https://example.com'),
        appearsIn: ['Footer', 'SEO metadata', 'Trust signals'],
        sectionLabel: 'Business identity',
      }
    case 'industry':
      return {
        title: 'Industry / niche',
        description: 'Tell us what kind of brand this is so the homepage copy makes sense.',
        example: value('industry', 'Fashion, beauty, lifestyle...'),
        appearsIn: ['Homepage messaging', 'SEO copy', 'Section headings'],
        sectionLabel: 'Brand direction',
      }
    case 'tagline':
      return {
        title: 'Tagline / slogan',
        description: 'A short phrase that sits under the brand name or hero title.',
        example: value('tagline', 'Short brand line'),
        appearsIn: ['Hero subheading', 'Social banners', 'Brand lockups'],
        sectionLabel: 'Brand direction',
      }
    case 'mission':
      return {
        title: 'Mission',
        description: 'This explains why the brand exists.',
        example: value('mission', 'Why does this brand exist?'),
        appearsIn: ['About page', 'Brand story', 'Intro sections'],
        sectionLabel: 'Brand story',
      }
    case 'vision':
      return {
        title: 'Vision',
        description: 'This explains where the brand wants to go in the future.',
        example: value('vision', 'What is the long-term goal?'),
        appearsIn: ['About page', 'Brand story', 'Long-term strategy'],
        sectionLabel: 'Brand story',
      }
    case 'values':
      return {
        title: 'Core values',
        description: 'These are the values the brand wants people to feel.',
        example: value('values', 'Luxury, trust, quality, speed...'),
        appearsIn: ['Trust section', 'About page', 'Tone guide'],
        sectionLabel: 'Brand story',
      }
    case 'brandPersonality':
      return {
        title: 'Brand personality',
        description: 'Choose the feeling you want the brand to give.',
        example: value('brandPersonality', 'Minimal, bold, elegant, warm...'),
        appearsIn: ['Copy tone', 'Visual mood', 'Marketing style'],
        sectionLabel: 'Brand story',
      }
    case 'preferredTone':
      return {
        title: 'Tone of voice',
        description: 'This tells us how the website should speak to customers.',
        example: value('preferredTone', 'Formal, friendly, premium, playful...'),
        appearsIn: ['Buttons', 'Banners', 'Descriptions'],
        sectionLabel: 'Brand story',
      }
    case 'primaryAudience':
      return {
        title: 'Primary audience',
        description: 'Describe who the website is for in normal, simple words.',
        example: value('primaryAudience', 'Who are the customers?'),
        appearsIn: ['Hero message', 'Targeting', 'Conversion copy'],
        sectionLabel: 'Audience',
      }
    case 'customerGoals':
      return {
        title: 'Customer goals',
        description: 'What does the customer want to do on the site?',
        example: value('customerGoals', 'What are they trying to achieve?'),
        appearsIn: ['Benefits section', 'Call-to-action copy', 'Offers'],
        sectionLabel: 'Audience',
      }
    case 'customerPainPoints':
      return {
        title: 'Customer pain points',
        description: 'What problems does the brand solve for customers?',
        example: value('customerPainPoints', 'What problems should the site solve?'),
        appearsIn: ['FAQ', 'Objection handling', 'Persuasive copy'],
        sectionLabel: 'Audience',
      }
    case 'country':
      return {
        title: 'Country / region',
        description: 'Where the business is based or where it serves customers.',
        example: value('country', 'Uzbekistan, Tashkent...'),
        appearsIn: ['Footer', 'Contact area', 'Launch planning'],
        sectionLabel: 'Audience',
      }
    case 'city':
      return {
        title: 'City',
        description: 'The city can help make the contact section feel local and real.',
        example: value('city', 'Tashkent'),
        appearsIn: ['Contact details', 'Local trust signals'],
        sectionLabel: 'Audience',
      }
    case 'launchDate':
      return {
        title: 'Target launch date',
        description: 'This is the date the brand wants the website ready.',
        example: value('launchDate', 'Not set yet'),
        appearsIn: ['Project timeline', 'Launch planning'],
        sectionLabel: 'Project timing',
      }
    case 'primaryColor':
      return {
        title: 'Primary color',
        description: 'This becomes the main accent color used across the site.',
        example: value('primaryColor', '#800020'),
        appearsIn: ['Buttons', 'Links', 'Highlights'],
        sectionLabel: 'Visual style',
      }
    case 'secondaryColor':
      return {
        title: 'Secondary color',
        description: 'This supports the main color in cards and smaller areas.',
        example: value('secondaryColor', '#d4af37'),
        appearsIn: ['Cards', 'Supporting blocks', 'Extra accents'],
        sectionLabel: 'Visual style',
      }
    case 'accentColor':
      return {
        title: 'Accent color',
        description: 'This is used sparingly for small highlights and details.',
        example: value('accentColor', '#ffffff'),
        appearsIn: ['Badges', 'Emphasis points', 'Small highlights'],
        sectionLabel: 'Visual style',
      }
    case 'typography':
      return {
        title: 'Typography preferences',
        description: 'Tell us what kind of fonts fit the brand.',
        example: value('typography', 'Serif, modern, editorial...'),
        appearsIn: ['Headings', 'Body text', 'Hierarchy'],
        sectionLabel: 'Visual style',
      }
    case 'photographyStyle':
      return {
        title: 'Photography style',
        description: 'Describe the kind of photos that should be on the site.',
        example: value('photographyStyle', 'Studio, lifestyle, luxury, minimal...'),
        appearsIn: ['Hero banners', 'Product images', 'Campaign visuals'],
        sectionLabel: 'Visual style',
      }
    case 'referenceWebsites':
      return {
        title: 'Reference websites',
        description: 'Paste links to sites the client likes.',
        example: value('referenceWebsites', 'Paste links to brands you like'),
        appearsIn: ['Design direction', 'Layout inspiration', 'Visual reference'],
        sectionLabel: 'Visual style',
      }
    case 'requiredPages':
      return {
        title: 'Required pages',
        description: 'List the pages the website should have.',
        example: value('requiredPages', 'About, Products, FAQ, Contact...'),
        appearsIn: ['Navigation menu', 'Sitemap', 'Footer links'],
        sectionLabel: 'Website content',
      }
    case 'heroTitle':
      return {
        title: 'Homepage hero title',
        description: 'This is the biggest headline at the top of the homepage.',
        example: value('heroTitle', 'Main hero heading'),
        appearsIn: ['Homepage hero', 'SEO', 'Social sharing'],
        sectionLabel: 'Website content',
      }
    case 'heroSubtitle':
      return {
        title: 'Homepage hero subtitle',
        description: 'This supports the main headline with a short explanation.',
        example: value('heroSubtitle', 'Short supporting text'),
        appearsIn: ['Homepage hero', 'Intro paragraph'],
        sectionLabel: 'Website content',
      }
    case 'keyFeatures':
      return {
        title: 'Key features / trust points',
        description: 'List the things that make people trust the brand.',
        example: value('keyFeatures', 'Delivery, quality, support...'),
        appearsIn: ['Trust section', 'Feature cards', 'Sales blocks'],
        sectionLabel: 'Website content',
      }
    case 'socialLinks':
      return {
        title: 'Social links',
        description: 'Share the social pages that should be linked from the site.',
        example: value('socialLinks', 'Instagram, Telegram, TikTok...'),
        appearsIn: ['Footer', 'Contact bar', 'Social proof'],
        sectionLabel: 'Website content',
      }
    case 'notes':
      return {
        title: 'Additional notes',
        description: 'Anything extra the team should know before building.',
        example: value('notes', 'Anything else we should know?'),
        appearsIn: ['Internal notes', 'Build instructions'],
        sectionLabel: 'Website content',
      }
    default:
      return {
        title: 'Brand information',
        description: 'This answer helps us shape the final website.',
        example: value(fieldName, 'Type your answer here'),
        appearsIn: ['Website planning'],
        sectionLabel: 'Project details',
      }
  }
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
  const [activeField, setActiveField] = React.useState('brandName')

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
                    <small>This updates: {field.siteArea}</small>
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
                      onFocus={() => setActiveField(field.name)}
                    />
                  ) : field.type === 'date' ? (
                    <input
                      name={field.name}
                      type="date"
                      required={field.required}
                      className={styles.input}
                      value={value}
                      onChange={handleFieldChange}
                      onFocus={() => setActiveField(field.name)}
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
                      onFocus={() => setActiveField(field.name)}
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

  const references = toList(draft.referenceWebsites || 'Reference websites will appear here')
  const preview = getFieldPreview(activeField, draft)

  return (
    <div className={styles.intakeLayout}>
      {content}

      <aside className={styles.previewPanel} aria-live="polite">
        <div className={styles.previewCard}>
          <div className={styles.previewHeader}>
            <span className={styles.previewEyebrow}>Live preview</span>
            <h3>What this field does on the website</h3>
            <p>
              Click or tap any field on the left. The panel below will explain
              it in plain words, show an example, and tell you exactly where it
              appears on the site.
            </p>
          </div>

          <div className={styles.previewFocusCard}>
            <div className={styles.previewFocusTop}>
              <span className={styles.previewSectionTag}>{preview.sectionLabel}</span>
              <span className={styles.previewAppearsIn}>
                Appears in: {preview.appearsIn.join(' · ')}
              </span>
            </div>

            <h4>{preview.title}</h4>
            <p className={styles.previewFocusDescription}>{preview.description}</p>

            <div className={styles.previewExampleCard}>
              <span>Example</span>
              <strong>{preview.example}</strong>
            </div>
          </div>

          <div className={styles.previewSiteMap}>
            <div className={`${styles.previewMapCard} ${fieldBelongsToSection(activeField, 'brand') ? styles.previewMapCardActive : ''}`}>
              <strong>Brand identity</strong>
              <span>Brand name, legal name, contact person, email, phone, website.</span>
            </div>
            <div className={`${styles.previewMapCard} ${fieldBelongsToSection(activeField, 'story') ? styles.previewMapCardActive : ''}`}>
              <strong>Brand story</strong>
              <span>Mission, vision, values, personality, and tone of voice.</span>
            </div>
            <div className={`${styles.previewMapCard} ${fieldBelongsToSection(activeField, 'audience') ? styles.previewMapCardActive : ''}`}>
              <strong>Audience and timing</strong>
              <span>Who the site is for, what they need, where they are, and when it should launch.</span>
            </div>
            <div className={`${styles.previewMapCard} ${fieldBelongsToSection(activeField, 'style') ? styles.previewMapCardActive : ''}`}>
              <strong>Visual style</strong>
              <span>Colors, typography, photography, and reference websites.</span>
            </div>
            <div className={`${styles.previewMapCard} ${fieldBelongsToSection(activeField, 'content') ? styles.previewMapCardActive : ''}`}>
              <strong>Website content</strong>
              <span>Pages, homepage headline, features, social links, and notes.</span>
            </div>
          </div>
        </div>

        <div className={styles.mapCard}>
          <h3>Quick examples</h3>
          <p>These are the kinds of answers the client should type in plain words.</p>
          <div className={styles.exampleList}>
            <div className={styles.exampleItem}>
              <strong>Brand name</strong>
              <span>Lili</span>
            </div>
            <div className={styles.exampleItem}>
              <strong>Homepage headline</strong>
              <span>Elegant fashion made for confident women</span>
            </div>
            <div className={styles.exampleItem}>
              <strong>Audience</strong>
              <span>Women who want premium clothes for daily wear and events</span>
            </div>
            <div className={styles.exampleItem}>
              <strong>Visual style</strong>
              <span>Soft cream, burgundy, gold, serif fonts, studio photos</span>
            </div>
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

function fieldBelongsToSection(fieldName: string, section: 'brand' | 'story' | 'audience' | 'style' | 'content') {
  const brandFields = ['brandName', 'companyName', 'contactName', 'email', 'phone', 'website']
  const storyFields = ['industry', 'tagline', 'mission', 'vision', 'values', 'brandPersonality', 'preferredTone']
  const audienceFields = ['primaryAudience', 'customerGoals', 'customerPainPoints', 'country', 'city', 'launchDate']
  const styleFields = ['primaryColor', 'secondaryColor', 'accentColor', 'typography', 'photographyStyle', 'referenceWebsites']
  const contentFields = ['requiredPages', 'heroTitle', 'heroSubtitle', 'keyFeatures', 'socialLinks', 'notes']

  if (section === 'brand') return brandFields.includes(fieldName)
  if (section === 'story') return storyFields.includes(fieldName)
  if (section === 'audience') return audienceFields.includes(fieldName)
  if (section === 'style') return styleFields.includes(fieldName)
  return contentFields.includes(fieldName)
}
