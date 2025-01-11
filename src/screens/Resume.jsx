import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

const Resume = () => {
  const route = useRoute();
  const navigation = useNavigation();
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes do Exame</Text>
      </View>
      <View style={styles.content}>
        <Image style={styles.avatar} source={{ uri: appointment.photo }} />
        <Text style={styles.doctorName}>{appointment.name}</Text>
        <Text style={styles.examType}>{appointment.procedure}</Text>
        <Text style={styles.date}>{formatDate(appointment.date)}</Text>
        
        <View style={[styles.statusContainer, { backgroundColor: `${getStatusColor(appointment.status)}` }]}
        >
          {
            appointment.status === 'finalizado' ?
              <Text style={styles.status} onPress={navigation.navigate('Preview')}>Visualizar</Text>
            :
              <Text style={styles.status}>{appointment.status}</Text>

          }
        </View>
        <Text style={styles.detailsTitle}>Detalhes</Text>
        <Text style={styles.details}>{appointment?.obs || 'Nenhuma observação inclusa'}</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => console.log("Agendar nova consulta")}
        >
          <Text style={styles.buttonText}>Agendar Nova Consulta</Text>
        </TouchableOpacity>
      </View>
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
    marginTop: 30
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 10,
  },
  content: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    marginTop: 50
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  examType: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 5,
  },
  date: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 10,
  },
  statusContainer: {
    backgroundColor: '#f3f4f6',
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  details: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 10,
    textAlign: 'justify',
  },
  button: {
    backgroundColor: '#1f2937',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '700',
  },
});

export default Resume;
