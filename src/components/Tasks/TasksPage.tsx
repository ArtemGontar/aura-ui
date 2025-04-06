import React from "react";
import Task from "./Task";

const TasksPage: React.FC = () => {
  const tasks = [
    { name: "Follow TG channel 1", bonuses: 10, link: "https://example.com/1win" },
    { name: "Follow TG channel 2", bonuses: 10, link: "https://example.com/yescoin" },
  ];

  return (
    <div>
      {tasks.map((task, index) => (
        <Task key={index} name={task.name} bonuses={task.bonuses} link={task.link} />
      ))}
    </div>
  );
};

export default TasksPage;
