'use client'

import { useState, useEffect, useCallback } from 'react'
import { auth, db as firestore } from '@/utils/firebase'
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

type DeedManagerProps = {
  isOpen: boolean
  onClose: () => void
}

export default function DeedManager({ isOpen, onClose }: DeedManagerProps) {
  const [user, setUser] = useState<any>(null)
  const [deeds, setDeeds] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [newDeedName, setNewDeedName] = useState('')
  const [newDeedTarget, setNewDeedTarget] = useState('')
  const [newDeedUnit, setNewDeedUnit] = useState('times')
  const [newDeedDuration, setNewDeedDuration] = useState(30)
  const [checkmarks, setCheckmarks] = useState<string[]>([''])
  const [selectedDates, setSelectedDates] = useState<string[]>([])
  const [selectedDays, setSelectedDays] = useState<string[]>([])

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) setUser(u)
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    if (!user) return
    setLoading(true)
    const deedsRef = collection(firestore, 'deeds')
    const q = query(deedsRef, where('userId', '==', user.uid))
    getDocs(q).then((snap) => {
      const loaded = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      setDeeds(loaded)
      setLoading(false)
    })
  }, [user])

  const addCheckmarkField = () => setCheckmarks([...checkmarks, ''])
  const updateCheckmark = (value: string, index: number) => {
    const updated = [...checkmarks]
    updated[index] = value
    setCheckmarks(updated)
  }

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  const addDate = (date: string) => {
    if (date && !selectedDates.includes(date)) {
      setSelectedDates([...selectedDates, date])
    }
  }

  const removeDate = (date: string) => {
    setSelectedDates(selectedDates.filter((d) => d !== date))
  }

  async function addDeed() {
    if (!newDeedName.trim()) return alert('Enter deed name')
    if (!newDeedTarget || Number(newDeedTarget) <= 0)
      return alert('Enter valid target')
    if (!user) return

    const deedsRef = collection(firestore, 'deeds')
    await setDoc(doc(deedsRef), {
      userId: user.uid,
      name: newDeedName,
      target: Number(newDeedTarget),
      unit: newDeedUnit,
      durationDays: newDeedDuration,
      checkmarks: checkmarks.filter((c) => c.trim() !== ''),
      showOnDates: selectedDates,
      showOnDays: selectedDays,
      createdAt: new Date(),
    })

    // Reset
    setNewDeedName('')
    setNewDeedTarget('')
    setNewDeedDuration(30)
    setCheckmarks([''])
    setSelectedDates([])
    setSelectedDays([])

    // Refresh deeds
    const snap = await getDocs(query(deedsRef, where('userId', '==', user.uid)))
    setDeeds(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  }

  async function deleteDeed(id: string) {
    if (!confirm('Delete this deed?')) return
    await deleteDoc(doc(firestore, 'deeds', id))
    setDeeds(deeds.filter((d) => d.id !== id))
  }

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.removeEventListener('keydown', handleKeyDown)
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null
  if (!user) return <div>Loading user...</div>

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-40 p-4 overflow-y-auto overflow-x-hidden"

      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-gradient-to-b from-green-50 to-white p-6 rounded-2xl shadow-2xl space-y-6 text-gray-800 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-green-800 text-xl hover:text-red-600"
        >
          ✕
        </button><section>
          <h2 className="text-2xl font-bold text-green-700 mb-4 border-b pb-2">🌙 Add New Deed</h2>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Deed Name"
              value={newDeedName}
              onChange={(e) => setNewDeedName(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
              <input
                type="number"
                placeholder="Daily Target"
                value={newDeedTarget}
                onChange={(e) => setNewDeedTarget(e.target.value)}
                className="w-full p-2 border rounded"
                min={1}
              />
              <select
                value={newDeedUnit}
                onChange={(e) => setNewDeedUnit(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="times">times</option>
                <option value="min">minutes</option>
                <option value="hr">hours</option>
              </select>
            </div>
            <input
              type="number"
              placeholder="Duration (days)"
              value={newDeedDuration}
              onChange={(e) => setNewDeedDuration(Number(e.target.value))}
              min={1}
              className="w-full p-2 border rounded"
            />

            <div>
              <p className="font-semibold text-green-700">Checkmarks</p>
              {checkmarks.map((c, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Checkmark ${i + 1}`}
                  value={c}
                  onChange={(e) => updateCheckmark(e.target.value, i)}
                  className="w-full p-2 border rounded mt-1"
                />
              ))}
              <button
                onClick={addCheckmarkField}
                className="mt-2 text-green-600 underline"
              >
                + Add Another Checkmark
              </button>
            </div>

            <div>
              <p className="font-semibold text-green-700 mt-4">Select Days of the Week</p>
              <div className="flex flex-wrap gap-2">
                {daysOfWeek.map((day) => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`px-3 py-1 rounded border ${
                      selectedDays.includes(day)
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-green-800'
                    }`}
                  >
                    {day.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="font-semibold text-green-700 mt-4">Add Specific Dates</p>
              <input
                type="date"
                onChange={(e) => addDate(e.target.value)}
                className="p-2 border rounded mt-1"
              />
              <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
                {selectedDates.map((date, i) => (
                  <li key={i}>
                    {date}{' '}
                    <button
                      className="text-red-500 ml-2"
                      onClick={() => removeDate(date)}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={addDeed}
              className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 mt-4"
            >
              Add Deed
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-green-700 mb-4 border-b pb-2">📜 Your Deeds</h2>
          {loading ? (
            <div>Loading deeds...</div>
          ) : deeds.length === 0 ? (
            <div>No deeds added yet.</div>
          ) : (
            <ul className="space-y-3">
              {deeds.map((d) => (
                <li key={d.id} className="border rounded p-4 bg-white shadow-sm">
                  <div>
                    <strong className="text-lg text-green-800">{d.name}</strong><br />
                    Target: {d.target} {d.unit}/day <br />
                    Duration: {d.durationDays} days
                    {d.checkmarks?.length > 0 && (
                      <ul className="mt-1 text-sm text-gray-700 list-disc list-inside">
                        {d.checkmarks.map((c: string, i: number) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    )}
                    {d.showOnDays?.length > 0 && (
                      <p className="mt-1 text-sm text-green-700">
                        <strong>Days:</strong> {d.showOnDays.join(', ')}
                      </p>
                    )}
                    {d.showOnDates?.length > 0 && (
                      <p className="mt-1 text-sm text-green-700">
                        <strong>Dates:</strong> {d.showOnDates.join(', ')}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteDeed(d.id)}
                    className="text-red-600 hover:underline mt-2"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
