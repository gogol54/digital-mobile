import React from 'react'
import { 
  StyleSheet,
  View, 
  Dimensions
} from 'react-native'
import FormRequest from '../components/requirements/FormRequest'
const { height } = Dimensions.get('window');

const Request = () => {
  return (
    <View style={styles.container}>
      <FormRequest />  
    </View>
  )
}

const styles = StyleSheet.create({
  container: { 
    width: '100%',
    height: height, // Define a altura como a altura da tela
  },
})
export default Request