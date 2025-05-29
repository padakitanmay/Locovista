import React from "react";

const hotels = [
  {
    name: "Balaji Sarovar Premiere",
    stars: 5,
    price: "₹5,100",
    location: "Jule, near Solapur Airport",
    rating: "8.3/10",
    features: ["Luxury amenities", "Pool", "Spa", "Dining options"],
  },
  {
    name: "Hotel Chitra Executive",
    stars: 3,
    price: "₹5,520",
    location: "Budhwar Peth",
    rating: "7.4/10",
    features: ["Fitness center", "Terrace", "Restaurant", "Bar"],
  },
  {
    name: "Kyriad Hotel Solapur by OTHPL",
    stars: 4,
    price: "₹3,300",
    location: "Mahesh Nagar",
    rating: "6.7/10",
    features: ["Air-conditioned rooms", "Wi-Fi", "Private bathrooms"],
  },
  {
    name: "Hotel Pratham",
    stars: 4,
    price: "₹3,750",
    location: "Solapur",
    rating: "7.2/10",
    features: ["City views", "Shared lounge", "Bar"],
  },
  {
    name: "Hotel SaiPrasad Executive Solapur",
    stars: 2,
    price: "₹2,220",
    location: "Solapur",
    rating: "6.1/10",
    features: ["Room service", "24-hour front desk", "Free Wi-Fi"],
  },
  {
    name: "Hotel Center Point",
    stars: 2,
    price: "₹670",
    location: "Solapur",
    rating: "7.3/10",
    features: ["Restaurant", "Room service", "24-hour front desk"],
  },
  {
    name: "The Cult Stay",
    stars: 3,
    price: "₹2,950",
    location: "Solapur",
    rating: "7.9/10",
    features: ["Modern rooms", "Essential amenities"],
  },
  {
    name: "Hotel Veesons Executive",
    stars: 3,
    price: "₹2,950",
    location: "Solapur",
    rating: "7.9/10",
    features: ["Terrace", "Free Wi-Fi", "Private parking"],
  },
];

const HotelList = () => {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {hotels.map((hotel, idx) => (
        <div
          key={idx}
          className="rounded-2xl shadow-md border border-gray-200 p-4 bg-white"
        >
          <h3 className="text-xl font-semibold text-teal-600">
            {hotel.name}
          </h3>
          <p className="text-sm text-gray-600">{hotel.location}</p>
          <p className="text-sm mt-1">⭐ {hotel.stars}-Star | 💵 {hotel.price}</p>
          <p className="text-sm text-yellow-600 mt-1">📊 Rating: {hotel.rating}</p>
          <ul className="mt-2 text-sm text-gray-700 list-disc ml-5">
            {hotel.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default HotelList;
