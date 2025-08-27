import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { View, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Home from './screens/Home';
import Login from './screens/Login';
import Forgot from './screens/Forgot';
import List from './screens/List';
import Profile from './screens/Profile';
import Resume from './screens/Resume';
import Preview from './screens/Preview';
import UserProfile from './screens/UserProfile';
import UserUpdate from './screens/UserUpdate';
import Club from './screens/Club';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppTabs({ user }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1f2937',
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#bce08f',   // cor do texto ativo
        tabBarInactiveTintColor: '#757575', // co
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Início') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Exames') {
            iconName = focused ? 'options' : 'options-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Clube') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          }

          return <Ionicons name={iconName} size={28} color={focused ? '#bce08f' : '#757575'} />;
        },
      })}
    >
      <Tab.Screen name="Início" component={Home} />
      <Tab.Screen name="Exames" component={List} />
      {user?.userType !== 'pacient' && <Tab.Screen name="Clube" component={Club} />}
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
}

export default function Routes() {
  const currentUser = useSelector(state => state.user?.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsLoggedIn(!!currentUser);
    setLoading(false);
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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="AppTabs">
              {() => <AppTabs user={currentUser} />}
            </Stack.Screen>
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="UserUpdate" component={UserUpdate} />
            <Stack.Screen name="Resume" component={Resume} />
            <Stack.Screen name="Preview" component={Preview} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Forgot" component={Forgot} />
          </>
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
    backgroundColor: 'white',
  },
  loadingImage: {
    width: 100,
    height: 100,
  },
});
