import React from "react";
import styles from "./Task.module.css";
import { Coins } from "lucide-react";

interface TaskProps {
  name: string;
  bonuses: number;
  link: string;
}

const Task: React.FC<TaskProps> = ({ name, bonuses, link }) => {
  return (
    <div className={styles.task} onClick={() => window.open(link, "_blank")}>
      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <p className={styles.bonuses}>+{bonuses.toLocaleString()} <Coins /></p>
      </div>
    </div>
  );
};

export default Task;
