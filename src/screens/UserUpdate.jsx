import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import UpdatePersonalData from '../components/profile/update/UpdatePersonalData'
import UpdateOccupationInfo from '../components/profile/update/UpdateOccupationInfo'
const UserUpdate = ({route}) => {
  const { flag } = route.params;  

  return (
    <View style={styles.container}>
      {
        flag === 'personal' 
        ? 
          <UpdatePersonalData /> 
        : 
          <UpdateOccupationInfo />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    overflow: 'hidden', 
  }
})

export default UserUpdate