import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './Providers'

const siteUrl = 'https://www.lili.uz'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Lili',
  url: siteUrl,
  logo: `${siteUrl}/logo-lili.svg`,
  description:
    'Lili — магазин женской одежды премиум-класса в Узбекистане. Платья, костюмы и аксессуары для особых случаев и на каждый день.',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Lili — женская одежда премиум-класса',
    template: '%s | Lili',
  },
  description:
    'Lili — магазин женской одежды премиум-класса в Узбекистане. Premium liboslar va aksessuarlar rus va o‘zbek tillarida.',
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Lili — женская одежда премиум-класса',
    description:
      'Интернет-магазин женской одежды премиум-класса в Узбекистане. Эксклюзивные платья, костюмы и аксессуары.',
    siteName: 'Lili',
    locale: 'ru_RU',
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: '/logo-lili.svg',
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
