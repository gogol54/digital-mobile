
import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const PersonalInfo = () => {
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
        <Text style={styles.headerTitle}>Informações Pessoais</Text>
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, marginRight: 20}}>
          <View >
            <Text style={{color: '#898989', fontSize: 14}}>email</Text>
            <Text style={{color: '#1f2937', fontSize: 16}}>jardeleko@gmail.com</Text>
          </View> 
          <View>
            <Text style={{color: '#898989', fontSize: 14}}>Telefone</Text>
            <Text style={{color: '#1f2937', fontSize: 16}}>(55) 981180042</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, marginRight: 20}}>
          <View >
            <Text style={{color: '#898989', fontSize: 14}}>Genero</Text>
            <Text style={{color: '#1f2937', fontSize: 16}}>Homem</Text>
          </View> 
          <View>
            <Text style={{color: '#898989', fontSize: 14}}>CPF</Text>
            <Text style={{color: '#1f2937', fontSize: 16}}>028.376.080-09</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, marginRight: 20}}>
          <View >
            <Text style={{color: '#898989', fontSize: 14}}>CEP</Text>
            <Text style={{color: '#1f2937', fontSize: 16}}>97590-000</Text>
          </View> 
          <View>
            <Text style={{color: '#898989', fontSize: 14}}>Endereço</Text>
            <Text style={{color: '#1f2937', fontSize: 16}}>R. João Brasil, 2085</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, marginRight: 20}}>
          <View >
            <Text style={{color: '#898989', fontSize: 14}}>Cidade</Text>
            <Text style={{color: '#1f2937', fontSize: 16}}>Rosario do Sul</Text>
          </View> 
          <View>
            <Text style={{color: '#898989', fontSize: 14}}>Estado</Text>
            <Text style={{color: '#1f2937', fontSize: 16}}>RS</Text>
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
    height: 'auto',
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

export default PersonalInfo

