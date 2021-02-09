import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app'
import 'firebase/analytics'

var firebaseConfig = {
    apiKey: "AIzaSyCnu17A-LFiEZhiHFwBWSCxoi51OEB30TQ",
    authDomain: "graphql-testing-9efd3.firebaseapp.com",
    projectId: "graphql-testing-9efd3",
    storageBucket: "graphql-testing-9efd3.appspot.com",
    messagingSenderId: "617316111633",
    appId: "1:617316111633:web:98e252256e5244243e68b0",
    measurementId: "G-5SV6PHXG0H"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
