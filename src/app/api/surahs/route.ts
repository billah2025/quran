// app/api/surahs/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await fetch('https://api.quran.foundation/v1/quran/surahs?script=indopak', {
      headers: {
        'Client-ID': '4bc79dad-5c91-4789-9646-95969f536a7c',
        'Client-Secret': 'WziSRCwCP5H90.LrsgpXqzUuoT',
      },
    })

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error('Server Error:', err)
    return NextResponse.json({ error: 'Failed to fetch Surah list' }, { status: 500 })
  }
}
