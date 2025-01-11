import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Pressable, 
  StyleSheet, 
  FlatList, 
  Image, 
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/pt-br';
import NavigationModal from './NavigationModal';

const patients = [
  {
    id: '1',
    name: 'Carlos Almeida',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    procedure: 'Raios-X Dentário',
    date: '2025-01-08T08:00:00',
    status: 'finalizado',
  },
  {
    id: '2',
    name: 'Ana Souza',
    photo: 'https://randomuser.me/api/portraits/women/1.jpg',
    procedure: 'Tomografia Computadorizada',
    date: '2025-01-09T14:00:00',
    status: 'cancelado',
  },
  {
    id: '3',
    name: 'Felipe Costa',
    photo: 'https://randomuser.me/api/portraits/men/2.jpg',
    procedure: 'Radiografia Panorâmica',
    date: '2025-01-10T09:30:00',
    status: 'pendente',
  },
  {
    id: '4',
    name: 'Juliana Lima',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    procedure: 'Radiografia Periapical',
    date: '2025-01-11T16:00:00',
    status: 'finalizado',
  },
  {
    id: '5',
    name: 'Marcelo Pereira',
    photo: 'https://randomuser.me/api/portraits/men/3.jpg',
    procedure: 'Exame de Cavitação',
    date: '2025-01-12T10:15:00',
    status: 'pendente',
  },
];

const FlatListPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selected, setSelected] = useState('finalizados');
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const modalRef = React.useRef(null); // Ref do Modalize

  const getFilteredPatients = () =>
    patients.filter((patient) =>
      selected === 'finalizados'
        ? ['finalizado', 'cancelado'].includes(patient.status)
        : patient.status === 'pendente'
  );

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

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

  const handlePress = (button) => {
    setSelected(button);
  };

  const handleActionPress = () => { 
    navigation.navigate('Resume', { appointment: selectedItem });
    modalRef.current?.close(); // Fecha o modal após a ação
  };

  const renderItem = ({ item, index }) => (
    <View
      style={[styles.item, { boxShadow: `0px 30px 100px -50px ${getStatusColor(item.status)}` }]}
    >
      <SafeAreaView style={{flexDirection: 'row', width: '100%'}}>
        <View style={[styles.hrDivider, { backgroundColor: getStatusColor(item.status) }]} />
        <View style={{width: '99%'}}>
          <View style={styles.itemHeader}>
            <View style={styles.dateRow}>
              <Ionicons name="time-outline" color="#ababab" size={25} />
              <Text style={styles.date}>{formatDate(item.date)}</Text>
            </View>
            <Ionicons 
              name="ellipsis-vertical-outline" 
              color="#ababab" 
              size={25} 
              onPress={() => {
                setSelectedItem(item);
                modalRef.current?.open(); // Abre o modal
              }}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.textContainer}>
            <Image source={{ uri: item.photo }} style={styles.photo} />
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.procedure}>{item.procedure}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );

 

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Agendamentos</Text>
      <View style={styles.row}>
        <Pressable
          style={[styles.btnTop, selected === 'finalizados' && styles.selected]}
          onPress={() => handlePress('finalizados')}
        >
          <Text style={styles.btnText}>Finalizados</Text>
        </Pressable>
        <Pressable
          style={[styles.btnTop, selected === 'ativos' && styles.selected]}
          onPress={() => handlePress('ativos')}
        >
          <Text style={styles.btnText}>Ativos</Text>
        </Pressable>
      </View>

      <FlatList
        data={getFilteredPatients()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {/* Modalize para opções do paciente */}
      <NavigationModal
        modalRef={modalRef} 
        selectedItem={selectedItem} 
        handleActionPress={handleActionPress} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 40,
    marginLeft: 20,
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
  },
  row: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 10,
    padding: 8,
    borderRadius: 40,
    backgroundColor: '#ededed',
    marginHorizontal: '10%',
  },
  btnTop: {
    width: 120,
    height: 45,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 50,
  },
  selected: {
    backgroundColor: 'white',
  },

  btnText: {
    color: '#1f2937',
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#fff',
    marginHorizontal: '5%',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingLeft: 10,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
    height: 0.5,
    backgroundColor: '#ccc',
    marginVertical: 10,
    width: '100%',
    alignSelf: 'center',
  },
  hrDivider: {
    width: '4', 
    marginLeft: -10,
    marginVertical: 10, 
    height: '100',
    marginRight: 10,
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Montserrat_700Bold',
    fontWeight: '700',
  },
  procedure: {
    fontSize: 14,
    color: '#555',
  },
  date: {
    marginLeft: 5,
    fontSize: 14,
    color: '#ababab',
  },

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

export default FlatListPage;