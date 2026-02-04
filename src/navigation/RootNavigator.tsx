import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
  LoginScreen, 
  RegisterScreen, 
  ForgotPasswordScreen, 
  VerifyOTPScreen, 
  ResetPasswordScreen,
  HomeScreen
} from '@screens';
import { useAuthStore } from '@store';
import { useTheme } from '@theme';
import { authApi } from '@api';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { isAuthenticated, _hasHydrated, accessToken, setUser } = useAuthStore();
  const { colors } = useTheme();

  useEffect(() => {
    const fetchUserData = async () => {
      if (_hasHydrated && isAuthenticated && accessToken) {
        try {
          const response = await authApi.getMe();
          if (response) {
            setUser(response.user);
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      }
    };

    fetchUserData().catch(error => {
      console.error('Unhandled error in fetchUserData:', error);
    });
  }, [_hasHydrated, isAuthenticated, accessToken, setUser]);

  if (!_hasHydrated) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          fullScreenGestureEnabled: true,
        }}
      >
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RootNavigator;
