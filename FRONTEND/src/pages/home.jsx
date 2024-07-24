import React from "react";
import "./home.css";
import { Container, Row, Col } from "reactstrap";
import galleryVideo from "../assets/images/galleryVideo.mp4";
import Subtitle from "./../shared/subtitle";
import SearchBar from "../shared/searchbar";
import ServicesList from "../services/servicesList";
import FeaturedTourList from "../featuredTour/featuredTourList";
import Reviews from "../components/reviews/reviews";
const Home = () => {
    return (
        <>
            {/*Home Page Section */}
            <section>
                <Container>
                    <Row>
                        <Col lg='12'>
                            <div className='home'>
                                <div className='homeText'>
                                    <Subtitle
                                        subtitle={
                                            "Speed before starting your experience"
                                        }
                                    />
                                    <h2 className='spanText'>
                                        <strong>Locovista |</strong> Building
                                        Memories Across the World!
                                    </h2>
                                </div>
                                <div className='search'>
                                    <SearchBar />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/*Experience Section */}
            <section>
                <Container>
                    <Row>
                        <Col lg='6'>
                            <div className='experience_content '>
                                <Subtitle subtitle={"Experience"} />
                                <h2>
                                    With all your experience <br /> we will
                                    serve you
                                </h2>
                                <p>
                                    Lorem ipsum dolor sit, amet <br />
                                    consectetur adipisicing elit. Inventore
                                    dicta consectetur natus.
                                </p>
                            </div>
                            <div className='counter_wrpper d-flex align-items-center gap-5'>
                                <div className='counterBox'>
                                    <span>999+</span>
                                    <h6>Successfull Trips</h6>
                                </div>
                                <div className='counterBox'>
                                    <span>199+</span>
                                    <h6>Regular Clients </h6>
                                </div>
                                <div className='counterBox'>
                                    <span>3+</span>
                                    <h6>years of experience</h6>
                                </div>
                            </div>
                        </Col>
                        <Col lg='6'>
                            <div className='expimg'>
                                <video src={galleryVideo} alt='' controls />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/*Our Service Section */}
            <section>
                <Container>
                    <Row>
                        <Col lg='3 '>
                            <Subtitle subtitle={"Our Services"} />
                            <h2 className='services_title'>
                                We offer our best Services
                            </h2>
                        </Col>
                        <ServicesList />
                    </Row>
                </Container>
            </section>

            {/*Featured Tour */}
            <section>
                <Container>
                    <Row>
                        <Col lg='12' className='mb-5'>
                            <Subtitle subtitle={"Explore"} />
                            <h2 className='featuredTourTile'>
                                Our Featured Tours
                            </h2>
                        </Col>
                        <FeaturedTourList />
                    </Row>
                </Container>
            </section>

            {/*Reviews Section*/}
            <section>
                <Container>
                    <Row>
                        <Col lg='12'>
                            <Subtitle subtitle={"Our Clients"} />
                            <h2 className='test_title'>
                                What our Clients say about us :
                            </h2>
                            <Reviews />
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Home;
