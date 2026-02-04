import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { API_ENDPOINTS } from '@shared/constants/api';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Сайн байна уу, Зорчигч!</Text>
      <Text style={styles.subtext}>Та хаашаа явах вэ?</Text>
      
      <View style={styles.sharedInfo}>
        <Text style={styles.label}>Shared Constant (API Endpoint):</Text>
        <Text style={styles.value}>{API_ENDPOINTS.AUTH.LOGIN}</Text>
      </View>
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
  sharedInfo: {
    marginTop: 40,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
});

export default HomeScreen;
