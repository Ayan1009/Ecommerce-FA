import axios from 'axios';
 
 const instance = axios.create({
     baseURL: 'http://localhost:8000', // your server
     withCredentials: true, // crucial for sending cookies
 });
 
 export default instance;