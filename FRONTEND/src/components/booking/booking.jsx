import React, { useState } from "react";
import "./booking.css";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Button } from "reactstrap";
const Booking = ({ tour }) => {
    const { price } = tour;
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        userId: "01",
        userEmail: "example@gmail.com",
        fullName: "",
        phone: "",
        guestSize: 1,
        bookAt: "",
    });
    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const serviceFee = 50;

    const totalAmount =
        Number(price) * Number(credentials.guestSize) + Number(serviceFee);

    const handleClick = (e) => {
        e.preventDefault();
        navigate("/thank-you");
    };

    return (
        <div className='booking'>
            <div className='bookingTop d-flex align-items-center justify-contnt-between'>
                <h3>Add Details</h3>
            </div>
            <div className='bookingForm'>
                <h5>Information</h5>
                <Form className='bookinginfo' onSubmit={handleClick}>
                    <FormGroup>
                        <input
                            type='text'
                            placeholder='Full Name'
                            id='fullname'
                            required
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <input
                            type='number'
                            placeholder='Phone'
                            id='phone'
                            required
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup className='d-flex align-items-center gap-3'>
                        <input
                            type='date'
                            placeholder=''
                            id='boookAt'
                            required
                            onChange={handleChange}
                        />
                        <input
                            type='number'
                            placeholder='Members'
                            id='guestSize'
                            required
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Form>
            </div>
            <div className='bookingBottom'>
                {/* <ListGroup className='border-0 px-0'>
                <h5 className='d-flex align-items-center gap-1'>₹{price}<i class="ri-close-line"> 1 person</i></h5>
                <span>₹{price}</span>
            </ListGroup>
            <ListGroup className='border-0 px-0'>
                <h5>Service Charge</h5>
                <span>₹{serviceFee}</span>
            </ListGroup>

            <ListGroup className='total border-0 px-0'>
                <h5>Total</h5>
                <span>₹{totalAmount}</span>
            </ListGroup>  */}

                <Button
                    className='btn primary_btn w-100 mt-4'
                    onClick={handleClick}
                >
                    Add to Your Travelling List
                </Button>
            </div>
        </div>
    );
};

export default Booking;
