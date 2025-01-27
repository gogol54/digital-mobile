import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import Routes from './src/routes';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 
import { Provider as ReduxProvider } from 'react-redux';
import { persistor, store } from './src/lib/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import { 
  useFonts, 
  Montserrat_400Regular, 
  Montserrat_500Medium, 
  Montserrat_700Bold 
} from '@expo-google-fonts/montserrat';
import { Audiowide_400Regular } from '@expo-google-fonts/audiowide';

SplashScreen.preventAutoHideAsync(); // Evita esconder automaticamente

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Audiowide_400Regular,
    Montserrat_400Regular, 
    Montserrat_500Medium, 
    Montserrat_700Bold,
  });

  useEffect(() => {
    const prepareApp = async () => {
      if (!fontsLoaded) return; // Aguarda fontes serem carregadas

      setTimeout(() => {
        setIsAppReady(true); // Marca o app como pronto
      }, 2000);
    };

    prepareApp();
  }, [fontsLoaded]);

  useEffect(() => {
    if (isAppReady) {
      SplashScreen.hideAsync(); // Esconde o Splash quando o app estiver pronto
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return (
      <View style={styles.splashContainer}>
        <Image source={require('./assets/loading.webp')} style={styles.gif} />
      </View>
    );
  }

  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PaperProvider>
            <Routes />
            <Toast />
          </PaperProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </ReduxProvider>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  gif: {
    width: 150,
    height: 150,
  },
});

export default App;
