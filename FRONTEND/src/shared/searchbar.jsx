import { useRef } from "react";
import { Form, FormGroup } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/config";

const SearchBar = () => {
    const navigate = useNavigate();
    const locationRef = useRef("");

    const searchHandler = async () => {
        const location = locationRef.current.value;

        if (location.trim() === "") {
            return alert("All Fields are required!");
        }

        const res = await fetch(
            `${BASE_URL}/tours/search/getTourBySearch?city=${location}`
        );

        if (!res.ok) alert("Something went wrong");

        const result = await res.json();

        navigate(`/tours/search?city=${location}`, { state: result.data });
    };

    return (
        <div className="flex items-end justify-center min-h-screen">
            <div className="p-2 rounded-3xl mx-6 items-center shadow-lg bg-teal-400">
                <Form className="flex items-center gap-4">
                    <FormGroup className="flex gap-3 border-r-2 border-gray-300 pr-3">
                        <span className="text-2xl text-red-400">
                            <i className="ri-map-pin-2-line"></i>
                        </span>
                        <div>
                            <h6 className="mb-0">Location</h6>
                            <input
                                type="text"
                                placeholder="Where are you going?"
                                ref={locationRef}
                                className="border-none rounded-lg text-black text-sm placeholder-gray-500 focus:outline-none"
                            />
                        </div>
                    </FormGroup>
                    {/* <FormGroup className="flex gap-3 border-r-2 border-gray-300 pr-3">
                    <span className="text-2xl text-red-400">
                        <i className="ri-pin-distance-line"></i>
                    </span>
                    <div>
                        <h6 className="mb-0">Distance</h6>
                        <input
                            type="number"
                            placeholder="Distance km"
                            ref={distanceRef}
                            className="border-none rounded-lg text-black text-sm placeholder-gray-500 focus:outline-none"
                        />
                    </div>
                </FormGroup>
                <FormGroup className="flex gap-3 pr-3">
                    <span className="text-2xl text-red-400">
                        <i className="ri-group-line"></i>
                    </span>
                    <div>
                        <h6 className="mb-0">Max People:</h6>
                        <input
                            type="number"
                            placeholder="0"
                            ref={maxGroupSizeRef}
                            className="border-none rounded-lg text-black text-sm placeholder-gray-500 focus:outline-none"
                        />
                    </div>
                </FormGroup> */}
                    <span
                        className="text-xl p-2 bg-red-400 text-white rounded-r-2xl cursor-pointer flex items-center justify-center"
                        onClick={searchHandler}
                    >
                        <i className="ri-search-line"></i>
                    </span>
                </Form>
            </div>
        </div>
        // </Col>
    );
};

export default SearchBar;
