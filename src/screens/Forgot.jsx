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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ForgotEmail } from "../lib/actions/userRequest";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handlePasswordRecovery = async () => {
    setLoading(true)

    try {
      // Simulação de envio do e-mail de recuperação
      ForgotEmail(email, navigation)
    } catch (error) {
      console.error("Erro ao enviar e-mail de recuperação:", error)
    } finally {
      setLoading(false)
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
        <Text style={styles.instructionText}>
          Insira o e-mail associado à sua conta. Enviaremos instruções para redefinir sua senha.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#6C757D"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TouchableOpacity 
          style={styles.button} 
          onPress={handlePasswordRecovery} 
          disabled={loading || !email.trim()}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Recuperar Senha</Text>
          )}
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
    marginTop: -20,
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
  instructionText: {
    fontSize: 16,
    color: "#6C757D",
    textAlign: "center",
    marginBottom: 15,
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
  backButton: {
    marginTop: 15,
  },
  backButtonText: {
    color: "#007BFF",
    textAlign: "center",
    fontSize: 14,
  },
});

export default Forgot
