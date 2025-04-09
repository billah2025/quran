'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Surah = {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
}

export default function QuranPage() {
  const [surahs, setSurahs] = useState<Surah[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://api.alquran.cloud/v1/quran/en.asad')
        const json = await res.json()

        if (!json.data || !json.data.surahs) {
          throw new Error('API data format is invalid')
        }

        const surahsData = json.data.surahs.map((s: Surah) => ({

          number: s.number,
          name: s.name,
          englishName: s.englishName,
          englishNameTranslation: s.englishNameTranslation,
        }))

        setSurahs(surahsData)
      } catch (err: unknown) {
        const error = err as Error
        console.error('Error fetching data:', error.message)
        setError('Failed to load Surah list. Please try again later.')
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-800">
        📖 List of Quran Surahs
      </h1>

      {error ? (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {surahs.map(surah => (
            <Link href={`/surah/${surah.number}`} key={surah.number}>
              <div className="bg-white shadow-md p-4 rounded-lg cursor-pointer hover:bg-green-100 transition-all border">
                <h2 className="text-xl font-semibold text-gray-600">
                  {surah.number}. {surah.englishName}
                </h2>
                <p className="text-gray-600 italic">{surah.englishNameTranslation}</p>
                <p className="text-right text-2xl text-green-700 font-arabic">{surah.name}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
