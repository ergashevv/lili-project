import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const updates = [
  { slug: 'unforgettable-evening', imageUrl: '/images/category-evening.png' },
  { slug: 'breath-of-spring',      imageUrl: '/images/category-spring.png' },
  { slug: 'business-style',        imageUrl: '/images/category-business.png' },
  { slug: 'elegant-accessories',   imageUrl: '/images/category-accessories.png' },
]

for (const { slug, imageUrl } of updates) {
  await prisma.category.update({
    where: { slug },
    data: { imageUrl }
  })
  console.log(`Updated: ${slug}`)
}

// Also update royal-velvet-dress product images
const prod = await prisma.product.findFirst({ where: { slug: 'royal-velvet-dress' } })
if (prod) {
  await prisma.product.update({
    where: { id: prod.id },
    data: {
      primaryImage: '/images/royal-velvet-dress-1.png',
      images: ['/images/royal-velvet-dress-2.png', '/images/royal-velvet-dress-3.png']
    }
  })
  console.log('Updated product: royal-velvet-dress')
}

await prisma.$disconnect()
console.log('All done!')
