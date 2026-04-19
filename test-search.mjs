import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testSearch() {
  const query = 'Charm'
  console.log(`Searching for: ${query}`)
  
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { nameUz: { contains: query, mode: 'insensitive' } },
        { nameRu: { contains: query, mode: 'insensitive' } },
        { descriptionUz: { contains: query, mode: 'insensitive' } },
        { descriptionRu: { contains: query, mode: 'insensitive' } },
      ],
      isActive: true,
    },
  })
  
  console.log(`Found ${products.length} products:`)
  products.forEach(p => console.log(`- ${p.nameUz} (${p.slug})`))
}

testSearch()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
