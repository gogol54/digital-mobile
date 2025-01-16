import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { showToast } from '../../lib/functions/showToast'
import { logOut } from '../../lib/redux/userRedux'
import { clearData } from '../../lib/redux/dataRedux'
import { useDispatch } from 'react-redux'

const MenuBar = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const handleLogout = () => {
    showToast('success', 'Esperamos vê-lo novamente em breve!')
    setTimeout(() => {
      dispatch(clearData())
      dispatch(logOut())
    }, 500)
    setTimeout(() => {
      navigation.navigate('Login')
    }, 1000);
  }

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity 
          onPress={() => navigation.navigate('UserProfile', { flag: 'personal' })}
          style={styles.boxContent}
        >
          <View>
            <Ionicons
                name="person"
                // color='#1f2937'
                color="#1f2937" 
                size={30}
                style={styles.userIcon}
              />
          </View>
          <View>
            <Text style={styles.title}>Informações Pessoais</Text>
            <Text style={styles.infoType}>Detalhes gerais de contato</Text>
          </View>
          <View>
            <Ionicons
                name="chevron-forward-outline"
                color="#9898"
                size={25}
                style={styles.arrowIcon}
              />
          </View>
        </TouchableOpacity>
        <View style={styles.hr} />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('UserProfile', { flag: 'occupation' })}
          style={styles.boxContent}        
        >
          <View>
            <Ionicons
                name="construct"
                // color='#1f2937'
                color="#1f2937" 
                size={30}
                style={styles.userIcon}
              />
          </View>
          <View>
            <Text style={styles.title}>Ocupação Profissional</Text>
            <Text style={styles.infoType}>Seu cargo e local de trabalho</Text>
          </View>
          <View>
            <Ionicons
                name="chevron-forward-outline"
                color="#9898"
                size={25}
                style={styles.arrowIcon}
              />
          </View>
        </TouchableOpacity>
        <View style={styles.hr} />
      </View>

      <View>
        <TouchableOpacity
          style={styles.boxContent}
          onPress={() => navigation.navigate('List')}
        >
          <View>
            <Ionicons
                name="medkit"
                // color='#1f2937'
                color="#1f2937" 
                size={30}
                style={styles.userIcon}
              />
          </View>
          <View>
            <Text style={styles.title}>Informações Clínicas</Text>
            <Text style={styles.infoType}>Acesse seus exames Finalizados</Text>
          </View>
          <View>
            <Ionicons
                name="chevron-forward-outline"
                color="#9898"
                size={25}
                style={styles.arrowIcon}
              />
          </View>
        </TouchableOpacity>
        <View style={styles.hr} />
      </View>


      <View>
        <TouchableOpacity
          style={styles.boxContent}
          onPress={() => handleLogout()}
        >
          <View>
            <Ionicons
                name="log-out-outline"
                // color='#1f2937'
                color="#1f2937" 
                size={30}
                style={styles.userIcon}
              />
          </View>
          <View>
            <Text style={styles.title}>Sair</Text>
            <Text style={styles.infoType}>Desconecte-se com segurança</Text>
          </View>
          <View>
            <Ionicons
                name="chevron-forward-outline"
                color="#9898"
                size={25}
                style={styles.arrowIcon}
              />
          </View>
        </TouchableOpacity>
        <View style={styles.hr} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    padding: 0,
    backgroundColor: 'inhert',
    flexGrow: 1, 
    width: '90%',
    alignSelf: 'center'
  },
  title: {
    fontSize: 16,
		fontFamily: 'Montserrat_700Bold',
    fontWeight: '700',
    textAlign: 'justify'
  },
  infoType: {
    fontSize: 13,
    fontFamily: 'Montserrat_400Regular',
    fontWeight: '400',    
    color: '#898989'
  },
  boxContent: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  arrowIcon: {
    marginTop: 10,
  },
  userIcon: {
    backgroundColor: '#c5c5c587',
    borderRadius: 50,
    padding: 8,
    opacity: 0.9,
  },
  hr: {
    width: '95%',
    height: 1,
    alignSelf: 'center',
    backgroundColor: '#dddcdc', // Cor da linha
    marginVertical: 10, // Espaço ao redor da linha
  },
})
export default MenuBar
