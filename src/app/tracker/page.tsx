'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth, db } from '@/utils/firebase'
import LogoutButton from '@/app/components/LogoutButton'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
} from 'firebase/firestore'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import dayjs from 'dayjs'
import UserAuthGuard from '@/app/components/UserAuthGuard'
import { FaUserCircle } from 'react-icons/fa'
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import DeedManager from '@/app/components/DeedsManager'
const PRAYERS = ['Fajr', 'Dhor', 'Asr', 'Maghrib', 'Isha']

export default function TrackerPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [date, setDate] = useState(dayjs())
  const [savedPrayers, setSavedPrayers] = useState<Record<string, any>>({})
  const [draftPrayers, setDraftPrayers] = useState<Record<string, any>>({})
  const [savingStatus, setSavingStatus] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)
  const [deedCheckedItems, setDeedCheckedItems] = useState<Record<string, string[]>>({})
  const [avatarOpen, setAvatarOpen] = useState(false)
  //nav height 
  const [navHeight, setNavHeight] = useState(0);
   const [isPopupOpen, setPopupOpen] = useState(false)
  type Deed = {
    id: string
    name?: string
    target?: number
    unit?: string
    [key: string]: any
  }
  const [deeds, setDeeds] = useState<Deed[]>([])
  const [deedDrafts, setDeedDrafts] = useState<Record<string, number>>({})
  const [deedSaving, setDeedSaving] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) setUser(u)
      else router.push('/user-auth')
    })
    return () => unsub()
  }, [router])

  useEffect(() => {
    if (!user) return
    loadPrayerData()
    loadDeeds()
  }, [user, date])

  const formatDate = (d: dayjs.Dayjs) => d.format('YYYY-MM-DD')

  async function loadPrayerData() {
    setLoading(true)
    const promises = PRAYERS.map(async (p) => {
      const ref = doc(db, 'prayers', user.uid, 'records', formatDate(date), 'prayers', p)
      const snap = await getDoc(ref)
      return { [p]: snap.exists() ? snap.data() : {} }
    })
    const results = await Promise.all(promises)
    const data = Object.assign({}, ...results)
    setSavedPrayers(data)
    setDraftPrayers(JSON.parse(JSON.stringify(data)))
    setSavingStatus({})
    setLoading(false)
  }

  function updateDraft(prayer: string, field: string, value: any) {
    setDraftPrayers(prev => ({
      ...prev,
      [prayer]: {
        ...(prev[prayer] || {}),
        [field]: value,
      },
    }))
  }

  async function savePrayer(prayer: string) {
    if (!user) return
    setSavingStatus(prev => ({ ...prev, [prayer]: true }))
    const ref = doc(db, 'prayers', user.uid, 'records', formatDate(date), 'prayers', prayer)
    await setDoc(ref, draftPrayers[prayer] || {}, { merge: true })
    setSavedPrayers(prev => ({ ...prev, [prayer]: { ...draftPrayers[prayer] } }))
    setSavingStatus(prev => ({ ...prev, [prayer]: false }))
  }

  function resetPrayer(prayer: string) {
    setDraftPrayers(prev => ({
      ...prev,
      [prayer]: { ...savedPrayers[prayer] },
    }))
  }

  function updateDeedValue(id: string, value: number) {
    setDeedDrafts(prev => ({
      ...prev,
      [id]: value,
    }))
  }

  async function loadDeeds() {
    const q = query(collection(db, 'deeds'), where('userId', '==', user.uid))
    const snapshot = await getDocs(q)
    const today = formatDate(date)
    const dayName = date.format('dddd')

    const filtered = snapshot.docs.map(doc => {
      const data = doc.data() as Deed
      return { ...data, id: doc.id }
    }).filter((d: Deed) => {
      const showOnDates = d.showOnDates || []
      const showOnDays = d.showOnDays || []
      const durationStart = dayjs(d.createdAt?.toDate?.() || d.createdAt)
      const durationEnd = d.durationDays ? durationStart.add(d.durationDays, 'day') : null
      const isInDuration = !durationEnd || date.isBefore(durationEnd, 'day')
      const matchesDate = showOnDates.includes(today)
      const matchesDay = showOnDays.includes(dayName)
      return isInDuration && (matchesDate || matchesDay || (showOnDates.length === 0 && showOnDays.length === 0))
    })

    setDeeds(filtered)

    const inputPromises = filtered.map(async (d) => {
      const ref = doc(db, 'users', user.uid, 'records', formatDate(date), 'deeds', d.id)
      const snap = await getDoc(ref)
      const data = snap.exists() ? snap.data() : {}
      return {
        [d.id]: data.value || 0,
        [`${d.id}_checked`]: data.checkedItems || [],
      }
    })
    const results = await Promise.all(inputPromises)
    const inputs: Record<string, number> = {}
    const checks: Record<string, string[]> = {}
    results.forEach((res) => {
      Object.keys(res).forEach((k) => {
        if (k.endsWith('_checked')) checks[k.replace('_checked', '')] = res[k]
        else inputs[k] = res[k]
      })
    })
    setDeedDrafts(inputs)
    setDeedCheckedItems(checks)
  }

  async function saveDeed(id: string) {
    if (!user) return
    setDeedSaving(prev => ({ ...prev, [id]: true }))
    const ref = doc(db, 'users', user.uid, 'records', formatDate(date), 'deeds', id)
    await setDoc(ref, {
      value: deedDrafts[id] || 0,
      checkedItems: deedCheckedItems[id] || [],
    }, { merge: true })
    setDeedSaving(prev => ({ ...prev, [id]: false }))
  }

  function toggleDeedItemCheck(deedId: string, item: string) {
    setDeedCheckedItems(prev => {
      const existing = prev[deedId] || []
      const updated = existing.includes(item)
        ? existing.filter(i => i !== item)
        : [...existing, item]
      return {
        ...prev,
        [deedId]: updated,
      }
    })
  }

  const goToPrev = () => setDate(date.subtract(1, 'day'))
  const goToNext = () => {
    if (date.isSame(dayjs(), 'day')) return
    setDate(date.add(1, 'day'))
  }

  if (!user) return <div>Loading...</div>

  return (
    <UserAuthGuard>
      <div>
        <Navbar setNavHeight={setNavHeight} />
        <div style={{ paddingTop: `${navHeight}px` }}></div>
        <div
          className="  mx-auto p-6 space-y-8 min-h-screen bg-gradient-to-br from-green-50 to-blue-100 "
          style={{


            

            backgroundSize: 'cover',
          }}
        >
          <header className="flex justify-between items-center border-b border-black pb-4">
            <h1 className="text-3xl font-extrabold text-black">🕌 Prayer Tracker </h1>
            <div className="relative">
              <button
                onClick={() => setAvatarOpen(!avatarOpen)}
                className="text-black text-4xl hover:text-green-900 transition-colors"
                aria-label="User menu"
              >
                <FaUserCircle />
              </button>
              {avatarOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-white rounded-lg shadow-lg z-50 text-base text-black font-medium">
                  <div className="px-5 py-3 border-b border-black">{user.email}</div>
                  <button
                    className="w-full text-left px-5 py-3 hover:bg-green-100 transition-colors"
                    onClick={() => router.push('/analytics')}
                  >
                    📊 Analytics
                  </button>
                   <div className="w-full text-left px-5 py-3 hover:bg-green-100 transition-colors" > <button
                    onClick={() => setPopupOpen(true)}
                    className="w-full text-left p-4  bg-green-700 text-white rounded hover:bg-green-800"
                  >
                    + Add Deed
                  </button>
                  </div>
                  <div className="w-full text-left px-5 py-3 hover:bg-green-100 transition-colors" >  <LogoutButton /></div>
                 


                </div>
              )}

             
            </div>
          
          </header>
          

          <div className="flex justify-center items-center gap-6 text-black font-semibold text-lg">
            <button
              onClick={goToPrev}
              className="px-4 py-2 bg-green-100 rounded-lg hover:bg-green-200 transition-colors shadow"
            >
              ←
            </button>
            <div>{date.format('DD MMM YYYY')}</div>
              <div>{date.format('dddd')}</div>
            <button
              onClick={goToNext}
              className={`px-4 py-2 rounded-lg shadow ${date.isSame(dayjs(), 'day')
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-green-100 hover:bg-green-200 text-black'
                }`}
              disabled={date.isSame(dayjs(), 'day')}
            >
              →
            </button>
          </div>

          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory py-4">
            {PRAYERS.map((p) => {
              const d = draftPrayers[p] || {};
              return (
                <div
                  key={p}
                  className="min-w-[320px] snap-start flex-shrink-0 border border-black bg-green-50 rounded-3xl shadow-lg p-6 space-y-4"
                >
                  <h2 className="text-2xl font-semibold text-black">{p}</h2>
                  <div className="flex gap-3">
                    <button
                      className={`flex-1 py-2 rounded-lg text-lg font-medium transition-colors ${d.completed ? 'bg-green-700 text-white' : 'bg-gray-200 text-black hover:bg-green-300'
                        }`}
                      onClick={() => updateDraft(p, 'completed', true)}
                    >
                      Completed
                    </button>
                    <button
                      className={`flex-1 py-2 rounded-lg text-lg font-medium transition-colors ${d.completed === false ? 'bg-red-700 text-white' : 'bg-gray-200 text-black hover:bg-red-300'
                        }`}
                      onClick={() => updateDraft(p, 'completed', false)}
                    >
                      Missed
                    </button>
                  </div>

                  {d.completed ? (
                    <>
                      <div className="text-base space-y-2">
                        <label className="block font-semibold text-black ">Timing:</label>
                        {['onTime', 'jamat', 'late', 'qaza'].map((opt) => (
                          <label key={opt} className="flex items-center gap-3 text-black">
                            <input
                              type="radio"
                              name={`${p}-timing`}
                              checked={d.timing === opt}
                              onChange={() => updateDraft(p, 'timing', opt)}
                              className="w-5 h-5"
                            />
                            <span className="capitalize">{opt}</span>
                          </label>
                        ))}
                      </div>
                      <div className="text-base mt-4 space-y-2">
                        <label className="block font-semibold text-black ">Check-box:</label>
                        {['fard', 'sunnah', 'nafl'].map((unit) => (
                          <label key={unit} className="flex items-center gap-3 text-black">
                            <input
                              type="checkbox"
                              checked={!!d[unit]}
                              onChange={(e) => updateDraft(p, unit, e.target.checked)}
                              className="w-5 h-5"
                            />
                            <span className="capitalize">{unit}</span>
                          </label>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div>
                      <label className="block text-base font-semibold text-black">Missed Reason:</label>
                      <textarea
                        value={d.missedReason || ''}
                        onChange={(e) => updateDraft(p, 'missedReason', e.target.value)}
                        className="w-full mt-2 border border-black rounded-lg p-3 text-base text-black resize-none"
                        rows={4}
                        placeholder="Optional"
                      />
                    </div>
                  )}

                  <div className="flex gap-4 mt-4 justify-end">
                    <button
                      onClick={() => resetPrayer(p)}
                      className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-black font-semibold text-sm transition-colors"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => savePrayer(p)}
                      disabled={savingStatus[p]}
                      className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900 text-sm font-semibold transition-colors disabled:opacity-60"
                    >
                      {savingStatus[p] ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Deed Cards */}

            {deeds.map((d) => (
              <div
                key={d.id}
                className="min-w-[320px] snap-start flex-shrink-0 border border-black bg-yellow-50 rounded-3xl shadow-lg p-6 space-y-5"
              >
                <h2 className="text-2xl font-semibold text-black">{d.name}</h2>
                <p className="text-base text-black font-medium">
                  Target: {d.target} {d.unit}
                </p>

                <input
                  type="number"
                  className="w-full border border-black rounded-lg p-3 text-base text-black"
                  value={deedDrafts[d.id] || 0}
                  onChange={(e) => updateDeedValue(d.id, parseInt(e.target.value || '0'))}
                />

                {/* ✨ ADDED checkmark inputs */}
                {Array.isArray(d.checkmarks) && d.checkmarks.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {d.checkmarks.map((item: string) => (
                      <label key={item} className="flex items-center gap-3 text-base text-black font-medium">
                        <input
                          type="checkbox"
                          checked={deedCheckedItems[d.id]?.includes(item) || false}
                          onChange={() => toggleDeedItemCheck(d.id, item)}
                          className="w-5 h-5"
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                )}

                <div className="flex justify-end mt-5">
                  <button
                    onClick={() => saveDeed(d.id)}
                    disabled={deedSaving[d.id]}
                    className="px-5 py-2 bg-yellow-700 text-black rounded-lg hover:bg-yellow-800 font-semibold transition-colors disabled:opacity-60"
                  >
                    {deedSaving[d.id] ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {loading && <div className="text-center text-black font-medium mt-10">Loading data...</div>}
        </div>
        <Footer />
        <div className='mt-10 ' >
           <DeedManager isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
        </div>
        
      </div>

    </UserAuthGuard>

  )
}
