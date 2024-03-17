// import { useEffect } from 'react';
import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const url = "http://localhost:3001";
// console.log("Url :",url);

export const chatbotapibot = async (prompt) => {
  try {
    console.log("Body :",prompt);
    // const prompt = prompt; 
    const response = await axios.post(`${url}/gemini/generate`, prompt);
    // toast.success('Login successful');
    return response;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
        console.log("Error :",error);
    //   toast.error(error.response.data.error); // Display error message from server
    } else {
    //   toast.error('Login failed. Please try again later.'); // Generic error message
    console.log("Error :",error);
    }
    throw error;
  }
};