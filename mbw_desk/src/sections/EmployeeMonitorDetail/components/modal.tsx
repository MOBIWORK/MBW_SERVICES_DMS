


import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick';
import ImageSlide from './imageSlide';


const CustomArrowNext = (props) => (
    <div
    {...props}
        className={`custom-arrow rounded-[8px] bg-black bg-opacity-15 !h-14 absolute right-6 text-white !flex items-center`}
    >
        <RightOutlined />
    </div>
);

const CustomArrowPrev = (props) => (
    <div
        {...props}
        className={`custom-arrow rounded-[8px] bg-black bg-opacity-15 !h-14 left-6 absolute text-white !flex items-center`}
    >
        <LeftOutlined />
    </div>
);

interface modalProps {
    data: any[]
}


export default function ModalDetail({ data }: modalProps) {
    const [nav1, setNav1] = useState<Slider | undefined>();
    const [nav2, setNav2] = useState<Slider | undefined>();
    const slider1 = useRef<Slider | null>(null);
    const slider2 = useRef<Slider | null>(null);


    const settings = {
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <CustomArrowPrev/>
        ,
        nextArrow: <CustomArrowNext />
        ,
        // beforeChange: (oldIndex: any, newIndex: any) => setCurrentSlide(newIndex),
    };

    useEffect(() => {
        if (slider1) setNav1(slider1.current as Slider)
        if (slider2) setNav2(slider2.current as Slider)
    }, [])

    return (
        <div
        >
            <Slider
                asNavFor={nav2 && nav2}
                ref={slider1}
                {...settings}
            >
                <ImageSlide height={600} src={"https://s3.amazonaws.com/static.neostack.com/img/react-slick" +
                    "/abstract01.jpg"} />
                <ImageSlide height={600} src={
                    "https://s3.amazonaws.com/static.neostack.com/img/react-slick" +
                    "/abstract02.jpg"
                } />
                <ImageSlide height={600} src={
                    "https://s3.amazonaws.com/static.neostack.com/img/react-slick" +
                    "/abstract03.jpg"
                } />
                <ImageSlide height={600} src={
                    "https://s3.amazonaws.com/static.neostack.com/img/react-slick" +
                    "/abstract04.jpg"
                } />

            </Slider>
            <Slider
                className="custom-slider h-[100px] py-2 w-[72%] mx-auto"
                asNavFor={nav1 && nav1 as Slider}
                ref={slider2}
                slidesToShow={4}
                swipeToSlide={true}
                focusOnSelect={true}
            >
                <ImageSlide src={
                    "https://s3.amazonaws.com/static.neostack.com/img/react-slick" +
                    "/abstract01.jpg"
                } />
                <ImageSlide src={
                    "https://s3.amazonaws.com/static.neostack.com/img/react-slick" +
                    "/abstract02.jpg"
                } />
                <ImageSlide src={
                    "https://s3.amazonaws.com/static.neostack.com/img/react-slick" +
                    "/abstract03.jpg"
                } />
                <ImageSlide src={
                    "https://s3.amazonaws.com/static.neostack.com/img/react-slick" +
                    "/abstract04.jpg"
                } />
            </Slider>
        </div>)
}
