import { 
    useFonts, 
    Montserrat_400Regular, 
    Montserrat_500Medium, 
    Montserrat_700Bold
} from '@expo-google-fonts/montserrat'
	import { 
		Audiowide_400Regular 
} from '@expo-google-fonts/audiowide'
import React, { useEffect } from 'react'
import Routes from './src/routes'
import { Provider } from 'react-native-paper'
import * as SplashScreen from 'expo-splash-screen'
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 
import {Provider as ProviderRedux} from 'react-redux'
import { persistor, store } from './src/lib/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'

SplashScreen.preventAutoHideAsync();

const App = () => {
	const [fontsLoaded] = useFonts({
		Audiowide_400Regular,
		Montserrat_400Regular, 
		Montserrat_500Medium, 
		Montserrat_700Bold
	});
	
	// Esconde o Splash quando as fontes forem carregadas
	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null; // Enquanto carrega, mantém o Splash visível
	}

	return (
		<ProviderRedux store={store}>
			<PersistGate persistor={persistor}>
				<GestureHandlerRootView style={{flex: 1}}>
					<Provider>
						<Routes />
						<Toast />
					</Provider>
				</GestureHandlerRootView>
			</PersistGate>
		</ProviderRedux>
	)
}

export default App