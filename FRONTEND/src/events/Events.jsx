import { Col } from "reactstrap";
import { BASE_URL } from "../utils/config";
import useFetch from "../hooks/useFetch";
import EventCard from "../shared/EventCard";

const Events = () => {
    const {
        data: fearturedTours,
        loading,
        error,
    } = useFetch(`${BASE_URL}/events/getAllEvents`);

    return (
        <>
            {loading && <h4>Loading.........</h4>}
            {error && <h4>{error}</h4>}
            {!loading &&
                !error &&
                fearturedTours?.map((tour) => (
                    <Col lg="3" className="mb-4" key={tour.id}>
                        <EventCard tour={tour} />
                    </Col>
                ))}
        </>
    );
};

export default Events;
