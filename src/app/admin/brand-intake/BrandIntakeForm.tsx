'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { saveBrandIntake } from '@/app/actions/brand-intake'
import {
  BRAND_INTAKE_DEFAULTS,
  type BrandIntakeLanguage,
  normalizeBrandIntakeLanguage,
} from '@/lib/brand-intake-types'
import {
  BRAND_INTAKE_COPY,
  formatBrandIntakeFilledSummary,
} from '@/lib/brand-intake-content'
import {
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

const REQUIRED_FIELDS = ['brandName', 'contactName', 'email', 'website', 'requiredPages'] as const

function joinDescribedBy(...ids: Array<string | undefined>) {
  return ids.filter(Boolean).join(' ') || undefined
}

function getRequiredFilledCount(draft: Record<string, string>) {
  return REQUIRED_FIELDS.filter((name) => draft[name]?.trim().length > 0).length
}

interface BrandIntakeFormViewProps {
  language?: BrandIntakeLanguage
  submitLabel?: string
  successMessage?: string
  errorMessage?: string
}

export function BrandIntakeForm(props: BrandIntakeFormViewProps) {
  return <BrandIntakeFormView {...props} />
}

function BrandIntakeFormView({
  language = 'en',
  submitLabel,
  successMessage,
  errorMessage,
}: BrandIntakeFormViewProps) {
  const selectedLanguage = normalizeBrandIntakeLanguage(language)
  const copy = BRAND_INTAKE_COPY[selectedLanguage]
  const resolvedSubmitLabel = submitLabel ?? copy.form.submitLabel
  const resolvedSuccessMessage = successMessage ?? copy.form.successMessage
  const resolvedErrorMessage = errorMessage ?? copy.form.errorMessage

  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = React.useState('')
  const [submitAttempted, setSubmitAttempted] = React.useState(false)
  const [draft, setDraft] = React.useState<Record<string, string>>(() => createBrandIntakeDraft())
  const [touched, setTouched] = React.useState<Record<string, boolean>>({})
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const draftRef = React.useRef(draft)
  const statusRef = React.useRef(status)

  draftRef.current = draft
  statusRef.current = status

  const requiredFilled = getRequiredFilledCount(draft)
  const fieldGroups = copy.form.groups as FieldGroup[]

  React.useEffect(() => {
    setErrors(validateBrandIntakeForm(draftRef.current, selectedLanguage))

    if (statusRef.current === 'success') {
      setMessage(resolvedSuccessMessage)
    }

    if (statusRef.current === 'error') {
      setMessage(resolvedErrorMessage)
    }
  }, [resolvedErrorMessage, resolvedSuccessMessage, selectedLanguage])

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget
    setDraft((current) => ({ ...current, [name]: value }))
    setTouched((current) => ({ ...current, [name]: true }))
    setErrors((current) => ({
      ...current,
      [name]: validateBrandIntakeField(name, value, selectedLanguage),
    }))
  }

  const handleFieldBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget
    setTouched((current) => ({ ...current, [name]: true }))
    setErrors((current) => ({
      ...current,
      [name]: validateBrandIntakeField(name, value, selectedLanguage),
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')
    setMessage('')

    const validationErrors = validateBrandIntakeForm(draft, selectedLanguage)
    setErrors(validationErrors)
    setTouched(
      fieldGroups.reduce<Record<string, boolean>>((accumulator, group) => {
        group.fields.forEach((field) => {
          accumulator[field.name] = true
        })
        return accumulator
      }, {}),
    )
    setSubmitAttempted(true)

    if (Object.keys(validationErrors).length > 0) {
      setStatus('error')
      setMessage(resolvedErrorMessage)
      setIsSubmitting(false)
      return
    }

    const formData = new FormData(event.currentTarget)

    try {
      const result = await saveBrandIntake(formData)
      if (!result.success) {
        setStatus('error')
        setMessage(result.error || resolvedErrorMessage)
        return
      }

      setDraft(createBrandIntakeDraft())
      setTouched({})
      setErrors({})
      setSubmitAttempted(false)
      router.refresh()
      setStatus('success')
      setMessage(resolvedSuccessMessage)
    } catch {
      setStatus('error')
      setMessage(resolvedErrorMessage)
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
              <span>{copy.form.colorPickerNote}</span>
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
      <input type="hidden" name="language" value={selectedLanguage} />

      {fieldGroups.map((group) => (
        <section key={group.title} className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>{group.title}</h2>
              <p className={styles.sectionDescription}>{group.description}</p>
            </div>
          </div>

          <div className={styles.fieldStack}>{group.fields.map(renderField)}</div>
        </section>
      ))}

      <div className={styles.submitBar}>
        <div className={styles.submitCopy}>
          <span>{copy.form.readyLabel}</span>
          <strong>
            {formatBrandIntakeFilledSummary(selectedLanguage, requiredFilled, REQUIRED_FIELDS.length)}
          </strong>
          <p>{copy.form.guidance}</p>
        </div>

        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? copy.form.savingLabel : resolvedSubmitLabel}
        </button>
      </div>

      <div className={styles.alertArea}>
        {status === 'success' && <div className={styles.success}>{message}</div>}
        {status === 'error' && <div className={styles.error}>{message}</div>}
      </div>
    </form>
  )
}
