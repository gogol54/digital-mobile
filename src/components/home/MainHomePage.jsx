import React, { useState } from 'react';
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
        { user.userType !== 'pacient' &&
          <TouchableOpacity onPress={() => navigation.navigate('Request')}>
            <Text style={styles.linkData}>
              Gerar solicitação
            </Text>
          </TouchableOpacity>
        }
         { user.userType === 'pacient' &&
          <View>
            <Text style={{color: 'white'}}>
              null
            </Text>
          </View>
        }
        {list &&
          <TouchableOpacity onPress={() => navigation.navigate('List')}>
            <Text style={styles.linkData}>
              Ver Todos
            </Text>
          </TouchableOpacity>
        }
      </View>
      <View>
        {
          user.userType !== 'pacient' &&
          <Text style={styles.topTitle}>Últimos solicitações</Text>
        }
        {
          user.userType === 'pacient' &&
          <Text style={styles.topTitle}>Meus Exames</Text>
        }
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {list && list.length > 0 ? 
          list.slice(-3).map((appointment, index) => ( // Pegando os últimos 3 itens
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
                  <Text style={styles.responseName}>{appointment?.pacientName}</Text>
                  <Text style={styles.dataColumnType}>{appointment?.dataType}</Text>
                  <TouchableOpacity
                    onPress={() => navigateToScreen(appointment)}
                    style={[styles.dataColumnBtn, { backgroundColor: getStatusColor(appointment?.status) }]}
                  >
                    <Text style={{ color: 'white' }}>{appointment?.status}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => navigateToScreen(appointment)}
                  style={{ marginTop: 40 }}
                >
                  <Ionicons
                    name="chevron-forward-outline"
                    color="#9898"
                    size={25}
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
  boxList: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    margin: 20,
    marginBottom: '50',
  },
  firstArea: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  secondArea: {
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'flex-start',
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
  gridContainer: {
    width: '100%',
    height: 140,  
    backgroundColor: '#f8f8fb',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#ececec',
    marginLeft: 5,
    marginTop: 40,
  },
  responseName: {
    color: '#1f2937',
    marginTop: 34,
    marginLeft: -10,
    fontSize: 16, 
    fontFamily: 'Montserrat_700Regular',
    fontWeight: '700',
  },
  arrowRight: {
    marginTop: '25%',
    marginRight: 20,
    justifyContent: 'center',
  },
  dataColumnText: {
    flexDirection: 'column', 
    marginLeft: 8,
  },
  dataColumnType: {
    fontSize: 12, 
    fontFamily: 'Montserrat_400Regular', 
    fontWeight: '400', 
    marginTop: 10, 
    marginBottom: 4,
  },
  dataColumnBtn: {
    alignItems: 'center',
    backgroundColor: '#1f2937', 
    marginTop: 10,
    marginLeft: -25, 
    width: 'auto', 
    height: 30, 
    padding: 5, 
    borderRadius: 4,
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
