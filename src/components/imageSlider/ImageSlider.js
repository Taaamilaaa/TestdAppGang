import { useEffect, useState } from 'react';
import styles from "./ImageSlider.module.css"

export function ImageSlider({ slides }) {    
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderStyles = {
        height: '100%',
        position: 'relative',
    };

    const slideStyles = {
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${slides[currentIndex]})`,
    };
    const leftArrowStyles = {
        position: 'absolute',
        top: '50%',
        transform: 'translate (0, -50%)',
        left: '-30px',
        fontSize: '45px',
        zIndex: 1,
        cursor: 'pointer',
        color:'#3c3e549f',
    };
    const rightArrowStyles = {
        position: 'absolute',
        top: '50%',
        transform: 'translate (0, -50%)',
        right: '-30px',
        fontSize: '45px',
        zIndex: 1,
        cursor: 'pointer',
        color:'#3c3e549f',
    };
    const dotsContainerStyles = {
        display: 'flex',
        justifyContent: 'center',
    };
    const dotsStyles = {
        fontSize: '50px',
        fontWeight: '800',
        margin: '0 5px',
        cursor: 'pointer',
        color:'#3c3e549f',
    };

   

    const goToPrev = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    const goToSlide = slideIndex => {
        setCurrentIndex(slideIndex);
    };
    
    return (
        <>
            <div className={styles.sliderContainer}>
                <div style={sliderStyles}>
                    <div style={leftArrowStyles} onClick={goToPrev}>
                        ❰
                    </div>
                    <div style={rightArrowStyles} onClick={goToNext}>
                        ❱
                    </div>
                    <div style={slideStyles}></div>
                    <div style={dotsContainerStyles}>
                        {slides.map((slide, slideIndex) => {
                            return (
                                <div
                                    key={slideIndex}
                                    style={dotsStyles}
                                    onClick={() => goToSlide(slideIndex)}
                                >
                                    ⋅
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
