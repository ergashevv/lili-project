import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './Providers'

const siteUrl = 'https://www.simpatiya.uz'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Simpaty',
  url: siteUrl,
  logo: `${siteUrl}/logo-simpaty.svg`,
  description:
    'Simpaty — магазин женской одежды премиум-класса в Узбекистане. Платья, костюмы и аксессуары для особых случаев и на каждый день.',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Simpaty — женская одежда премиум-класса',
    template: '%s | Simpaty',
  },
  description:
    'Simpaty — магазин женской одежды премиум-класса в Узбекистане. Premium liboslar va aksessuarlar rus va o‘zbek tillarida.',
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Simpaty — женская одежда премиум-класса',
    description:
      'Интернет-магазин женской одежды премиум-класса в Узбекистане. Эксклюзивные платья, костюмы и аксессуары.',
    siteName: 'Simpaty',
    locale: 'ru_RU',
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: '/logo-simpaty.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          {children}
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  )
}
