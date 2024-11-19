import React from "react";
import "./PrayerRow.css"; // تأكد من أنك أضفت هذا الملف

function PrayerRow({ prayerTimes }) {
  const prayers = [
    { name: "الفجر", time: prayerTimes.Fajr, img: "../images/FAJRE.jpg" },
    { name: "الظهر", time: prayerTimes.Dhuhr, img: "../images/ADOUHR.jpg" },
    { name: "العصر", time: prayerTimes.Asr, img: "../images/ALASR.jpg" },
    { name: "المغرب", time: prayerTimes.Maghrib, img: "../images/MAGHRIB.jpg" },
    { name: "العشاء", time: prayerTimes.Isha, img: "../images/ICHAA.jpg" },
  ];

  return (
    <div className="prayer-row-container">
      {prayers.map((prayer, index) => (
        <div key={index} className="prayer-item">
          <img src={prayer.img} alt={prayer.name} />
          <h3>{prayer.name}</h3>
          <p>{prayer.time || "—"}</p>
        </div>
      ))}
    </div>
  );
}

export default PrayerRow;

