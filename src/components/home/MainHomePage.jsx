import { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'moti';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../lib/functions/nativeFunctions';
import { listOfFiles } from '../../lib/actions/requestData';

const MainHomePage = ({ user }) => {
  const navigation = useNavigation();
  const list = useSelector((state) => state.dataset?.list);
  const [refreshing, setRefreshing] = useState(false)
  const dispatch = useDispatch()

  const onRefresh = () => {
    setRefreshing(true)
    listOfFiles(dispatch, user)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
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

  const navigateToScreen = (appointment) => {
    navigation.navigate('Resume', { appointment: appointment });
  };

  return (
    <View style={styles.boxList}>
      <View style={styles.firstArea}>
        <View>
          {
            user.userType !== 'pacient' &&
            <Text style={styles.topTitle}>Últimas solicitações</Text>
          }
          {
            user.userType === 'pacient' &&
            <Text style={styles.topTitle}>Meus Exames</Text>
          }
        </View>
        <View>
          {list &&
            <TouchableOpacity onPress={() => navigation.navigate('Exames')}>
              <Text style={styles.linkData}>
                Ver Todos
              </Text>
            </TouchableOpacity>
          }
        </View>
        
      </View>
      
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {list && list.length > 0 ? 
          list.slice(0, 3).map((appointment, index) => ( // Pegando os últimos 3 itens
            <View key={appointment._id || `appointment-${index}`} style={styles.secondArea}>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Ionicons
                  style={styles.iconDecoration}
                  name="time-outline"
                  color="#ababab"
                  size={25}
                />
                <Text style={styles.dataText}>{formatDate(appointment.createdAt_formatted)}</Text>
              </View>
              <View style={styles.gridContainer}>
                <Image 
                  style={styles.avatar} 
                  source={{ uri: appointment?.pacientImg || "https://digital1-clinica2-radio4-odontologico8-s3.sa-east-1.amazonaws.com/files/avatar/1734352856296-default_user-whitebg.png" }} 
                />
                <View style={styles.dataColumnText}>
                  <Text 
                    style={styles.responseName} 
                    numberOfLines={2} 
                    ellipsizeMode="tail"
                  >
                    {appointment?.pacientName}
                  </Text>
                  <Text 
                    style={styles.dataColumnType} 
                    numberOfLines={2} 
                    ellipsizeMode="tail"
                  >
                    {appointment?.dataType?.split(",").join(", ")}
                  </Text>                    
                  <TouchableOpacity
                    onPress={() => navigateToScreen(appointment)}
                    style={[styles.dataColumnBtn, { backgroundColor: getStatusColor(appointment?.status) }]}
                  >
                    <Text style={{ color: 'white' }}>{appointment?.status}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => navigateToScreen(appointment)}
                    style={[styles.dataColumnBtn, { backgroundColor: 'transparent' }]}
                  >
                    <Ionicons 
                    name="chevron-forward" 
                    size={24} 
                    color="#ababab" 
                    style={styles.arrowRight}
                  />
                </TouchableOpacity>
              </View>             
            </View>
          ))
          :
          (
            <View>
              <Image
                source={require('../../../assets/icon_info.png')} 
                style={styles.nullBoxImage} 
              />
              <Text 
                style={styles.nullBoxText} 
              > Você não tem exames agendados</Text>
            </View>
          )
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    width: '100%',
    backgroundColor: 'white',
  },
  gridContainer: {
    width: '100%',
    backgroundColor: '#f8f8fb',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxList: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    margin: 20,
    marginBottom: 10,
  },
  firstArea: {
    display: 'flex', 
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  topTitle: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 16,
    color: '#1f2937',
    fontFamily: 'Montserrat_700Bold',
    fontWeight: '700',
  },
  linkData: {
    fontSize: 16,
    marginTop: 30,
    color: '#59c3ff',  
    fontFamily: 'Montserrat_700Bold',
    fontWeight: '700',
  },
  iconDecoration: {
    marginTop: 8, 
    marginRight: 8,
  },
  dataText: {
    marginTop: 12, 
    fontFamily: 'Montserrat_400Regular',
    fontWeight: '400',
    color: '#ababab',
    
  },
  avatar: {
    width: 40,      // diminui para liberar mais espaço
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1f2937',
    marginRight: 12,
  },
  dataColumnText: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexShrink: 1,
    minWidth: 0,    // essencial
  },

  responseName: {
    color: '#1f2937',
    marginTop: 4,
    fontSize: 16,
    fontFamily: 'Montserrat_700Regular',
    fontWeight: '700',
    flexShrink: 1,
    numberOfLines: 2,   // ou 3 se quiser
    ellipsizeMode: 'tail',
  },

  dataColumnBtn: {
    alignSelf: 'center',       // centraliza horizontalmente
    justifyContent: 'center',
    paddingHorizontal: 12,
    height: 30,
    borderRadius: 6,
    marginTop: 8,
  },

  arrowRight: {
    alignSelf: 'center',
    marginRight: 10,
  },

  dataColumnType: {
    fontSize: 12, 
    fontFamily: 'Montserrat_400Regular', 
    fontWeight: '400', 
    marginTop: 10, 
    marginBottom: 4,
  },
  nullBoxImage: { 
    width: 70, 
    height: 70, 
    margin: 20, 
    alignSelf: 'center',
  },
  nullBoxText: {
    fontSize: 14, 
    color: '#898989', 
    fontFamily: 'Montserrat_700Bold', 
    textAlign: 'center',
  },
});

export default MainHomePage;
