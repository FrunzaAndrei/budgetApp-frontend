import React from 'react';
import { Provider } from 'react-redux';
import MainScreen from './MainScreen';
import { store } from './redux/configStore';

const App = () => (
  <Provider store={store}>
    <MainScreen />
  </Provider>
);

export default App;
