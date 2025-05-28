import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Row, Col } from "reactstrap";
import Subtitle from "./../shared/subtitle";
import SearchBar from "../shared/searchbar";
import FeaturedTourList from "../featuredTour/featuredTourList";
import homeBg from "../assets/images/india.jpg";
import { BASE_URL } from "../utills/config";
import Events from "../events/Events";
import { AuthContext } from "../components/context/AuthContext";

const Home = () => {
    const [location, setLocation] = useState({ lat: null, lng: null });
    const [hiddenSpots, setHiddenSpots] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                setLocation({ lat, lng });
            },
            (err) => {
                console.error("Geolocation error:", err);
                toast.error(
                    "Location access denied. Can't unlock hidden spots."
                );
            }
        );
    }, []);

    useEffect(() => {
        if (location.lat && location.lng) {
            const fetchHiddenSpots = async () => {
                try {
                    const response = await fetch(
                        `${BASE_URL}/tours/unlock-nearby?lat=${location.lat}&lng=${location.lng}`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    if (!response.ok) {
                        throw new Error("Failed to fetch hidden spots");
                    }

                    const result = await response.json();
                    if (result.length > 0) {
                        setHiddenSpots(result);

                        toast.success(
                            `🎉 You've unlocked a hidden place: ${result[0].title}`,
                            {
                                onClick: () =>
                                    navigate("/tours?filter=hiddenNearby"),
                                autoClose: 5000,
                                style: { cursor: "pointer" },
                            }
                        );
                    }
                } catch (error) {
                    console.error("Fetch error:", error);
                    toast.error("Could not load hidden spots.");
                }
            };

            fetchHiddenSpots();
        }
    }, [location]);

    return user ? (
        <>
            {/* Home Page Section */}
            <section
                className="relative h-auto w-full py-10 px-8 bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 1, 0.42), rgba(0, 0, 1, 0.549)), url(${homeBg})`,
                }}
            >
                <div className="absolute inset-0 z-0"></div>
                <div className="relative z-10 text-white text-center">
                    {/* <Subtitle subtitle="Plan Right Before Starting Your Experience" /> */}
                    <h2 className="text-4xl font-medium py-6">
                        <strong>Locovista |</strong> Building Memories Across
                        the World!
                    </h2>
                    <div className="w-auto h-auto">
                        <SearchBar />
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            {/* <section className="py-12">
                <Container>
                    <Row>
                        <Col lg="6">
                            <div className="mb-8">
                                <Subtitle subtitle="Experience" />
                                <h2 className="text-3xl font-medium text-primary mb-4">
                                    With all your experience <br /> we will
                                    serve you
                                </h2>
                                <p className="text-lg text-gray-700">
                                    Latest Tours are found here!!
                                </p>
                            </div>
                            <div className="flex justify-around items-center mt-10">
                                <div className="text-center">
                                    <span className="w-16 h-16 bg-secondary text-white text-2xl font-semibold rounded-full flex items-center justify-center mb-2">
                                        999+
                                    </span>
                                    <h6 className="text-sm text-gray-700">
                                        Successful Trips
                                    </h6>
                                </div>
                                <div className="text-center">
                                    <span className="w-16 h-16 bg-secondary text-white text-2xl font-semibold rounded-full flex items-center justify-center mb-2">
                                        199+
                                    </span>
                                    <h6 className="text-sm text-gray-700">
                                        Regular Clients
                                    </h6>
                                </div>
                                <div className="text-center">
                                    <span className="w-16 h-16 bg-secondary text-white text-2xl font-semibold rounded-full flex items-center justify-center mb-2">
                                        3+
                                    </span>
                                    <h6 className="text-sm text-gray-700">
                                        Years of Experience
                                    </h6>
                                </div>
                            </div>
                        </Col>
                        <Col lg="6">
                            <div className="relative">
                                <video
                                    src={galleryVideo}
                                    className="w-full rounded-2xl shadow-lg"
                                    controls
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section> */}

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
                        <Col lg="12" className="mb-8">
                            <Subtitle subtitle="Events" />
                            <h2 className="text-2xl font-medium text-primary">
                                Events
                            </h2>
                        </Col>
                        <Events />
                    </Row>
                </Container>
            </section>
        </>
    ) : (
        <>
            <section
                className="relative h-auto w-full py-10 px-8 bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 1, 0.42), rgba(0, 0, 1, 0.549)), url(${homeBg})`,
                }}
            >
                <div className="absolute inset-0 z-0"></div>
                <div className="relative z-10 text-white text-center">
                    {/* <Subtitle subtitle="Plan Right Before Starting Your Experience" /> */}
                    <h2 className="text-4xl font-medium py-6">
                        <strong>Login First</strong> 
                    </h2>
                    <div className="w-auto h-auto">
                        <SearchBar />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
