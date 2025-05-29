import React from 'react';

const hospitals = [
  {
    "name": "Dr. V. M. Government Medical College & Shri Chhatrapati Shivaji Maharaj General Hospital",
    "address": "Opposite District Court, Sidheshwar Peth, Solapur – 413003",
    "phone": "0217 2749401 / 0217 2319448",
    "email": "deansolapur@gmail.com",
    "website": "https://vmgmc.edu.in/"
  },
  {
    "name": "Solapur District Hospital (Shri Chhatrapati Shivaji Maharaj Hospital)",
    "address": "Civil Chowk, Solapur – 413003",
    "phone": "0217 2749401",
    "website": "https://solapur.gov.in/en/public-utility/government-hospital/"
  },
  {
    "name": "Gangamai Hospital",
    "address": "279/2, Plot No. 1, Railway Station Road, Modi Khana, Solapur – 413004",
    "phone": "+91 97659 99855 / 866",
    "emergency": "+91 73870 40855",
    "appointments": "+91 99755 12866",
    "email": "info@gangamaihospital.co",
    "website": "https://gangamaihospital.co/"
  },
  {
    "name": "Ashwini Hospital",
    "address": "Survey No. 7107/1, Tank Plot No. 180, North Sadar Bazar, Solapur – 413003",
    "phone": "0217 2319900",
    "email": "ashwinihosp@yahoo.com",
    "website": "https://www.ashwinihospital.co.in/contact.html"
  },
  {
    "name": "Raghoji Kidney & Multispeciality Hospital",
    "address": "Plot No. 34, 35, 36, Mohite Nagar, Opposite Sanchar Press, Hotgi Road, Solapur – 413003",
    "phone": "+91 8378 995588",
    "website": "https://raghojikidneyhospital.com/"
  },
  {
    "name": "Solapur Pride ICU & Multispeciality Hospital",
    "address": "A/p Old Utkarsh Hospital, Near Sai Super Market, In front of Karigar Petrol Pump, Saat Rasta, Solapur",
    "phone": "81499 28100 / 91194 63464",
    "email": "dr_prashantdond@yahoo.co.in",
    "website": "https://www.solapurpridehospital.com/"
  },
  {
    "name": "Apex Hospital",
    "address": "Plot No. 1 and 6, Vijapur Road, Opposite Galaxy Panache, Yamini Nagar, Swami Vivekanand Nagar 2, Solapur – 413007",
    "phone": "0217 2600602",
    "website": "https://www.hexahealth.com/solapur/hospital/apex-hospital-swami-vivekanand-nagar"
  },
  {
    "name": "Yashodhara Super Speciality Hospital",
    "address": "6158, Siddheshwar Peth, Near Zilha Parishad, Solapur – 413001",
    "phone": "0217 2323001",
    "email": "yashodharahospital@yahoo.com",
    "website": "https://www.yashodharahospitals.com/"
  },
  {
    "name": "Kokilaben Dhirubhai Ambani Hospital – Solapur Centre",
    "address": "Plot No. 01, Gut No. 659/3, Village – Kumbharli, Taluka – South Solapur, Dist – Solapur – 413006",
    "phone": "+91 82759 70619",
    "website": "https://solapur.kokilabenhospital.com/contacts/mapsanddirection.html"
  }
];

const HospitalList = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-teal-500 text-3xl font-bold mb-6">Hospitals in Solapur</h1>
      <ul className="space-y-4">
        {hospitals.map((hospital, index) => (
          <li key={index} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h2 className="text-teal-500 text-xl font-semibold">{hospital.name}</h2>
            <p className="text-gray-700"><strong>Address:</strong> {hospital.address}</p>
            <p className="text-gray-700"><strong>Phone:</strong> {hospital.phone}</p>
            <p className="text-gray-700"><strong>Email:</strong> {hospital.email}</p>
            <p className="text-teal-500">
              <strong>Website: </strong>
              <a href={hospital.website} target="_blank" rel="noopener noreferrer" className="underline">
                {hospital.website}
              </a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HospitalList;
