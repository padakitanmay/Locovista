import React, { useState } from 'react';
import SolapurRailwaySchedule from './SolapurRailwaySchedule';

const mockTrains = [
  { number: '12115', name: 'Siddheshwar Express', from: 'Mumbai', to: 'Solapur', depTime: '22:45', arrTime: '06:30', days: 'Daily' },
  { number: '12116', name: 'Siddheshwar Express', from: 'Solapur', to: 'Mumbai', depTime: '22:30', arrTime: '06:15', days: 'Daily' },
  { number: '11311', name: 'Solapur–Hassan Express', from: 'Solapur', to: 'Hassan', depTime: '19:20', arrTime: '09:00', days: 'Daily' },
  { number: '12157', name: 'Hutatma Express', from: 'Pune', to: 'Solapur', depTime: '22:10', arrTime: '05:50', days: 'Daily' },
  { number: '22139', name: 'Mumbai CSMT–Solapur SF', from: 'Mumbai', to: 'Solapur', depTime: '05:30', arrTime: '13:00', days: 'Except Thu' },
  { number: '11417', name: 'Pune–Solapur Express', from: 'Pune', to: 'Solapur', depTime: '07:00', arrTime: '12:15', days: 'Daily' },
  { number: '22140', name: 'Solapur–Mumbai SF', from: 'Solapur', to: 'Mumbai', depTime: '21:10', arrTime: '05:20', days: 'Except Wed' },
];

const RailwayInfo = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const filtered = mockTrains.filter(train =>
      train.from.toLowerCase().includes(from.toLowerCase()) &&
      train.to.toLowerCase().includes(to.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <SolapurRailwaySchedule/>
      <h2 className="text-2xl font-bold text-center mb-6">Train Finder</h2>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="From Station"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="px-4 py-2 border rounded-xl w-60"
        />
        <input
          type="text"
          placeholder="To Station"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="px-4 py-2 border rounded-xl w-60"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition duration-200"
        >
          Search
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.length === 0 ? (
          <p className="text-center text-gray-600 col-span-full">No trains found. Try searching!</p>
        ) : (
          results.map((train, idx) => (
            <div
              key={idx}
              className="bg-white border rounded-2xl shadow-sm p-4 hover:shadow-lg transition duration-300"
            >
              <h3 className="text-lg font-semibold text-blue-700">{train.name}</h3>
              <p><strong>Train No:</strong> {train.number}</p>
              <p><strong>From:</strong> {train.from}</p>
              <p><strong>To:</strong> {train.to}</p>
              <p><strong>Departure:</strong> {train.depTime}</p>
              <p><strong>Arrival:</strong> {train.arrTime}</p>
              <p><strong>Days:</strong> {train.days}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RailwayInfo;
