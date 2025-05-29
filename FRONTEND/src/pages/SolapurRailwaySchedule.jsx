import React, { useState } from 'react';

const trainData = {
  departures: [
    { no: '12116', name: 'Siddheshwar Express', time: '22:30', destination: 'Mumbai CSMT', days: 'Daily' },
    { no: '12158', name: 'Hutatma Express', time: '06:30', destination: 'Pune Junction', days: 'Daily' },
    { no: '11311', name: 'Solapur–Hassan Express', time: '19:20', destination: 'Hassan', days: 'Daily' },
    { no: '11423', name: 'Solapur–Hubballi Intercity Express', time: '06:25', destination: 'Hubballi', days: 'Daily' },
    { no: '22140', name: 'Solapur–Mumbai CSMT Superfast', time: '21:10', destination: 'Mumbai CSMT', days: 'Except Wed' },
    { no: '12170', name: 'Pune Intercity Express', time: '14:00', destination: 'Pune Junction', days: 'Daily' },
    { no: '11418', name: 'Solapur–Pune Express', time: '11:40', destination: 'Pune Junction', days: 'Daily' },
    { no: '01435', name: 'Solapur–Lokmanya Tilak Special', time: '09:20', destination: 'Lokmanya Tilak', days: 'Special' },
  ],
  arrivals: [
    { no: '12115', name: 'Siddheshwar Express', time: '06:45', origin: 'Mumbai CSMT', days: 'Daily' },
    { no: '12157', name: 'Hutatma Express', time: '22:00', origin: 'Pune Junction', days: 'Daily' },
    { no: '11312', name: 'Hassan–Solapur Express', time: '08:10', origin: 'Hassan', days: 'Daily' },
    { no: '11424', name: 'Hubballi–Solapur Intercity', time: '23:15', origin: 'Hubballi', days: 'Daily' },
    { no: '22139', name: 'Mumbai CSMT–Solapur SF', time: '05:30', origin: 'Mumbai CSMT', days: 'Except Thu' },
    { no: '12169', name: 'Pune–Solapur Intercity', time: '13:15', origin: 'Pune Junction', days: 'Daily' },
    { no: '11417', name: 'Pune–Solapur Express', time: '07:45', origin: 'Pune Junction', days: 'Daily' },
    { no: '01436', name: 'Lokmanya Tilak–Solapur Special', time: '20:15', origin: 'Lokmanya Tilak', days: 'Special' },
  ],
};

const SolapurRailwaySchedule = () => {
  const [activeTab, setActiveTab] = useState('departures');

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">🚆 Solapur Railway Timetable</h2>

      <div className="flex justify-center gap-4 mb-6">
        {['departures', 'arrivals'].map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-xl font-semibold transition duration-200 ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-blue-500 hover:text-white'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'departures' ? '🚉 Departures' : '🚉 Arrivals'}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainData[activeTab].map((train, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md p-4 border hover:shadow-lg transition-all duration-300 hover:border-blue-400"
          >
            <h3 className="font-bold text-lg text-blue-700 mb-2">
              🚆 {train.name}
            </h3>
            <p><strong>Train No:</strong> {train.no}</p>
            <p><strong>{activeTab === 'departures' ? 'Departure' : 'Arrival'} Time:</strong> {train.time}</p>
            <p><strong>{activeTab === 'departures' ? 'To' : 'From'}:</strong> {activeTab === 'departures' ? train.destination : train.origin}</p>
            <p><strong>Days:</strong> {train.days}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolapurRailwaySchedule;
