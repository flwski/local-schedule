import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import Calendar from './Calendar';

const Stack = createStackNavigator();

function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Calendar">
          <Stack.Screen name="Calendar" component={Calendar} options={{headerShown:false}} />        
          <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />        
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  export default App;