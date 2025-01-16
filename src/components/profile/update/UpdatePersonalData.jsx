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
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { uploadFileToS3 } from '../../../lib/functions/s3Utils'

const UpdatePersonalData = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Jardel Osorio Duarte',
    birthDate: '23/11/2002',
    phone: '(55) 981180042',
    email: 'jardeleko@outlook.com',
    age: '23',
    gender: 'Homem',
    cpf: '028.376.080-09',
    cep: '97590-000',
    address: 'R. João Brasil, 2085',
    city: 'Rosario do Sul',
    state: 'RS',
    imageUri: null, // Campo de imagem
  });

  const [modalVisible, setModalVisible] = useState(false); // Controle do Modal

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    console.log('Dados atualizados:', formData);
    navigation.goBack();
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Permita o acesso à galeria para selecionar uma imagem.');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'], // Corrigido para ['images', 'videos']
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled) {
      setLoading(true); // Inicia o loading
      try {
        const fileUrl = await uploadFileToS3(result.assets[0]);
        setFormData({ ...formData, imageUri: fileUrl });
      } catch (error) {
        Alert.alert('Erro', 'Falha ao fazer upload da imagem.');
      } finally {
        setLoading(false); // Finaliza o loading
        setModalVisible(!modalVisible)
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
          value={formData.fullName}
          onChangeText={(value) => handleInputChange('fullName', value)}
        />
        <InputField
          label="Data de Nascimento"
          value={formData.birthDate}
          onChangeText={(value) => handleInputChange('birthDate', value)}
        />
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
          value={formData.cep}
          onChangeText={(value) => handleInputChange('cep', value)}
        />
        <InputField
          label="Endereço"
          value={formData.address}
          onChangeText={(value) => handleInputChange('address', value)}
        />
        <InputField
          label="Cidade"
          value={formData.city}
          onChangeText={(value) => handleInputChange('city', value)}
        />
        <InputField
          label="Estado"
          value={formData.state}
          onChangeText={(value) => handleInputChange('state', value)}
        />
        <View style={styles.imageContainer}>
          {formData.imageUri ? (
            <View>
              <Text style={styles.label && {textAlign: 'center'}}>Imagem de Perfil</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(true)} // Abre o modal para escolher foto
              >
                <Image 
                  source={{ uri: formData.imageUri }} 
                  style={styles.imagePreview} 
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View> 
              <Text style={styles.placeholderText}>Nenhuma imagem selecionada</Text>
              <TouchableOpacity
                style={styles.customBtn}
                onPress={() => setModalVisible(true)} // Abre o modal para escolher foto
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
    marginBottom: 15,
  },
  imagePreview: {
    marginTop: 10,
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  placeholderText: {
    textAlign: 'center',
    color: '#898989',
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#ececec',
    width: 120,
    height: 120,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center'
  },
  customBtn: {
    alignSelf: 'center',
    backgroundColor: '#ececec',
    borderRadius: 10,
    width: 50,
    height: 50,
    padding: 0
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#bce08f',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#508dfd',
    padding: 10,
    margin: 10,
    borderRadius: 8,
    width: '80%',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  modalCloseButton: {
    backgroundColor: '#898989',
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    width: '80%',
  },
  dividerHr: {
    height: 1,
    backgroundColor: '#ececec',
    marginVertical: 10,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fundo semi-transparente
    zIndex: 1, // Garante que fique acima do conteúdo
  },
});

export default UpdatePersonalData;
