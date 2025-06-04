"use client";
import { useEffect, useState } from 'react'
import { auth, db } from '@/utils/firebase'
import { collectionGroup, getDocs } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
import UserAuthGuard from '@/app/components/UserAuthGuard'
import DeedsAnalyticsPage from '@/app/components/deedana'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
type PrayerDetail = {
  date: string;
  timing: string;
  reason: string;
};

const PRAYERS = ['Fajr', 'Dhor', 'Asr', 'Maghrib', 'Isha']
const TIMINGS = ['onTime', 'jamat', 'late', 'qaza']

export default function AnalyticsPage() {
  const [user, setUser] = useState<any>(null)
  const [prayerStats, setPrayerStats] = useState<Record<string, any>>({})
  const [dateStats, setDateStats] = useState<Record<string, any>>({})
  const [filteredPrayerStats, setFilteredPrayerStats] = useState<Record<string, any>>({})
  const [filteredDateStats, setFilteredDateStats] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [totalSummary, setTotalSummary] = useState<any>({})
  const [missedReasons, setMissedReasons] = useState<Record<string, number>>({})
  const [typeStats, setTypeStats] = useState<any>({ fard: 0, sunnah: 0, nafl: 0 })
  const [dailyCompletion, setDailyCompletion] = useState<any[]>([])
  const [streakInfo, setStreakInfo] = useState({ current: 0, max: 0 })
  const [selectedPrayer, setSelectedPrayer] = useState<string>('Fajr')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [navHeight, setNavHeight] = useState(0);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) setUser(u)
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    if (!user) return
    loadAnalytics()
  }, [user])

  async function loadAnalytics() {
    setLoading(true)
    const q = collectionGroup(db, 'prayers')
    const snapshot = await getDocs(q)

    const pStats: Record<string, any> = {}
    const dStats: Record<string, any> = {}
    const mReasons: Record<string, number> = {}
    const tStats = { fard: 0, sunnah: 0, nafl: 0 }
    const dCompletion: any[] = []

    const creationDate = dayjs(user.metadata.creationTime)
    const today = dayjs().startOf('day')
    const totalDays = today.diff(creationDate, 'day') + 1

    const allDates: string[] = []
    for (let i = 0; i < totalDays; i++) {
      const date = creationDate.add(i, 'day').format('YYYY-MM-DD')
      allDates.push(date)
    }

    for (const date of allDates) {
      if (!dStats[date]) dStats[date] = {}
      for (const p of PRAYERS) {
        dStats[date][p] = { completed: false, timing: 'missed' }
      }
    }

    snapshot.forEach(doc => {
      const path = doc.ref.path
      if (!path.includes(user.uid)) return
      const parts = path.split('/')
      const date = parts[3]
      const prayer = parts[5]
      const data = doc.data()

      if (!dStats[date]) dStats[date] = {}
      dStats[date][prayer] = data

      if (!pStats[prayer]) {
        pStats[prayer] = { total: 0, completed: 0, missed: 0, onTime: 0, jamat: 0, late: 0, qaza: 0, details: [] }
      }

      if (data.completed === true) {
        pStats[prayer].completed++
        if (data.timing) pStats[prayer][data.timing]++
      } else {
        pStats[prayer].missed++
        if (data.missedReason) mReasons[data.missedReason] = (mReasons[data.missedReason] || 0) + 1
      }

      pStats[prayer].details.push({ date, timing: data.timing || 'missed', reason: data.missedReason || '—' })

      if (data.completed) {
        if (data.fard) tStats.fard++
        if (data.sunnah) tStats.sunnah++
        if (data.nafl) tStats.nafl++
      }
    })

    for (const date of allDates) {
      for (const p of PRAYERS) {
        if (!pStats[p]) {
          pStats[p] = { total: 0, completed: 0, missed: 0, onTime: 0, jamat: 0, late: 0, qaza: 0, details: [] }
        }

        if (!dStats[date][p] || !dStats[date][p].completed) {
          pStats[p].missed++
          pStats[p].details.push({ date, timing: 'missed', reason: '—' })
        }

        pStats[p].total++
      }

      const completed = PRAYERS.filter(p => dStats[date][p]?.completed).length
      dCompletion.push({ date, percent: Math.round((completed / 5) * 100) })
    }

    const totalSum = { total: totalDays * 5, completed: 0, missed: 0, onTime: 0, jamat: 0, late: 0, qaza: 0 }
    PRAYERS.forEach(p => {
      const stat = pStats[p] || {}
      totalSum.completed += stat.completed || 0
      totalSum.missed += stat.missed || 0
      totalSum.onTime += stat.onTime || 0
      totalSum.jamat += stat.jamat || 0
      totalSum.late += stat.late || 0
      totalSum.qaza += stat.qaza || 0
    })

    const dates = Object.keys(dStats).sort()
    let streak = 0, maxStreak = 0
    for (let i = dates.length - 1; i >= 0; i--) {
      const prayers = dStats[dates[i]]
      const allCompleted = PRAYERS.every(p => prayers[p]?.completed)
      if (allCompleted) {
        streak++
        maxStreak = Math.max(maxStreak, streak)
      } else {
        streak = 0
      }
    }

    setPrayerStats(pStats)
    setDateStats(dStats)
    setFilteredPrayerStats(pStats)
    setFilteredDateStats(dStats)
    setMissedReasons(mReasons)
    setTypeStats(tStats)
    setTotalSummary(totalSum)
    setDailyCompletion(dCompletion)
    setStreakInfo({ current: streak, max: maxStreak })
    setLoading(false)
  }

  function applyDateFilter() {
    if (!startDate || !endDate) return
    const filteredDates = Object.keys(dateStats).filter(d =>
      dayjs(d).isSameOrAfter(dayjs(startDate)) && dayjs(d).isSameOrBefore(dayjs(endDate))
    )

    const fDateStats: Record<string, any> = {}
    const fPrayerStats: Record<string, any> = {}

    filteredDates.forEach(date => {
      fDateStats[date] = dateStats[date]
      for (const p of PRAYERS) {
        const entry = dateStats[date][p]
        if (!fPrayerStats[p]) {
          fPrayerStats[p] = { total: 0, completed: 0, missed: 0, onTime: 0, jamat: 0, late: 0, qaza: 0, details: [] }
        }

        fPrayerStats[p].total++
        if (entry?.completed) {
          fPrayerStats[p].completed++
          if (entry.timing) fPrayerStats[p][entry.timing]++
        } else {
          fPrayerStats[p].missed++
        }
        fPrayerStats[p].details.push({
          date,
          timing: entry?.timing || 'missed',
          reason: entry?.missedReason || '—'
        })
      }
    })

    setFilteredDateStats(fDateStats)
    setFilteredPrayerStats(fPrayerStats)
  }

  function clearDateFilter() {
    setStartDate('')
    setEndDate('')
    setFilteredDateStats(dateStats)
    setFilteredPrayerStats(prayerStats)
  }

  return (
    <UserAuthGuard>
      <div>
        <Navbar setNavHeight={setNavHeight} />
        <div style={{ paddingTop: `${navHeight}px` }}>
          <div className="text-black  mx-auto p-4 bg-gradient-to-br from-green-50 to-blue-100 rounded-xl shadow-xl">
            <h1 className="text-3xl font-bold text-center text-green-900 mb-6 border-b pb-2">📿 Prayer Analytics</h1>


            {loading ? (
              <div>Loading analytics...</div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-green-800 mb-2">Quick Summary</h2>
                  <table className="w-full text-sm border bg-white mb-6">
                    <thead>
                      <tr className="bg-green-200">
                        <th className="border px-2 py-1">Total Days</th>
                        <th className="border px-2 py-1">Total on Jamat</th>
                        <th className="border px-2 py-1">Total Late</th>
                        <th className="border px-2 py-1">Total Qaza</th>
                        <th className="border px-2 py-1">Total Missed</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-center">
                        <td className="border px-2 py-1">{Object.keys(dateStats).length}</td>
                        <td className="border px-2 py-1">{totalSummary.jamat}</td>
                        <td className="border px-2 py-1">{totalSummary.late}</td>
                        <td className="border px-2 py-1">{totalSummary.qaza}</td>
                        <td className="border px-2 py-1">{totalSummary.missed}</td>
                      </tr>
                    </tbody>
                  </table>
                  {/* Date Filter */}
                  <div className="flex flex-wrap gap-4 items-end mb-6">
                    <div>
                      <label className="block text-green-800 font-medium mb-1">Start Date</label>
                      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border p-2 rounded" />
                    </div>
                    <div>
                      <label className="block text-green-800 font-medium mb-1">End Date</label>
                      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border p-2 rounded" />
                    </div>
                    <button onClick={applyDateFilter} className="bg-green-600 text-white px-4 py-2 rounded">Apply</button>
                    <button onClick={clearDateFilter} className="bg-gray-300 text-gray-800 px-4 py-2 rounded">Remove</button>
                  </div>
                  <h2 className="text-2xl font-semibold text-green-800 mb-2">All Salah Summary</h2>
                  <table className="w-full text-sm border bg-white mb-6">
                    <thead>
                      <tr className="bg-green-100">
                        <th className="border px-2 py-1">Salah</th>
                        <th className="border px-2 py-1">Total</th>
                        <th className="border px-2 py-1">Jamat</th>
                        <th className="border px-2 py-1">Late</th>
                        <th className="border px-2 py-1">Qaza</th>
                        <th className="border px-2 py-1">Missed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PRAYERS.map(p => (
                        <tr key={p} className="text-center">
                          <td className="border px-2 py-1 font-semibold text-green-700">{p}</td>
                          <td className="border px-2 py-1">{filteredPrayerStats[p]?.total || 0}</td>
                          <td className="border px-2 py-1">{prayerStats[p]?.jamat || 0}</td>
                          <td className="border px-2 py-1">{prayerStats[p]?.late || 0}</td>
                          <td className="border px-2 py-1">{prayerStats[p]?.qaza || 0}</td>
                          <td className="border px-2 py-1">{prayerStats[p]?.missed || 0}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <h2 className="text-2xl font-semibold text-green-800 mb-2">Detail Summary</h2>
                  <table className="w-full text-sm border bg-white mb-6">
                    <thead>
                      <tr className="bg-blue-100 text-center">
                        <th className="border px-2 py-1">Date</th>
                        <th className="border px-2 py-1">Day</th>
                        {PRAYERS.map(p => (
                          <th key={p} className="border px-2 py-1">{p}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(filteredDateStats).sort(([a], [b]) => b.localeCompare(a)).map(([date, prayers]: any, i) => (

                        <tr key={i} className="text-center">
                          <td className="border px-2 py-1">{date}</td>
                          <td className="border px-2 py-1">{dayjs(date).format('dddd')}</td>
                          {PRAYERS.map(p => (
                            <td key={p} className="border px-2 py-1 capitalize text-green-900">
                              {prayers[p]?.timing || (prayers[p]?.completed ? '✓' : 'missed') || '—'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Summary by Prayer */}
                  <div className="mb-10">
                    <h2 className="text-2xl font-semibold text-green-800 mb-4">Summary by Prayer</h2>
                    <div className="flex gap-2 mb-4">
                      {PRAYERS.map((p) => (
                        <button
                          key={p}
                          onClick={() => setSelectedPrayer(p)}
                          className={`px-3 py-1 rounded-full border ${selectedPrayer === p ? 'bg-green-600 text-white' : 'bg-white text-green-700'
                            }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>

                    {['onTime', 'jamat', 'late', 'qaza', 'missed'].map((status) => (
                      <div key={status} className="mb-6">
                        <h3 className="text-lg font-bold text-green-700 capitalize">{status}</h3>
                        <table className="w-full text-sm border bg-white">
                          <thead>
                            <tr className="bg-green-100">
                              <th className="border px-2 py-1">Date</th>
                              <th className="border px-2 py-1">Day</th>
                              <th className="border px-2 py-1">Status</th>
                              <th className="border px-2 py-1">Reason</th>
                            </tr>
                          </thead>
                          <tbody>
                            {prayerStats[selectedPrayer]?.details
                              ?.filter((d: PrayerDetail) => d.timing === status)
                              ?.map((d: PrayerDetail, i: number) => (
                                <tr key={i} className="text-center">
                                  <td className="border px-2 py-1">{d.date}</td>
                                  <td className="border px-2 py-1">
                                    {dayjs(d.date).format('dddd')}
                                  </td>
                                  <td className="border px-2 py-1">{d.timing}</td>
                                  <td className="border px-2 py-1">{d.reason || '—'}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>

                </div>
              </>
            )}
            <DeedsAnalyticsPage />
          </div></div><Footer /></div>
    </UserAuthGuard>
  )
}
