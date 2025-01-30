import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { MotiView } from 'moti';
import moment from 'moment';

const HeaderHomePage = ({ user }) => {
  console.log(user);
  const formatDate = (date) => {
    return moment(date).locale('pt-br').format('DD/MM/YYYY');
  };

  const [animationDone, setAnimationDone] = useState(false);

  return (
    <View style={styles.container}>
      <Image style={styles.stretch} source={require('../../../assets/background.png')} />
      
      <MotiView
        style={styles.shadowBox}
        from={{ rotateX: '-100deg', opacity: 0 }}
        animate={{ rotateX: '0deg', opacity: 1 }}
        transition={{ type: 'timing', delay: 100, duration: 2000 }}
        onDidAnimate={() => setAnimationDone(true)}
      >
        <SafeAreaView style={styles.boxAreaTop}>
          <Image style={styles.logoBoxArea} source={require('../../../assets/logo-bg-none.png')} />
        </SafeAreaView>
        <SafeAreaView style={styles.boxAreaBottom}>
          <Text style={styles.textName}>{user?.name}</Text>
          <View>
            <Text style={styles.since}>Cadastro:</Text>
            <Text style={styles.stampDate}>{formatDate(user?.createdAt)}</Text>
          </View>
        </SafeAreaView>
      </MotiView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxHeight: '37%',
  },
  stretch: {
    width: '100%',
    height: '60%',
		shadowColor: '#6ac000',
    shadowOffset: { width: 10, height: 40 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 0,
  },
  shadowBox: {
    width: '80%',
    marginLeft: '10%',
    height: 180,
    position: 'absolute',
    backgroundColor: 'white',
    padding: 20,
    marginTop: 100,
    borderRadius: 16,
    opacity: 0.9,
    shadowColor: '#6ac000',
    shadowOffset: { width: 5, height: 40 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 30,
  },
  boxAreaTop: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  boxAreaBottom: {
    position: 'absolute',
    bottom: 8,
    left: 2,
    right: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logoBoxArea: {
    width: 140,
    height: 45,
  },
  textName: {
    marginLeft: 8,
    fontSize: 12,
    color: '#1f2937',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    letterSpacing: -0.5,
    maxWidth: 200,
  },
  since: {
    color: '#1f2937',
    marginRight: 16,
    fontSize: 10,
  },
  stampDate: {
    color: '#1f2937',
    marginRight: 8,
    fontSize: 10,
    fontFamily: 'monospace',
    letterSpacing: -1,
    fontWeight: 'bold',
  },
  eventContainer: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 10,
    borderRadius: 8,
  },
  eventText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HeaderHomePage;
