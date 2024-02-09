import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import auth from "./stores/auth";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={auth}>
        <React.StrictMode>
            <BrowserRouter>
                <Dashboard/>
            </BrowserRouter>
        </React.StrictMode>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
