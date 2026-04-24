import type { PropsWithChildren } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { cardShadow, colors, radii, spacing } from '../theme';

type SurfaceCardProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  accentColor?: string;
  elevated?: boolean;
}>;

export function SurfaceCard({ children, style, accentColor, elevated = false }: SurfaceCardProps) {
  return (
    <View
      style={[
        styles.card,
        elevated && cardShadow,
        accentColor && { borderLeftWidth: 4, borderLeftColor: accentColor },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
    backgroundColor: colors.surfaceContainerLowest,
    padding: spacing.md,
    gap: spacing.sm,
  },
});
