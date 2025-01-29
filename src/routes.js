import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { View, Image, StyleSheet } from 'react-native';
import Home from './screens/Home';
import Login from './screens/Login';
import Forgot from './screens/Forgot';
import List from './screens/List';
import Profile from './screens/Profile';
import Resume from './screens/Resume';
import Preview from './screens/Preview';
import UserProfile from './screens/UserProfile';
import UserUpdate from './screens/UserUpdate';
import Request from './screens/Request';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const currentUser = useSelector(state => state.user?.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Alterado para null inicialmente para saber se está carregando
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    // Verifica o status de login
    if (currentUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false); // Após a verificação, define que o carregamento terminou
  }, [currentUser]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Image source={require('../assets/loading.webp')} style={styles.loadingImage} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Group>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="List" component={List} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
            <Stack.Screen name="UserUpdate" component={UserUpdate} options={{ headerShown: false }} />
            <Stack.Screen name="Resume" component={Resume} options={{ headerShown: false }} />
            <Stack.Screen name="Preview" component={Preview} options={{ headerShown: false }} />
            <Stack.Screen name="Request" component={Request} options={{ headerShown: true, title: 'Solicitação de Exame' }} />
          </Stack.Group>
        ) : (
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Forgot" component={Forgot} options={{ title: "Voltar" }} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Cor de fundo enquanto carrega
  },
  loadingImage: {
    width: 100, // Tamanho do seu gif
    height: 100, // Tamanho do seu gif
  }
});
