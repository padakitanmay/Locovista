import React from "react";
import Slider from "react-slick";
import ava1 from "../../assets/images/ava1.jpg";
import ava2 from "../../assets/images/ava2.jpg";
import ava3 from "../../assets/images/ava3.jpg";
import ava5 from "../../assets/images/ava5.jpg";

const Reviews = () => {
    const settings = {
        dots: true,
        Infinite: true,
        autoplay: true,
        speed: 250,
        swipeToSlide: true,
        autoplaySpeed: 5000,
        slidestoShow: 2,

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
        <Slider {...settings}>
            <div className='reviews py-4 px-3'>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                    iusto natus ratione. Et, enim.
                </p>
                <div className='d-flex align-items-center gap-4 mt-3'>
                    <img src={ava1} className='w-25 h-25 ' alt='' />
                    <div>
                        <h5 className='mb-0 mt-3 rounded-2'>Vamika Kohli</h5>
                        <p>Customer</p>
                    </div>
                </div>
            </div>
            <div className='reviews py-4 px-3'>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                    iusto natus ratione. Et, enim.
                </p>
                <div className='d-flex align-items-center gap-4 mt-3'>
                    <img src={ava2} className='w-25 h-25 rounded-2' alt='' />
                    <div>
                        <h5 className='mb-0 mt-3'>Rohan Sharma</h5>
                        <p>Customer</p>
                    </div>
                </div>
            </div>
            <div className='reviews py-4 px-3'>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                    iusto natus ratione. Et, enim.
                </p>
                <div className='d-flex align-items-center gap-4 mt-3'>
                    <img src={ava3} className='w-25 h-25 rounded-2' alt='' />
                    <div>
                        <h5 className='mb-0 mt-3'>Sara Pandey</h5>
                        <p>Customer</p>
                    </div>
                </div>
            </div>
            <div className='reviews py-4 px-3'>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                    iusto natus ratione. Et, enim.
                </p>
                <div className='d-flex align-items-center gap-4 mt-3'>
                    <img src={ava5} className='w-25 h-25 rounded-2' alt='' />
                    <div>
                        <h5 className='mb-0 mt-3'>Harsh Dhoni</h5>
                        <p>Customer</p>
                    </div>
                </div>
            </div>
        </Slider>
    );
};

export default Reviews;
