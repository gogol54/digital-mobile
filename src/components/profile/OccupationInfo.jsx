
import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const OccupationInfo = () => {
  const navigation = useNavigation()
  const user = useSelector((state) => state.user?.currentUser)

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
        <Text style={styles.headerTitle}>Ocupação Profissional</Text>
        <TouchableOpacity onPress={() => navigation.navigate('UserUpdate', { flag: 'occupation'})}>
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
            Local de Trabalho
          </Text>
          <Text style={styles.textContent}>
            {user?.company || 'Não preenchido'} 
          </Text>
        </View>
        <View style={styles.viewArea}>
          <View style={styles.viewAreaLeft}>
            <Text style={styles.textTitle}>Cargo</Text>
            <Text style={styles.textContent}>{user?.occupation || 'Não preenchido'} </Text>
          </View> 
          <View style={styles.viewAreaRight}>
            <Text style={styles.textTitleRight}>CRO</Text>
            <Text style={styles.textContentRight}>{user?.code || 'Não possui'} </Text>
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
    fontSize: 14,
    maxWidth: 270,
  },
  textContentRight: {
    color: '#1f2937',
    fontSize: 14,
    textAlign: 'right'
  },
});

export default OccupationInfo

