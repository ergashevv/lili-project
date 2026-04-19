'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Category, Prisma } from '@prisma/client'
import Image from 'next/image'
import { Heart, Ruler, CheckCircle2, ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/lib/i18n'
import { OrderModal } from '@/components/OrderModal'
import { SizeRecommender } from '@/components/SizeRecommender'
import { useCart } from '@/store/useCart'
import { useWishlist } from '@/store/useWishlist'
import styles from './ProductDetails.module.css'

interface ProductWithCategory {
  id: string
  slug: string
  nameUz: string
  nameRu: string
  descriptionUz: string | null
  descriptionRu: string | null
  price: number
  primaryImage: string | null
  images: string[]
  colors: string[]
  sizes: string[]
  details: Prisma.JsonValue
  category: Category
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  categoryId: string
  subCategoryId: string | null
}

export function ProductDetails({ product }: { product: ProductWithCategory }) {
  const router = useRouter()
  const { lang, t } = useI18n()
  const [isModalOpen, setModalOpen] = useState(false)
  const [isSizeModalOpen, setSizeModalOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState<string | null>(
    (product.colors as string[])?.[0] || null
  )
  const [selectedSize, setSelectedSize] = useState<string | null>(
    (product.sizes as string[])?.[0] || null
  )

  const { addItem } = useCart()
  const toggleWishlist = useWishlist((state) => state.toggleItem)
  const isWishlisted = useWishlist((state) => state.isWishlisted(product.id))

  const allImages = [product.primaryImage, ...(product.images as string[])].filter(
    Boolean
  ) as string[]

  const name = lang === 'uz' ? product.nameUz : product.nameRu
  const description = lang === 'uz' ? product.descriptionUz : product.descriptionRu

  // Dynamic details from JSON
  const details = (product.details as Record<string, string>) || {}

  // Format details based on language and category specific labels
  const getDetailLabel = (key: string) => {
    const cleanKey = key.replace('Uz', '').replace('Ru', '')
    const humanized = cleanKey.split(/(?=[A-Z])/).join(' ')

    const labels: Record<string, Record<string, string>> = {
      material: { uz: 'Material', ru: 'Материал' },
      fabric: { uz: 'Matoli', ru: 'Ткань' },
      lining: { uz: 'Astar', ru: 'Подкладка' },
      fit: { uz: 'Bichimi', ru: 'Посадка' },
      length: { uz: 'Uzunligi', ru: 'Длина' },
      style: { uz: 'Uslubi', ru: 'Стиль' },
      temp: { uz: 'Harorat', ru: 'Температура' },
      fill: { uz: 'To\'ldiruvchi', ru: 'Наполнитель' },
      waterproof: { uz: 'Suv o\'tkazmaslik', ru: 'Водонепроницаемость' },
      size: { uz: 'O\'lchami', ru: 'Размер' },
      dimension: { uz: 'O\'lchamlari', ru: 'Габариты' },
      heel: { uz: 'Poshna', ru: 'Каблук' },
      sole: { uz: 'Taglik', ru: 'Подошва' },
    }

    return labels[cleanKey.toLowerCase()]?.[lang] || humanized
  }

  const detailEntries = Object.entries(details).filter(([key]) =>
    lang === 'uz' ? key.endsWith('Uz') : key.endsWith('Ru')
  )

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedColor}-${selectedSize}`,
      productId: product.id,
      name: name,
      price: product.price,
      quantity: 1,
      image: product.primaryImage || '',
      color: selectedColor || undefined,
      size: selectedSize || undefined,
      slug: product.slug,
    })
    router.push('/cart')
  }

  const priceFormatted = new Intl.NumberFormat(lang === 'uz' ? 'uz-UZ' : 'ru-RU', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0,
  }).format(product.price)

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.grid}>
        {/* Images Section */}
        <div className={styles.imageGallery}>
          {allImages.length > 0 ? (
            allImages.map((img, i) => (
              <div key={i} className={styles.mainImageWrapper}>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <Image
                    src={img}
                    alt={`${name} ${i}`}
                    className={styles.mainImage}
                    width={800}
                    height={1200}
                    priority={i === 0}
                  />
                </motion.div>
              </div>
            ))
          ) : (
            <div className={styles.mainImageWrapper}>
              <div className={styles.placeholderImg}>No Image</div>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className={styles.info}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className={styles.title}>{name}</h1>
            <p className={styles.price}>{priceFormatted}</p>

            <div className={styles.divider} />

            {/* Color Selection */}
            {product.colors && (product.colors as string[]).length > 0 && (
              <div className={styles.selectionGroup}>
                <label className={styles.selectionLabel}>
                  {t('product.color')} : {selectedColor}
                </label>
                <div className={styles.colorOptions}>
                  {(product.colors as string[]).map((color) => (
                    <button
                      key={color}
                      className={`${styles.colorTick} ${
                        selectedColor === color ? styles.active : ''
                      }`}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && (product.sizes as string[]).length > 0 && (
              <div className={styles.selectionGroup}>
                <label className={styles.selectionLabel}>{t('product.size')}</label>
                <div className={styles.sizeOptions}>
                  {(product.sizes as string[]).map((size) => (
                    <button
                      key={size}
                      className={`${styles.sizeTick} ${
                        selectedSize === size ? styles.active : ''
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Recommender */}
            <div className={styles.recommender}>
              <button
                className={styles.recommenderBtn}
                onClick={() => setSizeModalOpen(true)}
              >
                <Ruler size={14} />
                <span>{t('product.sizeGuide')}</span>
              </button>
            </div>

            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: description || '' }}
            />

            {/* Action Buttons */}
            <div className={styles.buttonGroup}>
              <button className={styles.cartBtn} onClick={handleAddToCart}>
                <ShoppingBag size={20} />
                <span>{t('product.addToCart')}</span>
              </button>

              <button className={styles.orderBtn} onClick={() => setModalOpen(true)}>
                {t('product.order')}
              </button>

              <button
                className={`${styles.wishlistBtn} ${
                  isWishlisted ? styles.active : ''
                }`}
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart fill={isWishlisted ? 'currentColor' : 'none'} size={22} />
              </button>
            </div>

            {/* Dynamic Details List */}
            {detailEntries.length > 0 && (
              <div className={styles.detailsGroup}>
                <h3 className={styles.detailsTitle}>{t('product.details')}</h3>
                <ul className={styles.detailsList}>
                  {detailEntries.map(([key, value]) => (
                    <li key={key} className={styles.detailItem}>
                      <span className={styles.detailLabel}>{getDetailLabel(key)}</span>
                      <span className={styles.detailValue}>{value as string}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles.extraInfo}>
              <div className={styles.extraItem}>
                <CheckCircle2 size={14} /> {t('product.quality')}
              </div>
              <div className={styles.extraItem}>
                <CheckCircle2 size={14} /> {t('product.delivery')}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        product={product}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
      />

      <SizeRecommender
        isOpen={isSizeModalOpen}
        onClose={() => setSizeModalOpen(false)}
        availableSizes={(product.sizes as string[]) || []}
      />
    </div>
  )
}
