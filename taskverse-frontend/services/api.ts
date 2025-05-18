import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const api = {
  // Get all tasks with optional status filter
  getTasks: async (status?: string) => {
    const params = status ? { status } : {};
    const response = await axios.get(`${API_URL}/tasks`, { params });
    return response.data;
  },

  // Get a single task by ID
  getTask: async (id: string) => {
    const response = await axios.get(`${API_URL}/tasks/${id}`);
    return response.data;
  },

  // Create a new task
  createTask: async (task: any) => {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
  },

  // Update a task
  updateTask: async (id: string, task: any) => {
    const response = await axios.put(`${API_URL}/tasks/${id}`, task);
    return response.data;
  },

  // Delete a task
  deleteTask: async (id: string) => {
    await axios.delete(`${API_URL}/tasks/${id}`);
  },
};