import React from 'react';

function PrayerTimes({ prayerTimes }) {
  return (
    <div className="prayer-times">
      <h2>مواقيت الصلاة:</h2>
      <ul>
        {Object.entries(prayerTimes).map(([prayer, time]) => (
          <li key={prayer}>
            {prayer}: {time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PrayerTimes;
