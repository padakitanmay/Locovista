import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CommonSection from "../shared/commonSection";
import { Container, Row, Col } from "reactstrap";
import TourCard from "./../shared/placeCard";
import SearchBar from "./../shared/searchbar";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utills/config";

const Tours = () => {
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const [tours, setTours] = useState([]);
    const [filteredTours, setFilteredTours] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const showHiddenNearby = query.get("filter") === "hiddenNearby";
    const unlockedCity = location.state?.unlockedCity || null;

    // Get tour count for pagination
    const { data: tourCount } = useFetch(
        `${BASE_URL}/tours/search/getTourCount`
    );

    useEffect(() => {
        const pages = Math.ceil(tourCount / 8);
        setPageCount(pages);
        window.scrollTo(0, 0);
    }, [page, tourCount]);

    // Fetch tours or hidden nearby tours based on filter
    useEffect(() => {
        const fetchTours = async () => {
            setLoading(true);
            setError(null);

            try {
                let url = `${BASE_URL}/tours?page=${page}`;

                if (showHiddenNearby && navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        async (position) => {
                            const { latitude, longitude } = position.coords;
                            const res = await fetch(
                                `${BASE_URL}/tours/unlock-nearby?lat=${latitude}&lng=${longitude}`
                            );
                            const data = await res.json();
                            setTours(data || []);
                            setLoading(false);
                        },
                        (err) => {
                            console.error(err);
                            setError("Location access denied.");
                            setLoading(false);
                        }
                    );
                } else {
                    const res = await fetch(url);
                    const data = await res.json();
                    setTours(data.data || []);
                    setLoading(false);
                }
            } catch (err) {
                setError("Something went wrong");
                setLoading(false);
            }
        };

        fetchTours();
    }, [page, showHiddenNearby]);

    // Filter tours based on unlocked city
    useEffect(() => {
        if (tours.length > 0) {
            if (unlockedCity) {
                const filtered = tours.filter((tour) =>
                    tour.city.toLowerCase().includes(unlockedCity.toLowerCase())
                );
                setFilteredTours(filtered);
                setPage(0);
            } else {
                setFilteredTours(tours);
            }
        }
    }, [unlockedCity, tours]);

    return (
        <>
            <CommonSection title={"Places to Visit"} />
            <section>
                <Container>
                    <Row className="flex justify-center">
                        <SearchBar />
                    </Row>
                </Container>
            </section>
            <section className="pt-0">
                <Container>
                    {loading && (
                        <h4 className="text-center pt-5">Loading......</h4>
                    )}
                    {error && <h4 className="text-center pt-5">{error}</h4>}
                    {!loading && !error && (
                        <Row>
                            {filteredTours
                                ?.slice(page * 8, (page + 1) * 8)
                                .map((tour) => (
                                    <Col lg="3" className="mb-4" key={tour.id}>
                                        <TourCard tour={tour} />
                                    </Col>
                                ))}
                            <Col lg="12">
                                <div className="tourpage flex items-center justify-center mt-4 gap-3">
                                    {[...Array(pageCount).keys()].map(
                                        (number) => (
                                            <span
                                                key={number}
                                                onClick={() => setPage(number)}
                                                className={`w-8 h-8 p-1.5 rounded-full flex items-center justify-center cursor-pointer text-xl font-bold border border-secondary-color ${
                                                    page === number
                                                        ? "bg-secondary-color text-white"
                                                        : "text-heading-color"
                                                }`}
                                            >
                                                {number + 1}
                                            </span>
                                        )
                                    )}
                                </div>
                            </Col>
                        </Row>
                    )}
                </Container>
            </section>
        </>
    );
};

export default Tours;
