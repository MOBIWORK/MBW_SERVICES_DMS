


import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick';
import ImageSlide from './imageSlide';


const CustomArrow = ({ direction, ...props }: any) => (
    <div
        className={`custom-arrow rounded-lg bg-black bg-opacity-15 !h-14 ${direction}`}
            {...props}
    >
        {direction === "prev" ? <LeftOutlined /> : <RightOutlined />}
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
        prevArrow: (
            <CustomArrow
                direction="prev"
            />
        ),
        nextArrow: (
            <CustomArrow
                direction="next"
            />
        ),
        // beforeChange: (oldIndex: any, newIndex: any) => setCurrentSlide(newIndex),
    };

    useEffect(()=> {
        if(slider1) setNav1(slider1.current as Slider)
        if(slider2) setNav2(slider2.current as Slider)
    },[])

    return (
        <div
            // onMouseEnter={() => setIsHovered(true)}
            // onMouseLeave={() => setIsHovered(false)}
        >
            <Slider
                asNavFor={nav2 && nav2}
                ref={slider1}
                {...settings}
            >
                <div className="h-[600px]">
                    <ImageSlide src=' "https://s3.amazonaws.com/static.neostack.com/img/react-slick" +
                            "/abstract01.jpg"'/>
                </div>
                <div className="h-[600px]">
                <ImageSlide src={
                            "https://s3.amazonaws.com/static.neostack.com/img/react-slick" +
                            "/abstract02.jpg"
                        }/>
                </div>
                <div className="h-[600px]">
                <ImageSlide src={
                            "https://s3.amazonaws.com/static.neostack.com/img/react-slick" +
                            "/abstract03.jpg"
                        }/>
                    
                </div>
                <div className="h-[600px]">
                <ImageSlide src={
                            "https://s3.amazonaws.com/static.neostack.com/img/react-slick" +
                            "/abstract01.jpg"
                        }/>
                </div>
            </Slider>
            <Slider
                className="custom-slider h-[100px] py-2"
                asNavFor={nav1 && nav1 as Slider}
                ref={slider2}
                slidesToShow={4}
                swipeToSlide={true}
                focusOnSelect={true}
            >
                <div className="h-[100px]">
                <ImageSlide src={
                            "https://s3.amazonaws.com/static.neostack.com/img/react-slick" +
                            "/abstract01.jpg"
                        }/>
                </div>
                <div className="h-[100px]">
                <ImageSlide src={
                            "https://s3.amazonaws.com/static.neostack.com/img/react-slick" +
                            "/abstract03.jpg"
                        }/>
                </div>
                <div className="h-[100px]">
                <ImageSlide src={
                            "https://s3.amazonaws.com/static.neostack.com/img/react-slick" +
                            "/abstract03.jpg"
                        }/>
                </div>
                <div className="h-[100px]">
                <ImageSlide src={
                            "https://s3.amazonaws.com/static.neostack.com/img/react-slick" +
                            "/abstract01.jpg"
                        }/>
                </div>
            </Slider>
        </div> )
}
