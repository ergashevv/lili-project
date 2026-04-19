'use client'

import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Search, X, TrendingUp, History, ArrowRight } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './SearchModal.module.css'
import { ProductSkeleton } from './Skeleton'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ProductResult {
  id: string
  slug: string
  nameUz: string
  nameRu: string
  price: number
  primaryImage: string
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { t, lang } = useI18n()
  const [mounted, setMounted] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ProductResult[]>([])
  const [loading, setLoading] = useState(false)
  const [trending, setTrending] = useState<ProductResult[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => inputRef.current?.focus(), 100)
      
      const saved = localStorage.getItem('simpaty-recent-searches')
      if (saved) {
        setRecentSearches(JSON.parse(saved))
      }

      if (trending.length === 0) {
        fetch('/api/search')
          .then(res => res.json())
          .then(data => setTrending(Array.isArray(data) ? data.slice(0, 4) : []))
          .catch(err => console.error('Trending fetch error:', err))
      }
    } else {
      document.body.style.overflow = 'unset'
      setQuery('')
      setResults([])
    }
  }, [isOpen, trending.length])

  const handleSearch = React.useCallback(async (currentQuery: string) => {
    if (currentQuery.trim().length < 2) {
      setResults([])
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(currentQuery.trim())}`)
      if (!res.ok) throw new Error(`Search failed: ${res.status}`)
      const data = await res.json()
      setResults(Array.isArray(data) ? data : [])
      
      if (currentQuery.trim()) {
        setRecentSearches(prev => {
          const updated = [
            currentQuery.trim(),
            ...prev.filter(s => s !== currentQuery.trim())
          ].slice(0, 5)
          localStorage.setItem('simpaty-recent-searches', JSON.stringify(updated))
          return updated
        })
      }
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, []) // Removed dependency on recentSearches

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    const timer = setTimeout(() => handleSearch(query), 400)
    return () => clearTimeout(timer)
  }, [query, handleSearch])

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      handleSearch(query)
    }
  }

  const handleProductClick = (slug: string) => {
    router.push(`/product/${slug}`)
    onClose()
  }

  const handleRecentClick = (s: string) => {
    setQuery(s)
    handleSearch(s)
  }

  const clearRecent = () => {
    setRecentSearches([])
    localStorage.removeItem('simpaty-recent-searches')
  }

  const getProductName = (product: ProductResult) => {
    return lang === 'uz' ? product.nameUz : product.nameRu
  }

  if (!mounted) return null

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.modal}>
            <div className={styles.header}>
              <form onSubmit={onFormSubmit} className={styles.searchField}>
                <Search size={22} className={styles.searchIcon} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={t('search.placeholder') || 'Searching for...'}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className={styles.input}
                />
                {query && (
                  <button type="button" onClick={() => setQuery('')} className={styles.clearBtn}>
                    <X size={18} />
                  </button>
                )}
              </form>
              <button onClick={onClose} className={styles.closeBtn}>
                <X size={28} strokeWidth={1.5} />
              </button>
            </div>


            <div className={styles.content}>
              {loading && (
                <div className={styles.resultsGrid}>
                  {[...Array(8)].map((_, i) => (
                    <ProductSkeleton key={i} />
                  ))}
                </div>
              )}
              
              {!loading && results.length > 0 && (
                <div className={styles.resultsWrapper}>
                  <div className={styles.resultsInfo}>
                    <span>{results.length} {t('category.products') || 'products found'}</span>
                  </div>
                  <div className={styles.resultsGrid}>
                    {results.map((product) => (
                      <motion.div 
                        key={product.id} 
                        className={styles.resultItem}
                        onClick={() => handleProductClick(product.slug)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className={styles.productImage}>
                          <Image 
                            src={product.primaryImage} 
                            alt={getProductName(product)}
                            fill
                            sizes="(max-width: 768px) 50vw, 20vw"
                            className={styles.image}
                          />
                        </div>
                        <div className={styles.productInfo}>
                          <h3 className={styles.productName}>{getProductName(product)}</h3>
                          <p className={styles.productPrice}>{new Intl.NumberFormat('uz-UZ').format(product.price)} UZS</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {!loading && query.trim().length >= 2 && results.length === 0 && (
                <div className={styles.noResults}>
                  <div className={styles.noResultsIllustration}>
                    <Search size={48} strokeWidth={1} />
                  </div>
                  <h3>{t('search.noResults') || 'No results found'}</h3>
                  <p>Try checking your spelling or use more general terms</p>
                </div>
              )}
              
              {!loading && query.trim().length < 2 && (
                <div className={styles.suggestions}>
                  <div className={styles.suggestionsGrid}>
                    <section className={styles.suggestionSection}>
                      <div className={styles.sectionHeader}>
                        <h4><TrendingUp size={16} /> {t('search.popular') || 'Popular Categories'}</h4>
                      </div>
                      <div className={styles.categoryLinks}>
                        <LinkItem href="/categories/new-in" label={lang === 'uz' ? 'Yangi To\'plam' : 'Новинки'} onClick={onClose} />
                        <LinkItem href="/categories/evening-wear" label={lang === 'uz' ? 'Oqshom Liboslari' : 'Вечерние Наряды'} onClick={onClose} />
                        <LinkItem href="/categories/outerwear" label={lang === 'uz' ? 'Ustki Kiyimlar' : 'Верхняя Одежда'} onClick={onClose} />
                        <LinkItem href="/categories/accessories" label={lang === 'uz' ? 'Aksessuarlar' : 'Аксессуары'} onClick={onClose} />
                      </div>
                    </section>

                    {recentSearches.length > 0 && (
                      <section className={styles.suggestionSection}>
                        <div className={styles.sectionHeader}>
                          <h4><History size={16} /> Recent Searches</h4>
                          <button onClick={clearRecent} className={styles.clearRecentBtn}>Clear all</button>
                        </div>
                        <div className={styles.recentTags}>
                          {recentSearches.map((s, idx) => (
                            <button key={idx} onClick={() => handleRecentClick(s)} className={styles.recentTag}>
                              {s}
                            </button>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>

                  {trending.length > 0 && (
                    <section className={styles.trendingSection}>
                      <div className={styles.sectionHeader}>
                        <h4>{t('home.featured.title') || 'Featured Selection'}</h4>
                      </div>
                      <div className={styles.resultsGrid}>
                        {trending.map((product) => (
                          <div 
                            key={product.id} 
                            className={styles.resultItem}
                            onClick={() => handleProductClick(product.slug)}
                          >
                            <div className={styles.productImage}>
                              <Image 
                                src={product.primaryImage} 
                                alt={getProductName(product)}
                                fill
                                sizes="(max-width: 768px) 50vw, 20vw"
                                className={styles.image}
                              />
                            </div>
                            <div className={styles.productInfo}>
                              <h3 className={styles.productName}>{getProductName(product)}</h3>
                              <p className={styles.productPrice}>{new Intl.NumberFormat('uz-UZ').format(product.price)} UZS</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}

function LinkItem({ href, label, onClick }: { href: string, label: string, onClick: () => void }) {
  const router = useRouter()
  return (
    <button 
      className={styles.categoryLink}
      onClick={() => {
        router.push(href)
        onClick()
      }}
    >
      <span>{label}</span>
      <ArrowRight size={14} className={styles.linkArrow} />
    </button>
  )
}
