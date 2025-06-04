// deeds analysis 
"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/utils/firebase";
import {
  collection,
  collectionGroup,
  getDocs,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import dayjs from "dayjs";
import UserAuthGuard from "@/app/components/UserAuthGuard";

export default function DeedsAnalyticsPage() {
  const [user, setUser] = useState<any>(null);
  const [deedData, setDeedData] = useState<any[]>([]);
  const [summaryData, setSummaryData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [selectedDeed, setSelectedDeed] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) setUser(u);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (user) loadAllDeeds();
  }, [user]);

  async function loadAllDeeds() {
    setLoading(true);

    const deedsMetaSnap = await getDocs(collection(db, "deeds"));
    const deedMetaMap: Record<string, any> = {};
    deedsMetaSnap.forEach((doc) => {
      deedMetaMap[doc.id] = doc.data();
    });

    const deedRecordsSnap = await getDocs(collectionGroup(db, "deeds"));

    const allDeeds: any[] = [];
    const summary: Record<string, any> = {};

    for (const docSnap of deedRecordsSnap.docs) {
      const pathParts = docSnap.ref.path.split("/");
      const uidIndex = pathParts.indexOf("users") + 1;
      const recordUid = pathParts[uidIndex];
      const date = pathParts[uidIndex + 2];
      const deedId = docSnap.id;

      if (recordUid !== user.uid) continue;

      const recordData = docSnap.data();
      const meta = deedMetaMap[deedId];
      if (!meta) continue;

      const value = recordData.value || 0;
      const checkedItems = recordData.checkedItems || [];

      allDeeds.push({
        date,
        day: dayjs(date).format("dddd"),
        deedId,
        name: meta.name,
        target: meta.target,
        unit: meta.unit,
        checkmarks: meta.checkmarks || [],
        value,
        checkedItems,
      });

      if (!summary[deedId]) {
        summary[deedId] = {
          deedId,
          name: meta.name,
          createdAt: meta.createdAt,
          durationDays: meta.durationDays,
          totalTarget: 0,
          totalAchieved: 0,
          totalCheckmarks: meta.checkmarks?.length || 0,
          achievedCheckmarks: new Set<string>(),
        };
      }

      summary[deedId].totalTarget += meta.target;
      summary[deedId].totalAchieved += value;
      checkedItems.forEach((item: string) =>
        summary[deedId].achievedCheckmarks.add(item)
      );
    }

    setDeedData(allDeeds);
    setSummaryData(summary);
    setLoading(false);
  }

  const filteredDeedData = deedData.filter((d) => {
    const matchDeed = selectedDeed ? d.deedId === selectedDeed : true;
    const matchStart = startDate ? d.date >= startDate : true;
    const matchEnd = endDate ? d.date <= endDate : true;
    return matchDeed && matchStart && matchEnd;
  });

  return (
    <UserAuthGuard>
      <div className="max-w-6xl mx-auto p-4 bg-gradient-to-br from-yellow-50 to-green-100 rounded-xl text-black shadow-xl">
        <h1 className="text-3xl font-bold text-center text-green-900 mb-6 border-b pb-2">
          📊 Deeds Analytics
        </h1>

        {loading ? (
          <div>Loading deeds data...</div>
        ) : deedData.length === 0 ? (
          <div className="text-center text-gray-500">No deeds data found.</div>
        ) : (
          <>
            <h2 className="text-xl font-bold mt-8 mb-2 text-green-800 border-b pb-1">
              🔍 Summary of Each Deed
            </h2>
            <table className="w-full text-sm border bg-white mb-8 p-4">
              <thead>
                <tr className="bg-green-100">
                  <th className="border px-2 py-1">Deed Name (Date Range)</th>
                  <th className="border px-2 py-1">Total Target</th>
                  <th className="border px-2 py-1">Total Achieved</th>
                  <th className="border px-2 py-1">Can't Achieve</th>
                  <th className="border px-2 py-1">Total Checkmarks</th>
                  <th className="border px-2 py-1">Achieved Checkmarks</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(summaryData).map((d: any, idx: number) => {
                  const createdAt = d.createdAt?.seconds
                    ? dayjs.unix(d.createdAt.seconds)
                    : null;
                  const endDate = createdAt?.add(d.durationDays || 0, "day");
                  return (
                    <tr key={idx} className="text-center">
                      <td className="border px-2 py-1 font-semibold text-green-800">
                        {d.name}
                        {createdAt && endDate && (
                          <div className="text-xs text-gray-600">
                            ({createdAt.format("YYYY-MM-DD")} — {endDate.format("YYYY-MM-DD")})
                          </div>
                        )}
                      </td>
                      <td className="border px-2 py-1">{d.totalTarget}</td>
                      <td className="border px-2 py-1">{d.totalAchieved}</td>
                      <td className="border px-2 py-1">{d.totalTarget - d.totalAchieved}</td>
                      <td className="border px-2 py-1">{d.totalCheckmarks}</td>
                      <td className="border px-2 py-1">{d.achievedCheckmarks.size}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>


            <h2 className="text-xl font-bold mt-8 mb-2 text-green-800 border-b pb-1">
              Details Summary of All Deeds
            </h2>
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <select
                className="border rounded px-2 py-1"
                value={selectedDeed}
                onChange={(e) => setSelectedDeed(e.target.value)}
              >
                <option value="">All Deeds</option>
                {Object.values(summaryData).map((d: any) => (
                  <option key={d.deedId} value={d.deedId}>
                    {d.name}
                  </option>
                ))}
              </select>
<div><label className=" text-green-800 font-medium ">From    </label>
              <input
                type="date"
                className="border rounded px-2 py-1"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              </div>

              <div>
                <label className=" text-green-800 font-medium ">To    </label>
              <input
                type="date"
                className="border rounded px-2 py-1"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              </div>
            </div>

            {/* Detailed Table */}
            <table className="w-full p-10 text-sm border bg-white">

              <thead>
                <tr className="bg-green-200">
                  <th className="border px-2 py-1">Date</th>
                  <th className="border px-2 py-1">Day</th>
                  <th className="border px-2 py-1">Deed Name</th>
                  <th className="border px-2 py-1">Target</th>
                  <th className="border px-2 py-1">Achieved</th>
                  <th className="border px-2 py-1">Unit</th>
                  <th className="border px-2 py-1">Checked Items</th>
                </tr>
              </thead>
              <tbody>
                {filteredDeedData.map((d, idx) => (
                  <tr key={idx} className="text-center">
                    <td className="border px-2 py-1">{d.date}</td>
                    <td className="border px-2 py-1">{d.day}</td>
                    <td className="border px-2 py-1 font-semibold text-green-800">{d.name}</td>
                    <td className="border px-2 py-1">{d.target}</td>
                    <td className="border px-2 py-1">{d.value}</td>
                    <td className="border px-2 py-1">{d.unit}</td>
                    <td className="border px-2 py-1">
                      {d.checkedItems.length > 0 ? (
                        <ul className="list-disc list-inside text-left">
                          {d.checkedItems.map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </UserAuthGuard>
  );
}

