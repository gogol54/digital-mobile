
import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const OccupationInfo = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons 
            style={{marginTop: 10}}
            name="arrow-back-outline" 
            size={30} 
            color="#1f2937"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ocupação profissional</Text>
        <Ionicons
          style={styles.iconHeader} 
          name='pencil-outline' 
          size={25} 
          color={'#1f2937'}
        />
      </View>
      <View style={styles.wrapper}>
        <View style={{padding: 10}}>
          <Text style={{color: '#898989', fontSize: 16}}>Nome Completo</Text>
          <Text style={{color: '#1f2937', fontSize: 18}}>Jardel Osorio Duarte</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, marginRight: 20}}>
          <View >
            <Text style={{color: '#898989', fontSize: 14}}>Data de Nascimento</Text>
            <Text style={{color: '#1f2937', fontSize: 16}}>23/11/2002</Text>
          </View> 
          <View>
            <Text style={{color: '#898989', fontSize: 14}}>Idade</Text>
            <Text style={{color: '#1f2937', fontSize: 16}}>23</Text>
          </View>
        </View>
     
      </View>
      {/* Adicione aqui os dados de informações pessoais */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 30
  },
  headerTitle: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  iconHeader: {
    backgroundColor: '#f8f8fb',
    borderRadius: 50,
    padding: 10
  },
  wrapper: {
    flexGrow: 1,
    alignSelf: 'center',
    width: '90%',
    height: 'autos',
    borderRadius: 20,
    backgroundColor: '#f8f8fb'
  },
  infoContainer: {
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default OccupationInfo

