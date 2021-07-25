import React from 'react';
import ReactDOM from 'react-dom';
import { positions, transitions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './store'

const options = {
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
  timeout: 3000
}

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
