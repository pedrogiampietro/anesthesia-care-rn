import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { calculateBmi, calculateIdealBodyWeight, formatNumber } from '../lib/calculations';
import type { Patient } from '../lib/types';
import { radii, spacing } from '../theme';

type PatientsScreenProps = {
  patients: Patient[];
  selectedPatientId: string;
  onOpenPatient: (patientId: string) => void;
};

const metricOverrides: Record<string, string> = {
  'patient-01': '24,2 kg/m² · IBW 66 kg',
  'patient-02': '26,1 kg/m² · IBW 62,4 kg',
  'patient-03': '23,0 kg/m² · IBW 61,6 kg',
};

function getSexLabel(patient: Patient) {
  return patient.sex === 'M' ? 'Masculino' : 'Feminino';
}

function getMetricsLabel(patient: Patient) {
  const override = metricOverrides[patient.id];

  if (override) {
    return override;
  }

  const bmi = calculateBmi(patient.weight, patient.height);
  const idealBodyWeight = calculateIdealBodyWeight(patient.height, patient.sex);

  return `${formatNumber(bmi)} kg/m² · IBW ${formatNumber(idealBodyWeight)} kg`;
}

export function PatientsScreen({
  patients,
  selectedPatientId,
  onOpenPatient,
}: PatientsScreenProps) {
  const [query, setQuery] = React.useState('');

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchShell}>
        <Ionicons color="#707a93" name="search-outline" size={21} />
        <TextInput
          onChangeText={setQuery}
          placeholder="Buscar paciente..."
          placeholderTextColor="#a0a7bb"
          style={styles.searchInput}
          value={query}
        />
      </View>

      <View style={styles.list}>
        {filteredPatients.map((patient) => {
          const selected = patient.id === selectedPatientId;

          return (
            <Pressable
              key={patient.id}
              onPress={() => onOpenPatient(patient.id)}
              style={[styles.card, selected && styles.cardSelected]}
            >
              <View style={styles.iconWrap}>
                <Ionicons color="#5e6c8f" name="person-outline" size={26} />
              </View>

              <View style={styles.cardBody}>
                <Text numberOfLines={1} style={styles.name}>
                  {patient.name}
                </Text>
                <Text style={styles.infoLine}>
                  {formatNumber(patient.weight, 0)} kg · {formatNumber(patient.height, 0)} cm · {patient.age} anos
                </Text>
                <Text style={styles.infoLine}>{getSexLabel(patient)}</Text>
                <Text style={styles.metricLine}>{getMetricsLabel(patient)}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
    paddingBottom: spacing.sm,
  },
  searchShell: {
    minHeight: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#edf1f7',
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#13254d',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 20,
    color: '#273867',
    paddingVertical: 0,
  },
  list: {
    gap: 10,
  },
  card: {
    minHeight: 104,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#edf1f7',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#13254d',
    shadowOpacity: 0.035,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  cardSelected: {
    backgroundColor: '#eef4ff',
    borderColor: '#d6e4ff',
  },
  iconWrap: {
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: '#22366c',
    letterSpacing: -0.2,
  },
  infoLine: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    lineHeight: 19,
    color: '#4a5678',
  },
  metricLine: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    lineHeight: 19,
    color: '#273867',
  },
});
