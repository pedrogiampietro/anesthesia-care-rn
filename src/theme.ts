import { Platform, StyleSheet, type TextStyle, type ViewStyle } from 'react-native';

export const colors = {
  surface: '#faf8ff',
  surfaceDim: '#d9d9e4',
  surfaceBright: '#faf8ff',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f3f3fd',
  surfaceContainer: '#ededf8',
  surfaceContainerHigh: '#e7e7f2',
  surfaceContainerHighest: '#e1e2ec',
  surfaceVariant: '#e1e2ec',
  background: '#faf8ff',
  onBackground: '#191b23',
  onSurface: '#191b23',
  onSurfaceVariant: '#434654',
  outline: '#737685',
  outlineVariant: '#c3c6d6',
  primary: '#003d9b',
  primaryContainer: '#0052cc',
  onPrimary: '#ffffff',
  onPrimaryContainer: '#c4d2ff',
  primaryFixed: '#dae2ff',
  primaryFixedDim: '#b2c5ff',
  onPrimaryFixed: '#001848',
  onPrimaryFixedVariant: '#0040a2',
  secondary: '#6b46c1',
  secondaryContainer: '#a480fe',
  onSecondary: '#ffffff',
  onSecondaryContainer: '#39008c',
  tertiary: '#a33500',
  tertiaryContainer: '#ffdbcf',
  onTertiary: '#ffffff',
  onTertiaryContainer: '#812800',
  error: '#ba1a1a',
  errorContainer: '#ffdad6',
  onError: '#ffffff',
  onErrorContainer: '#93000a',
  success: '#2f855a',
  warning: '#dd6b20',
};

export const spacing = {
  base: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radii = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 999,
};

export const fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
};

export const typography = StyleSheet.create({
  screenTitle: {
    fontFamily: fonts.semibold,
    fontSize: 20,
    lineHeight: 28,
    color: colors.onSurface,
  } as TextStyle,
  body: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 24,
    color: colors.onSurface,
  } as TextStyle,
  bodyMuted: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.onSurfaceVariant,
  } as TextStyle,
  label: {
    fontFamily: fonts.bold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.onSurfaceVariant,
  } as TextStyle,
  metricValue: {
    fontFamily: fonts.bold,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.6,
    color: colors.onSurface,
  } as TextStyle,
  metricUnit: {
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.onSurfaceVariant,
  } as TextStyle,
  buttonLabel: {
    fontFamily: fonts.bold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1,
    textTransform: 'uppercase',
  } as TextStyle,
});

export const cardShadow: ViewStyle = Platform.select<ViewStyle>({
  ios: {
    shadowColor: '#0f172a',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  android: {
    elevation: 2,
  },
  default: {},
}) ?? {};

export const buttonShadow: ViewStyle = Platform.select<ViewStyle>({
  ios: {
    shadowColor: '#0052cc',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  android: {
    elevation: 3,
  },
  default: {},
}) ?? {};
