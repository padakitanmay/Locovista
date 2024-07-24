import React, { useState } from "react";
import "./login.css";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import loginImg from "../assets/images/login.jpg";
import userIcon from "../assets/images/user.png";
import { BASE_URL } from "../utills/config";
import { useAuth } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { dispatch } = useAuth();
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
                // Handle login failure (display error message, etc.)
            } else {
                // Assuming the backend returns a user object upon successful login
                const user = result.data;
                console.log(user);
                // Dispatch the user information to your AuthContext
                dispatch({ type: "LOGIN_SUCCESS", payload: user });

                // Navigate to the desired page after successful login
                navigate("/home");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred while logging in.");
        }
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col lg='8' className='m-auto'>
                        <div className='loginContainer d-flex justify-content-between'>
                            <div className='loginImg'>
                                <img src={loginImg} alt='' />
                            </div>
                            <div className='loginForm'>
                                <div className='user'>
                                    <img src={userIcon} alt='' />
                                </div>
                                <h2>Login</h2>
                                <Form onSubmit={handleClick}>
                                    <FormGroup>
                                        <input
                                            type='email'
                                            placeholder='Email'
                                            required
                                            id='email'
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <input
                                            type='password'
                                            placeholder='Password'
                                            required
                                            id='password'
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <Button
                                        className='btn secondary_btn auth_btn'
                                        type='submit'
                                    >
                                        Login
                                    </Button>
                                </Form>
                                <p>
                                    Don't have an account?{" "}
                                    <Link to='/register'>Create</Link>
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Login;
