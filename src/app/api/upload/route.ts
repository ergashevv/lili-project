import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const filename = searchParams.get('filename')

  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 })
  }

  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  let session = null
  if (token) {
    session = await verifyToken(token)
  }

  if (!session || session.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!request.body) {
    return NextResponse.json({ error: 'Body is empty' }, { status: 400 })
  }

  try {
    const blob = await put(filename, request.body, {
      access: 'public',
    })
    return NextResponse.json(blob)
  } catch (error) {
    console.error('Blob upload error:', error)
    return NextResponse.json({ error: 'Blob upload failed. Make sure BLOB_READ_WRITE_TOKEN is set.' }, { status: 500 })
  }
}
