import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { SurfaceCard } from '../components/SurfaceCard';
import { formatNumber } from '../lib/calculations';
import type { Patient } from '../lib/types';
import { cardShadow, colors, radii, spacing, typography } from '../theme';

type SettingsScreenProps = {
  patient: Patient;
};

export function SettingsScreen({ patient }: SettingsScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={typography.screenTitle}>Configurações</Text>
        <Text style={typography.bodyMuted}>Preferências visuais e resumo rápido da sessão.</Text>
      </View>

      <SurfaceCard elevated style={cardShadow}>
        <Text style={typography.label}>Paciente em foco</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryTile}>
            <Text style={typography.label}>Peso</Text>
            <Text style={styles.summaryValue}>{formatNumber(patient.weight, 0)} kg</Text>
          </View>
          <View style={styles.summaryTile}>
            <Text style={typography.label}>ASA</Text>
            <Text style={styles.summaryValue}>{patient.asa}</Text>
          </View>
        </View>
      </SurfaceCard>

      <SurfaceCard elevated style={cardShadow}>
        <Text style={typography.label}>Tema Clínico</Text>
        <View style={styles.themeList}>
          <View style={styles.themeRow}>
            <View style={[styles.swatch, { backgroundColor: colors.primaryContainer }]} />
            <Text style={typography.body}>Ações primárias e indução</Text>
          </View>
          <View style={styles.themeRow}>
            <View style={[styles.swatch, { backgroundColor: colors.secondary }]} />
            <Text style={typography.body}>Opioides e rotas auxiliares</Text>
          </View>
          <View style={styles.themeRow}>
            <View style={[styles.swatch, { backgroundColor: colors.error }]} />
            <Text style={typography.body}>Alertas críticos e vasopressores</Text>
          </View>
        </View>
      </SurfaceCard>

      <SurfaceCard elevated style={cardShadow}>
        <Text style={typography.label}>Status do App</Text>
        <View style={styles.statusRow}>
          <MaterialIcons color={colors.success} name="verified" size={20} />
          <Text style={typography.bodyMuted}>
            Protótipo React Native convertido a partir do material HTML original.
          </Text>
        </View>
      </SurfaceCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  header: {
    gap: spacing.base,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  summaryTile: {
    flex: 1,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceContainerLow,
    padding: spacing.sm,
    gap: spacing.base,
  },
  summaryValue: {
    ...typography.body,
    fontFamily: 'Inter_600SemiBold',
  },
  themeList: {
    gap: spacing.sm,
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  swatch: {
    width: 16,
    height: 16,
    borderRadius: radii.full,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
