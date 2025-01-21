import { MotiView } from 'moti'
import React from 'react'
import { 
  View, 
  Text, 
  SafeAreaView, 
  Image, 
  StyleSheet,
} from 'react-native'
import { useSelector } from 'react-redux'

const TopProfilePage = () => {
  const user = useSelector((state) => state.user?.currentUser)
  
  return (
    <View>
      <Text style={styles.title}>Configurações de Perfil</Text>
      <MotiView
        style={styles.boxArea}
        from={{ translateX: -300 }}
        animate={{ translateX: 0 }}
        transition={{
          type: 'timing',
          duration: 500,
          delay: 200,
        }} 
      >
        <SafeAreaView style={{flexDirection: 'row'}}>
          <Image 
            style={styles.avatar} 
            source={{ uri: user?.img }} 
          />
          <View style={styles.textArea}>
            <Text style={styles.textAreaName}  numberOfLines={2}>{user?.name || null}</Text>
            <Text style={styles.textAreaMail}>{user?.email || null}</Text>
          </View>
        </SafeAreaView>
      </MotiView>
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
    borderRadius: 50,
    backgroundColor: '#ececec'
  },
  textArea: {
    marginTop: 30, 
    alignSelf: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  textAreaName: {
    color: '#fff', 
    fontSize: 14, 
    textAlign: 'justify', 
    marginLeft: 20,
    maxWidth: '90%'
  },
  textAreaMail: {
    color: '#c9c9c9', 
    textAlign: 'justify', 
    flexWrap: 'wrap',
    fontSize: 13,
    marginLeft: 20,
    maxWidth: '90%'
  },

})
export default TopProfilePage