import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  PHONE: '@remembered_phone',
  PASSWORD: '@remembered_password',
  REMEMBER_ME: '@remember_me',
};

export const useRememberMe = (setValue: any) => {
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const loadSavedCredentials = async () => {
      try {
        const savedPhone = await AsyncStorage.getItem(STORAGE_KEYS.PHONE);
        const savedPassword = await AsyncStorage.getItem(STORAGE_KEYS.PASSWORD);
        const isRemembered = await AsyncStorage.getItem(STORAGE_KEYS.REMEMBER_ME);

        if (isRemembered === 'true') {
          if (savedPhone) setValue('phone', savedPhone);
          if (savedPassword) setValue('password', savedPassword);
          setRememberMe(true);
          setValue('rememberMe', true);
        }
      } catch (error) {
        console.error('Error loading saved credentials:', error);
      }
    };

    loadSavedCredentials();
  }, [setValue]);

  const saveCredentials = async (phone: string, password: string, isRemembered: boolean) => {
    try {
      if (isRemembered) {
        await AsyncStorage.setItem(STORAGE_KEYS.PHONE, phone);
        await AsyncStorage.setItem(STORAGE_KEYS.PASSWORD, password);
        await AsyncStorage.setItem(STORAGE_KEYS.REMEMBER_ME, 'true');
      } else {
        await AsyncStorage.removeItem(STORAGE_KEYS.PHONE);
        await AsyncStorage.removeItem(STORAGE_KEYS.PASSWORD);
        await AsyncStorage.setItem(STORAGE_KEYS.REMEMBER_ME, 'false');
      }
    } catch (error) {
      console.error('Error saving credentials:', error);
    }
  };

  return { rememberMe, setRememberMe, saveCredentials };
};
