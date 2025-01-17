import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { createRequestExame } from "../../lib/actions/requestData";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal"; // substituindo Modalize por react-native-modal
import { Picker } from "@react-native-picker/picker";

const FormRequest = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentUser = useSelector((state) => state.user?.currentUser || {});
  const users = useSelector((state) => state.user?.list || []);

  const [formValues, setFormValues] = useState({
    dataType: "",
    obs: "",
    createdByName: "",
    createdById: "",
    pacienteNome: "",
    pacienteId: "",
    cpf: "",
    pacientPhone: "",
  });

  const [errors, setErrors] = useState({});
  const [searchDentist, setSearchDentist] = useState('');
  const [searchPatient, setSearchPatient] = useState('');
  const [isDentistModalVisible, setDentistModalVisible] = useState(false); // Controlando a visibilidade do modal de dentistas
  const [isPatientModalVisible, setPatientModalVisible] = useState(false); // Controlando a visibilidade do modal de pacientes

  const dentists = currentUser.userType === "dentist" ? [currentUser] : users.filter((user) => user.userType !== "pacient");
  const patients = users.filter((user) =>
    currentUser.userType === "dentist"
      ? user.userType === "pacient" && user.createdBy === currentUser._id
      : currentUser.userType === "admin"
      ? user.userType === "pacient"
      : false
  );

  const filteredDentists = dentists.filter(d => d.name.toLowerCase().includes(searchDentist.toLowerCase()));
  const filteredPatients = patients.filter(p => p.name.toLowerCase().includes(searchPatient.toLowerCase()));

  const validate = () => {
    const newErrors = {};
    if (!formValues.createdByName) newErrors.createdByName = "O nome do dentista é obrigatório.";
    if (!formValues.pacienteNome) newErrors.pacienteNome = "O nome do paciente é obrigatório.";
    if (!formValues.cpf) {
      newErrors.cpf = "O CPF é obrigatório.";
    } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formValues.cpf)) {
      newErrors.cpf = "O CPF deve estar no formato 000.000.000-00.";
    }
    if (!formValues.dataType) newErrors.dataType = "O tipo de exame é obrigatório.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const payload = {
        dataType: formValues.dataType,
        files: [],
        obs: formValues.obs || "",
        createdByName: formValues.createdByName,
        createdById: formValues.createdById,
        pacientId: formValues.pacienteId,
        pacientName: formValues.pacienteNome,
        pacientCPF: formValues.cpf,
        pacientPhone: formValues.pacientPhone,
        pacientImg: formValues.pacientImg,
        status: "pendente",
      };

      try {
        createRequestExame(dispatch, payload, navigation, currentUser);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={formValues.dataType}
        onValueChange={(itemValue) => setFormValues({ ...formValues, dataType: itemValue })}
        style={styles.picker}
      >
        <Picker.Item label="Selecione o Tipo de Exame" value="" />
        <Picker.Item label="Radiografia Panorâmica" value="Radiografia Panorâmica" />
        <Picker.Item label="Radiografia Periapical" value="Radiografia Periapical" />
        <Picker.Item label="Radiografia Oclusal" value="Radiografia Oclusal" />
        <Picker.Item label="Radiografia para ATM" value="Radiografia para ATM" />
        <Picker.Item label="Tomografia Computadorizada" value="Tomografia Computadorizada" />
        <Picker.Item label="Escaneamento Intraoral" value="Escaneamento Intraoral" />
        <Picker.Item label="Outro" value="Outro" />
      </Picker>
      {errors.dataType && <Text style={styles.error}>{errors.dataType}</Text>}
      <TouchableOpacity
        onPress={() => setDentistModalVisible(true)}
        style={styles.input}
      >
        <Text style={{ color: formValues.createdByName ? "#000" : "#aaa" }}>
          {formValues.createdByName || "Selecione o Dentista"}
        </Text>
      </TouchableOpacity>
      {errors.createdByName && <Text style={styles.error}>{errors.createdByName}</Text>}

      <TouchableOpacity
        onPress={() => setPatientModalVisible(true)}
        style={styles.input}
      >
        <Text style={{ color: formValues.pacienteNome ? "#000" : "#aaa" }}>
          {formValues.pacienteNome || "Selecione o Paciente"}
        </Text>
      </TouchableOpacity>
      {errors.pacienteNome && <Text style={styles.error}>{errors.pacienteNome}</Text>}

      <TextInput
        style={styles.input}
        placeholder="CPF (000.000.000-00)"
        value={formValues.cpf}
        onChangeText={(text) => setFormValues({ ...formValues, cpf: text })}
        keyboardType="numeric"
      />
      {errors.cpf && <Text style={styles.error}>{errors.cpf}</Text>}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Enviar Solicitação</Text>
      </TouchableOpacity>

      {/* Modal para selecionar o dentista */}
      <Modal
        isVisible={isDentistModalVisible}
        onBackdropPress={() => setDentistModalVisible(false)}
        onBackButtonPress={() => setDentistModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder="Pesquisar Dentista"
            value={searchDentist}
            onChangeText={setSearchDentist}
          />
          <FlatList
            data={filteredDentists}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setFormValues({ ...formValues, createdByName: item.name, createdById: item._id });
                  setDentistModalVisible(false);
                }}
                style={styles.listItem}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
            ListHeaderComponent={() => <Text style={styles.header}>Selecione o Dentista</Text>}
          />
        </View>
      </Modal>

      {/* Modal para selecionar o paciente */}
      <Modal
        isVisible={isPatientModalVisible}
        onBackdropPress={() => setPatientModalVisible(false)}
        onBackButtonPress={() => setPatientModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder="Pesquisar Paciente"
            value={searchPatient}
            onChangeText={setSearchPatient}
          />
          <FlatList
            data={filteredPatients}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setFormValues({
                    ...formValues,
                    pacienteNome: item.name,
                    pacienteId: item._id,
                    cpf: item.cpf,
                    pacientPhone: item.phone,
                  });
                  setPatientModalVisible(false);
                }}
                style={styles.listItem}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
            ListHeaderComponent={() => <Text style={styles.header}>Selecione o Paciente</Text>}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 16, 
    backgroundColor: "#fff", 
    flex: 1,
    justifyContent: 'flex-start', // Garante que o conteúdo seja empurrado para o topo
  },
  header: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 16, 
    marginTop: 20 
  },
  input: { 
    borderWidth: 0,
    borderBottomWidth: 1, 
    borderColor: "#ccc", 
    padding: 10, 
    marginBottom: 10, 
    borderRadius: 5 
  },
  picker: { 
    marginVertical: 10 
  },
  error: { 
    color: "red", 
    marginBottom: 8 
  },
  submitButton: { 
    backgroundColor: "#BCE08F", 
    padding: 15, 
    borderRadius: 5, 
    alignItems: "center",
    position: 'absolute', // Tira o botão do fluxo normal de layout
    bottom: 80, // Define uma margem de 20px do fundo da tela
    left: 16, // Adiciona espaçamento à esquerda
    right: 16, // Faz o botão ocupar a largura total com margem
  },
  submitButtonText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 16,
  },
  listItem: { 
    padding: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: "#ccc" 
  },
  modalContent: {
    backgroundColor: "white", 
    padding: 20, 
    borderRadius: 10
  }
});

export default FormRequest;
