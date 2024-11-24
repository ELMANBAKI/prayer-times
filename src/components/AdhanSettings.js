import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AdhanSettings.css";

function AdhanSettings({ selectedAdhan, onAdhanChange }) {
  const { prayerName } = useParams(); // الحصول على اسم الصلاة من الرابط
  const navigate = useNavigate();

  const [previewAdhan, setPreviewAdhan] = useState(selectedAdhan[prayerName]); // لحفظ الأذان الذي يتم اختياره
  const audioRef = useRef(null); // مرجع لتشغيل الصوت

  // تحديث الأذان وتشغيل الصوت
  const handleAdhanSelection = (event) => {
    const newAdhan = event.target.value;
    setPreviewAdhan(newAdhan);
    if (audioRef.current) {
      const audioPath = `/audio/${newAdhan}`; // تعديل المسار هنا
      audioRef.current.src = audioPath;

      // التحقق من جاهزية الملف قبل تشغيله
      audioRef.current
        .play()
        .catch((err) => console.error("Error playing audio:", err));
    }
  };

  // حفظ الأذان المختار عند الضغط على "تأكيد"
  const handleConfirmSelection = () => {
    onAdhanChange(prayerName, previewAdhan); // تحديث الأذان المختار
    navigate("/"); // العودة للصفحة الرئيسية
  };

  return (
    <div className="adhan-settings">
      <h2>إعداد أذان {prayerName}</h2>

      <select value={previewAdhan} onChange={handleAdhanSelection}>
        <option value="اذان  (1).mp3">أذان 1</option>
        <option value="اذان  (2).mp3">أذان 2</option>
        <option value="اذان  (3).mp3">أذان 3</option>
        <option value="اذان  (4).mp3">أذان 4</option>
        <option value="اذان  (5).mp3">أذان 5</option>
        <option value="اذان  (6).mp3">أذان 6</option>
        <option value="اذان  (7).mp3">أذان 7</option>
      </select>

      {/* مشغل الصوت */}
      <audio ref={audioRef} controls style={{ display: "none" }}></audio>

      <div className="buttons">
        <button onClick={() => navigate("/")}>
          الرجوع إلى الصفحة الرئيسية
        </button>
        <button onClick={handleConfirmSelection}>تأكيد</button>
      </div>
    </div>
  );
}

export default AdhanSettings;
