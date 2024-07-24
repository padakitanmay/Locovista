import React from "react";
import CommonSection from "../shared/commonSection";
import { Container, Row } from "reactstrap";
import SearchBar from "./../shared/searchbar";
const Customize = () => {
    return (
        <>
            <CommonSection title={"Customize Your Trip"} />
            <section>
                <Container>
                    <Row>
                        <SearchBar />
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Customize;
