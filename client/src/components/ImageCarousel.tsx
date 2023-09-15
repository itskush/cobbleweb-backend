import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
type Props = {
    name: string;
    url: string;
};

const ImageCarousel = ({ name, url }: Props) => {
    return (
            <div className="flex flex-row my-10">
                { 
                    <img src={url} alt={name} width="50" />
                }
               <p className="legend">{name}</p>
            </div>
    );
};

export default ImageCarousel;