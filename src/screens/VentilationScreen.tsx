import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { SurfaceCard } from '../components/SurfaceCard';
import { ventilationMetrics } from '../lib/data';
import { cardShadow, colors, radii, spacing, typography } from '../theme';

export function VentilationScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={typography.screenTitle}>Ventilação Mecânica</Text>
        <Text style={typography.bodyMuted}>
          Monitoramento resumido para proteção pulmonar e ajustes rápidos.
        </Text>
      </View>

      <View style={styles.grid}>
        {ventilationMetrics.map((metric) => (
          <SurfaceCard
            key={metric.key}
            accentColor={metric.accentColor}
            elevated
            style={[styles.card, cardShadow]}
          >
            <View style={styles.metricHeader}>
              <Text style={styles.metricTitle}>{metric.title}</Text>
              <MaterialIcons color={colors.outline} name={metric.icon as never} size={18} />
            </View>
            <View style={styles.metricValueRow}>
              <Text style={typography.metricValue}>{metric.value}</Text>
              <Text style={typography.metricUnit}>{metric.unit}</Text>
            </View>
            <View style={styles.metricFooter}>
              <View style={styles.miniTrack}>
                <View style={[styles.miniBar, { backgroundColor: metric.accentColor }]} />
              </View>
              <Text style={typography.bodyMuted}>{metric.supporting}</Text>
            </View>
          </SurfaceCard>
        ))}
      </View>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  card: {
    width: '48%',
    minHeight: 162,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  metricTitle: {
    ...typography.label,
    color: colors.onSurfaceVariant,
    flex: 1,
  },
  metricValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.base,
    flexWrap: 'wrap',
  },
  metricFooter: {
    marginTop: 'auto',
    gap: spacing.xs,
  },
  miniTrack: {
    height: 8,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceVariant,
    overflow: 'hidden',
  },
  miniBar: {
    width: '62%',
    height: '100%',
    borderRadius: radii.full,
  },
});
