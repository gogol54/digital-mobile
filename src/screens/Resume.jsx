import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { useSelector } from 'react-redux';

const Resume = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const user = useSelector((state) => state.user?.currentUser);
  const { appointment } = route.params;

  const formatDate = (date) => {
    return moment(date).locale('pt-br').format('ddd DD MMM • HH:mm');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pendente':
        return '#f8d7a5';
      case 'finalizado':
        return '#bce08f';
      case 'cancelado':
        return '#ff7462';
      default:
        return '#f8d7a5';
    }
  };

  const infoFields = [
    { label: 'Paciente', value: appointment?.pacientName },
    { label: 'Dentista', value: appointment?.dentistName },
    { label: 'Tipo de Exame', value: appointment?.dataType?.split(",").join(",\n") },
    { label: 'Data do Pedido', value: formatDate(appointment?.createdAt) },
    { label: 'Status', value: appointment?.status },
    { label: 'Observações', value: appointment?.obs || 'Nenhuma observação inclusa' },
  ];

  // Função genérica pra abrir links de download
  const handleDownload = (url) => {
    if (!url) return;
    Linking.openURL(url).catch(() =>
      alert('Não foi possível abrir o arquivo.')
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes do Exame</Text>
      </View>

      {/* Avatar + Nome */}
      <View style={styles.content}>
        <Image
          style={styles.avatar}
          source={{ uri: appointment?.pacientImg }}
        />
        <Text style={styles.name}>{appointment?.pacientName}</Text>
      </View>

      {/* Bloco de Informações */}
      <View style={styles.infoContainer}>
        {infoFields.map(
          (field, index) =>
            field.value && (
              <View key={index} style={styles.infoRow}>
                <Text style={styles.infoLabel}>{field.label}:</Text>
                <Text style={styles.infoValue}>{field.value}</Text>
              </View>
            )
        )}
      </View>

      {/* Arquivos Disponíveis */}
      {(appointment?.pdfs?.length > 0 ||
        appointment?.zips?.length > 0 ||
        appointment?.dicoms?.length > 0) && (
        <View style={styles.filesContainer}>
          <Text style={styles.filesTitle}>Arquivos Disponíveis:</Text>

          {/* PDFs */}
          {appointment.pdfs?.map((file, idx) => (
            <TouchableOpacity
              key={`pdf-${idx}`}
              style={styles.fileButton}
              onPress={() => handleDownload(file)}
            >
              <Text style={styles.fileButtonText}>Abrir Laudo PDF {idx + 1}</Text>
            </TouchableOpacity>
          ))}

          {/* ZIPs */}
          {appointment.zips?.map((file, idx) => (
            <TouchableOpacity
              key={`zip-${idx}`}
              style={styles.fileButton}
              onPress={() => handleDownload(file)}
            >
              <Text style={styles.fileButtonText}>Download DICOM ZIP {idx + 1}</Text>
            </TouchableOpacity>
          ))}

          {/* DICOMs individuais */}
          {appointment.dicoms?.map((file, idx) => (
            <TouchableOpacity
              key={`dcm-${idx}`}
              style={styles.fileButton}
              onPress={() => handleDownload(file)}
            >
              <Text style={styles.fileButtonText}>Abrir DICOM {idx + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Status + ação */}
      <TouchableOpacity
        style={[
          styles.statusContainer,
          { backgroundColor: getStatusColor(appointment.status) },
        ]}
        onPress={() =>
          navigation.navigate('Preview', { appointment: appointment })
        }
      >
        {appointment.status === 'finalizado' ? (
          <Text
            style={styles.status}
          >
            Abrir
          </Text>
        ) : (
          <Text style={styles.status}>{appointment.status}</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 20,
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
  content: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: '#1f2937',
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 30,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  infoContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  infoRow: {
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
  },
  infoValue: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
    lineHeight: 20,
  },
  filesContainer: {
    marginBottom: 20,
  },
  filesTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 10,
  },
  fileButton: {
    backgroundColor: '#1f2937',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 8,
  },
  fileButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  statusContainer: {
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    textTransform: 'capitalize',
  },
  button: {
    backgroundColor: '#1f2937',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '700',
  },
});

export default Resume;
