import { MotiView } from 'moti';
import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  Image, 
  StyleSheet,
  Dimensions
} from 'react-native';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window'); // Para responsividade

const TopProfilePage = () => {
  const user = useSelector((state) => state.user?.currentUser);
  
  return (
    <View style={styles.container}>
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
        <SafeAreaView style={styles.contentArea}>
          <Image 
            style={styles.avatar} 
            source={{ uri: user?.img || 'https://via.placeholder.com/150' }} // Placeholder caso a imagem não exista
          />
          <View style={styles.textArea}>
            <Text style={styles.textAreaName}>{user?.name || 'Usuário'}</Text>
            <Text style={styles.textAreaMail}>{user?.email || 'email@exemplo.com'}</Text>
          </View>
        </SafeAreaView>
      </MotiView>
    </View>
  );
};

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
    height: 120, 
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,

    alignSelf: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Sombra para Android
  },
  contentArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ececec',
  },
  textArea: {
    flex: 1,
    marginLeft: 15, // Espaçamento entre avatar e texto
    justifyContent: 'center',
    marginTop: 10
  },
  textAreaName: {
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600',
    maxWidth: width * 0.75, // Ajusta largura para ocupar espaço restante
  },
  textAreaMail: {
    color: '#c9c9c9', 
    fontSize: 14,
    marginTop: 5,
    maxWidth: width * 0.75,
  },
});

export default TopProfilePage;
