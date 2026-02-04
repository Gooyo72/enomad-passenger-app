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

import { COLORS, SPACING, TYPOGRAPHY, COMMON_STYLES } from '@theme';
import { CustomButton, CustomInput } from '@components';
import { authApi } from '@api';

const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .min(6, 'Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой')
    .required('Шинэ нууц үг оруулна уу'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Нууц үг зөрүүтэй байна')
    .required('Нууц үг давтан оруулна уу'),
}).required();

type ResetPasswordFormData = yup.InferType<typeof resetPasswordSchema>;

const ResetPasswordScreen = ({ navigation, route }: any) => {
  const { phone, code } = route.params;
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setLoading(true);
    try {
      await authApi.resetPassword({
        phone,
        code,
        password: data.password,
      });
      Alert.alert('Амжилттай', 'Нууц үг амжилттай шинэчлэгдлээ.', [
        { text: 'ОК', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      Alert.alert('Алдаа', 'Нууц үг шинэчлэхэд алдаа гарлаа.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={COMMON_STYLES.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={COLORS.black} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={TYPOGRAPHY.h1}>Нууц үг шинэчлэх</Text>
          <Text style={TYPOGRAPHY.caption}>
            Шинэ нууц үгээ оруулна уу.
          </Text>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="Шинэ нууц үг"
                placeholder="Шинэ нууц үг"
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
            title="Шинэчлэх"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            style={{ marginTop: SPACING.md }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  backButton: {
    marginBottom: SPACING.sm,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  header: {
    marginBottom: SPACING.xl,
    marginTop: SPACING.lg,
  },
  form: {
    flex: 1,
  },
});

export default ResetPasswordScreen;
