import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';

import Header from './components/Header';
import Routes from './routes';
import GlobalStyle from './styles/global';


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
      </BrowserRouter>
    </Provider>
  );
}

export default App;
