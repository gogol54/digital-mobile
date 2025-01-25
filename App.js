import React, { useEffect, useState } from 'react';
import { 
  View,
  ActivityIndicator, 
  Image, 
  StyleSheet 
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import Routes from './src/routes';
import { Provider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 
import { Provider as ProviderRedux } from 'react-redux';
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

SplashScreen.preventAutoHideAsync(); // Impede o splash automático do Expo

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false); // Estado do carregamento
  const [fontsLoaded] = useFonts({
    Audiowide_400Regular,
    Montserrat_400Regular, 
    Montserrat_500Medium, 
    Montserrat_700Bold
  });
  console.log('Fonts loaded:', fontsLoaded);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Aguarda o carregamento das fontes ou outros recursos
        if (fontsLoaded) {
          await new Promise(resolve => setTimeout(resolve, 2000)); // Simula carregamento adicional
        }
      } catch (e) {
        console.warn('Erro ao carregar recursos:', e);
      } finally {
        setIsAppReady(true);
        console.log('App is ready!');
        SplashScreen.hideAsync(); // Esconde o Splash do Expo
      }
    };

    prepareApp();
  }, [fontsLoaded]);

  // Exibe o loading enquanto os recursos são carregados
  if (!isAppReady) {
    return (
      <View style={styles.splashContainer}>
        {/* Use um dos dois: GIF ou ActivityIndicator */}
        {/* GIF de carregamento */}
        <Image source={require('./assets/loading.webp')} style={styles.gif} />

        {/* Loading nativo (descomente se preferir) */}
        {/* <ActivityIndicator size="large" color="#0000ff" /> */}
      </View>
    );
  }

  // Quando pronto, retorna o conteúdo principal do app
  return (
    <ProviderRedux store={store}>
      <PersistGate persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1}}>
          <Provider>
            <Routes />
            <Toast />
          </Provider>
        </GestureHandlerRootView>
      </PersistGate>
    </ProviderRedux>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Combine com a cor de fundo do splash
  },
  gif: {
    width: 150,
    height: 150, // Ajuste o tamanho do GIF
  },
});

export default App;
