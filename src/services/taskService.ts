import api from './api';
import { TaskData } from '../types/task';

/**
 * Service for managing user tasks
 */
export const taskService = {
  /**
   * Fetch all available tasks with their completion status
   */
  async getTasks(): Promise<TaskData[]> {
    try {
      const response = await api.get('/api/tasks');
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      
      // Fallback to localStorage during development or if API is unavailable
      const completedTaskIds = JSON.parse(localStorage.getItem('completedTasks') || '[]');
      
      // Return demo tasks when API is unavailable
      return this.getDemoTasks(completedTaskIds);
    }
  },

  /**
   * Verify if a task has been completed
   * @param taskId The ID of the task to verify
   */
  async verifyTask(taskId: string): Promise<boolean> {
    try {
      const response = await api.post(`/api/tasks/${taskId}/verify`);
      return response.data.verified === true;
    } catch (error) {
      console.error('Error verifying task:', error);
      return false;
    }
  },

  /**
   * Mark a task as completed and award bonuses
   * @param taskId The ID of the task to complete
   */
  async completeTask(taskId: string): Promise<boolean> {
    try {
      const response = await api.post(`/api/tasks/${taskId}/complete`);
      
      // Save to localStorage as fallback
      if (response.status === 200) {
        const completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
        if (!completedTasks.includes(taskId)) {
          localStorage.setItem('completedTasks', JSON.stringify([...completedTasks, taskId]));
        }
      }
      
      return response.status === 200;
    } catch (error) {
      console.error('Error completing task:', error);
      return false;
    }
  },

  /**
   * Get demo tasks for development or when API is unavailable
   * @param completedTaskIds Array of completed task IDs
   */
  getDemoTasks(completedTaskIds: string[]): TaskData[] {
    return [
      { 
        id: "tg-aura", 
        name: "Join Aura Telegram Channel", 
        bonuses: 10, 
        link: "https://t.me/aura_predictions",
        type: "external",
        status: completedTaskIds.includes("tg-aura") ? "completed" : "incomplete"
      },
      { 
        id: "tg-psy", 
        name: "Join Psychology Channel", 
        bonuses: 10, 
        link: "https://t.me/Mozg_naiznanku_psylita",
        type: "external",
        status: completedTaskIds.includes("tg-psy") ? "completed" : "incomplete"
      },
      { 
        id: "horoscope", 
        name: "Request Your Horoscope", 
        bonuses: 10, 
        link: "/horoscope",
        type: "in-app",
        status: completedTaskIds.includes("horoscope") ? "completed" : "incomplete"
      },
    ];
  }
};

export default taskService;
