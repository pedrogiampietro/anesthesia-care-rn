import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActionButton } from '../components/ActionButton';
import { NumberField } from '../components/NumberField';
import { SegmentedControl } from '../components/SegmentedControl';
import { SurfaceCard } from '../components/SurfaceCard';
import { calculateBmi, calculateIdealBodyWeight, formatNumber } from '../lib/calculations';
import type { Patient, Sex } from '../lib/types';
import { cardShadow, colors, spacing, typography } from '../theme';

type PatientFormScreenProps = {
  patient: Patient;
  onSave: (patient: Patient) => void;
};

function normalizeDecimal(text: string) {
  return text.replace(',', '.').replace(/[^\d.]/g, '');
}

export function PatientFormScreen({ patient, onSave }: PatientFormScreenProps) {
  const [name, setName] = React.useState(patient.name);
  const [weight, setWeight] = React.useState(patient.weight ? String(patient.weight) : '');
  const [height, setHeight] = React.useState(patient.height ? String(patient.height) : '');
  const [age, setAge] = React.useState(patient.age ? String(patient.age) : '');
  const [sex, setSex] = React.useState<Sex>(patient.sex);
  const [asa, setAsa] = React.useState(patient.asa.replace('ASA ', ''));
  const isEditing = Boolean(patient.id);

  React.useEffect(() => {
    setName(patient.name);
    setWeight(patient.weight ? String(patient.weight) : '');
    setHeight(patient.height ? String(patient.height) : '');
    setAge(patient.age ? String(patient.age) : '');
    setSex(patient.sex);
    setAsa(patient.asa.replace('ASA ', ''));
  }, [patient]);

  const weightValue = Number(normalizeDecimal(weight));
  const heightValue = Number(normalizeDecimal(height));
  const ageValue = Number(age.replace(/[^\d]/g, ''));
  const bmi = calculateBmi(weightValue, heightValue);
  const idealBodyWeight = calculateIdealBodyWeight(heightValue, sex);
  const isValid = Boolean(name.trim()) && weightValue > 0 && heightValue > 0 && ageValue > 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={typography.screenTitle}>{isEditing ? 'Dados do Paciente' : 'Novo Paciente'}</Text>
        <Text style={typography.bodyMuted}>
          {isEditing
            ? 'Revise e atualize os dados biométricos do paciente.'
            : 'Insira os dados biométricos para cálculos iniciais.'}
        </Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.fullWidth}>
          <NumberField
            keyboardType="default"
            label="Nome"
            onChangeText={setName}
            placeholder="Paciente 01"
            value={name}
          />
        </View>
        <View style={styles.halfWidth}>
          <NumberField
            label="Peso"
            onChangeText={(text) => setWeight(normalizeDecimal(text))}
            placeholder="0,0"
            unit="kg"
            value={weight}
          />
        </View>
        <View style={styles.halfWidth}>
          <NumberField
            label="Altura"
            onChangeText={(text) => setHeight(normalizeDecimal(text))}
            placeholder="0"
            unit="cm"
            value={height}
          />
        </View>
        <View style={styles.halfWidth}>
          <NumberField
            keyboardType="number-pad"
            label="Idade"
            onChangeText={(text) => setAge(text.replace(/[^\d]/g, ''))}
            placeholder="0"
            unit="anos"
            value={age}
          />
        </View>
        <View style={styles.halfWidth}>
          <NumberField
            keyboardType="default"
            label="ASA"
            onChangeText={(text) => setAsa(text.toUpperCase().replace(/[^IVX]/g, ''))}
            placeholder="II"
            value={asa}
          />
        </View>
        <View style={styles.halfWidth}>
          <SegmentedControl
            label="Sexo"
            onChange={setSex}
            options={[
              { label: 'Masc', value: 'M' },
              { label: 'Fem', value: 'F' },
            ]}
            value={sex}
          />
        </View>
      </View>

      <View style={styles.resultGrid}>
        <SurfaceCard elevated style={[styles.resultCard, styles.primaryTint, cardShadow]}>
          <Text style={typography.label}>IMC</Text>
          <View style={styles.resultValueRow}>
            <Text style={[typography.metricValue, styles.resultPrimary]}>{formatNumber(bmi)}</Text>
            <Text style={typography.metricUnit}>kg/m2</Text>
          </View>
        </SurfaceCard>
        <SurfaceCard elevated style={[styles.resultCard, styles.primaryTint, cardShadow]}>
          <Text style={typography.label}>Peso Ideal</Text>
          <View style={styles.resultValueRow}>
            <Text style={[typography.metricValue, styles.resultPrimary]}>
              {formatNumber(idealBodyWeight)}
            </Text>
            <Text style={typography.metricUnit}>kg</Text>
          </View>
        </SurfaceCard>
      </View>

      <ActionButton
        icon="calculate"
        label={isEditing ? 'Salvar Alterações' : 'Gerar Cálculos'}
        disabled={!isValid}
        onPress={() =>
          onSave({
            id: patient.id || '00001',
            name: name.trim(),
            age: ageValue,
            weight: weightValue,
            height: heightValue,
            sex,
            asa: `ASA ${asa || 'I'}`,
          })
        }
      />

      <Text style={styles.footnote}>
        Cálculos locais para apoio visual. Sempre confirme com protocolo institucional.
      </Text>
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
    gap: spacing.md,
  },
  fullWidth: {
    width: '100%',
  },
  halfWidth: {
    width: '47.5%',
  },
  resultGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  resultCard: {
    flex: 1,
  },
  primaryTint: {
    backgroundColor: colors.primaryFixed,
    borderColor: colors.primaryFixedDim,
  },
  resultValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.base,
    flexWrap: 'wrap',
  },
  resultPrimary: {
    color: colors.onPrimaryFixedVariant,
  },
  footnote: {
    ...typography.bodyMuted,
    color: colors.outline,
  },
});
