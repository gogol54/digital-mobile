import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Login from './screens/Login';
import List from './screens/List';
import Profile from './screens/Profile';
import Resume from './screens/Resume';
import Preview from './screens/Preview';
import UserProfile from './screens/UserProfile';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const currentUser = 1; 
  return (<>
    { currentUser ? (
    <NavigationContainer>
      <Stack.Navigator> 
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="List" 
          component={List} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Profile" 
          component={Profile} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="UserProfile" 
          component={UserProfile} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Resume" 
          component={Resume} 
          options={{ headerShown: false }}
        />
          <Stack.Screen 
          name="Preview" 
          component={Preview} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    ) : (
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Login" 
          component={Login} 
          screenOptions={{
            title:'Centro de Radiologia Odontológica Digital'
            }}
          > 
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    )}
  </>);
}