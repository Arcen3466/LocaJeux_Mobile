import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './view/Login';
import Register from './view/Register';
import Home from './view/Home'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home"  options={{ title: 'LocaJeux' }} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
