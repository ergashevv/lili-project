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

type FieldType = 'text' | 'email' | 'color'

type Field = {
  name: string
  label: string
  helper: string
  placeholder?: string
  required?: boolean
  type?: FieldType
  kind?: 'input' | 'textarea'
  rows?: number
}

type FieldGroup = {
  title: string
  description: string
  fields: Field[]
}

const FIELD_GROUPS: FieldGroup[] = [
  {
    title: 'Brand basics',
    description: 'Who the brand is and who we should contact.',
    fields: [
      {
        name: 'brandName',
        label: 'Brand name',
        helper: 'This is the name that will appear in the header, logo, and footer.',
        placeholder: 'Lili',
        required: true,
      },
      {
        name: 'contactName',
        label: 'Contact person',
        helper: 'The person we should speak with while building the site.',
        placeholder: 'Full name',
        required: true,
      },
      {
        name: 'email',
        label: 'Email address',
        helper: 'We will use this for follow-up and project updates.',
        placeholder: 'name@example.com',
        type: 'email',
        required: true,
      },
      {
        name: 'phone',
        label: 'Phone / WhatsApp',
        helper: 'Optional, but helpful for faster communication.',
        placeholder: '+998 90 000 00 00',
      },
      {
        name: 'website',
        label: 'Website / domain',
        helper: 'Type the domain only, like lili.uz, or paste the full URL.',
        placeholder: 'lili.uz',
        required: true,
      },
    ],
  },
  {
    title: 'Site pages',
    description: 'Tell us which pages should exist on the website.',
    fields: [
      {
        name: 'requiredPages',
        label: 'Pages to include',
        helper: 'Separate pages with commas or one page per line.',
        placeholder: 'Home, About, Shop, FAQ, Contact',
        kind: 'textarea',
        rows: 5,
        required: true,
      },
    ],
  },
  {
    title: 'Brand style',
    description: 'Pick colors and describe the look you want.',
    fields: [
      {
        name: 'primaryColor',
        label: 'Main color',
        helper: 'This color will be used for buttons, links, and highlights.',
        type: 'color',
        required: true,
      },
      {
        name: 'secondaryColor',
        label: 'Support color',
        helper: 'A second color for cards, borders, and softer accents.',
        type: 'color',
        required: true,
      },
      {
        name: 'accentColor',
        label: 'Accent color',
        helper: 'A small accent color for badges and details.',
        type: 'color',
        required: true,
      },
      {
        name: 'typography',
        label: 'Font style',
        helper: 'Describe the font mood you want: modern, elegant, serif, clean, and so on.',
        placeholder: 'Modern, elegant, readable...',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'preferredTone',
        label: 'Text style',
        helper: 'How should the website sound? Friendly, premium, simple, bold, and so on.',
        placeholder: 'Warm, premium, clear...',
        kind: 'textarea',
        rows: 4,
      },
    ],
  },
  {
    title: 'Links and notes',
    description: 'Share any social profiles and extra instructions.',
    fields: [
      {
        name: 'socialLinks',
        label: 'Social links',
        helper: 'Instagram, Telegram, TikTok, or any other profile names or links.',
        placeholder: 'Instagram, Telegram, TikTok...',
        kind: 'textarea',
        rows: 4,
      },
      {
        name: 'notes',
        label: 'Extra notes',
        helper: 'Anything else we should know before we start.',
        placeholder: 'Optional notes for the team',
        kind: 'textarea',
        rows: 4,
      },
    ],
  },
]

const REQUIRED_FIELDS = ['brandName', 'contactName', 'email', 'website', 'requiredPages'] as const

function joinDescribedBy(...ids: Array<string | undefined>) {
  return ids.filter(Boolean).join(' ') || undefined
}

function getRequiredFilledCount(draft: Record<string, string>) {
  return REQUIRED_FIELDS.filter((name) => draft[name]?.trim().length > 0).length
}

export function BrandIntakeForm(props: BrandIntakeFormViewProps) {
  return <BrandIntakeFormView {...props} />
}

interface BrandIntakeFormViewProps {
  submitLabel?: string
  successMessage?: string
  errorMessage?: string
}

function BrandIntakeFormView({
  submitLabel = 'Submit brand intake',
  successMessage = 'Thanks. Your brand intake has been saved to the dashboard.',
  errorMessage = 'Could not save the form. Please try again.',
}: BrandIntakeFormViewProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = React.useState('')
  const [submitAttempted, setSubmitAttempted] = React.useState(false)
  const [draft, setDraft] = React.useState<Record<string, string>>(() => createBrandIntakeDraft())
  const [touched, setTouched] = React.useState<Record<string, boolean>>({})
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const requiredFilled = getRequiredFilledCount(draft)
  const completionPercent = Math.round((requiredFilled / REQUIRED_FIELDS.length) * 100)

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
      FIELD_GROUPS.reduce<Record<string, boolean>>((accumulator, group) => {
        group.fields.forEach((field) => {
          accumulator[field.name] = true
        })
        return accumulator
      }, {}),
    )
    setSubmitAttempted(true)

    if (Object.keys(validationErrors).length > 0) {
      setStatus('error')
      setMessage('Please fix the highlighted fields and try again.')
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
    const describedBy = joinDescribedBy(helperId, isInvalid ? errorId : undefined)

    return (
      <article key={field.name} className={`${styles.fieldCard} ${isInvalid ? styles.fieldCardInvalid : ''}`}>
        <div className={styles.fieldHeader}>
          <label htmlFor={field.name} className={styles.fieldLabel}>
            {field.label}
            {field.required ? ' *' : ''}
          </label>
          <p id={helperId} className={styles.fieldHelper}>
            {field.helper}
          </p>
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
          <div className={styles.colorRow}>
            <input
              id={field.name}
              name={field.name}
              type="color"
              required={field.required}
              className={styles.colorInput}
              value={value}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
              aria-invalid={isInvalid}
              aria-describedby={describedBy}
              aria-label={field.label}
            />
            <div className={styles.colorMeta}>
              <strong>{field.label}</strong>
              <span>Pick the color visually. No code needed.</span>
              <div className={styles.colorSwatchLine}>
                <span className={styles.colorSwatch} style={{ backgroundColor: value }} />
                <small>{value.toUpperCase()}</small>
              </div>
            </div>
          </div>
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

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.progressStrip} aria-label="Form progress">
        <div className={styles.progressCard}>
          <strong>{completionPercent}%</strong>
          <span>Required fields filled</span>
        </div>
        <div className={styles.progressCard}>
          <strong>{REQUIRED_FIELDS.length}</strong>
          <span>Essentials needed</span>
        </div>
        <div className={styles.progressCard}>
          <strong>Simple</strong>
          <span>Public page only</span>
        </div>
      </div>

      {FIELD_GROUPS.map((group) => (
        <section key={group.title} className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>{group.title}</h2>
              <p className={styles.sectionDescription}>{group.description}</p>
            </div>
          </div>

          <div className={styles.fieldGrid}>{group.fields.map(renderField)}</div>
        </section>
      ))}

      <div className={styles.submitBar}>
        <div className={styles.submitCopy}>
          <span>Ready to save</span>
          <strong>
            {requiredFilled} of {REQUIRED_FIELDS.length} essentials filled
          </strong>
          <p>The form stays simple. Fill only what you know and submit.</p>
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
  )
}
