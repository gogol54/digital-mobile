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

const OTPLogin = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigation = useNavigation();

  const handleOTPSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`https://sua-api.com/validate-otp?otp=${otp}`);
      if (!response.ok) {
        throw new Error("Código OTP inválido ou expirado.");
      }
      const data = await response.json();
      console.log("Usuário validado:", data);
      // Navegar para a próxima página após sucesso
      navigation.navigate("Home");
    } catch (err) {
      console.error(err);
      setError("Falha ao validar o código OTP. Tente novamente.");
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
      <Text style={styles.logoText}>🦷 Centro Digital de Radiologia Odontológica</Text>
      <View style={styles.formContainer}>
        <Text style={styles.instructions}>Digite o código OTP enviado para o seu e-mail:</Text>
        <TextInput
          style={styles.input}
          placeholder="Código OTP"
          placeholderTextColor="#6C757D"
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleOTPSubmit} 
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Validar Código</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
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
  instructions: {
    fontSize: 16,
    color: "#495057",
    marginBottom: 15,
    textAlign: "center",
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
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default OTPLogin;
