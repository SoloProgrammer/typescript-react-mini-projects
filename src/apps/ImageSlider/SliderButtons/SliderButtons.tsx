import React from "react";
import styles from "./SLiderButtons.module.css";
import IconBtn from "../../Icons/IconBtn";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

type SliderButtonsPropsType = {
  currSlide?: number;
  totalSlides: number;
  setCurrSlide: React.Dispatch<React.SetStateAction<number>>;
};

const SliderButtons = ({
  totalSlides,
  setCurrSlide,
}: SliderButtonsPropsType) => {
  const handleNext = () => {
    setCurrSlide((prev) => {
      if (prev < totalSlides) {
        return ++prev;
      } else return 1;
    });
  };
  const handlePrev = () => {
    setCurrSlide((prev) => {
      if (prev > 1) {
        return --prev;
      } else return totalSlides;
    });
  };
  return (
    <div className={styles.actions}>
      <IconBtn
        onClick={handlePrev}
        Icon={FaArrowLeftLong}
        className={styles.arrow}
      />
      <IconBtn
        onClick={handleNext}
        Icon={FaArrowRightLong}
        className={styles.arrow}
      />
    </div>
  );
};

export default SliderButtons;
