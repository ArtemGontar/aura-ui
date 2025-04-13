import React from "react";
import { useTranslation } from "react-i18next";
import Task from "./Task";
import styles from "./Tasks.module.css";
import Banner from "../Banner/Banner";
import image from "./../../assets/tasks.png";

const TasksPage: React.FC = () => {
  const { t } = useTranslation();

  const tasks = [
    { name: t("tasks.taskList.telegramAura"), bonuses: 10, link: "https://t.me/aura_predictions" },
    { name: t("tasks.taskList.telegramPsy"), bonuses: 10, link: "https://t.me/Mozg_naiznanku_psylita" },
    { name: t("tasks.taskList.requestHoroscope"), bonuses: 10, link: "/horoscope" },
  ];

  return (
    <div className={styles.tasks}>
      <Banner 
        headerText={t("tasks.banner.title")}
        subText={t("tasks.banner.subtitle")}
        bgColor="bg-blue-500"
        icon={<img src={image} alt={t("tasks.banner.title")} className="w-50 h-50" />}
      />
      {tasks.map((task, index) => (
        <Task key={index} name={task.name} bonuses={task.bonuses} link={task.link} />
      ))}
    </div>
  );
};

export default TasksPage;
