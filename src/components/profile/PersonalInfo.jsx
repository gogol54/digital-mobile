
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
        <TouchableOpacity onPress={() => navigation.navigate('UserUpdate', { flag: 'personal' })}>
          <Ionicons
            style={styles.iconHeader} 
            name='pencil-outline' 
            size={25} 
            color={'#1f2937'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.wrapper}>
        <View style={{padding: 10}}>
          <Text style={styles.textTitle}>
            Nome Completo
          </Text>
          <Text style={styles.textContent}>
            Jardel Osorio Duarte 
          </Text>
        </View>
        <View style={styles.viewArea}>
          <View style={styles.viewAreaLeft}>
            <Text style={styles.textTitle}>Data de Nascimento</Text>
            <Text style={styles.textContent}>23/11/2002</Text>
          </View> 
          <View style={styles.viewAreaRight}>
            <Text style={styles.textTitleRight}>Telefone</Text>
            <Text style={styles.textContentRight}>(55) 981180042</Text>
          </View>
        </View>
        <View style={styles.viewArea}>
          <View style={styles.viewAreaLeft}>
            <Text style={styles.textTitle}>email</Text>
            <Text style={styles.textContent}>jardeleko@outlook.com</Text>
          </View> 
          <View style={styles.viewAreaRight}>
            <Text style={styles.textTitleRight}>Idade</Text>
            <Text style={styles.textContentRight}>23</Text>
          </View>
        
        </View>
        <View style={styles.viewArea}>
          <View >
            <Text style={styles.textTitle}>Genero</Text>
            <Text style={styles.textContent}>Homem</Text>
          </View> 
          <View>
            <Text style={styles.textTitleRight}>CPF</Text>
            <Text style={styles.textContentRight}>028.376.080-09</Text>
          </View>
        </View>
        <View style={styles.viewArea}>
          <View >
            <Text style={styles.textTitle}>CEP</Text>
            <Text style={styles.textContent}>97590-000</Text>
          </View> 
          <View>
            <Text style={styles.textTitleRight}>Endereço</Text>
            <Text style={styles.textContentRight}>R. João Brasil, 2085</Text>
          </View>
        </View>
        <View style={styles.viewArea}>
          <View >
            <Text style={styles.textTitle}>Cidade</Text>
            <Text style={styles.textContent}>Rosario do Sul</Text>
          </View> 
          <View style={styles.viewAreaRight}>
            <Text style={styles.textTitleRight}>Estado</Text>
            <Text style={styles.textContentRight}>RS</Text>
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
    width: '100%',
    height: 'auto',
    borderRadius: 20,
    backgroundColor: '#f8f8fb'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  viewArea: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    margin: 10,
    padding: 10, 
  },
  viewAreaLeft: {
    flexDirection: 'column', 
    justifyContent: 'space-between', 
  },
  viewAreaRight: {
    textAlign: 'right'
  },
  textTitle: {
    color: '#898989', 
    fontSize: 13,
  },
  textTitleRight: { 
    color: '#898989', 
    fontSize: 13,
    textAlign: 'right'
  },
  textContent: {
    color: '#1f2937',
    fontSize: 15,
    maxWidth: 270,
  },
  textContentRight: {
    color: '#1f2937',
    fontSize: 15,
    textAlign: 'right'
  },
});

export default PersonalInfo

