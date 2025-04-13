import React from "react";
import styles from "./Task.module.css";
import coin from "../../assets/coin.png";

interface TaskProps {
  name: string;
  bonuses: number;
  link: string;
}

const Task: React.FC<TaskProps> = ({ name, bonuses, link }) => {
  const handleClick = () => {
    if (link.startsWith('/')) {
      window.location.href = link;
    } else {
      window.open(link, "_blank");
    }
  };

  return (
    <div className={styles.task} onClick={handleClick}>
      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <p className={styles.bonuses}>
          +{bonuses} <img src={coin} alt="Aura coin" className={styles.coinImg} />
        </p>
      </div>
    </div>
  );
};

export default Task;
