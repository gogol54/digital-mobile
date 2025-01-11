import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OccupationInfo from '../components/profile/OccupationInfo';
import PersonalInfo from '../components/profile/PersonalInfo';

const UserProfile = ({ route }) => {
  const { flag } = route.params;  // Recebendo a flag dos parâmetros de navegação

  return (
    <View style={styles.container}>
      {flag === 'person' ? <PersonalInfo /> : <OccupationInfo />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white'
  },
  infoContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default UserProfile;
