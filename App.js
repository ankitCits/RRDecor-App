import * as React from 'react';
import Navigation from './Src/Navigation';
import Store from './Src/Redux/Store/store';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={Store}>
      <Navigation />
    </Provider>
  );
};

export default App;
