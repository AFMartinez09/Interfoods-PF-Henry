import  React, { useState } from 'react';
import styles from './Carrousel.module.css';



interface CarouselProps {
    images: string[];
    nombres: string[];
  }
  
  const Carousel: React.FC<CarouselProps> = ({ images, nombres }) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
   console.log(activeIndex);
   
   
   
    const nextSlide = () => {
      setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };
  
    const prevSlide = () => {
      setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };
  
    return (
      <div className={styles.carouselContainer}>
         <div className={styles.imageContainer}>
           <img src={images[activeIndex]} className={styles.slide} />
           <h1 className={styles.slide2}>{nombres[activeIndex]}</h1>
        </div>
        <div className={styles.pagination}>
          {images.map((_, index) => (
            <span
              key={index}
              className={index === activeIndex ? styles.paginationDotActive : styles.paginationDot}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
        <button onClick={prevSlide} className={styles.prev}>&#10094;</button>
        <button onClick={nextSlide} className={styles.next}>&#10095;</button>
      </div>
    );
  };
  
  export default Carousel;