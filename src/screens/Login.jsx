import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation(); 
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = (field, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const onsubmitButton = () => {
    console.log(values);
    navigation.navigate('Home')
  };

  const buttonColor = styles.buttonDecoration.backgroundColor; // Captura a cor do botão

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Image
          style={styles.stretch}
          source={require('../../assets/login-bg.png')}
        />
      </SafeAreaView>
      <TextInput
        style={styles.textDecoration}
        label="Email"
        name="email"
        mode="outlined"
        outlineColor='#1f2937' // Aplica a cor do botão
        activeOutlineColor={buttonColor} // Aplica a cor ao focar no campo
        onChangeText={(text) => handleChange('email', text)}
      />
      <TextInput
        style={styles.textDecoration}
        label="Senha"
        name="password"
        mode="outlined"
        secureTextEntry
        outlineColor='#1f2937' // Aplica a cor do botão
        activeOutlineColor={buttonColor} // Aplica a cor ao focar no campo
        onChangeText={(text) => handleChange('password', text)}
      />
      <Button
        style={styles.buttonDecoration}
        mode="contained"
        onPress={onsubmitButton}
      >
        Entrar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white'
  },
  stretch: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  textDecoration: {
    marginBottom: 16,
  },
  buttonDecoration: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#1f2937',
  },
});

export default Login