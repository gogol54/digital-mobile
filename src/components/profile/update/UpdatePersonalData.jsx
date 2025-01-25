import React, { useState } from 'react';
import { 
  View, 
  Text,
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator,
  ScrollView, 
  Image,
  Alert,
  Modal,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { uploadFileToS3 } from '../../../lib/functions/s3Utils';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../../../lib/actions/userRequest';
import DateTimePicker from "@react-native-community/datetimepicker";

const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const UpdatePersonalData = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const user = useSelector((state) => state.user?.currentUser);
  const dispatch = useDispatch();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(user);
  const [modalVisible, setModalVisible] = useState(false); 
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // Controle do Date Picker

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleInputChangeAddress = (field, value) => {
    const fields = field.split('.');  // Quebrar o nome do campo em partes
    if (fields.length === 2) {
      setFormData(prevState => ({
        ...prevState,
        [fields[0]]: {
          ...prevState[fields[0]],
          [fields[1]]: value,  // Atualiza o campo específico dentro de 'address'
        }
      }));
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };
  

  const handleSave = () => {
    // Crie um objeto com os dados para envio
    const sendData = { ...formData };

    // Verifique se a data foi alterada antes de modificá-la
    if (formData.birthdate && formData.birthdate instanceof Date) {
      sendData.birthdate = formData.birthdate.toISOString();
    }
  
    // Enviar para o backend
    updateUserData(dispatch, user._id, sendData, user);
    navigation.goBack();
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Permita o acesso à galeria para selecionar uma imagem.');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'], 
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled) {
      setLoading(true); 
      try {
        const fileUrl = await uploadFileToS3(result.assets[0]);
        setFormData({ ...formData, img: fileUrl });
      } catch (error) {
        Alert.alert('Erro', 'Falha ao fazer upload da imagem.');
      } finally {
        setLoading(false); 
        setModalVisible(!modalVisible);
      }
    }
  };
  
  const GenderPicker = ({ selectedGender, onSelect }) => (
    <View style={styles.pickerContainer}>
      <Text style={styles.label}>Gênero</Text>
      <Picker
        selectedValue={selectedGender}
        onValueChange={(value) => onSelect(value)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione..." value="" />
        <Picker.Item label="Masculino" value="Masculino" />
        <Picker.Item label="Feminino" value="Feminino" />
        <Picker.Item label="Outro" value="Outro" />
      </Picker>
    </View>
  );

  // Função para mostrar o Date Picker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Função para lidar com a data selecionada
  const handleDateConfirm = (event, selectedDate) => {
    setDatePickerVisibility(false);
    if (selectedDate) {
      setFormData({ ...formData, birthdate: selectedDate }); // Salva a data como objeto Date
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons 
            name="arrow-back-outline" 
            size={30} 
            color="#1f2937" 
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Atualizar Dados Pessoais</Text>
      </View>
      <View style={styles.form}>
        <InputField
          label="Nome Completo"
          value={formData.name}
          onChangeText={(value) => handleInputChange('name', value)}
        />
        
        {/* Campo para a data de nascimento */}
        <View style={styles.inputField}>
          <Text style={styles.label}>Data de Nascimento</Text>
          <TouchableOpacity onPress={showDatePicker} style={styles.input}>
            <Text style={styles.inputText}>
              {formData.birthdate ? formatDate(new Date(formData.birthdate)) : 'Selecione a data'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <InputField
          label="Telefone"
          value={formData.phone}
          onChangeText={(value) => handleInputChange('phone', value)}
        />
        <InputField
          label="Email"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
        />
        <InputField
          label="Idade"
          value={formData.age}
          onChangeText={(value) => handleInputChange('age', value)}
          keyboardType="numeric"
        />
        <GenderPicker
          selectedGender={formData.gender}
          onSelect={(value) => handleInputChange('gender', value)}
        />
        <View style={styles.dividerHr}/>
        <InputField
          label="CPF"
          value={formData.cpf}
          onChangeText={(value) => handleInputChange('cpf', value)}
        />    
        <InputField
          label="CEP"
          value={formData?.address?.cep}
          onChangeText={(value) => handleInputChangeAddress('address.cep', value)}
        />
        <InputField
          label="Endereço (Rua, Nº)"
          value={formData?.address?.endereco}
          onChangeText={(value) => handleInputChangeAddress('address.endereco', value)}
        />
         <InputField
          label="Complemento"
          value={formData?.address?.complemento}
          onChangeText={(value) => handleInputChangeAddress('address.complemento', value)}
        />
        <InputField
          label="Cidade"
          value={formData?.address?.cidade}
          onChangeText={(value) => handleInputChangeAddress('address.cidade', value)}
        />
        <InputField
          label="Estado"
          value={formData?.address?.estado}
          onChangeText={(value) => handleInputChangeAddress('address.estado', value)}
        />
        <View style={styles.imageContainer}>
          {
          formData?.img ? (
            <View>
              <Text style={[styles.label, {textAlign: 'center', marginBottom: 10}]}>Imagem de Perfil</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(true)} 
              >
                <Image 
                  source={{ uri: formData?.img || null}} 
                  style={styles.imagePreview} 
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View> 
              <Text style={styles.placeholderText}>Nenhuma imagem selecionada</Text>
              <TouchableOpacity
                style={styles.customBtn}
                onPress={() => setModalVisible(true)} 
              >
                <Ionicons 
                  style={{
                    margin: 10
                  }}
                  name="image-outline" 
                  size={30} 
                  color="#1f2937"
                />
              </TouchableOpacity>
            </View>
          )}
        
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>

      {/* Modal para escolher entre Galeria e Câmera */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {
            loading ? 
            (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#1f2937" />
              </View>
            )
            :
            (
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Escolha uma opção</Text>
                <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
                  <Text style={styles.modalButtonText}>Escolher da Galeria</Text>
                </TouchableOpacity>
              
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            )
          }
        </View>
      </Modal>

      {/* DateTimePicker Modal */}
      {isDatePickerVisible && (
        <DateTimePicker
          value={new Date(formData.birthdate || new Date())}
          mode="date"
          onChange={handleDateConfirm}
        />
      )}
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
  },
  form: {
    marginTop: 10,
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
    borderBottomWidth: 1,
    borderColor: '#ececec',
    padding: 10,
    fontSize: 16,
    color: '#1f2937',
  },
  imageContainer: {
    marginTop: 20,
    alignSelf: 'center',
  },
  button: {
    width: 110,
    height: 110,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ececec',
    borderRadius: 8

  },  
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#ececec',
  },
  saveButton: {
    backgroundColor: '#bce08f',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 30,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButton: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  modalButtonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  modalCloseButton: {
    paddingVertical: 10,
    marginTop: 10,
  },
  loadingOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  inputText: {
    fontSize: 16,
    color: '#1f2937',
  },
  customBtn: {
    backgroundColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  placeholderText: {
    fontSize: 16,
    color: '#9e9e9e',
    textAlign: 'center',
  },
  picker: {
    backgroundColor: '#f8f8f8',
    marginTop: 10,
    height: 50,
  },
  dividerHr: {
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    marginVertical: 20,
  },
});

export default UpdatePersonalData;