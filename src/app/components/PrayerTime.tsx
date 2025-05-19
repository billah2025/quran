'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import 'dayjs/locale/en'
import { getDate } from 'bangla-calendar'

dayjs.extend(duration)
dayjs.extend(advancedFormat)

const PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']

const CITIES = [
  'Bagerhat', 'Bandarban', 'Barguna', 'Barisal', 'Bhola', 'Bogra', 'Brahmanbaria',
  'Chandpur', 'Chapainawabganj', 'Chattogram', 'Chuadanga', 'Comilla', 'Coxs Bazar',
  'Dhaka', 'Dinajpur', 'Faridpur', 'Feni', 'Gaibandha', 'Gazipur', 'Gopalganj',
  'Habiganj', 'Jamalpur', 'Jessore', 'Jhalokathi', 'Jhenaidah', 'Joypurhat', 'Khagrachari',
  'Khulna', 'Kishoreganj', 'Kurigram', 'Kushtia', 'Lakshmipur', 'Lalmonirhat', 'Madaripur',
  'Magura', 'Manikganj', 'Meherpur', 'Moulvibazar', 'Munshiganj', 'Mymensingh', 'Naogaon',
  'Narail', 'Narayanganj', 'Narsingdi', 'Natore', 'Netrokona', 'Nilphamari', 'Noakhali',
  'Pabna', 'Panchagarh', 'Patuakhali', 'Pirojpur', 'Rajbari', 'Rajshahi', 'Rangamati',
  'Rangpur', 'Satkhira', 'Shariatpur', 'Sherpur', 'Sirajganj', 'Sunamganj', 'Sylhet',
  'Tangail', 'Thakurgaon'
]

export default function PrayerTimes() {
  const [city, setCity] = useState('Dhaka')
  const [times, setTimes] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [now, setNow] = useState(dayjs())
  const [hijri, setHijri] = useState('')
  const [banglaDate, setBanglaDate] = useState('')
  const [countdown, setCountdown] = useState('')

  useEffect(() => {
    fetchTimes(city)
  }, [city])

  useEffect(() => {
    const interval = setInterval(() => setNow(dayjs()), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const today = new Date()
    const banglaDateString = getDate(today)
    setBanglaDate(banglaDateString || 'বাংলা তারিখ পাওয়া যায়নি')
  }, [])

  useEffect(() => {
    if (!times) return

    const interval = setInterval(() => {
      const current = getCurrentPrayer()
      if (current) {
        const end = getEndTime(current)
        const remaining = end.diff(dayjs())
        if (remaining > 0) {
          const dur = dayjs.duration(remaining)
          setCountdown(
            `${dur.hours().toString().padStart(2, '0')}:${dur.minutes().toString().padStart(2, '0')}:${dur.seconds().toString().padStart(2, '0')}`
          )
        } else {
          setCountdown('00:00:00')
        }
      } else {
        setCountdown('')
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [times])

  const fetchTimes = async (cityName: string) => {
    setLoading(true)
    const res = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?city=${cityName}&country=Bangladesh&method=5`
    )
    const data = res.data.data
    setTimes(data.timings)
    setHijri(
      `${data.date.hijri.day} ${data.date.hijri.month.en} ${data.date.hijri.year}`
    )
    setLoading(false)
  }

  const format12 = (timeStr: string) => toTodayTime(timeStr).format('h:mm A')

  const toTodayTime = (timeStr: string) => {
    const [hour, minute] = timeStr.split(':').map(Number)
    let time = dayjs().set('hour', hour).set('minute', minute).set('second', 0)
    if (now.hour() >= 22 && hour < 5) time = time.add(1, 'day')
    return time
  }

  const getEndTime = (prayer: string) => {
    if (!times) return dayjs()
    switch (prayer) {
      case 'Fajr': return toTodayTime(times['Sunrise'])
      case 'Dhuhr': return toTodayTime(times['Asr'])
      case 'Asr': return toTodayTime(times['Maghrib'])
      case 'Maghrib': return toTodayTime(times['Isha'])
      case 'Isha': return toTodayTime(times['Fajr']).add(1, 'day')
      default: return dayjs()
    }
  }

  const isCurrent = (adhan: string, end: dayjs.Dayjs) => {
    const start = toTodayTime(adhan)
    return now.isAfter(start) && now.isBefore(end)
  }

  const getCurrentPrayer = () => {
    if (!times) return null
    for (const prayer of PRAYERS) {
      const end = getEndTime(prayer)
      if (isCurrent(times[prayer], end)) return prayer
    }
    return null
  }

  if (loading || !times)
    return <div className="text-center py-10">🔄 নামাজের সময়সূচি লোড হচ্ছে...</div>

  const currentPrayer = getCurrentPrayer()

  return (
    <div className="max-w-xl mx-auto bg-gradient-to-br from-emerald-100 to-white p-6 rounded-xl shadow-md border border-emerald-300">
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm text-emerald-800">🕌 জেলা নির্বাচন করুন:</label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 text-black"
        >
          {CITIES.map((zila) => (
            <option key={zila} value={zila}>{zila}</option>
          ))}
        </select>
      </div>

      <h2 className="text-xl font-bold mb-1 text-emerald-800">📿 {city} - নামাজের সময়সূচি</h2>
      <h1 className="text-gray-600 mb-4 text-sm">
        📅 {now.format('dddd, MMMM D, YYYY')} | 🕋 {hijri} | 📆 {banglaDate}
      </h1>

      <div className="flex justify-between items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg mb-4">
        <span>☀️ সূর্যোদয়</span>
        <span>{format12(times.Sunrise)}</span>
      </div>

      <div className="grid grid-cols-4 text-center text-sm font-semibold border-b py-2 border-emerald-300 text-black">
        <div>নামাজ</div>
        <div>আজান</div>
        <div>ইকামত</div>
        <div>শেষ সময়</div>
      </div>

      {PRAYERS.map((prayer) => {
        const adhan = times[prayer]
        const iqamah = toTodayTime(adhan).add(20, 'minute')
        const end = getEndTime(prayer)
        const highlight = isCurrent(adhan, end)
        return (
          <div
            key={prayer}
            className={`text-black grid grid-cols-4 items-center text-center py-2 rounded-xl transition ${highlight ? 'bg-emerald-200 text-emerald-900 font-semibold' : ''}`}
          >
            <div>{prayer}</div>
            <div>{format12(adhan)}</div>
            <div>{iqamah.format('h:mm A')}</div>
            <div>{end.format('h:mm A')}</div>
          </div>
        )
      })}

      {currentPrayer && (
        <div className="mt-4 text-center text-lg font-bold text-green-800 bg-green-100 py-2 rounded-lg">
          🕒 {currentPrayer} শেষ সময় বাকি: {countdown}
        </div>
      )}

      <div className="mt-6 border-t pt-4">
        <div className="text-center font-bold text-lg mb-2 text-emerald-800">জুমার নামাজ</div>
        <div className="grid grid-cols-3 items-center text-center text-gray-600">
          <div>জুমা</div>
          <div>1:00 PM</div>
          <div>1:30 PM</div>
        </div>
      </div>

      <div className="flex justify-between items-center bg-orange-100 text-orange-700 px-4 py-2 rounded-lg mt-6">
        <span>🌇 সূর্যাস্ত</span>
        <span>{format12(times.Sunset)}</span>
      </div>
    </div>
  )
}
