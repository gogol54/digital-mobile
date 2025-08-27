import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { showToast } from "../lib/functions/showToast";

const Preview = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { appointment } = route.params;

  // Detecta tipo de arquivo pela extensão
  const getFileType = (file) => {
    if (!file) return "unknown";
    const ext = file.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image";
    if (ext === "pdf") return "pdf";
    if (ext === "zip") return "zip";
    return "other";
  };

  const openFile = (index) => {
    const file = appointment?.files[index];
    const type = getFileType(file);

    if (type === "image") {
      setSelectedFile(file);
      setModalVisible(true);
    } else {
      // fecha qualquer modal aberta antes de abrir outro tipo
      setModalVisible(false);
      setSelectedFile(null);

      // Para PDF / ZIP: abre direto no navegador
      Linking.openURL(file).catch(() =>
        showToast("error", "Não foi possível abrir o arquivo.")
      );
    }
  };


  // Salvar imagem na galeria
  const saveImageToGallery = async () => {
    try {
      if (!selectedFile) return;

      const fileUri = FileSystem.cacheDirectory + "downloaded_image.jpg";
      const { uri } = await FileSystem.downloadAsync(selectedFile, fileUri);

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        setModalVisible(false);
        showToast(
          "error",
          "O aplicativo precisa de permissão para salvar imagens na galeria."
        );
        return;
      }

      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);

      setModalVisible(false);
      showToast("success", "Sucesso! A imagem foi salva na galeria.");
    } catch (error) {
      setModalVisible(false);
      showToast("error", "Erro. Não foi possível salvar a imagem.");
    }
  };

  const renderFileCard = (item, index) => {
    const type = getFileType(item);

    if (type === "image") {
      return (
        <TouchableOpacity style={styles.card} onPress={() => openFile(index)}>
          <Image source={{ uri: item }} style={styles.cardImage} />
        </TouchableOpacity>
      );
    }

    // Para PDFs / ZIPs, mostra ícone
    return (
      <TouchableOpacity style={styles.card} onPress={() => openFile(index)}>
        <Ionicons
          name={type === "pdf" ? "document-text-outline" : "folder-outline"}
          size={60}
          color="#007BFF"
          style={{ marginTop: 30, marginBottom: 20 }}
        />
        <Text style={{ fontSize: 14, color: "#333", marginBottom: 10 }}>
          {type.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Arquivos do Exame</Text>
      </View>

      {/* Grid */}
      <FlatList
        data={appointment?.files}
        renderItem={({ item, index }) => renderFileCard(item, index)}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />

      {/* Modal para imagens */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
       
            <Text style={styles.modalCloseText} onPress={() => setModalVisible(false)}>Fechar</Text>

          <Image source={{ uri: selectedFile }} style={styles.modalImage} />

          <TouchableOpacity
            onPress={saveImageToGallery}
            style={styles.downloadButton}
          >
            <Text style={styles.downloadButtonText}>Salvar na Galeria</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginLeft: 10,
  },
  grid: {
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
    alignItems: "center",
    overflow: "hidden",
    height: 150,
    justifyContent: "center",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 10,
  },
  modalImage: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
  },
  modalClose: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
  },
  modalCloseText: {
    color: "#fff",
    fontSize: 16,
  },
  downloadButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  downloadButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Preview;
