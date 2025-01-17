import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const BottomBar = () => {
  const route = useRoute(); // Usando o hook useRoute para pegar a rota ativa
  const navigation = useNavigation();

  // Função para navegar para a tela especificada
  const navigateToScreen = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={route.name === 'Home' ? 'home' : 'home-outline'}
          size={30}
          color={route.name === 'Home' ? '#bce08f' : '#1f2937'}
          onPress={() => navigateToScreen('Home')}
        />
      </View>
      <View style={styles.iconContainer}>
        <Ionicons
          name={route.name === 'List' ? 'options' : 'options-outline'}
          size={30}
          color={route.name === 'List' ? '#bce08f' : '#1f2937'}
          onPress={() => navigateToScreen('List')}
        />
      </View>
      <View style={styles.iconContainer}>
        <Ionicons
          name={route.name === 'Profile' ? 'person' : 'person-outline'}
          size={30}
          color={route.name === 'Profile' ? '#bce08f' : '#1f2937'}
          onPress={() => navigateToScreen('Profile')}
        /> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingBottom: 20,
    elevation: 10, // Para Android
    shadowColor: '#000', // Para iOS
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  iconContainer: {
    alignItems: 'center',
  },
});

export default BottomBar;



