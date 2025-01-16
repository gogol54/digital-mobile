import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  StyleSheet, 
  KeyboardAvoidingView,
  Image 
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { MaterialIcons } from "@expo/vector-icons"
import { useSelector, useDispatch } from "react-redux"
import { login } from "../lib/actions/userRequest"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()

  const navigation = useNavigation();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = { email, password };
      await login(dispatch, payload, navigation, setLoading);
    } catch (error) {
      console.error("Erro ao fazer login: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image
        source={require('../../assets/login-bg-inhert.png')}
        style={styles.logo}
      />
      <Text style={styles.logoText}>🦷 Centro de Radiologia Odontológica Digital</Text>
      <View style={styles.formContainer}>
        {/* Input de E-mail */}
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#6C757D"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {/* Input de Senha */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Senha"
            placeholderTextColor="#6C757D"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialIcons 
              name={showPassword ? "visibility-off" : "visibility"} 
              size={24} 
              color="#6C757D" 
            />
          </TouchableOpacity>
        </View>
        {/* Botão de Login */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>
        {/* Esqueci minha senha */}
        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => navigation.navigate("Forgot")}
        >
          <Text style={styles.forgotPasswordText}>Esqueceu sua senha? Recuperar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 20,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 20,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CED4DA",
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#495057",
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CED4DA",
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  inputPassword: {
    flex: 1,
    fontSize: 16,
    color: "#495057",
  },
  button: {
    backgroundColor: "#BCE08F",
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  forgotPassword: {
    marginTop: 15,
  },
  forgotPasswordText: {
    color: "#007BFF",
    textAlign: "center",
    fontSize: 14,
  },
});

export default Login;
