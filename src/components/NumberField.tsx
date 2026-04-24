import { StyleSheet, Text, TextInput, View, type KeyboardTypeOptions } from 'react-native';
import { colors, radii, spacing, typography } from '../theme';

type NumberFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  unit?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
};

export function NumberField({
  label,
  value,
  onChangeText,
  unit,
  placeholder,
  keyboardType = 'decimal-pad',
}: NumberFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={typography.label}>{label}</Text>
      <View style={styles.inputShell}>
        <TextInput
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.outline}
          style={styles.input}
          value={value}
        />
        {unit ? <Text style={styles.unit}>{unit}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.base,
  },
  inputShell: {
    minHeight: 54,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerLowest,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.onSurface,
    paddingVertical: spacing.sm,
  },
  unit: {
    ...typography.metricUnit,
    color: colors.outline,
    marginLeft: spacing.xs,
  },
});
