import { useState, useRef } from 'react';
import './AgroShop.css';

interface Slide {
    id: number;
    title: string;
    subtitle: string;
    bgColor: string;
    textColor: string;
    offerText: string;
    period: string;
}

const slides: Slide[] = [
    {
        id: 1,
        title: 'Upto ₹100 off',
        subtitle: 'Upto ₹100 off on first order',
        bgColor: '#ffebee',
        textColor: '#d32f2f',
        offerText: '70% OFF',
        period: 'DEC',
    },
    {
        id: 2,
        title: 'Buy 1 Get 1 FREE',
        subtitle: 'Premium Products & More',
        bgColor: '#e8f5e9',
        textColor: '#388e3c',
        offerText: '50% OFF',
        period: 'TODAY',
    },
    {
        id: 3,
        title: 'Flash Sale',
        subtitle: 'Limited Time Offer',
        bgColor: '#e3f2fd',
        textColor: '#1976d2',
        offerText: '60% OFF',
        period: 'NOW',
    },
];

const ImageSlider = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const scrollViewRef = useRef<HTMLDivElement>(null);

    const handleSlideChange = (e: React.UIEvent<HTMLDivElement>) => {
        const scrollLeft = e.currentTarget.scrollLeft;
        const slideWidth = e.currentTarget.clientWidth;
        const currentIndex = Math.round(scrollLeft / slideWidth);
        setActiveSlide(currentIndex);
    };

    return (
        <div className="image-slider-container">
            <div
                ref={scrollViewRef}
                className="image-slider-scroll"
                onScroll={handleSlideChange}
            >
                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className="image-slider-slide"
                        style={{ backgroundColor: slide.bgColor }}
                    >
                        <div className="image-slider-offer-badge">
                            <div className="image-slider-offer-percentage">{slide.offerText}</div>
                            <div className="image-slider-offer-period">{slide.period}</div>
                        </div>
                        <div className="image-slider-content">
                            <h3 className="image-slider-title" style={{ color: slide.textColor }}>
                                {slide.title}
                            </h3>
                            <p className="image-slider-subtitle">{slide.subtitle}</p>
                            <button className="image-slider-shop-button">Shop Now</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="image-slider-pagination">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`image-slider-pagination-dot ${activeSlide === index ? 'active' : ''}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;

