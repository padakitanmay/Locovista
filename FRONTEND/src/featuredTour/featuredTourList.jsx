import React from "react";
import TourCard from "../shared/tourCard";
// import tourData from '../assets/data/tours'
import { Col } from "reactstrap";
import { BASE_URL } from "../utills/config";
import useFetch from "../hooks/useFetch";

const FeaturedTourList = () => {
    const {
        data: fearturedTours,
        loading,
        error,
    } = useFetch(`${BASE_URL}/ajencys`);
    return (
        <>
            {loading && <h4>Loading.........</h4>}
            {error && <h4>{error}</h4>}
            {!loading &&
                !error &&
                fearturedTours?.map((tour) => (
                    <Col lg='3' className='mb-4' key={tour.id}>
                        <TourCard tour={tour} />
                    </Col>
                ))}
        </>
    );
};

export default FeaturedTourList;
