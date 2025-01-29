import React, { useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  TouchableWithoutFeedback,
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const BottomBar = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // Estados para controlar a animação do fundo ao pressionar
  const homeBg = useRef(new Animated.Value(0)).current;
  const listBg = useRef(new Animated.Value(0)).current;
  const profileBg = useRef(new Animated.Value(0)).current;

  // Função para animar o fundo ao pressionar
  const handlePressIn = (bgAnim) => {
    Animated.timing(bgAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Função para animar o fundo ao soltar e só sumir após a navegação
  const handlePressOut = (bgAnim, screen) => {
    navigation.navigate(screen);
    setTimeout(() => {
      Animated.timing(bgAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }, 500); // Pequeno delay para a animação sumir após a troca de tela
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback 
        onPressIn={() => handlePressIn(homeBg)}
        onPressOut={() => handlePressOut(homeBg, 'Home')}>
        <Animated.View style={[styles.iconContainer, {
          backgroundColor: homeBg.interpolate({
            inputRange: [0, 1],
            outputRange: ['transparent', '#bce08f']
          })
        }]}> 
          <Ionicons
            name={route.name === 'Home' ? 'home' : 'home-outline'}
            size={30}
            color={route.name === 'Home' ? '#bce08f' : '#1f2937'}
          />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback 
        onPressIn={() => handlePressIn(listBg)}
        onPressOut={() => handlePressOut(listBg, 'List')}>
        <Animated.View style={[styles.iconContainer, {
          backgroundColor: listBg.interpolate({
            inputRange: [0, 1],
            outputRange: ['transparent', '#bce08f']
          })
        }]}> 
          <Ionicons
            name={route.name === 'List' ? 'options' : 'options-outline'}
            size={30}
            color={route.name === 'List' ? '#bce08f' : '#1f2937'}
          />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback 
        onPressIn={() => handlePressIn(profileBg)}
        onPressOut={() => handlePressOut(profileBg, 'Profile')}>
        <Animated.View style={[styles.iconContainer, {
          backgroundColor: profileBg.interpolate({
            inputRange: [0, 1],
            outputRange: ['transparent', '#bce08f']
          })
        }]}> 
          <Ionicons
            name={route.name === 'Profile' ? 'person' : 'person-outline'}
            size={30}
            color={route.name === 'Profile' ? '#bce08f' : '#1f2937'}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
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
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingBottom: 20,
    elevation: 10, // Para Android
    shadowColor: '#3f3f3fae', // Para iOS
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  iconContainer: {
    alignItems: 'center',
    width: 50,
    height: 40,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
});

export default BottomBar;
