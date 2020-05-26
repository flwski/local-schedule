import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import Calendar from './Calendar';
import Perfil from './Perfil';
import Welcome from './Wecome';

const Stack = createStackNavigator();

function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={Welcome} options={{headerShown:false}} />        
          <Stack.Screen name="Calendar" component={Calendar} options={{headerShown:false}} />        
          <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />        
          <Stack.Screen name="Perfil" component={Perfil} options={{headerShown:false}} />        
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  export default App;