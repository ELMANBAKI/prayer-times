import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import PrayerTimes from "./components/PrayerTimes";
import Countdown from "./components/Countdown";
import Settings from "./components/Settings";
import PrayerRow from "./components/PrayerRow"; 
import AdhanSettings from "./components/AdhanSettings"; // صفحة إعدادات الأذان
import Footer from "./components/Footer"; // استيراد التذييل
import "./styles/App.css";

function App() {
  const [city, setCity] = useState("الرباط");
  const [country, setCountry] = useState("المغرب");
  const [method, setMethod] = useState(5);
  const [prayerTimes, setPrayerTimes] = useState({});
  const [hijriDate, setHijriDate] = useState("");
  const [nextPrayerTime, setNextPrayerTime] = useState(null);
  const [iqamaTime, setIqamaTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedAdhan, setSelectedAdhan] = useState({
    Fajr: "اذان (1).mp3",
    Dhuhr: "اذان (1).mp3",
    Asr: "اذان (1).mp3",
    Maghrib: "اذان (1).mp3",
    Isha: "اذان (1).mp3",
  });

  const fetchPrayerTimes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}`
      );
      const data = await response.json();

      if (data.code === 200) {
        setPrayerTimes(data.data.timings);
        setHijriDate(data.data.date.hijri.date);
        calculateNextPrayer(data.data.timings);
      }
    } catch (error) {
      console.error("Error fetching prayer times:", error);
    } finally {
      setLoading(false);
    }
  }, [city, country, method]);

  useEffect(() => {
    fetchPrayerTimes();

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [fetchPrayerTimes]);

  const calculateNextPrayer = (timings) => {
    const now = new Date();
    const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
    for (let i = 0; i < prayerNames.length; i++) {
      const prayerTime = new Date(
        `${now.toDateString()} ${timings[prayerNames[i]]}`
      );
      if (prayerTime > now) {
        setNextPrayerTime(prayerTime);

        const iqama = new Date(prayerTime);
        iqama.setMinutes(iqama.getMinutes() + 15);
        setIqamaTime(iqama);

        break;
      }
    }
  };

  const handleAdhanChange = (prayerName, newAdhan) => {
    setSelectedAdhan((prevState) => ({
      ...prevState,
      [prayerName]: newAdhan,
    }));
  };

  return (
    <Router>
      <div className={darkMode ? "dark-mode" : ""}>
        <header>
          <h1>تطبيق مواقيت الصلاة</h1>
          <p>{hijriDate && `التاريخ الهجري: ${hijriDate}`}</p>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="dark-mode-toggle"
          >
            {darkMode ? "الوضع العادي" : "الوضع الليلي"}
          </button>
        </header>

        <div className="current-time">
          <p>الوقت الحالي: {currentTime.toLocaleTimeString()}</p>
          <p>التاريخ الميلادي: {currentTime.toLocaleDateString()}</p>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              loading ? (
                <p>جاري تحميل مواقيت الصلاة...</p>
              ) : (
                <>
                  <PrayerRow prayerTimes={prayerTimes} />
                  <Countdown nextPrayerTime={nextPrayerTime} iqamaTime={iqamaTime} />
                   
                </>
              )
            }
          />
          <Route
            path="/settings/:prayerName"
            element={<AdhanSettings selectedAdhan={selectedAdhan} onAdhanChange={handleAdhanChange} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
