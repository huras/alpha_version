import React, { useState } from 'react';
import { Carousel, Card } from 'react-bootstrap';

const CarouselSelect = ({ options, onSetOption }) => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
        onSetOption(options[selectedIndex]);
    };

    return (
        <Card>
            {/* <Card.Header>Choose an Option</Card.Header> */}
            <Carousel 
                activeIndex={index}
                onSelect={setIndex} 
                interval={null} 
                touch={true} 
                slide={true}
                indicators={false}
                variant="dark"
            >
                {options.map((option, idx) => (
                    <Carousel.Item key={idx}>
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <img
                                style={{ width: '60%', height: 'auto'}}
                                className="d-block"
                                src={option.img}
                                alt={option.label}
                                onClick={(e) => handleSelect(idx, e)}
                            />
                            <h3>{option.label}</h3>
                            <p>{option?.description}</p>
                        </div>
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Card>
    );
};

export default CarouselSelect;
