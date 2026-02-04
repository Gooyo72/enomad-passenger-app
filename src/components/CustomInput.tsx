import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Icon from '@react-native-vector-icons/material-design-icons';
import { useTheme } from '@theme';

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  containerStyle,
  style,
  secureTextEntry,
  leftIcon,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { colors, spacing } = useTheme();

  const isPassword = secureTextEntry;

  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.md,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.text,
      marginBottom: spacing.xs,
    },
    inputWrapper: {
      position: 'relative',
      justifyContent: 'center',
    },
    input: {
      backgroundColor: colors.surface,
      borderRadius: 8,
      paddingHorizontal: spacing.md,
      paddingVertical: Platform.OS === 'ios' ? spacing.md : spacing.sm,
      fontSize: 16,
      borderWidth: 1,
      borderColor: colors.border,
      color: colors.text,
      width: '100%',
    },
    leftIconContainer: {
      position: 'absolute',
      left: spacing.md,
      zIndex: 1,
    },
    eyeIcon: {
      position: 'absolute',
      right: spacing.md,
      height: '100%',
      justifyContent: 'center',
    },
    inputError: {
      borderColor: colors.error,
    },
    errorText: {
      color: colors.error,
      fontSize: 12,
      marginTop: 4,
    },
  });

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            {leftIcon}
          </View>
        )}
        <TextInput
          style={[
            styles.input,
            error ? styles.inputError : null,
            leftIcon ? { paddingLeft: spacing.xl + 12 } : null,
            isPassword ? { paddingRight: 45 } : null,
            style,
          ]}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};
