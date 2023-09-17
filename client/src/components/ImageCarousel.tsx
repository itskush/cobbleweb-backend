import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";

type Props = {
    name: string;
    url: string;
};

const ImageCarousel = ({ name, url }: Props) => {
    return (
            <div className="flex flex-row my-10 justify-center items-center">
            { 
                <img src={url} alt={name} className='max-w-[70%] mx-auto max-sm:min-w-[80px]' />
            }
            <p className="legend hover:!bg-yellow-300 hover:!text-black">{name}</p>
            </div>
    );
};

export default ImageCarousel;