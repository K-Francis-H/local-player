import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Album from './Album';
import Artist from './Artist';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route index element={<App />}/>
            <Route path="artist" element={<Artist />}/>
            <Route path="artist/album" element={<Album />}/>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

//try ^ using :artist and :artist/albums
//and maybe :artist/albums/:album
//so that it doesnt get lost

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
