import { useColorScheme } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, COMMON_STYLES } from './theme';

/**
 * Custom hook to provide theme colors and styles
 */
export const useTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const colors = isDark ? COLORS.dark : COLORS.light;

  return {
    colors,
    spacing: SPACING,
    typography: TYPOGRAPHY,
    commonStyles: COMMON_STYLES,
    isDark,
  };
};
