import tourImg01 from "../images/tour-img01.jpeg";
import tourImg02 from "../images/tour-img02.jpeg";
import tourImg03 from "../images/tour-img03.jpeg";
import tourImg04 from "../images/tour-img04.jpg";
import tourImg05 from "../images/tour-img05.jpeg";
import tourImg06 from "../images/tour-img06.jpeg";
import tourImg07 from "../images/tour-img07.jpeg";
import tourImg08 from "../images/tour-img08.jpeg";

const tours = [
    {
        id: "01",
        title: "Pritisangam",
        city: "Karad",
        distance: 300,
        address: "Somewhere",
        price: 99,
        maxGroupSize: 10,
        desc: "this is the description",
        reviews: [
            {
                name: "divya",
                rating: 4.6,
            },
        ],
        avgRating: 4.5,
        photo: tourImg01,
        featured: true,
    },
    {
        id: "02",
        title: "Sadashivgad",
        city: "Karad",
        distance: 250,
        address: "Somewhere",
        price: 149,
        maxGroupSize: 8,
        desc: "this is the description",
        reviews: [
            {
                name: "tanmay",
                rating: 4.5,
            },
        ],
        avgRating: 4.7,
        photo: tourImg02,
        featured: true,
    },
    {
        id: "03",
        title: "Pavkeshwar",
        city: "Karad",
        distance: 170,
        address: "Somewhere",
        price: 49,
        maxGroupSize: 8,
        desc: "this is the description",
        reviews: [
            {
                name: "amey",
                rating: 4.1,
            },
        ],
        avgRating: 4.1,
        photo: tourImg03,
        featured: true,
    },
    {
        id: "04",
        title: "Kathi",
        address: "Somewhere",
        city: "Patan",
        distance: 1500,
        price: 249,
        maxGroupSize: 8,
        desc: "this is the description",
        reviews: [
            {
                name: "prasad",
                rating: 4.8,
            },
        ],
        avgRating: 4.8,
        photo: tourImg04,
        featured: true,
    },
    {
        id: "05",
        title: "Dhareshwar",
        city: "Patan",
        distance: 2500,
        price: 299,
        address: "Somewhere",
        maxGroupSize: 8,
        desc: "this is the description",
        reviews: [
            {
                name: "dhanraj",
                rating: 4.6,
            },
        ],
        avgRating: 4.5,
        photo: tourImg05,
        featured: false,
    },
    {
        id: "06",
        title: "Dategad",
        city: "Patan",
        distance: 500,
        address: "Somewhere",
        price: 299,
        maxGroupSize: 8,
        desc: "this is the description",
        reviews: [],
        avgRating: 4.5,
        photo: tourImg06,
        featured: false,
    },
    {
        id: "07",
        title: "Vasantgad",
        city: "Karad",
        distance: 500,
        price: 199,
        address: "Somewhere",
        maxGroupSize: 8,
        desc: "this is the description",
        reviews: [],
        avgRating: 4.5,
        photo: tourImg07,
        featured: false,
    },
    {
        id: "08",
        title: "Sadawaghapur",
        city: "Patan",
        address: "Somewhere",
        distance: 700,
        price: 249,
        maxGroupSize: 8,
        desc: "this is the description",
        reviews: [],
        avgRating: 4.7,
        photo: tourImg08,
        featured: false,
    },
];

export default tours;
