import React from 'react';

function Settings({ city, setCity, country, setCountry, method, setMethod }) {
  const methods = [
    { id: 5, name: 'جامعة العلوم الإسلامية - كراتشي' },
    { id: 2, name: 'رابطة العالم الإسلامي' },
    { id: 3, name: 'أم القرى' },
     
  ];

  return (
    <div className="settings">
      <label>
        المدينة:
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      <label>
        الدولة:
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </label>
      <label>
        طريقة الحساب:
        <select value={method} onChange={(e) => setMethod(Number(e.target.value))}>
          {methods.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default Settings;
