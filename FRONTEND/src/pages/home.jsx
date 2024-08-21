import React from "react";
import { Container, Row, Col } from "reactstrap";
import galleryVideo from "../assets/images/galleryVideo.mp4";
import Subtitle from "./../shared/subtitle";
import SearchBar from "../shared/searchbar";
import ServicesList from "../services/servicesList";
import FeaturedTourList from "../featuredTour/featuredTourList";
import Reviews from "../components/reviews/reviews";
import homeBg from "../assets/images/abc.jpg"

const Home = () => {
    return (
        <>
            {/* Home Page Section */}
            <section className="relative h-auto w-full py-10 px-8 bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-center"
                 style={{ 
                    backgroundImage: `linear-gradient(rgba(0, 0, 1, 0.42), rgba(0, 0, 1, 0.549)), url(${homeBg})`
                }}>
                <div className="absolute inset-0 z-0"></div>
                <div className="relative z-10 text-white text-center">
                    <Subtitle subtitle="Speed before starting your experience" />
                    <h2 className="text-4xl font-medium py-6">
                        <strong>Locovista |</strong> Building Memories Across the World!
                    </h2>
                    <div className="w-auto h-auto">
                        <SearchBar />
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="py-12">
                <Container>
                    <Row>
                        <Col lg="6">
                            <div className="mb-8">
                                <Subtitle subtitle="Experience" />
                                <h2 className="text-3xl font-medium text-primary mb-4">
                                    With all your experience <br /> we will serve you
                                </h2>
                                <p className="text-lg text-gray-700">
                                    Lorem ipsum dolor sit, amet <br />
                                    consectetur adipisicing elit. Inventore dicta consectetur natus.
                                </p>
                            </div>
                            <div className="flex justify-around items-center mt-10">
                                <div className="text-center">
                                    <span className="block w-16 h-16 bg-secondary text-white text-2xl font-semibold rounded-full flex items-center justify-center mb-2">999+</span>
                                    <h6 className="text-sm text-gray-700">Successful Trips</h6>
                                </div>
                                <div className="text-center">
                                    <span className="block w-16 h-16 bg-secondary text-white text-2xl font-semibold rounded-full flex items-center justify-center mb-2">199+</span>
                                    <h6 className="text-sm text-gray-700">Regular Clients</h6>
                                </div>
                                <div className="text-center">
                                    <span className="block w-16 h-16 bg-secondary text-white text-2xl font-semibold rounded-full flex items-center justify-center mb-2">3+</span>
                                    <h6 className="text-sm text-gray-700">Years of Experience</h6>
                                </div>
                            </div>
                        </Col>
                        <Col lg="6">
                            <div className="relative">
                                <video src={galleryVideo} className="w-full rounded-2xl shadow-lg" controls />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Our Service Section
            <section className="py-12">
                <Container>
                    <Row>
                        <Col lg="3">
                            <Subtitle subtitle="Our Services" />
                            <h2 className="text-2xl font-medium text-primary mb-8">
                                We offer our best Services
                            </h2>
                        </Col>
                        <ServicesList />
                    </Row>
                </Container>
            </section> */}

            {/* Featured Tour */}
            <section className="py-12">
                <Container>
                    <Row>
                        <Col lg="12" className="mb-8">
                            <Subtitle subtitle="Explore" />
                            <h2 className="text-2xl font-medium text-primary">
                                Our Featured Tours
                            </h2>
                        </Col>
                        <FeaturedTourList />
                    </Row>
                </Container>
            </section>

            {/* Reviews Section */}
            <section className="py-12">
                <Container>
                    <Row>
                        <Col lg="12">
                            <Subtitle subtitle="Our Clients" />
                            <h2 className="text-2xl font-medium text-primary mt-4">
                                What our Clients say about us:
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
