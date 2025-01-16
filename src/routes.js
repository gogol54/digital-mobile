import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import Home from './screens/Home';
import Login from './screens/Login';
import Forgot from './screens/Forgot';
import List from './screens/List';
import Profile from './screens/Profile';
import Resume from './screens/Resume';
import Preview from './screens/Preview';
import UserProfile from './screens/UserProfile';
import UserUpdate from './screens/UserUpdate';
import OTPLogin from './screens/Otp';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const currentUser = useSelector(state => state.user?.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Controle do estado de login
  
  // Atualiza o estado do login
  useEffect(() => {
    if (currentUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [currentUser]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Telas para usuário autenticado */}
        {isLoggedIn ? (
          <Stack.Group>
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
              name="UserUpdate"
              component={UserUpdate}
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
          </Stack.Group>
        ) : (
          // Telas para usuários não autenticados
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Forgot" component={Forgot} options={{ title: "Voltar" }} />
            <Stack.Screen name="OTPLogin" component={OTPLogin} />
          </Stack.Group>
        )}       
      </Stack.Navigator>
    </NavigationContainer>
  );
}
