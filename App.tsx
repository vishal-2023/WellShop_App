import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigator/RootNavigation';
import "./global.css"
import { Provider } from 'react-redux';
import store from './src/reduxToolkit/store';



function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </Provider>

  );
}

export default App;
