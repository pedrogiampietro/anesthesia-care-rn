import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { formatNumber } from '../lib/calculations';
import type { Patient } from '../lib/types';
import { spacing } from '../theme';
import { DrugActionButtons, DrugPatientCard, DrugScreenHeader } from '../components/DrugCommon';

type RemifentanilScreenProps = {
  patient: Patient;
  onBack: () => void;
};

const dosePresets = [
  { key: '0.05', label: '0,05', value: 0.05 },
  { key: '0.1', label: '0,1 mcg/kg/min', value: 0.1 },
  { key: '0.3', label: '0,3', value: 0.3 },
  { key: 'custom', label: 'Personalizada' },
] as const;

function cleanDecimal(text: string) {
  return text.replace(',', '.').replace(/[^\d.]/g, '');
}

function StepTitle({
  title,
  subtitle,
  iconName,
}: {
  title: string;
  subtitle: string;
  iconName: React.ComponentProps<typeof Ionicons>['name'];
}) {
  return (
    <View style={styles.stepHeader}>
      <View style={styles.stepTitleRow}>
        <Ionicons color="#5e79be" name={iconName} size={18} />
        <Text style={styles.stepTitle}>{title}</Text>
      </View>
      <Text style={styles.stepSubtitle}>{subtitle}</Text>
    </View>
  );
}

export function RemifentanilScreen({ patient, onBack }: RemifentanilScreenProps) {
  const [dose, setDose] = React.useState('0.1');
  const [selectedPresetKey, setSelectedPresetKey] = React.useState('0.1');

  const doseValue = Number(cleanDecimal(dose)) || 0;
  const dosePerMinute = patient.weight * doseValue;
  const dilutionConcentration = 50;
  const infusionPerHour = dilutionConcentration > 0 ? (dosePerMinute * 60) / dilutionConcentration : 0;

  return (
    <View style={styles.container}>
      <DrugScreenHeader
        chipColor="#ff9a45"
        chipLabel="Infusão"
        onBack={onBack}
        title="Remifentanil"
      />

      <DrugPatientCard patient={patient} />

      <View style={styles.sectionCard}>
        <StepTitle
          iconName="document-text-outline"
          subtitle="Dose recomendada: 0,05 - 0,3 mcg/kg/min"
          title="1. DOSE"
        />

        <View style={styles.presetRow}>
          {dosePresets.map((preset) => {
            const active = selectedPresetKey === preset.key;

            return (
              <Pressable
                key={preset.key}
                onPress={() => {
                  setSelectedPresetKey(preset.key);

                  if ('value' in preset) {
                    setDose(String(preset.value));
                  }
                }}
                style={[styles.presetButton, active && styles.presetButtonActive]}
              >
                <Text style={[styles.presetLabel, active && styles.presetLabelActive]}>
                  {preset.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.fieldLabel}>Dose personalizada (mcg/kg/min)</Text>
        <View style={styles.fieldShell}>
          <TextInput
            keyboardType="decimal-pad"
            onChangeText={(text) => {
              setDose(cleanDecimal(text));
              setSelectedPresetKey('custom');
            }}
            style={styles.fieldInput}
            value={dose.replace('.', ',')}
          />
          <Text style={styles.fieldUnit}>mcg/kg/min</Text>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <StepTitle
          iconName="flask-outline"
          subtitle="Diluição padrão: 2 mg em 40 mL. (50 mcg/mL)"
          title="2. DILUIÇÃO"
        />

        <Text style={styles.fieldLabel}>Diluição utilizada</Text>
        <View style={styles.inputRow}>
          <View style={[styles.fieldShell, styles.fieldShellFlex]}>
            <Text style={styles.selectValue}>2 mg em 40 mL (50 mcg/mL)</Text>
            <Ionicons color="#6d7a98" name="caret-down" size={16} />
          </View>

          <Pressable disabled style={styles.iconFieldButton}>
            <Ionicons color="#3d67c6" name="pencil-outline" size={18} />
          </Pressable>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <StepTitle
          iconName="water-outline"
          subtitle=""
          title="3. RESULTADO"
        />

        <View style={styles.resultGrid}>
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>DOSE TOTAL</Text>
            <Text style={styles.resultValue}>{formatNumber(dosePerMinute, 0)} mcg/min</Text>
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>INFUSÃO NECESSÁRIA</Text>
            <Text style={styles.resultValue}>{formatNumber(infusionPerHour)} mL/h</Text>
          </View>
        </View>
      </View>

      <DrugActionButtons
        onClear={() => {
          setDose('0.1');
          setSelectedPresetKey('0.1');
        }}
        onRecalculate={() => {
          setDose((current) => current);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    paddingBottom: spacing.md,
  },
  sectionCard: {
    borderRadius: 16,
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
  stepHeader: {
    gap: 4,
  },
  stepTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 15,
    lineHeight: 18,
    color: '#1e3567',
    letterSpacing: -0.2,
  },
  stepSubtitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    lineHeight: 18,
    color: '#5f6d8d',
  },
  presetRow: {
    flexDirection: 'row',
    gap: 8,
  },
  presetButton: {
    minHeight: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dce5f5',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  presetButtonActive: {
    backgroundColor: '#2667df',
    borderColor: '#2667df',
  },
  presetLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    lineHeight: 14,
    color: '#36518e',
    textAlign: 'center',
  },
  presetLabelActive: {
    color: '#ffffff',
  },
  fieldLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    lineHeight: 18,
    color: '#334e86',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fieldShell: {
    minHeight: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dce5f5',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldShellFlex: {
    flex: 1,
  },
  fieldInput: {
    flex: 1,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 17,
    lineHeight: 22,
    color: '#1f3568',
    paddingVertical: 0,
  },
  fieldUnit: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    lineHeight: 16,
    color: '#7b88a5',
    marginLeft: 8,
  },
  selectValue: {
    flex: 1,
    fontFamily: 'Inter_500Medium',
    fontSize: 15,
    lineHeight: 18,
    color: '#1f3568',
  },
  iconFieldButton: {
    width: 42,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dce5f5',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  resultCard: {
    flex: 1,
    minHeight: 94,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e3e8f3',
    backgroundColor: '#ffffff',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  resultLabel: {
    fontFamily: 'Inter_700Bold',
    fontSize: 11,
    lineHeight: 13,
    color: '#7b88a5',
    textAlign: 'center',
  },
  resultValue: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    lineHeight: 22,
    color: '#2565dc',
    textAlign: 'center',
  },
});
