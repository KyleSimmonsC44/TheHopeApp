import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import {TheHopeApp} from "./components/TheHopeApp.js"
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <TheHopeApp />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
