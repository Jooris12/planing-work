// apiService.js
import axios from 'axios';

const API_BASE_URL = 'https://api.trello.com/1'; // Remplacez par l'URL de l'API

export const fetchTasks = async () => {
  const response = await axios.get(`${API_BASE_URL}/tasks`);
  return response.data;
};

export const addTask = async (task) => {
  const response = await axios.post(`${API_BASE_URL}/tasks`, task);
  return response.data;
};

// Ajoutez d'autres fonctions selon vos besoins
