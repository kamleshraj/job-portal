import React from 'react';
import ReactDOM from 'react-dom/client';
import "normalize.css"
import './index.css';
import 'react-loading-skeleton/dist/skeleton.css'
import App from './App';
import store from './features/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App tab="home"/>
    </React.StrictMode>
  </Provider>
);


