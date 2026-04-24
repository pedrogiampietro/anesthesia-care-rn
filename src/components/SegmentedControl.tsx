import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '../theme';

type SegmentedOption<T extends string> = {
  label: string;
  value: T;
};

type SegmentedControlProps<T extends string> = {
  label: string;
  options: Array<SegmentedOption<T>>;
  value: T;
  onChange: (value: T) => void;
};

export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <View style={styles.container}>
      <Text style={typography.label}>{label}</Text>
      <View style={styles.segmentShell}>
        {options.map((option) => {
          const active = option.value === value;

          return (
            <Pressable
              key={option.value}
              onPress={() => onChange(option.value)}
              style={[styles.option, active && styles.activeOption]}
            >
              <Text style={[styles.optionText, active && styles.activeOptionText]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.base,
  },
  segmentShell: {
    minHeight: 54,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainer,
    padding: 4,
    flexDirection: 'row',
    gap: spacing.xs,
  },
  option: {
    flex: 1,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeOption: {
    backgroundColor: colors.surfaceContainerLowest,
  },
  optionText: {
    ...typography.bodyMuted,
  },
  activeOptionText: {
    color: colors.primaryContainer,
    fontFamily: 'Inter_500Medium',
  },
});
