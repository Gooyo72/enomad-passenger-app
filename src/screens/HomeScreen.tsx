import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_ENDPOINTS } from '@shared/constants/api';
import { useAuthStore } from '@store';
import { useTheme } from '@theme';
import Icon from '@react-native-vector-icons/material-design-icons';

const HomeScreen = () => {
  const { user, logout } = useAuthStore();
  const { colors, spacing, typography, commonStyles } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: spacing.lg,
      backgroundColor: colors.surface,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      ...typography.h2,
      color: colors.text,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.lg,
    },
    text: {
      ...typography.h3,
      color: colors.text,
      marginBottom: spacing.sm,
    },
    subtext: {
      ...typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: spacing.xl,
    },
    sharedInfo: {
      padding: spacing.md,
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      width: '100%',
      ...commonStyles.shadow,
    },
    label: {
      ...typography.caption,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    value: {
      ...typography.label,
      color: colors.primary,
    },
    logoutButton: {
      marginTop: spacing.xxl,
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing.md,
    },
    logoutText: {
      ...typography.label,
      color: colors.error,
      marginLeft: spacing.xs,
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ENomad Passenger</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.text}>Сайн байна уу, {user?.firstName || 'Зорчигч'}!</Text>
        <Text style={styles.subtext}>Таны нэвтрэлт амжилттай боллоо.</Text>
        
        <View style={styles.sharedInfo}>
          <Text style={styles.label}>Shared Constant (API Endpoint):</Text>
          <Text style={styles.value}>{API_ENDPOINTS.AUTH.LOGIN}</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Icon name="logout" size={20} color={colors.error} />
          <Text style={styles.logoutText}>Гарах</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
