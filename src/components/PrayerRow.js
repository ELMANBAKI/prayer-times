import React from 'react';
import './PrayerRow.css';

function PrayerRow({ prayerTimes }) {
  const prayers = [
    { name: 'الفجر', time: prayerTimes.Fajr, img: '/images/fajr.png' },
    { name: 'الظهر', time: prayerTimes.Dhuhr, img: '/images/dhuhr.png' },
    { name: 'العصر', time: prayerTimes.Asr, img: '/images/asr.png' },
    { name: 'المغرب', time: prayerTimes.Maghrib, img: '/images/maghrib.png' },
    { name: 'العشاء', time: prayerTimes.Isha, img: '/images/isha.png' },
  ];

  return (
    <div className="prayer-row">
      {prayers.map((prayer) => (
        <div className="prayer-card" key={prayer.name}>
          <img src={prayer.img} alt={prayer.name} className="prayer-image" />
          <h3 className="prayer-name">{prayer.name}</h3>
          <p className="prayer-time">{prayer.time}</p>
        </div>
      ))}
    </div>
  );
}

export default PrayerRow;
