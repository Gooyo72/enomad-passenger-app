import React from 'react';
import { View, Text, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { useTheme } from '@theme';

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

const LoadingOverlay = ({ visible, message }: LoadingOverlayProps) => {
  const { colors, spacing } = useTheme();

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: colors.surface, padding: spacing.lg }]}>
          <ActivityIndicator size="large" color={colors.primary} />
          {message && (
            <Text style={[styles.message, { color: colors.text, marginTop: spacing.md }]}>
              {message}
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 150,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  message: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default LoadingOverlay;
