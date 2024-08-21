import React from "react";
import galleryVideo from "../assets/images/galleryVideo.mp4";
import Subtitle from "../shared/subtitle";
import ServicesList from "../services/servicesList";

const About = () => {
    return (
        <>
            <section>
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap">
                        <div className="lg:w-1/2 w-full">
                            <div className="experience_content mb-8 lg:mb-0 gap-5">
                                <Subtitle subtitle={"Experience"} />
                                <h2 className="text-2xl font-bold mb-4">
                                    With all your experience <br /> we will
                                    serve you
                                </h2>
                                <p className="text-gray-600">
                                    Lorem ipsum dolor sit, amet <br />
                                    consectetur adipisicing elit. Inventore
                                    dicta consectetur natus.
                                </p>
                            </div>
                            <div className="counter_wrpper flex items-center gap-5">
                                <div className="counterBox text-center">
                                    <span className="block text-3xl font-bold">
                                        999+
                                    </span>
                                    <h6 className="text-lg">Successful Trips</h6>
                                </div>
                                <div className="counterBox text-center">
                                    <span className="block text-3xl font-bold">
                                        199+
                                    </span>
                                    <h6 className="text-lg">Regular Clients</h6>
                                </div>
                                <div className="counterBox text-center">
                                    <span className="block text-3xl font-bold">
                                        3+
                                    </span>
                                    <h6 className="text-lg">
                                        Years of Experience
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <div className="expimg">
                                <video
                                    src={galleryVideo}
                                    alt=""
                                    controls
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap">
                        <div className="lg:w-1/4 w-full mb-8 lg:mb-0">
                            <Subtitle subtitle={"Our Services"} />
                            <h2 className="text-2xl font-bold services_title">
                                We offer our best Services
                            </h2>
                        </div>
                        <ServicesList />
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;
