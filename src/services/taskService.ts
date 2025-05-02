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
      if (response.status === 404) {
        return [];
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  },

  /**
   * Verify if a task has been completed
   * @param taskId The ID of the task to verify
   */
  async verifyTask(taskId: number): Promise<boolean> {
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
  async completeTask(taskId: number): Promise<boolean> {
    try {
      const response = await api.post(`/api/tasks/${taskId}/complete`);
      return response.status === 200;
    } catch (error) {
      console.error('Error completing task:', error);
      return false;
    }
  }
};

export default taskService;
