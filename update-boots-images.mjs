import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const slug = 'leather-ankle-boots'
  const product = await prisma.product.findUnique({ where: { slug } })

  if (product) {
    await prisma.product.update({
      where: { id: product.id },
      data: {
        primaryImage: '/images/leather-ankle-boots-1.png',
        images: [
          '/images/leather-ankle-boots-2.png',
          '/images/leather-ankle-boots-3.png'
        ]
      }
    })
    console.log(`Successfully updated images for product: ${slug}`)
  } else {
    console.error(`Product with slug ${slug} not found`)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
