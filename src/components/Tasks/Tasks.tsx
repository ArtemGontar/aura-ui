import React from "react";
import Task from "./Task";
import styles from "./Tasks.module.css";
import Banner from "../Banner/Banner";
import image from "./../../assets/tasks.png";

const TasksPage: React.FC = () => {
  const tasks = [
    { name: "Follow TG channel 1", bonuses: 10, link: "https://example.com/1" },
    { name: "Follow TG channel 2", bonuses: 10, link: "https://example.com/2" },
    { name: "Request horoscope", bonuses: 10, link: "/horoscope" },
  ];

  return (
    <div className={styles.tasks}>
      <Banner 
        headerText="Complete Tasks"
        subText="Earn AURA tokens by completing tasks"
        bgColor="bg-blue-500"
        icon={<img src={image} alt="Complete Tasks" className="w-50 h-50" />}
      />
      {tasks.map((task, index) => (
        <Task key={index} name={task.name} bonuses={task.bonuses} link={task.link} />
      ))}
    </div>
  );
};

export default TasksPage;
