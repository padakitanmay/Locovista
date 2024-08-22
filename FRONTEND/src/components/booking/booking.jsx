import React, { useState } from "react";
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
    const totalAmount = Number(price) * Number(credentials.guestSize) + Number(serviceFee);

    const handleClick = (e) => {
        e.preventDefault();
        navigate("/thank-you");
    };

    return (
        <div className="p-8 rounded-lg border border-primary sticky top-20">
            <div className="border-b border-gray-200 pb-8">
                <h3 className="text-2xl font-bold">Add Details</h3>
            </div>
            <div className="pt-8">
                <h5 className="mb-4">Information</h5>
                <Form onSubmit={handleClick}>
                    <FormGroup>
                        <input
                            type="text"
                            placeholder="Full Name"
                            id="fullName"
                            required
                            onChange={handleChange}
                            className="w-full p-2 rounded-lg border-b border-gray-200 text-gray-700 text-base"
                        />
                    </FormGroup>
                    <FormGroup>
                        <input
                            type="number"
                            placeholder="Phone"
                            id="phone"
                            required
                            onChange={handleChange}
                            className="w-full p-2 rounded-lg border-b border-gray-200 text-gray-700 text-base"
                        />
                    </FormGroup>
                    <FormGroup className="flex items-center gap-3">
                        <input
                            type="date"
                            id="bookAt"
                            required
                            onChange={handleChange}
                            className="w-full p-2 rounded-lg border-b border-gray-200 text-gray-700 text-base"
                        />
                        <input
                            type="number"
                            placeholder="Members"
                            id="guestSize"
                            required
                            onChange={handleChange}
                            className="w-full p-2 rounded-lg border-b border-gray-200 text-gray-700 text-base"
                        />
                    </FormGroup>
                </Form>
            </div>
            <div className="mt-4">
                <div className="border-0 p-0">
                    <h5 className="flex items-center gap-1 text-gray-700 text-base">
                        ₹{price}
                        <i className="ri-close-line"> 1 person</i>
                    </h5>
                    <span className="text-gray-700 text-base">₹{price}</span>
                </div>
                <div className="border-0 p-0">
                    <h5 className="text-gray-700 text-base">Service Charge</h5>
                    <span className="text-gray-700 text-base">₹{serviceFee}</span>
                </div>
                <div className="total border-0 p-0">
                    <h5 className="text-gray-800 font-bold text-lg">Total</h5>
                    <span className="text-gray-800 font-bold text-lg">₹{totalAmount}</span>
                </div>
               
                <Button
                    className="btn w-full mt-4 bg-primary text-white py-2 rounded-lg"
                    onClick={handleClick}
                >
                    Book Now
                </Button>
            </div>
        </div>
    );
};

export default Booking;
