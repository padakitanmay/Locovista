import React, { useRef } from "react";
import "./searchbar.css";
// import SerchResultList from '../pages/searchResultList'

import { useNavigate } from "react-router-dom";
import { Col, Form, FormGroup } from "reactstrap";
import { BASE_URL } from "../utills/config";

const SearchBar = () => {
    const navigate = useNavigate();
    const locationRef = useRef("");
    const distancceRef = useRef(0);
    const maxGroupSizeRef = useRef(0);

    const searchHandler = async () => {
        const location = locationRef.current.value;
        const distance = distancceRef.current.value;
        const maxGroupSize = maxGroupSizeRef.current.value;

        if (location === " " || distance === " " || maxGroupSize === " ") {
            return alert("All Fields are required !");
        }

        const res = await fetch(
            `${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`
        );
        // console.log(res);

        if (!res.ok) alert("Someting went wrong");

        const result = await res.json();

        navigate(
            `/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`,
            { state: result.data }
        );
    };
    //  const handleClick = e =>{
    //     e.preventDefault()
    //     navigate ("/searchResultList");
    // }

    return (
        <Col lg='12' className='SearchBar'>
            <Form className='d-flex align-items-center gap-4'>
                <FormGroup className='d-flex gap-3 form_group form_group-fast'>
                    <span>
                        <i class='ri-map-pin-2-line'></i>
                    </span>
                    <div>
                        <h6>Location</h6>
                        <input
                            type='text'
                            placeholder=' Where are you going ?'
                            ref={locationRef}
                        />
                    </div>
                </FormGroup>
                <FormGroup className='d-flex gap-3 form_group form_group-fast'>
                    <span>
                        <i class='ri-pin-distance-line'></i>
                    </span>
                    <div>
                        <h6>Distance</h6>
                        <input
                            type='number'
                            placeholder=' Distance km'
                            ref={distancceRef}
                        />
                    </div>
                </FormGroup>
                <FormGroup className='d-flex gap-3 form_group form_group-last'>
                    <span>
                        <i class='ri-group-line'></i>
                    </span>
                    <div>
                        <h6>Max People :</h6>
                        <input
                            type='number'
                            placeholder=' 0'
                            ref={maxGroupSizeRef}
                        />
                    </div>
                </FormGroup>
                <span
                    className='search_icon'
                    type='submit'
                    onClick={searchHandler}
                >
                    <i class='ri-search-line'></i>
                </span>
            </Form>
        </Col>
    );
};

export default SearchBar;
