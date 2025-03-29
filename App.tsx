import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigator/RootNavigation';
import "./global.css"



function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <RootNavigation/>
      </NavigationContainer>
  );
}

export default App;
