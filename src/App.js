import React, { useState, useEffect, useCallback } from 'react';
import PrayerTimes from './components/PrayerTimes';
import Countdown from './components/Countdown';
import Settings from './components/Settings';
import './styles/App.css';

function App() {
  const [city, setCity] = useState('الرباط');
  const [country, setCountry] = useState('المغرب');
  const [method, setMethod] = useState(2); // الطريقة الافتراضية
  const [prayerTimes, setPrayerTimes] = useState({});
  const [hijriDate, setHijriDate] = useState('');
  const [nextPrayerTime, setNextPrayerTime] = useState(null);
  const [iqamaTime, setIqamaTime] = useState(null);  // لحساب وقت الإقامة
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date()); // الوقت الحالي

  // Fetch أوقات الصلاة عند تغيير المدينة أو الدولة
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
      console.error('Error fetching prayer times:', error);
    } finally {
      setLoading(false);
    }
  }, [city, country, method]);

  useEffect(() => {
    fetchPrayerTimes();

    // تحديث الوقت كل ثانية
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // تنظيف عند الخروج من المكون
  }, [fetchPrayerTimes]);

  // حساب وقت الصلاة القادمة والإقامة
  const calculateNextPrayer = (timings) => {
    const now = new Date();
    const prayerNames = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    for (let i = 0; i < prayerNames.length; i++) {
      const prayerTime = new Date(
        `${now.toDateString()} ${timings[prayerNames[i]]}`
      );
      if (prayerTime > now) {
        setNextPrayerTime(prayerTime);
        
        // حساب وقت الإقامة (مثلاً بعد 15 دقيقة من الأذان)
        const iqama = new Date(prayerTime);
        iqama.setMinutes(iqama.getMinutes() + 15);  // تأخير الإقامة بـ 15 دقيقة
        setIqamaTime(iqama);
        
        break;
      }
    }
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <header>
        <h1>تطبيق مواقيت الصلاة</h1>
        <p>{hijriDate && `التاريخ الهجري: ${hijriDate}`}</p>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="dark-mode-toggle"
        >
          {darkMode ? 'الوضع العادي' : 'الوضع الليلي'}
        </button>
      </header>
      
      {/* عرض الوقت والتاريخ الميلادي */}
      <div className="current-time">
        <p>الوقت الحالي: {currentTime.toLocaleTimeString()}</p>
        <p>التاريخ الميلادي: {currentTime.toLocaleDateString()}</p>
      </div>
      
      <Settings
        city={city}
        setCity={setCity}
        country={country}
        setCountry={setCountry}
        method={method}
        setMethod={setMethod}
      />
      
      {loading ? (
        <p>جاري تحميل مواقيت الصلاة...</p>
      ) : (
        <>
          <Countdown nextPrayerTime={nextPrayerTime} iqamaTime={iqamaTime} />
          <PrayerTimes prayerTimes={prayerTimes} />
        </>
      )}
    </div>
  );
}

export default App;
