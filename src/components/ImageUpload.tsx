'use client'

import React, { useState } from 'react'
import { UploadCloud, X } from 'lucide-react'

export function ImageUpload({ 
  value, 
  onChange,
  hint
}: { 
  value: string | null
  onChange: (url: string) => void
  hint?: string
}) {
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const resp = await fetch(`/api/upload?filename=${file.name}`, {
        method: 'POST',
        body: file,
      })

      const finalUrl = await resp.json()
      if (finalUrl && finalUrl.url) {
        onChange(finalUrl.url)
      } else {
        alert('Rasm yuklashda xato. BLOB xatosi.')
      }
    } catch {
      alert('Rasm yuklanmadi')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={{ marginBottom: '1rem' }}>
      {value ? (
        <div style={{ position: 'relative', width: 'fit-content' }}>
          <img 
            src={value} 
            alt="Yuklangan rasm" 
            style={{ 
              width: '100%', 
              maxWidth: '320px', 
              height: '180px', 
              objectFit: 'cover', 
              borderRadius: '8px',
              display: 'block'
            }} 
          />
          <button 
            type="button" 
            onClick={() => onChange('')}
            style={{ 
              position: 'absolute', top: '-10px', right: '-10px', 
              background: '#fff', border: '1px solid #ccc', borderRadius: '50%',
              padding: '4px', cursor: 'pointer', zIndex: 10
            }}
          >
            <X size={16} color="red" />
          </button>
        </div>
      ) : (
        <div style={{
          border: '2px dashed #ccc', 
          padding: '2rem', 
          textAlign: 'center', 
          borderRadius: '8px',
          cursor: 'pointer',
          backgroundColor: '#fafafa',
          position: 'relative'
        }}>
          {uploading ? (
            <p>Yuklanmoqda...</p>
          ) : (
            <>
              <UploadCloud size={32} color="#aaa" style={{ marginBottom: '0.5rem' }} />
              <p style={{ marginBottom: '0.25rem' }}>Rasmni yuklash uchun bosing</p>
              {hint && (
                <p style={{ fontSize: '12px', color: '#999', marginTop: '0.25rem' }}>
                  📐 {hint}
                </p>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleUpload}
                style={{ 
                  opacity: 0, position: 'absolute', top: 0, left: 0, 
                  width: '100%', height: '100%', cursor: 'pointer' 
                }}
              />
            </>
          )}
        </div>
      )}
    </div>
  )
}

