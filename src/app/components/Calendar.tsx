"use client";
import { useState, useEffect } from "react";
import Calendar from "react-calendar"; // Third-party React Calendar
import "react-calendar/dist/Calendar.css"; // Default styles for React Calendar
import moment from "moment-hijri";

// Sample cities and their prayer time API identifiers
const cities = [
  { name: "Dhaka", id: "dhaka" },
  { name: "Chattogram", id: "chattogram" },
  { name: "Khulna", id: "khulna" },
  { name: "Rajshahi", id: "rajshahi" },
  { name: "Sylhet", id: "sylhet" },
];

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

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg">
      {/* 📅 Calendar Section */}
      <div className="w-full lg:w-1/2 bg-white text-black p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-center mb-2">📅 ইংরেজি ও হিজরি ক্যালেন্ডার</h2>
        <Calendar
          onChange={(value) => setDate(value as Date)}
          value={date}
          tileContent={({ date }) => (
            <span className="text-sm text-gray-700">
              {moment(date).format("iD iMMMM iYYYY")} {/* Hijri date format */}
            </span>
          )}
          className="w-full"
        />
      </div>

      {/* 🕌 Prayer Times Section */}
      <div className="w-full lg:w-1/2 bg-white text-black p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-center mb-2">🕌 নামাজের সময়সূচী</h2>
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

        {/* Display Prayer Times */}
        {prayerTimes ? (
          <ul className="text-center">
            {Object.entries(prayerTimes).map(([prayer, time]) => (
              <li key={prayer} className="text-lg font-semibold">
                {prayer}:{" "}
                <span className="text-blue-600">
                  {moment(time as string, "HH:mm").format("hh:mm A")} {/* Correct moment usage with type assertion */}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">Loading prayer times...</p>
        )}
      </div>
    </div>
  );
}
