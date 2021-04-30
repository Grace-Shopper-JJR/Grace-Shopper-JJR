import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Products from './src/components/Products'
// import './index.css';


ReactDOM.render(
    <React.StrictMode>
        <App />
        <Products />
    </React.StrictMode>,
    document.getElementById('root')
);
