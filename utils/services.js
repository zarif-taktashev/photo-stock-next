import axios from 'axios';

const apiClient = axios.create({
  baseURL: `https://api.unsplash.com/search/photos`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  getImages() {
    return apiClient.get('?client_id=61e9df37ecc8def1b7c05bed682d3897abebb87d3840b6ed6fa2e5fe9957b457&query=office')
  }
};
