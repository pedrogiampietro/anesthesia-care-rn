import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { buttonShadow, colors, radii, spacing, typography } from '../theme';

type ActionButtonProps = {
  label: string;
  icon?: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
};

export function ActionButton({
  label,
  icon,
  onPress,
  variant = 'primary',
  disabled = false,
}: ActionButtonProps) {
  const primary = variant === 'primary';

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        primary ? styles.primary : styles.secondary,
        primary && buttonShadow,
        disabled && styles.disabled,
      ]}
    >
      <View style={styles.content}>
        {icon ? (
          <MaterialIcons
            color={primary ? colors.onPrimary : colors.onSurface}
            name={icon as never}
            size={20}
          />
        ) : null}
        <Text style={[typography.buttonLabel, primary ? styles.primaryText : styles.secondaryText]}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.primaryContainer,
  },
  secondary: {
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  primaryText: {
    color: colors.onPrimary,
  },
  secondaryText: {
    color: colors.onSurface,
  },
});
