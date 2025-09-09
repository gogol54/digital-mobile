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
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../../../lib/actions/userRequest';

const UpdateOccupationInfo = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user?.currentUser)
  const dispatch = useDispatch()
  
  const [formData, setFormData] = useState(user);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    const { password, ...sanitizedFormData } = formData;
    // Aqui você pode enviar os dados atualizados para o backend
    updateUserData(dispatch, user._id, sanitizedFormData, user)
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
          value={formData.company}
          onChangeText={(value) => handleInputChange('company', value)}
        />
        <InputField
          label="Cargo"
          value={formData.occupation}
          onChangeText={(value) => handleInputChange('occupation', value)}
        />
        <InputField
          label="CRO"
          value={formData.code}
          onChangeText={(value) => handleInputChange('code', value)}
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
    marginTop: 20,

  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 10,
    padding: 10

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
