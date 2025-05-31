import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Row, Col, Modal, ModalHeader, ModalBody } from "reactstrap";
import Subtitle from "./../shared/subtitle";
import SearchBar from "../shared/searchbar";
import FeaturedTourList from "../featuredTour/featuredTourList";
import homeBg from "../assets/images/india.jpg";
import { BASE_URL, GEMINI_API } from "../utils/config";
import Events from "../events/Events";
import { AuthContext } from "../components/context/AuthContext";
import axios from "axios";

const Home = () => {
    const [location, setLocation] = useState({ lat: null, lng: null });
    const [hiddenSpots, setHiddenSpots] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [aiMessage, setAiMessage] = useState("");
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
                    if (result.length > 0 && user) {
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

    useEffect(() => {
        const fetchAIMessage = async () => {

            const prompt = `Write a short, friendly news summary for a destination called solapur`;

            try {
                const api = GEMINI_API;

                const response = await axios.post(
                    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
                    {
                        contents: [{ parts: [{ text: prompt }] }],
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "x-goog-api-key": api, // 🔑 Replace with your actual Gemini API key
                        },
                    }
                );

                const aiText =
                    response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
                    "Welcome!";
                setAiMessage(aiText);
                setShowModal(true);
            } catch (err) {
                console.error("Gemini API error:", err);
            }
        };

        fetchAIMessage();
    }, []);

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

            <Modal isOpen={showModal} toggle={() => setShowModal(!showModal)}>
                <ModalHeader toggle={() => setShowModal(!showModal)}>
                    Daily News
                </ModalHeader>
                <ModalBody>
                    <p>{aiMessage}</p>
                </ModalBody>
            </Modal>
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
