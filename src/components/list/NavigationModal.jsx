import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';

const NavigationModal = ({ modalRef, selectedItem, handleActionPress }) => {
  return (
    <Modalize
      ref={modalRef}
      adjustToContentHeight={true}
      handlePosition="inside"
      overlayStyle={styles.modalOverlay}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Ações</Text>
          <TouchableOpacity style={styles.modalButton} onPress={() => handleActionPress()}>
            <Text style={styles.modalButtonText}>Visualizar</Text>
          </TouchableOpacity>
        <TouchableOpacity style={styles.modalButton} onPress={() => modalRef.current?.close()}>
          <Text style={styles.modalButtonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </Modalize>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  modalButton: {
    backgroundColor: '#1f2937',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default NavigationModal;
