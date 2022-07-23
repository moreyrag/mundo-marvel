import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCthJ2qDVvy_F4mF5U5MjkeDmr4c_L5oC4",
  authDomain: "mundo-marvel.firebaseapp.com",
  projectId: "mundo-marvel",
  storageBucket: "mundo-marvel.appspot.com",
  messagingSenderId: "73432789420",
  appId: "1:73432789420:web:e750bcc374c6530f5b8a09"
};

initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
