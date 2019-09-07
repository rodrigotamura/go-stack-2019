import React from 'react';
import { StatusBar } from 'react-native';
import './config/ReactotronConfig';
import Routes from './routes';


const App = () => {
  return (
    <>{ /* Yep, we can use fragment in RN */ }

      { /* barStyle="light-content" -> White color */ }
      { /* backgroundColor="#7159c1" -> Background color */ }
      { /* hidden -> Hide statusbar */ }
      { /* translucent -> TRansparent statusbar */ }
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes />
    </>
  );
};

export default App;

