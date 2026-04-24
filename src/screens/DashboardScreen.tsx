import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { calculateBmi, calculateIdealBodyWeight, formatNumber } from '../lib/calculations';
import type { AppScreen, Patient } from '../lib/types';
import { radii, spacing } from '../theme';

type DashboardScreenProps = {
  patient: Patient;
  onNavigate: (screen: AppScreen) => void;
};

const categoryCards: Array<{
  key: string;
  title: string;
  icon: string;
  color: string;
  target?: AppScreen;
}> = [
  { key: 'inducao', title: 'Indução', icon: 'pill', color: '#2d6df1', target: 'propofol' },
  { key: 'opioides', title: 'Opioides', icon: 'needle', color: '#8a53e5', target: 'fentanil' },
  {
    key: 'bloqueadores',
    title: 'Bloqueadores Neuromusculares',
    icon: 'medical-bag',
    color: '#1d9b4a',
  },
  { key: 'infusoes', title: 'Infusões', icon: 'bottle-tonic-outline', color: '#ff8f2a', target: 'infusions' },
  { key: 'vasopressores', title: 'Vasopressores', icon: 'heart-pulse', color: '#ea5954' },
  { key: 'auxiliares', title: 'Auxiliares', icon: 'head-cog', color: '#f2b733', target: 'dexmedetomidina' },
  { key: 'outros', title: 'Outros', icon: 'dots-horizontal-circle-outline', color: '#7f8aa0' },
];

export function DashboardScreen({ patient, onNavigate }: DashboardScreenProps) {
  const [query, setQuery] = React.useState('');

  const bmi = calculateBmi(patient.weight, patient.height);
  const idealBodyWeight = calculateIdealBodyWeight(patient.height, patient.sex);
  const filteredCards = categoryCards.filter((card) =>
    card.title.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <View style={styles.patientCard}>
        <View style={styles.patientTopRow}>
          <View style={styles.patientTopIcon}>
            <Ionicons color="#94a8cf" name="person-outline" size={24} />
          </View>

          <View style={styles.patientTopBody}>
            <Text style={styles.patientOverline}>Paciente Atual</Text>
            <View style={styles.patientNameRow}>
              <Text style={styles.patientName}>{patient.name}</Text>
              <Pressable onPress={() => onNavigate('patients')} style={styles.editButton}>
                <Ionicons color="#435f98" name="create-outline" size={16} />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.metricsRow}>
          <View style={styles.metricColumn}>
            <Text style={styles.metricLabel}>Peso</Text>
            <Text style={styles.metricValue}>{formatNumber(patient.weight, 0)} kg</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricColumn}>
            <Text style={styles.metricLabel}>Altura</Text>
            <Text style={styles.metricValue}>{formatNumber(patient.height, 0)} cm</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricColumn}>
            <Text style={styles.metricLabel}>Idade</Text>
            <Text style={styles.metricValue}>{patient.age} anos</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricColumn}>
            <Text style={styles.metricLabel}>Sexo</Text>
            <Text style={styles.metricValue}>{patient.sex === 'M' ? 'Masculino' : 'Feminino'}</Text>
          </View>
        </View>

        <View style={[styles.metricsRow, styles.metricsRowBottom]}>
          <View style={styles.metricColumnWide}>
            <Text style={styles.metricLabel}>IMC</Text>
            <Text style={styles.metricValue}>{formatNumber(bmi)} kg/m²</Text>
          </View>
          <View style={styles.metricColumnWide}>
            <Text style={styles.metricLabel}>IBW</Text>
            <Text style={styles.metricValue}>{formatNumber(idealBodyWeight, 0)} kg</Text>
          </View>
        </View>
      </View>

      <View style={styles.searchShell}>
        <Ionicons color="#707a93" name="search-outline" size={21} />
        <TextInput
          onChangeText={setQuery}
          placeholder="Buscar droga..."
          placeholderTextColor="#a0a7bb"
          style={styles.searchInput}
          value={query}
        />
      </View>

      <View style={styles.list}>
        {filteredCards.map((item) => (
          <Pressable
            key={item.key}
            disabled={!item.target}
            onPress={() => item.target && onNavigate(item.target)}
            style={styles.categoryCard}
          >
            <View style={styles.categoryLeft}>
              <View style={[styles.categoryIcon, { backgroundColor: item.color }]}>
                <MaterialCommunityIcons color="#ffffff" name={item.icon as never} size={18} />
              </View>
              <Text style={styles.categoryTitle}>{item.title}</Text>
            </View>

            <Ionicons color="#c2c9da" name="chevron-forward" size={20} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    paddingBottom: spacing.sm,
  },
  patientCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e8edf7',
    backgroundColor: '#ffffff',
    padding: 14,
    gap: 12,
    shadowColor: '#13254d',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  patientTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  patientTopIcon: {
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  patientTopBody: {
    flex: 1,
    gap: 2,
  },
  patientOverline: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    lineHeight: 16,
    color: '#667493',
  },
  patientNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  patientName: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    lineHeight: 22,
    color: '#213569',
  },
  editButton: {
    width: 24,
    height: 24,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#edf1f7',
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  metricsRowBottom: {
    paddingTop: 2,
  },
  metricColumn: {
    flex: 1,
    gap: 2,
  },
  metricColumnWide: {
    flex: 1,
    gap: 2,
  },
  metricDivider: {
    width: 1,
    backgroundColor: '#edf1f7',
    marginHorizontal: 8,
  },
  metricLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    lineHeight: 15,
    color: '#7c86a0',
  },
  metricValue: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    lineHeight: 18,
    color: '#22366c',
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
  categoryCard: {
    minHeight: 58,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#edf1f7',
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#13254d',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  categoryLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTitle: {
    flex: 1,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: '#213569',
    letterSpacing: -0.2,
  },
});
