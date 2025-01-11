import React from 'react'
import { 
  View, 
  Text, 
  SafeAreaView, 
  Image, 
  StyleSheet,
} from 'react-native'

const TopProfilePage = () => {
  return (
    <View>
      <Text style={styles.title}>Configurações de Perfil</Text>
      <View style={styles.boxArea}>
        <SafeAreaView style={{flexDirection: 'row'}}>
          <Image 
            style={styles.avatar} 
            source={{ uri: 'https://randomuser.me/api/portraits/men/3.jpg' }} 
          />
          <View style={styles.textArea}>
            <Text style={styles.textAreaName}>Maria Belo</Text>
            <Text style={styles.textAreaMail}>mbelo@gmail.com</Text>
          </View>
        </SafeAreaView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    marginTop: 40,
    marginLeft: 20,
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
  },
  boxArea: {
    backgroundColor: '#1f2937',
    marginTop: 20, 
    width: '90%', 
    height: 110, 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignSelf: 'center'
  },
  avatar: {
    marginLeft: 20,
    marginTop: 20,
    width: 70,
    height: 70,
    objectFit: 'cover',
    borderRadius: 50
  },
  textArea: { marginTop: 30, alignSelf: 'center'},
  textAreaName: {color: '#fff', fontSize: 16, alignItems: 'center', textAlign: 'justify', marginLeft: 20},
  textAreaMail: {color: '#898989', textAlign: 'justify', fontSize: 16, marginLeft: 20},

})
export default TopProfilePage