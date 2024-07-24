import React, { useContext, useState } from "react";
import "./login.css";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/images/login.jpg";
import userIcon from "../assets/images/user.png";
import { AuthContext } from "../components/context/AuthContext";
import { BASE_URL } from "../utills/config";

const Register = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
        password: "",
        role: "user",
    });

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            console.log(credentials);
            const res = await fetch(`${BASE_URL}/auth/register`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const result = await res.json();
            if (!res.ok) {
                alert(result.message);
                return;
            }
            dispatch({ type: "REGISTER_SUCCESS" });
            navigate("/login");
        } catch (err) {
            alert(err.message);
        }
    };

    const handleRole = (role) => {
        setCredentials((prev) => ({ ...prev, role }));
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col lg='8' className='m-auto'>
                        <div className='loginContainer d-flex justify-content-between'>
                            <div className='loginImg'>
                                <img src={loginImg} alt='Login' />
                            </div>
                            <div className='loginForm'>
                                <div className='user'>
                                    <img src={userIcon} alt='User' />
                                </div>
                                <h2>Register</h2>

                                <Form onSubmit={handleClick}>
                                    <div className='d-flex justify-content-center mb-4'>
                                        <Button
                                            className={`btn ${
                                                credentials.role === "user"
                                                    ? "btn-primary"
                                                    : "btn-secondary"
                                            } mx-2`}
                                            onClick={() => handleRole("user")}
                                        >
                                            User
                                        </Button>
                                        <Button
                                            className={`btn ${
                                                credentials.role === "admin"
                                                    ? "btn-primary"
                                                    : "btn-secondary"
                                            } mx-2`}
                                            onClick={() => handleRole("admin")}
                                        >
                                            Admin
                                        </Button>
                                    </div>
                                    <FormGroup>
                                        <input
                                            type='username'
                                            placeholder='Username'
                                            required
                                            id='username'
                                            value={credentials.username}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <input
                                            type='email'
                                            placeholder='Email'
                                            required
                                            id='email'
                                            value={credentials.email}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <input
                                            type='password'
                                            placeholder='Password'
                                            required
                                            id='password'
                                            value={credentials.password}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <Button
                                        className='btn secondary_btn auth_btn'
                                        type='submit'
                                    >
                                        Register
                                    </Button>
                                </Form>
                                <p>
                                    Already have an account?{" "}
                                    <Link to='/login'>Login</Link>
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Register;
