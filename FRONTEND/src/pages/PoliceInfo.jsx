import React from "react";

const policeStations = [
  {
    name: "Sadar Bazar Police Station",
    address: "Gandhi Nagar, near Camp High School, Solapur – 413003",
    phone: "0217 2744641",
    mobile: "83298 04836",
    email: "ps.sadarbazar.cpsol@mahapolice.gov.in",
  },
  {
    name: "Faujdar Chawadi Police Station",
    address: "Faujdar Chawadi, Solapur – 413003",
    phone: "0217 2744634",
    mobile: "99233 57799",
    email: "ps.faujdarchawadi.cpsol@mahapolice.gov.in",
  },
  {
    name: "Jail Road Police Station",
    address: "Jail Road, Solapur – 413003",
    phone: "0217 2744631",
    mobile: "82750 46104",
    email: "ps.jailroad.cpsol@mahapolice.gov.in",
  },
  {
    name: "MIDC Police Station",
    address: "MIDC Area, Solapur – 413003",
    phone: "0217 2744690",
    mobile: "98701 22205",
    email: "ps.midc.cpsol@mahapolice.gov.in",
  },
  {
    name: "Jodbhavi Police Station",
    address: "Jodbhavi Peth, Solapur – 413003",
    phone: "0217 2744634",
    mobile: "95525 27292",
    email: "ps.jodbhavi.cpsol@mahapolice.gov.in",
  },
  {
    name: "Vijapur Naka Police Station",
    address: "Vijapur Naka, Solapur – 413003",
    phone: "0217 2744651",
    mobile: "99870 02787",
    email: "ps.vijapurnaka.cpsol@mahapolice.gov.in",
  },
  {
    name: "Salgar Wasti Police Station",
    address: "Salgar Wasti, Solapur – 413003",
    phone: "0217 2744661",
    mobile: "98233 74086",
    email: "ps.salgarwasti.cpsol@mahapolice.gov.in",
  },
  {
    name: "Solapur Taluka Police Station",
    address: "Gurunanak Chowk, Solapur – 413003",
    phone: "0217 2732017",
    email: "ps.solapurtaluka@mahapolice.gov.in",
  },
  {
    name: "Akkalkot North Police Station",
    address: "Near Karanja Chowk, Akkalkot – 413216",
    phone: "02181 220245",
    email: "ps.akkalkotnorth@mahapolice.gov.in",
  },
  {
    name: "Akkalkot South Police Station",
    address: "Near Karanja Chowk, Akkalkot – 413216",
    phone: "02181 220313",
    email: "ps.akkalkotsouth@mahapolice.gov.in",
  },
  {
    name: "Akluj Police Station",
    address: "Near Govt. Rest House, Akluj – 413101",
    phone: "02185 244975",
    email: "ps.akluj@mahapolice.gov.in",
  },
  {
    name: "Barshi City Police Station",
    address: "Near S.T. Bus Stand, Barshi – 413401",
    phone: "02184 223333",
    email: "ps.barshi@mahapolice.gov.in",
  },
  {
    name: "Barshi Taluka Police Station",
    address: "Near Mahchi Market, Post Chowk, Barshi – 413401",
    phone: "02184 223330",
    email: "ps.barshitaluka@mahapolice.gov.in",
  },
  {
    name: "Cyber Police Station",
    address: "Solapur Taluka Police Station, near Gurunanak Chowk, Solapur",
    phone: "0217 2317131",
    email: "ps.solapurruralcyber@mahapolice.gov.in",
  },
  {
    name: "Kamti Police Station",
    address: "Near M.S.E.B Sub Station, Solapur-Mangalwedha Road, Kamti, Tal. Mohol",
    phone: "02189 245211",
    email: "ps.kamati@mahapolice.gov.in",
  },
  {
    name: "Karkamb Police Station",
    address: "Near S.T. Bus Stand, Karkamb – 413302",
    phone: "02186 242233",
    email: "ps.karkamb@mahapolice.gov.in",
  },
  {
    name: "Karmala Police Station",
    address: "Near Tahasil Office, Karmala – 413203",
    phone: "02182 220333",
    email: "ps.karmala@mahapolice.gov.in",
  },
  {
    name: "Kurduwadi Police Station",
    address: "Near Balodyan, Kurduwadi – 413208",
    phone: "02183 223333",
    email: "ps.kurduwadi@mahapolice.gov.in",
  },
];

const PoliceInfo = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-teal-500">Solapur Police Stations</h1>
      <ul className="space-y-4">
        {policeStations.map((station, idx) => (
          <li key={idx} className="border rounded-md p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-teal-500">{station.name}</h2>
            <p><span className="font-semibold">Address:</span> {station.address}</p>
            <p><span className="font-semibold">Phone:</span> {station.phone}</p>
            {station.mobile && <p><span className="font-semibold">Mobile:</span> {station.mobile}</p>}
            {station.email && (
              <p>
                <span className="font-semibold">Email:</span>{" "}
                <a href={`mailto:${station.email}`} className="text-teal-500 underline">
                  {station.email}
                </a>
              </p>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-8 text-center">
        <a
          href="https://www.solapurpolice.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-500 font-semibold underline"
        >
          Visit solapurpolice.gov.in for more info
        </a>
      </div>
    </div>
  );
};

export default PoliceInfo;
