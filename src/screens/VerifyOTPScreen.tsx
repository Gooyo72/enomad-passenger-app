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

const verifyOTPSchema = yup.object({
  code: yup
    .string()
    .matches(/^[0-9]{4}$/, 'Код 4 оронтой тоо байна')
    .required('Баталгаажуулах код оруулна уу'),
}).required();

type VerifyOTPFormData = yup.InferType<typeof verifyOTPSchema>;

const VerifyOTPScreen = ({ navigation, route }: any) => {
  const { phone } = route.params;
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOTPFormData>({
    resolver: yupResolver(verifyOTPSchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = async (data: VerifyOTPFormData) => {
    setLoading(true);
    try {
      await authApi.verifyOtp(phone, data.code);
      navigation.navigate('ResetPassword', { phone, code: data.code });
    } catch (error: any) {
      Alert.alert('Алдаа', error.message || 'Код буруу байна.');
    } finally {
      setLoading(false);
    }
  };

  const onResend = async () => {
    try {
      await authApi.forgotPassword(phone);
      Alert.alert('Амжилттай', 'Код дахин илгээгдлээ.');
    } catch (error) {
      Alert.alert('Алдаа', 'Код илгээхэд алдаа гарлаа.');
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
          <Text style={TYPOGRAPHY.h1}>Баталгаажуулах</Text>
          <Text style={TYPOGRAPHY.caption}>
            {phone} дугаарт илгээсэн 4 оронтой кодыг оруулна уу.
          </Text>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="code"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="Баталгаажуулах код"
                placeholder="****"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.code?.message}
                keyboardType="numeric"
                maxLength={4}
              />
            )}
          />

          <TouchableOpacity style={styles.resendButton} onPress={onResend}>
            <Text style={styles.resendText}>Код дахин илгээх</Text>
          </TouchableOpacity>

          <CustomButton
            title="Баталгаажуулах"
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
  resendButton: {
    alignSelf: 'center',
    marginBottom: SPACING.lg,
  },
  resendText: {
    color: COLORS.primary,
    fontWeight: '500',
  },
});

export default VerifyOTPScreen;
