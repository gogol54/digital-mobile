import React from 'react'
import { View, StyleSheet } from 'react-native'
import BottomBar from '../components/BottomBar'
import TopProfilePage from '../components/profile/TopProfilePage'
import MenuBar from '../components/profile/MenuBar'

const Profile = () => {
  return (
    <>
      <View style={styles.container}>
        <TopProfilePage />
        <MenuBar />
      </View>
      <BottomBar />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		marginTop: 0,
		width: '100%',
		backgroundColor: 'white', 
    marginBottom: 60
  },

})

export default Profile