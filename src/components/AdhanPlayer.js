import React, { useState } from "react";
import "./AdhanPlayer.css";

function AdhanPlayer({ prayerName, selectedAdhan, onAdhanChange }) {
  const adhanOptions = {
    Fajr: [
      { label: "مؤذن 1", file: "اذان  (1).mp3" },
      { label: "مؤذن 2", file: "اذان  (2).mp3" },
      { label: "مؤذن 3", file: "اذان  (3).mp3" },
      { label: "مؤذن 4", file: "اذان  (4).mp3" },
      { label: "مؤذن 5", file: "اذان  (5).mp3" },
      { label: "مؤذن 6", file: "اذان  (6).mp3" },
      { label: "مؤذن 7", file: "اذان  (7).mp3" },
    ],
    Dhuhr: [
      { label: "مؤذن 1", file: "اذان  (1).mp3" },
      { label: "مؤذن 2", file: "اذان  (2).mp3" },
      { label: "مؤذن 3", file: "اذان  (3).mp3" },
      { label: "مؤذن 4", file: "اذان  (4).mp3" },
      { label: "مؤذن 5", file: "اذان  (5).mp3" },
      { label: "مؤذن 6", file: "اذان  (6).mp3" },
      { label: "مؤذن 7", file: "اذان  (7).mp3" },
    ],
    Asr: [
      { label: "مؤذن 1", file: "اذان  (1).mp3" },
      { label: "مؤذن 2", file: "اذان  (2).mp3" },
      { label: "مؤذن 3", file: "اذان  (3).mp3" },
      { label: "مؤذن 4", file: "اذان  (4).mp3" },
      { label: "مؤذن 5", file: "اذان  (5).mp3" },
      { label: "مؤذن 6", file: "اذان  (6).mp3" },
      { label: "مؤذن 7", file: "اذان  (7).mp3" },
    ],
    Maghrib: [
      { label: "مؤذن 1", file: "اذان  (1).mp3" },
      { label: "مؤذن 2", file: "اذان  (2).mp3" },
      { label: "مؤذن 3", file: "اذان  (3).mp3" },
      { label: "مؤذن 4", file: "اذان  (4).mp3" },
      { label: "مؤذن 5", file: "اذان  (5).mp3" },
      { label: "مؤذن 6", file: "اذان  (6).mp3" },
      { label: "مؤذن 7", file: "اذان  (7).mp3" },
    ],
    Isha: [
      { label: "مؤذن 1", file: "اذان  (1).mp3" },
      { label: "مؤذن 2", file: "اذان  (2).mp3" },
      { label: "مؤذن 3", file: "اذان  (3).mp3" },
      { label: "مؤذن 4", file: "اذان  (4).mp3" },
      { label: "مؤذن 5", file: "اذان  (5).mp3" },
      { label: "مؤذن 6", file: "اذان  (6).mp3" },
      { label: "مؤذن 7", file: "اذان  (7).mp3" },
    ],
  };

  const [audio, setAudio] = useState(null);

  const handleAdhanChange = (e) => {
    const selectedFile = e.target.value;
    onAdhanChange(prayerName, selectedFile);

    // تشغيل الصوت عند تغيير المؤذن
    const newAudio = new Audio(`/audio/${selectedFile}`);
    setAudio(newAudio);
    newAudio
      .play()
      .then(() => {
        console.log("تم تشغيل الأذان بنجاح");
      })
      .catch((error) => {
        console.error("خطأ أثناء تشغيل الأذان:", error);
      });
  };

  const playAdhan = () => {
    if (audio) {
      audio
        .play()
        .then(() => {
          console.log("تم تشغيل الأذان بنجاح");
        })
        .catch((error) => {
          console.error("خطأ أثناء تشغيل الأذان:", error);
        });
    }
  };

  return (
    <div className="adhan-player">
      <label htmlFor={`${prayerName}-adhan-select`}>أذان {prayerName}:</label>
      <select
        id={`${prayerName}-adhan-select`}
        value={selectedAdhan}
        onChange={handleAdhanChange}
      >
        {adhanOptions[prayerName].map((option) => (
          <option key={option.file} value={option.file}>
            {option.label}
          </option>
        ))}
      </select>
      <button onClick={playAdhan}>تشغيل الأذان</button>
    </div>
  );
}

export default AdhanPlayer;

