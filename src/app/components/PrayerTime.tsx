"use client";
import { useState, useEffect } from "react";
import moment from "moment"; // Regular Moment.js for English formatting

// Sample cities and their prayer time API identifiers
const cities = [
  { name: "Dhaka", id: "dhaka" },
  { name: "Chattogram", id: "chattogram" },
  { name: "Khulna", id: "khulna" },
  { name: "Rajshahi", id: "rajshahi" },
  { name: "Sylhet", id: "sylhet" },
];

// Custom Calendar component
const CustomCalendar = ({ selectedDate }: { selectedDate: Date }) => {
  const [currentMonth, setCurrentMonth] = useState(moment(selectedDate).format("MMMM YYYY"));
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  useEffect(() => {
    const startOfMonth = moment(selectedDate).startOf("month");
    const endOfMonth = moment(selectedDate).endOf("month");

    // Generate days for the current month in Gregorian (English) format
    const days: number[] = [];
    for (let day = startOfMonth.date(); day <= endOfMonth.date(); day++) {
      days.push(day);
    }

    setDaysInMonth(days);
    setCurrentMonth(moment(selectedDate).format("MMMM YYYY"));
  }, [selectedDate]);


  return (
    <div className="bg-transparent rounded-lg shadow-lg p-4">
      <h2 className="text-xl text-center mb-4 font-bold">{currentMonth}</h2>
      <div className="grid grid-cols-7 gap-2 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
          <div key={idx} className="font-bold">{day}</div>
        ))}
        {daysInMonth.map((day, idx) => (
          <div key={idx} className="p-2">{day}</div>
        ))}
      </div>
    </div>
  );
};

type PrayerTimesProps = {
  darkMode: boolean;
};
// Prayer Times Component
export default function PrayerCalendar() {
  const [selectedCity, setSelectedCity] = useState("dhaka");
  const [prayerTimes, setPrayerTimes] = useState<any>(null);
  const [date, setDate] = useState(new Date());

  // Fetch prayer times when city changes
  useEffect(() => {
    async function fetchPrayerTimes() {
      try {
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${selectedCity}&country=BD&method=2`);
        const data = await response.json();
        setPrayerTimes(data.data.timings);
      } catch (error) {
        console.error("Failed to fetch prayer times", error);
      }
    }
    fetchPrayerTimes();
  }, [selectedCity]);

  // Format time to 12-hour AM/PM format
  const formatTime = (time: string) => moment(time, "HH:mm").format("hh:mm A");

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 bg-transparent text-white rounded-lg shadow-lg">
      {/* 📅 Calendar Section */}
      <div className="w-full lg:w-1/2 bg-transparent text-black p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-center mb-2">📅 Custom Calendar</h2>
        <CustomCalendar selectedDate={date} />
      </div>

      {/* 🕌 Prayer Times Section */}
      <div className="w-full lg:w-1/2 bg-transparent text-black p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-center mb-2">🕌 Prayer Times (In English)</h2>
        <div className="flex justify-center mb-4">
          <select
            className="p-2 bg-blue-600 text-white rounded-md cursor-pointer"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {/* Prayer Times Table */}
        {prayerTimes ? (
          <div className="overflow-x-auto">
            <table className="w-full bg-transparent text-black rounded-lg overflow-hidden shadow-md">
              <thead>
                <tr className="bg-blue-600 text-white text-lg">
                  <th className="p-2">Prayer</th>
                  <th className="p-2">Start Time</th>
                  <th className="p-2">End Time</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(prayerTimes).map(([prayer, time]) => {
                  const startTime = formatTime(time as string);
                  const endTime = formatTime(moment(time as string, "HH:mm").add(1, 'hours').format("HH:mm")); // End time +1 hour
                  return (
                    <tr key={prayer} className="text-center border-b border-gray-300">
                      <td className="p-2 font-semibold text-blue-600">{prayer}</td>
                      <td className="p-2">{startTime}</td>
                      <td className="p-2">{endTime}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600">Loading prayer times...</p>
        )}
      </div>
    </div>
  );
}
