import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const Preview = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { appointment } = route.params;

  // Função para abrir a imagem selecionada na modal
  const openImage = (index) => {
    setSelectedImage(appointment?.files[index]);
    setModalVisible(true);
  };

  // Função para salvar a imagem na galeria
  const saveImageToGallery = async () => {
    try {
      if (!selectedImage) return;

      // Baixando a imagem para um diretório temporário
      const fileUri = FileSystem.cacheDirectory + "downloaded_image.jpg";
      const { uri } = await FileSystem.downloadAsync(selectedImage, fileUri);

      // Pedir permissão para acessar a galeria
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permissão negada", "O aplicativo precisa de permissão para salvar imagens na galeria.");
        return;
      }

      // Criar um ativo de mídia e salvá-lo na galeria
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);

      Alert.alert("Sucesso!", "A imagem foi salva na galeria.");
    } catch (error) {
      console.error("Erro ao salvar a imagem:", error);
      Alert.alert("Erro", "Não foi possível salvar a imagem.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Galeria de Imagens</Text>
      </View>

      {/* Grid */}
      <FlatList
        data={appointment?.files}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.card} onPress={() => openImage(index)}>
            <Image source={{ uri: item }} style={styles.cardImage} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()} 
        numColumns={2}
        contentContainerStyle={styles.grid}
      />

      {/* Modal for Enlarged Image */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalClose} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalCloseText}>Fechar</Text>
          </TouchableOpacity>

          <Image source={{ uri: selectedImage }} style={styles.modalImage} />

          {/* Botão de Download */}
          <TouchableOpacity onPress={saveImageToGallery} style={styles.downloadButton}>
            <Text style={styles.downloadButtonText}>Salvar na Galeria</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  grid: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    alignItems: 'center',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
  },
  modalImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  modalClose: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
  },
  modalCloseText: {
    color: '#fff',
    fontSize: 16,
  },
  downloadButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Preview;
