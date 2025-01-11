import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, VirtualizedList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MotiView, ScrollView } from 'moti';
import moment from 'moment';

const MainHomePage = () => {
  const navigation = useNavigation();
  
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

  const appointments = [
    {
      id: 1,
      name: 'Jardel Osorio Duarte',
      photo: 'https://randomuser.me/api/portraits/men/3.jpg',
      procedure: 'Exame de Cavitação',
      date: '2025-01-12T10:15:00',
      status: 'pendente',    
    },
    {
      id: 2,
      name: 'Jardel Osorio Duarte',
      photo: 'https://randomuser.me/api/portraits/men/3.jpg',
      procedure: 'Radiografia para ATM',
      date: '2025-01-12T10:15:00',
      obs: 'Tomografia do dente 45',
      status: 'pendente',
    }
  ];

  const navigateToScreen = (appointment) => {
		navigation.navigate('Resume', { appointment: appointment });
  };

  return (
    <MotiView
      style={styles.boxList}
      from={{ translateX: -300 }}
      animate={{ translateX: 0 }}
      transition={{
        type: 'timing',
        duration: 500,
        delay: 200,
      }}
    >
      <View style={styles.firstArea}>
        <Text style={styles.topTitle}>Meus Exames</Text>
        { appointments &&
          <Text style={styles.linkData} onPress={() => navigation.navigate('List')}>
          Ver Todos
          </Text>
        }
       
      </View>
			<ScrollView>
      {
      appointments !== null ? 
        appointments.map((appointment) => (
        <View key={appointment.id} style={styles.secondArea}>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <Ionicons
              style={styles.iconDecoration}
              name="time-outline"
              color="#ababab"
              size={25}
            />
            <Text style={styles.dataText}>{formatDate(appointment.date)}</Text>
          </View>
          <View style={styles.gridContainer}>
            <Image style={styles.avatar} source={{ uri: appointment.photo }} />
            <View style={styles.dataColumnText}>
              <Text style={styles.responseName}>{appointment.name}</Text>
              <Text style={styles.dataColumnType}>{appointment.procedure}</Text>
              <TouchableOpacity
                onPress={() => navigateToScreen(appointment)}
                style={[styles.dataColumnBtn, { backgroundColor: `${getStatusColor(appointment.status)}` }]}
                
              >
                <Text style={{ color: 'white' }}>{appointment.status}</Text>
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
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    width: '100%',
		backgroundColor:'white',
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
		fontSize: 16,
		color: '#1f2937',
		fontFamily: 'Montserrat_700Bold',
		fontWeight: '700'
	},
	linkData: {
		fontSize: 16,
		color: '#59c3ff',  
		fontFamily: 'Montserrat_700Bold',
		fontWeight: '700'
	},
	iconDecoration: {
		marginTop: 8, 
		marginRight: 8
	},	
	dataText: {
		marginTop: 12, 
		fontFamily: 'Montserrat_400Regular',
		fontWeight: '400',
		color: '#ababab'
	},
	gridContainer: {
		width: '100%',
		height: 140,  
		backgroundColor: '#f8f8fb',
		borderRadius: 12,
		flexDirection:'row',
		justifyContent: 'space-between'
	},
	avatar:{
		width: 50,
		height: 50,
		borderRadius: 50,
		backgroundColor: '#bce08f',
		marginLeft: 5,
		marginTop: 40,
	},
	responseName:{
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
		justifyContent: 'center'
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
    marginBottom: 4
	},
	dataColumnBtn: {
		alignItems: 'center',
		backgroundColor: '#1f2937', 
		marginTop: 10,
		marginLeft:-25, 
		width: 'auto', 
		height: 30, 
		padding: 5, 
		borderRadius: 4
	},
  nullBoxImage:{ 
    width: 70, 
    height: 70, 
    margin: 20, 
    alignSelf: 'center'
  },
  nullBoxText: {
    fontSize: 14, 
    color:'#898989', 
    fontFamily: 'Montserrat_700Bold', 
    textAlign: 'center' 
  }
});

export default MainHomePage;
