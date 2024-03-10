import { CSSProperties, useEffect, useState } from "react";
import { images } from "./data";
import styles from "./app.module.css";
import SliderButtons from "./SliderButtons/SliderButtons";
import Pagination from "./Pagination/Pagination";

const ImageSlider = () => {
  const [currSlide, setCurrSlide] = useState(1);
  const TOTAL_SLIDES = images.length;

  useEffect(() => {
    let timer = setInterval(() => {
      setCurrSlide((prev) => {
        if (prev < TOTAL_SLIDES) return ++prev;
        else return 1;
      });
    }, 2000);
    return () => clearInterval(timer);
  }, [currSlide]);

  return (
    <div className={styles.container}>
      <div className={styles.outer}>
        <div
          className={styles.wrapper}
          style={{ "--left": -((currSlide - 1) * 700) } as CSSProperties}
        >
          {images.map((img) => (
            <img key={img.id} src={img.URL} alt={"Image"} />
          ))}
        </div>
        <Pagination
          setCurrSlide={setCurrSlide}
          totalSlides={TOTAL_SLIDES}
          currSlide={currSlide}
        />
      </div>
      <SliderButtons totalSlides={TOTAL_SLIDES} setCurrSlide={setCurrSlide} />
    </div>
  );
};

export default ImageSlider;
