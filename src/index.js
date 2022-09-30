import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'


import { initializeApp } from "firebase/app";


 const firebaseConfig = {
    apiKey: "AIzaSyAmJlA84qZLWZOdP59EhPpnuP1q0Ox-QC4",
    authDomain: "drag-95cad.firebaseapp.com",
    databaseURL: "https://drag-95cad-default-rtdb.firebaseio.com",
    projectId: "drag-95cad",
    storageBucket: "drag-95cad.appspot.com",
    messagingSenderId: "183858699554",
    appId: "1:183858699554:web:2a1714f1263c2052d6997b"
  };

export const app = initializeApp(firebaseConfig);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>

      <BrowserRouter>
          <App />
    </BrowserRouter>


    </Provider>
    
  </React.StrictMode>
);


