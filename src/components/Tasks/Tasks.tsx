import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, ChevronRight } from "lucide-react";
import Task from "./Task";
import styles from "./Tasks.module.css";
import Banner from "../Banner/Banner";
import image from "./../../assets/tasks.png";
import taskService from "../../services/taskService";
import { TaskData, TaskStatus } from "../../types/task";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { fetchUserStatsAsync } from "../../store/slices/userSlice";

const TasksPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user.userData);  
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompletedExpanded, setIsCompletedExpanded] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const tasksData = await taskService.getTasks();
        
        // Apply translations to task names
        const translatedTasks = tasksData.map(task => {
          // Check if the task name is a translation key
          if (task.name.startsWith("tasks.taskList.")) {
            return {
              ...task,
              name: t(task.name)
            };
          }
          return task;
        });
        
        setTasks(translatedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTasks();
  }, [t]);

  const verifyTask = async (taskId: number) => {
    return await taskService.verifyTask(taskId);
  };

  const completeTask = async (taskId: number) => {
    const success = await taskService.completeTask(taskId);
    
    if (success) {
      // Update local state
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? {...task, status: "completed" as TaskStatus} : task
        )
      );
      if (userData) {
        dispatch(fetchUserStatsAsync(userData.id));
      }
    }
  };

  // Separate active and completed tasks
  const activeTasks = tasks.filter(task => task.status !== "completed");
  const completedTasks = tasks.filter(task => task.status === "completed");

  const toggleCompletedTasks = () => {
    setIsCompletedExpanded(!isCompletedExpanded);
  };

  return (
    <div className={styles.tasks}>
      <Banner 
        headerText={t("tasks.banner.title")}
        subText={t("tasks.banner.subtitle")}
        bgColor="bg-blue-500"
        icon={<img src={image} alt={t("tasks.banner.title")} className="w-50 h-50" />}
      />
      
      <div className={styles.taskList}>
        {isLoading ? (
          <div className={styles.loading}>{t("tasks.loading")}</div>
        ) : (
          <>
            {/* Active Tasks */}
            {activeTasks.map((task) => (
              <Task 
                key={task.id} 
                id={task.id}
                name={task.name} 
                bonuses={task.bonuses} 
                link={task.link}
                type={task.type}
                status={task.status}
                onVerify={verifyTask}
                onComplete={completeTask}
              />
            ))}

            {/* Completed Tasks Section */}
            {completedTasks.length > 0 && (
              <div className={styles.completedSection}>
                <button 
                  className={styles.completedToggle}
                  onClick={toggleCompletedTasks}
                >
                  {isCompletedExpanded ? 
                    <ChevronDown className={styles.toggleIcon} size={16} /> : 
                    <ChevronRight className={styles.toggleIcon} size={16} />
                  }
                  {t('tasks.completedTasks')} ({completedTasks.length})
                </button>
                
                {isCompletedExpanded && (
                  <div className={styles.completedTasks}>
                    {completedTasks.map((task) => (
                      <Task 
                        key={task.id} 
                        id={task.id}
                        name={task.name} 
                        bonuses={task.bonuses} 
                        link={task.link}
                        type={task.type}
                        status={task.status}
                        onVerify={verifyTask}
                        onComplete={completeTask}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TasksPage;
