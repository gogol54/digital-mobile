import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const UpdateOccupationInfo = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    workplace: 'Centro de Radiologia Odontologica Digital',
    position: 'Técnico de Informática',
    cro: '14552',
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    // Aqui você pode enviar os dados atualizados para o backend
    console.log('Dados de Ocupação atualizados:', formData);
    navigation.goBack(); // Voltar para a página anterior
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Atualizar Ocupação</Text>
      </View>
      <View style={styles.form}>
        <InputField
          label="Local de Trabalho"
          value={formData.workplace}
          onChangeText={(value) => handleInputChange('workplace', value)}
        />
        <InputField
          label="Cargo"
          value={formData.position}
          onChangeText={(value) => handleInputChange('position', value)}
        />
        <InputField
          label="CRO"
          value={formData.cro}
          onChangeText={(value) => handleInputChange('cro', value)}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const InputField = ({ label, value, onChangeText, keyboardType = 'default' }) => (
  <View style={styles.inputField}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 10,
  },
  form: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  inputField: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#898989',
    marginBottom: 5,
  },
  input: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#ececec',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#1f2937',
  },
  saveButton: {
    backgroundColor: '#bce08f',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UpdateOccupationInfo;
