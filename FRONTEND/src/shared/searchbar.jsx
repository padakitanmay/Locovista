import React, { useRef } from "react";
import { Col, Form, FormGroup } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utills/config";

const SearchBar = () => {
    const navigate = useNavigate();
    const locationRef = useRef("");
    const distanceRef = useRef(0);
    const maxGroupSizeRef = useRef(0);

    const searchHandler = async () => {
        const location = locationRef.current.value;
        const distance = distanceRef.current.value;
        const maxGroupSize = maxGroupSizeRef.current.value;

        if (location.trim() === "" || distance.trim() === "" || maxGroupSize.trim() === "") {
            return alert("All Fields are required!");
        }

        const res = await fetch(
            `${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`
        );

        if (!res.ok) alert("Something went wrong");

        const result = await res.json();

        navigate(
            `/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`,
            { state: result.data }
        );
    };

    return (
        <Col lg='12' className='mt-[28rem] p-2 rounded-full flex shadow-lg bg-teal-400'>
            <Form className='flex items-center space-x-3 gap-4'>
                <FormGroup className='flex gap-3 border-r-2 border-gray-300 pr-3'>
                    <span className='text-2xl text-red-400'>
                        <i className='ri-map-pin-2-line'></i>
                    </span>
                    <div>
                        <h6 className='mb-0'>Location</h6>
                        <input
                            type='text'
                            placeholder='Where are you going?'
                            ref={locationRef}
                            className='border-none rounded-lg text-sm placeholder-gray-500 focus:outline-none'
                        />
                    </div>
                </FormGroup>
                <FormGroup className='flex gap-3 border-r-2 border-gray-300 pr-3'>
                    <span className='text-2xl text-red-400'>
                        <i className='ri-pin-distance-line'></i>
                    </span>
                    <div>
                        <h6 className='mb-0'>Distance</h6>
                        <input
                            type='number'
                            placeholder='Distance km'
                            ref={distanceRef}
                            className='border-none rounded-lg text-sm placeholder-gray-500 focus:outline-none'
                        />
                    </div>
                </FormGroup>
                <FormGroup className='flex gap-3 pr-3'>
                    <span className='text-2xl text-red-400'>
                        <i className='ri-group-line'></i>
                    </span>
                    <div>
                        <h6 className='mb-0'>Max People:</h6>
                        <input
                            type='number'
                            placeholder='0'
                            ref={maxGroupSizeRef}
                            className='border-none rounded-lg text-sm placeholder-gray-500 focus:outline-none'
                        />
                    </div>
                </FormGroup>
                <span
                    className='text-xl p-2 bg-red-400 text-white rounded-r-2xl cursor-pointer flex items-center justify-center'
                    onClick={searchHandler}
                >
                    <i className='ri-search-line'></i>
                </span>
            </Form>
        </Col>
    );
};

export default SearchBar;
