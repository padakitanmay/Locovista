import { React, useState } from "react";
import CommonSection from "../shared/commonSection";
import { Container, Row, Col } from "reactstrap";
import { useLocation } from "react-router-dom";
import TourCard from "../shared/placeCard";

const SearchResultList = () => {
    const location = useLocation();
    const [data] = useState(location.state);
    return (
        <>
            <CommonSection title={"Tour Search Result"} />
            <section>
                <Container>
                    <Row>
                        {data.length === 0 ? (
                            <h4>No tour Found</h4>
                        ) : (
                            data?.map((tour) => (
                                <Col lg='3' classname='mb-4' key={tour.id}>
                                    <TourCard tour={tour} />
                                </Col>
                            ))
                        )}
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default SearchResultList;
