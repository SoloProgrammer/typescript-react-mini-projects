import React from "react";
import styles from "./Pagination.module.css";

type PaginationPropsType = {
  totalSlides: number;
  currSlide: number;
  setCurrSlide: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({
  setCurrSlide,
  totalSlides,
  currSlide,
}: PaginationPropsType) => {
  const handleSlideChange = (slide: number) => {
    setCurrSlide(slide);
  };
  return (
    <div className={styles.container}>
      <div className={styles.indicators}>
        {Array.from({ length: totalSlides })
          .fill(0)
          .map((_, i) => (
            <span
              onClick={() => handleSlideChange(i + 1)}
              key={i}
              className={`${styles.indicator} ${
                i + 1 === currSlide ? styles.active : ""
              }`}
            />
          ))}
      </div>
    </div>
  );
};

export default Pagination;
