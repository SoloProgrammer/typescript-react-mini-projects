import { CSSProperties, useEffect, useState } from "react";
import styles from "./App.module.css";
import { data } from "./data";
const SectionByTab = () => {
  const [currentTabId, setCurrTabId] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  useEffect(() => {
    setProgress(0);
    let progressTimer: any;
    progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 5) prev += 0.3;
        else if (prev > 5 && prev <= 10) prev += 0.6;
        else if (prev > 10 && prev <= 30) prev += 1;
        else if (prev > 30 && prev <= 50) prev += 1.5;
        else if (prev > 50) prev += 2;
        return prev;
      });
    }, 50);
    let timer = setInterval(() => {
      setCurrTabId((prev) => {
        prev = prev < data.length ? ++prev : 1;
        return prev;
      });
    }, 4100);

    return () => {
      clearInterval(timer), clearInterval(progressTimer);
    };
  }, [currentTabId]);
  return (
    <div className={styles.container}>
      <section className={styles.sectionContainer}>
        <div className={styles.tabs}>
          {data.map((tab, i) => (
            <div
              onClick={() => setCurrTabId(i + 1)}
              key={tab.title}
              className={`${styles.tab} ${
                currentTabId === i + 1 ? styles.active : ""
              }`}
            >
              <span className={styles.title}>{tab.title}</span>
              <span className={styles.subTitle}>{tab.subTitle}</span>
              <div
                style={
                  {
                    "--progress": progress,
                    bottom: currentTabId === 3 ? "21px" : "20px",
                  } as CSSProperties
                }
                className={styles.progressBar}
              ></div>
            </div>
          ))}
        </div>
        <div className={styles.images}>
          {data.map((tab, i) => (
            <div
              className={`${styles.image} ${
                currentTabId === i + 1 ? styles.active : ""
              }`}
            >
              <img src={tab.image} alt="Image" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SectionByTab;
