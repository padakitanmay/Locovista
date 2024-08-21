import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/images/login.jpg";
import userIcon from "../assets/images/user.png";
import { BASE_URL } from "../utills/config";
import { useAuth } from "../components/context/AuthContext";

const Login = () => {
    let { dispatch } = useAuth();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const result = await res.json();
            console.log(result.data);

            if (!res.ok) {
                alert(result.message);
            } else {
                let user = result.data;
                console.log(user);
                dispatch({ type: "LOGIN_SUCCESS", payload: user });
                navigate("/home");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred while logging in.");
        }
    };

    return (
        <section className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="container mx-auto">
                <div className="flex justify-center">
                    <div className="bg-white shadow-lg rounded-lg p-8 relative w-full max-w-md">
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20">
                            <img
                                src={userIcon}
                                className="w-full h-full object-cover"
                                alt=""
                            />
                        </div>
                        <div className="text-center mb-8">
                            <img
                                src={loginImg}
                                className="w-1/2 mx-auto h-60 object-contain"
                                alt=""
                            />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-8">
                            Login
                        </h2>
                        <form onSubmit={handleClick} className="w-full">
                            <div className="mb-6">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    id="email"
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    id="password"
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Login
                            </button>
                        </form>
                        <p className="text-sm text-gray-500 mt-6 text-center">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="text-blue-500 font-medium"
                            >
                                Create
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
