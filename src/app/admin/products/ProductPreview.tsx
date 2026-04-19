'use client'

import React from 'react'
import { Monitor, Tablet, Smartphone, Box, LayoutPanelLeft } from 'lucide-react'
import Image from 'next/image'
import styles from './ProductPreview.module.css'
import { ProductCard } from '@/components/ProductCard'

interface ProductPreviewProps {
  data: {
    nameUz: string
    nameRu: string
    price: number
    primaryImage: string
    colors: string[]
    sizes: string[]
    descriptionUz: string
    descriptionRu: string
  }
}

export function ProductPreview({ data }: ProductPreviewProps) {
  const [device, setDevice] = React.useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [view, setView] = React.useState<'card' | 'page'>('card')

  const mockProduct = {
    id: 'preview',
    slug: 'preview',
    nameUz: data.nameUz || 'Mahsulot Nomi',
    nameRu: data.nameRu || 'Название товара',
    price: data.price || 0,
    primaryImage: data.primaryImage || null,
    isActive: true,
    categoryId: '1',
    subCategoryId: null,
    images: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    descriptionUz: data.descriptionUz,
    descriptionRu: data.descriptionRu,
  }

  return (
    <div className={styles.previewContainer}>
      <div className={styles.toolbar}>
        <div className={styles.deviceButtons}>
          <button 
            className={device === 'desktop' ? styles.active : ''} 
            onClick={() => setDevice('desktop')}
            title="Desktop"
          >
            <Monitor size={18} />
          </button>
          <button 
            className={device === 'tablet' ? styles.active : ''} 
            onClick={() => setDevice('tablet')}
            title="Tablet"
          >
            <Tablet size={18} />
          </button>
          <button 
            className={device === 'mobile' ? styles.active : ''} 
            onClick={() => setDevice('mobile')}
            title="Mobile"
          >
            <Smartphone size={18} />
          </button>
        </div>

        <div className={styles.viewButtons}>
          <button 
            className={view === 'card' ? styles.active : ''} 
            onClick={() => setView('card')}
          >
            <Box size={16} /> Card
          </button>
          <button 
            className={view === 'page' ? styles.active : ''} 
            onClick={() => setView('page')}
          >
            <LayoutPanelLeft size={16} /> Page
          </button>
        </div>
      </div>

      <div className={`${styles.viewport} ${styles[device]}`}>
        <div className={styles.screen}>
          {view === 'card' ? (
            <div className={styles.cardWrapper}>
              <ProductCard product={mockProduct} />
            </div>
          ) : (
            <div className={styles.pageMock}>
              <div className={styles.mockHeader}>SIMPATIYA</div>
              <div className={styles.mockContent}>
                <div className={styles.mockImages}>
                   <Image 
                    src={data.primaryImage || 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2'} 
                    alt="preview" 
                    width={400}
                    height={600}
                  />
                </div>
                <div className={styles.mockInfo}>
                   <h3>{data.nameUz || 'Nomi'}</h3>
                   <p className={styles.mockPrice}>{data.price.toLocaleString()} UZS</p>
                   <div className={styles.mockBtns}>
                      <div className={styles.mockBtn}>SOTIB OLISH</div>
                   </div>
                   <div className={styles.mockDesc} dangerouslySetInnerHTML={{ __html: data.descriptionUz }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className={styles.hint}>
        * Bu faqat vizual ko&apos;rinish. Haqiqiy sahifada dizayn yanada boyroq bo&apos;ladi.
      </div>
    </div>
  )
}
