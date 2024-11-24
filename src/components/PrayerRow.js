import React from "react";
import { Link } from "react-router-dom";
import "./PrayerRow.css";

function PrayerRow({ prayerTimes }) {
  const prayers = [
    { name: "الفجر", time: prayerTimes.Fajr, img: "../images/FAJRE.jpg", key: "Fajr" },
    { name: "الظهر", time: prayerTimes.Dhuhr, img: "../images/ADOUHR.jpg", key: "Dhuhr" },
    { name: "العصر", time: prayerTimes.Asr, img: "../images/ALASR.jpg", key: "Asr" },
    { name: "المغرب", time: prayerTimes.Maghrib, img: "../images/MAGHRIB.jpg", key: "Maghrib" },
    { name: "العشاء", time: prayerTimes.Isha, img: "../images/ICHAA.jpg", key: "Isha" },
  ];

  return (
    <div className="prayer-row-container">
      {prayers.map((prayer) => (
        <Link key={prayer.key} to={`/settings/${prayer.key}`} className="prayer-item">
          <img src={prayer.img} alt={prayer.name} />
          <h3>{prayer.name}</h3>
          <p>{prayer.time || "—"}</p>
        </Link>
      ))}
    </div>
  );
}

export default PrayerRow;
