import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import BottomBar from '../components/BottomBar'
import FlatListPage from '../components/list/FlatListPage'
const List = () => {
  return (
    <>
      <View style={styles.container}>
       <FlatListPage />
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

});

export default List