import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Modal 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const images = [
  { imageUrl: 'https://img.freepik.com/fotos-premium/uma-foto-de-uma-mandibula-com-um-dente-implantado_386912-139.jpg?w=900' },
  { imageUrl: 'https://img.freepik.com/fotos-premium/radiografia-panoramica-de-raios-x-de-dentes-dentarios-para-o-conceito-de-pesquisa-de-estruturas-dentarias_275029-1484.jpg?w=826' },
  { imageUrl: 'https://img.freepik.com/fotos-premium/imagem-digital-de-radiografia-dentaria-panoramica-da-mandibula-superior-e-inferior-radiografia-da-maxila-e-da-mandibula-tomografia-de-plano-focal_275029-3068.jpg?w=1380' },
  { imageUrl: 'https://img.freepik.com/fotos-premium/imagem-digital-de-radiografia-dentaria-panoramica-da-mandibula-superior-e-inferior-radiografia-da-maxila-e-da-mandibula-tomografia-de-plano-focal_275029-3065.jpg?w=1380' },
  { imageUrl: 'https://img.freepik.com/fotos-premium/raio-x-da-mandibula-superior-e-inferior-da-crianca-com-dentes-em-crescimento-claramente-visiveis_254257-1511.jpg' },
];

const Preview = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();

  const openImage = (index) => {
    setSelectedImage(images[index]);  // Usando o índice diretamente
    setModalVisible(true);
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
        data={images}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.card} onPress={() => openImage(index)}>
            <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()} // Usando index como chave única
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
          <Image source={{ uri: selectedImage?.imageUrl }} style={styles.modalImage} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 30
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
  },
  modalImage: {
    width: '90%',
    height: '60%',
    resizeMode: 'contain',
    marginBottom: 10,
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
});

export default Preview;
