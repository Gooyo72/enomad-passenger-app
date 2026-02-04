import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Icon from '@react-native-vector-icons/material-design-icons';

import { useTheme } from '@theme';
import { CustomButton, CustomInput, LoadingOverlay } from '@components';
import { useAuthStore } from '@store';
import { authApi } from '@api';
import { useRememberMe } from '@hooks';

const loginSchema = yup.object({
  phone: yup
    .string()
    .matches(/^[5-9][0-9]{7}$/, 'Утасны дугаар буруу байна')
    .required('Утасны дугаар заавал оруулна уу'),
  password: yup
    .string()
    .min(6, 'Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой')
    .required('Нууц үг оруулна уу'),
  rememberMe: yup.boolean().default(false),
}).required();

type LoginFormData = yup.InferType<typeof loginSchema>;

const LoginScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);
  const { colors, spacing, typography, commonStyles } = useTheme();

  const styles = StyleSheet.create({
    content: {
      flex: 1,
      padding: spacing.lg,
      justifyContent: 'center',
    },
    header: {
      marginBottom: spacing.xl,
    },
    title: {
      ...typography.h1,
      color: colors.text,
    },
    subtitle: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    form: {
      marginTop: spacing.lg,
    },
    rememberMeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.lg,
    },
    rememberMeRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rememberMeText: {
      marginLeft: spacing.xs,
      fontSize: 14,
      color: colors.text,
    },
    forgotPassword: {
      alignSelf: 'flex-end',
    },
    forgotPasswordText: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: '500',
    },
    registerLinkContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: spacing.xl,
    },
    registerLink: {
      ...typography.label,
      color: colors.primary,
      fontWeight: 'bold',
    },
    registerText: {
      ...typography.caption,
      color: colors.textSecondary,
    }
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      phone: '',
      password: '',
      rememberMe: false,
    },
  });

  const { saveCredentials } = useRememberMe(setValue);

  const onLogin = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const response = await authApi.login({
        phone: data.phone,
        password: data.password,
      });

      if (response.success && response.data) {
        await saveCredentials(data.phone, data.password, data.rememberMe);

        const { user, auth } = response.data;
        setAuth(user, {
          accessToken: auth.accessToken,
          refreshToken: auth.refreshToken,
        });
      } else {
        const errorMsg = response.message || 'Нэвтрэхэд алдаа гарлаа.';
        Alert.alert('Алдаа', errorMsg);
        console.log('Login failed response:', response);
      }
    } catch (error: any) {
      console.error('Login error detail:', error);
      const errorMessage = error.message || 'Нэвтрэхэд алдаа гарлаа. Та дахин оролдоно уу.';
      Alert.alert('Алдаа', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]}>
      <LoadingOverlay visible={loading} message="Нэвтэрч байна..." />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Нэвтрэх</Text>
          <Text style={styles.subtitle}>Тавтай морил! Үргэлжлүүлэхийн тулд нэвтэрнэ үү.</Text>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="Утасны дугаар"
                placeholder="8888****"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.phone?.message}
                keyboardType="numeric"
                maxLength={8}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="Нууц үг"
                placeholder="Нууц үг"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.password?.message}
                secureTextEntry
              />
            )}
          />

          <View style={styles.rememberMeContainer}>
            <Controller
              control={control}
              name="rememberMe"
              render={({ field: { onChange, value } }) => (
                <TouchableOpacity
                  style={styles.rememberMeRow}
                  onPress={() => onChange(!value)}
                  activeOpacity={0.7}
                >
                  <Icon
                    name={value ? 'checkbox-marked' : 'checkbox-blank-outline'}
                    size={24}
                    color={value ? colors.primary : colors.textSecondary}
                  />
                  <Text style={styles.rememberMeText}>Сануулах</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity 
              style={styles.forgotPassword}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotPasswordText}>Нууц үг мартсан уу?</Text>
            </TouchableOpacity>
          </View>

          <CustomButton
            title="Нэвтрэх"
            onPress={handleSubmit(onLogin)}
          />

          <View style={styles.registerLinkContainer}>
            <Text style={styles.registerText}>Бүртгэлгүй юу? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Бүртгүүлэх</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
