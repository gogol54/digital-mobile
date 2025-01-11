import React from 'react'
import { StyleSheet, View } from 'react-native'
import HeaderHomePage from '../components/home/HeaderHomePage'
import MainHomePage from '../components/home/MainHomePage'
import BottomBar from '../components/BottomBar'
const Home = () => {
  return (
    <View style={styles.container}>
      <HeaderHomePage />
      <MainHomePage />
      <BottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    width: '100%',
    backgroundColor: 'white'
  },
  boxList: {
    flex: 1,
    padding: 20,
    margin: 20,
    marginBottom: '120',
  }
});

export default Home