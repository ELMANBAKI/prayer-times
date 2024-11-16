import React, { useState, useEffect } from 'react';

function Countdown({ nextPrayerTime, iqamaTime }) {
  const [timeLeft, setTimeLeft] = useState('');
  const [timeLeftIqama, setTimeLeftIqama] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = nextPrayerTime - now;

      if (diff > 0) {
        const hours = Math.floor(diff / 1000 / 60 / 60);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft(`${hours} ساعة و ${minutes} دقيقة و ${seconds} ثانية`);
      } else {
        setTimeLeft('حان وقت الصلاة!');
      }

      if (iqamaTime) {
        const diffIqama = iqamaTime - now;
        if (diffIqama > 0) {
          const hoursIqama = Math.floor(diffIqama / 1000 / 60 / 60);
          const minutesIqama = Math.floor((diffIqama / 1000 / 60) % 60);
          const secondsIqama = Math.floor((diffIqama / 1000) % 60);
          setTimeLeftIqama(`${hoursIqama} ساعة و ${minutesIqama} دقيقة و ${secondsIqama} ثانية`);
        } else {
          setTimeLeftIqama('حان وقت الإقامة!');
        }
      }

    }, 1000);

    return () => clearInterval(interval);
  }, [nextPrayerTime, iqamaTime]);

  return (
    <div className="countdown">
      <h2>الوقت المتبقي للصلاة القادمة:</h2>
      <p>{timeLeft}</p>
      {iqamaTime && (
        <>
          <h3>الوقت المتبقي للإقامة:</h3>
          <p>{timeLeftIqama}</p>
        </>
      )}
    </div>
  );
}

export default Countdown;

