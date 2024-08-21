import React, { useContext, useState } from "react";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/images/login.jpg";
import userIcon from "../assets/images/user.png";
import { AuthContext } from "../components/context/AuthContext";
import { BASE_URL } from "../utills/config";

const Register = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        email: undefined,
        password: undefined,
    });

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${BASE_URL}/auth/register`, {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const result = await res.json();
            if (!res.ok) {
                alert(result.message);
            }
            console.log(result.data);
            dispatch({ type: "REGISTER_SUCCESS" });
            navigate("/login");
        } catch (err) {
            alert(err.message);
        }
    };

    const settings = {
        dots: false,
        Infinite: true,
        autoplay: false,
        speed: 500,
        swipeToSlide: true,
        autoplaySpeed: 2000,
        slidestoShow: 3,

        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidestoShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidestoShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <section>
            <div className="container mx-auto">
                <div className="flex justify-center">
                    <div className="lg:w-2/3 mx-auto">
                        <div className="loginContainer flex justify-between">
                            <div className="w-1/2">
                                <img src={loginImg} alt="" className="w-full" />
                            </div>
                            <div className="w-1/2 p-8 bg-white rounded-lg shadow-lg">
                                <div className="user mb-8">
                                    <img src={userIcon} alt="" className="mx-auto w-16 h-16" />
                                </div>
                                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
                                <Slider {...settings} className="mb-8">
                                    <div className="reviews py-4 px-3">
                                        <div className="flex items-center justify-center gap-4">
                                            <h5 className="mb-0 mt-0 rounded-lg">User</h5>
                                        </div>
                                    </div>
                                    <div className="reviews py-4 px-3">
                                        <div className="flex items-center justify-center gap-4">
                                            <div>
                                                <h5 className="mb-0 mt-0 rounded-lg">Guide</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="reviews py-4 px-3">
                                        <div className="flex items-center justify-center gap-4">
                                            <h5 className="mb-0 mt-0 rounded-lg">Business</h5>
                                        </div>
                                    </div>
                                </Slider>
                                <form onSubmit={handleClick} className="flex flex-col items-center">
                                    <div className="mb-4 w-full">
                                        <input
                                            type="text"
                                            placeholder="Username"
                                            required
                                            id="username"
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div className="mb-4 w-full">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            required
                                            id="email"
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div className="mb-6 w-full">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            required
                                            id="password"
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 w-full"
                                    >
                                        Register
                                    </button>
                                </form>
                                <p className="mt-4">
                                    Already have an account?{" "}
                                    <Link to="/login" className="text-blue-600 hover:underline">
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
