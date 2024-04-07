import  React, { useState } from 'react';
import styles from './Carrousel.module.css';




interface CarouselProps {
    images: string[];
    nombres: string[];
    linked: string[];
  }
  
  const Carousel: React.FC <CarouselProps> = ({ images, nombres, linked }) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
   console.log(activeIndex);
   
   
   
    const nextSlide = () => {
      setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };
  
    const prevSlide = () => {
      setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };
  
    return (
      <div className={styles.todo}>
        <div className={styles.carouselContainer}>
         <div className={styles.imageContainer}>
           <img src={images[activeIndex]} className={styles.slide} />
     
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
      <div className={styles.linked}>
        <h1 className={styles.nombre}>{nombres[activeIndex]}</h1>
        <div className={styles.nombre2}>
        
         <a href={linked[activeIndex]} target="_blank" rel="noopener noreferrer" className={styles.nombre2}>Linkedin</a>
        </div>
      </div>
    </div>
    );
  };
  
  export default Carousel;