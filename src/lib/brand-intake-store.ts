import { randomUUID } from 'crypto'
import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'

export type BrandIntakeAnswers = Record<string, string>

export type BrandIntakeRecord = {
  id: string
  brandName: string
  contactName: string
  email: string
  phone: string | null
  website: string | null
  answers: Prisma.JsonValue
  createdAt: Date
  updatedAt: Date
}

export type BrandIntakeInput = {
  brandName: string
  contactName: string
  email: string
  phone: string | null
  website: string | null
  answers: BrandIntakeAnswers
}

type BrandIntakeDelegate = {
  create: (args: { data: BrandIntakeInput & { answers: Prisma.JsonObject } }) => Promise<BrandIntakeRecord>
  findMany: (args: { orderBy: { createdAt: 'asc' | 'desc' }; take: number }) => Promise<BrandIntakeRecord[]>
  count: () => Promise<number>
}

function getBrandIntakeDelegate() {
  return (prisma as typeof prisma & { brandIntake?: BrandIntakeDelegate }).brandIntake
}

function normalizeAnswers(value: Prisma.JsonValue): BrandIntakeAnswers {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as BrandIntakeAnswers
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed as BrandIntakeAnswers
      }
    } catch {
      return {}
    }
  }

  return {}
}

function normalizeRecord(record: BrandIntakeRecord): BrandIntakeRecord {
  return {
    ...record,
    answers: normalizeAnswers(record.answers),
    createdAt: new Date(record.createdAt),
    updatedAt: new Date(record.updatedAt),
  }
}

async function createWithRawQuery(input: BrandIntakeInput): Promise<BrandIntakeRecord> {
  const rows = await prisma.$queryRaw<BrandIntakeRecord[]>`
    INSERT INTO "BrandIntake" (
      "id",
      "brandName",
      "contactName",
      "email",
      "phone",
      "website",
      "answers",
      "createdAt",
      "updatedAt"
    )
    VALUES (
      ${randomUUID()},
      ${input.brandName},
      ${input.contactName},
      ${input.email},
      ${input.phone},
      ${input.website},
      ${JSON.stringify(input.answers)}::jsonb,
      NOW(),
      NOW()
    )
    RETURNING *
  `

  if (!rows[0]) {
    throw new Error('Failed to create brand intake entry.')
  }

  return normalizeRecord(rows[0])
}

async function findManyWithRawQuery(take: number): Promise<BrandIntakeRecord[]> {
  const rows = await prisma.$queryRaw<BrandIntakeRecord[]>`
    SELECT *
    FROM "BrandIntake"
    ORDER BY "createdAt" DESC
    LIMIT ${take}
  `

  return rows.map(normalizeRecord)
}

async function countWithRawQuery(): Promise<number> {
  const rows = await prisma.$queryRaw<Array<{ count: number | string | bigint }>>`
    SELECT COUNT(*)::int AS count
    FROM "BrandIntake"
  `

  return Number(rows[0]?.count || 0)
}

export async function createBrandIntakeEntry(input: BrandIntakeInput) {
  const delegate = getBrandIntakeDelegate()

  if (delegate) {
    return delegate.create({
      data: input,
    })
  }

  return createWithRawQuery(input)
}

export async function listRecentBrandIntakes(take = 5) {
  const delegate = getBrandIntakeDelegate()

  if (delegate) {
    return delegate.findMany({
      orderBy: { createdAt: 'desc' },
      take,
    })
  }

  return findManyWithRawQuery(take)
}

export async function countBrandIntakes() {
  const delegate = getBrandIntakeDelegate()

  if (delegate) {
    return delegate.count()
  }

  return countWithRawQuery()
}
