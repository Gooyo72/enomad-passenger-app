import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Сайн байна уу, Зорчигч!</Text>
      <Text style={styles.subtext}>Та хаашаа явах вэ?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FB',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  subtext: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 8,
  },
});

export default HomeScreen;
