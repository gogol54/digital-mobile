import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import moment from 'moment';

const HeaderHomePage = ({ user }) => {
  const formatDate = (date) => {
    return moment(date).locale('pt-br').format('DD/MM/YYYY');
  };
  return (
    <View style={styles.container}>
      <Image style={styles.stretch} source={require('../../../assets/background.png')} />
      <View style={styles.shadowBox}>
        <SafeAreaView style={styles.boxAreaTop}>
          {user.userType !== 'pacient' && <Text style={styles.scoreTxt}>{user?.score} pts</Text>}
          <Image style={styles.logoBoxArea} source={require('../../../assets/logo-bg-none.png')} />
        </SafeAreaView>
        <SafeAreaView style={styles.boxAreaBottom}>
          <Text style={styles.textName}>{user?.name}</Text>
          <View>
            <Text style={styles.since}>Cadastro:</Text>
            <Text style={styles.stampDate}>{formatDate(user?.createdAt)}</Text>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxHeight: '30%',
  },
  stretch: {
    width: '100%',
    height: '90%',
		shadowColor: '#6ac000',
    shadowOffset: { width: 10, height: 40 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 0,
  },
  shadowBox: {
    width: '80%',
    marginLeft: '10%',
    height: '80%',
    position: 'absolute',
    backgroundColor: 'white',
    padding: 20,
    marginTop: 100,
    borderRadius: 16,
    shadowColor: '#6ac000',
    shadowOffset: { width: 5, height: 40 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 30,
  },
  boxAreaTop: {
    justifyContent: 'space-between',
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
    width: 180,
    height: 55,
  },
  scoreTxt: {
    fontSize: 16,
    color: '#1f2937',
    fontFamily: 'Montserrat_700Bold',
    fontWeight: '700',
  },
  textName: {
    margin: 20,
    fontSize: 16,
    color: '#1f2937',
    fontFamily: 'Montserrat_700Bold',
    fontWeight: 'bold',
    letterSpacing: -0.5,
    maxWidth: 200,
  },
  since: {
    color: '#1f2937',
    margin: 10,
    fontSize: 12,
    bottom: 0,
  },
  stampDate: {
    color: '#1f2937',
    margin: 10,
    bottom: 18,
    fontSize: 14,
    fontFamily: 'monospace',
    letterSpacing: -0.2,
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
