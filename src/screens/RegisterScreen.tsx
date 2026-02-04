import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Icon from '@react-native-vector-icons/material-design-icons';

import { useTheme } from '@theme';
import { CustomButton, CustomInput, LoadingOverlay } from '@components';
import { authApi } from '@api';

const registerSchema = yup.object({
  lastName: yup.string().required('Овог оруулна уу'),
  firstName: yup.string().required('Нэр оруулна уу'),
  email: yup
    .string()
    .email('И-мэйл формат буруу байна'),
  phone: yup
    .string()
    .matches(/^[5-9][0-9]{7}$/, 'Утасны дугаар буруу байна')
    .required('Утасны дугаар заавал оруулна уу'),
  password: yup
    .string()
    .min(6, 'Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой')
    .required('Нууц үг заавал оруулна уу'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Нууц үг зөрүүтэй байна')
    .required('Нууц үг давтан оруулна уу'),
}).required();

type RegisterFormData = yup.InferType<typeof registerSchema>;

const RegisterScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const { colors, spacing, typography, commonStyles } = useTheme();

  const styles = StyleSheet.create({
    scrollContent: {
      padding: spacing.lg,
    },
    backButton: {
      marginBottom: spacing.sm,
      width: 40,
      height: 40,
      justifyContent: 'center',
    },
    header: {
      marginBottom: spacing.xl,
      marginTop: spacing.lg,
    },
    form: {
      flex: 1,
    },
    loginLinkContainer: {
      ...commonStyles.row,
      justifyContent: 'center',
      marginTop: spacing.lg,
      marginBottom: spacing.xl,
    },
    loginLink: {
      ...typography.label,
      color: colors.primary,
      fontWeight: 'bold',
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      lastName: '',
      firstName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onRegister = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      const { confirmPassword, ...registerData } = data;
      const response = await authApi.register(registerData);
      
      if (response) {
        Alert.alert('Амжилттай', 'Бүртгэл амжилттай хийгдлээ. Та нэвтэрч орно уу.', [
          { text: 'ОК', onPress: () => navigation.navigate('Login') }
        ]);
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Бүртгүүлэхэд алдаа гарлаа.';
      Alert.alert('Алдаа', errorMessage);
      console.error('Register error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]}>
      <LoadingOverlay visible={loading} message="Бүртгүүлж байна..." />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={[typography.h1, { color: colors.text }]}>Бүртгүүлэх</Text>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>
              Жолоочоор бүртгүүлж, ажлаа эхлээрэй
            </Text>
          </View>

          <View style={styles.form}>
            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="Овог"
                  placeholder="Овог"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.lastName?.message}
                  autoCapitalize="words"
                />
              )}
            />

            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="Нэр"
                  placeholder="Нэр"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.firstName?.message}
                  autoCapitalize="words"
                />
              )}
            />

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
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="И-мэйл"
                  placeholder="example@mail.com"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.email?.message}
                  keyboardType="email-address"
                  autoCapitalize="none"
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

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="Нууц үг давтах"
                  placeholder="Нууц үг давтах"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.confirmPassword?.message}
                  secureTextEntry
                />
              )}
            />

            <CustomButton
              title="Бүртгүүлэх"
              onPress={handleSubmit(onRegister)}
              loading={loading}
              style={{ marginTop: spacing.md }}
            />

            <View style={styles.loginLinkContainer}>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>Аль хэдийн бүртгэлтэй юу? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Нэвтрэх</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
