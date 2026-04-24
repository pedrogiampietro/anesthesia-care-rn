import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { calculateBmi, calculateIdealBodyWeight, formatNumber } from '../lib/calculations';
import type { Patient } from '../lib/types';
import { radii } from '../theme';

type DrugScreenHeaderProps = {
  title: string;
  chipLabel: string;
  chipColor: string;
  onBack: () => void;
};

type DrugPatientCardProps = {
  patient: Patient;
};

type DrugActionButtonsProps = {
  onClear: () => void;
  onRecalculate?: () => void;
};

export function DrugScreenHeader({
  title,
  chipLabel,
  chipColor,
  onBack,
}: DrugScreenHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.headerTopRow}>
        <Pressable onPress={onBack} style={styles.headerIconButton}>
          <Ionicons color="#1f3c73" name="chevron-back" size={24} />
        </Pressable>
        <Text style={styles.headerTitle}>{title}</Text>
        <Pressable disabled style={styles.headerIconButton}>
          <Ionicons color="#1f3c73" name="star-outline" size={22} />
        </Pressable>
      </View>

      <View style={[styles.headerChip, { backgroundColor: chipColor }]}>
        <Text style={styles.headerChipText}>{chipLabel}</Text>
      </View>
    </View>
  );
}

export function DrugPatientCard({ patient }: DrugPatientCardProps) {
  const bmi = calculateBmi(patient.weight, patient.height);
  const idealBodyWeight = calculateIdealBodyWeight(patient.height, patient.sex);

  return (
    <View style={styles.patientCard}>
      <View style={styles.patientCardIcon}>
        <Ionicons color="#9bafd4" name="person-outline" size={20} />
      </View>

      <View style={styles.patientCardBody}>
        <Text style={styles.patientName}>{patient.name}</Text>
        <View style={styles.patientMetaRow}>
          <Text style={styles.patientMeta}>Peso: {formatNumber(patient.weight, 0)} kg</Text>
          <Text style={styles.patientMeta}>IBW: {formatNumber(idealBodyWeight, 0)} kg</Text>
          <Text style={styles.patientMeta}>IMC: {formatNumber(bmi)} kg/m²</Text>
        </View>
      </View>
    </View>
  );
}

export function DrugActionButtons({
  onClear,
  onRecalculate,
}: DrugActionButtonsProps) {
  return (
    <View style={styles.actionRow}>
      <Pressable onPress={onClear} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>LIMPAR</Text>
      </Pressable>

      <Pressable onPress={onRecalculate} style={styles.recalculateButton}>
        <Ionicons color="#ffffff" name="calculator-outline" size={18} />
        <Text style={styles.recalculateButtonText}>RECALCULAR</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    gap: 6,
  },
  headerTopRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconButton: {
    width: 36,
    height: 36,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    lineHeight: 24,
    color: '#152d61',
    letterSpacing: -0.3,
  },
  headerChip: {
    minHeight: 24,
    paddingHorizontal: 12,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerChipText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    lineHeight: 14,
    color: '#ffffff',
  },
  patientCard: {
    minHeight: 64,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e8edf7',
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#13254d',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  patientCardIcon: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  patientCardBody: {
    flex: 1,
    gap: 4,
  },
  patientName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    lineHeight: 18,
    color: '#22366c',
  },
  patientMetaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  patientMeta: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    lineHeight: 16,
    color: '#4f5e80',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  clearButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d7e2f7',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 13,
    lineHeight: 16,
    color: '#2f64cf',
    letterSpacing: 0.4,
  },
  recalculateButton: {
    flex: 1.45,
    minHeight: 46,
    borderRadius: 10,
    backgroundColor: '#2667df',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: '#1b4fab',
    shadowOpacity: 0.16,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  recalculateButtonText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 13,
    lineHeight: 16,
    color: '#ffffff',
    letterSpacing: 0.4,
  },
});
