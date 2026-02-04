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

import { SPACING, TYPOGRAPHY, COMMON_STYLES, useTheme } from '@theme';
import { CustomButton, CustomInput } from '@components';
import { authApi } from '@api';

const forgotPasswordSchema = yup.object({
  phone: yup
    .string()
    .matches(/^[5-9][0-9]{7}$/, 'Утасны дугаар буруу байна')
    .required('Утасны дугаар заавал оруулна уу'),
}).required();

type ForgotPasswordFormData = yup.InferType<typeof forgotPasswordSchema>;

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);

  const {colors} = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      phone: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setLoading(true);
    try {
      await authApi.forgotPassword(data.phone);
      navigation.navigate('VerifyOTP', { phone: data.phone });
    } catch (error) {
      Alert.alert('Алдаа', 'Хүсэлт илгээхэд алдаа гарлаа.');
      console.error('Forgot password error:', error);
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
          <Icon name="arrow-left" size={24} color={colors.black} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={TYPOGRAPHY.h1}>Нууц үг сэргээх</Text>
          <Text style={TYPOGRAPHY.caption}>
            Бүртгэлтэй утасны дугаараа оруулна уу. Бид таны дугаарт 4 оронтой
            код илгээх болно.
          </Text>
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

          <CustomButton
            title="Үргэлжлүүлэх"
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

export default ForgotPasswordScreen;
