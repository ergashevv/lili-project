import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = await prisma.product.findMany()
console.log('Products:', products.map(p => `${p.slug} | ${p.primaryImage}`))

await prisma.$disconnect()
