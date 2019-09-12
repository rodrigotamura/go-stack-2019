import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import './config/ReactotronConfig';

import Header from './components/Header';
import Routes from './routes';
import GlobalStyle from './styles/global';
import store from './store';


function App() {
  /**
   * Provider will make available the Store of our application
   * for all components
   */
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes />
        <GlobalStyle />
        <ToastContainer autoClose={3000}/>
        {/* autoclose: time in ms that toastify will close */}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
