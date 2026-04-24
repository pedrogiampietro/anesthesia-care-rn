import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { formatNumber } from '../lib/calculations';
import type { Patient } from '../lib/types';
import { radii, spacing } from '../theme';
import { DrugActionButtons, DrugPatientCard, DrugScreenHeader } from './DrugCommon';

type PresetOption = {
  label: string;
  value: number;
};

type BolusDrugCalculatorProps = {
  title: string;
  chipLabel: string;
  chipColor: string;
  patient: Patient;
  onBack: () => void;
  recommendedText: string;
  doseUnit: string;
  dosePresets: PresetOption[];
  defaultDose: string;
  concentrationHint: string;
  concentrationUnit: string;
  defaultConcentration: string;
  resultDoseUnit: string;
  leftResultTint: string;
  leftResultBorder: string;
  leftResultValueColor: string;
  rightResultValueColor?: string;
  infoBannerText: string;
};

function cleanDecimal(text: string) {
  return text.replace(',', '.').replace(/[^\d.]/g, '');
}

function StepTitle({
  iconName,
  title,
  subtitle,
}: {
  iconName: React.ComponentProps<typeof Ionicons>['name'];
  title: string;
  subtitle: string;
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

export function BolusDrugCalculator({
  title,
  chipLabel,
  chipColor,
  patient,
  onBack,
  recommendedText,
  doseUnit,
  dosePresets,
  defaultDose,
  concentrationHint,
  concentrationUnit,
  defaultConcentration,
  resultDoseUnit,
  leftResultTint,
  leftResultBorder,
  leftResultValueColor,
  rightResultValueColor = '#2565dc',
  infoBannerText,
}: BolusDrugCalculatorProps) {
  const [dose, setDose] = React.useState(defaultDose);
  const [concentration, setConcentration] = React.useState(defaultConcentration);

  const doseValue = Number(cleanDecimal(dose)) || 0;
  const concentrationValue = Number(cleanDecimal(concentration)) || 0;
  const totalDose = patient.weight * doseValue;
  const volume = concentrationValue > 0 ? totalDose / concentrationValue : 0;

  return (
    <View style={styles.container}>
      <DrugScreenHeader
        chipColor={chipColor}
        chipLabel={chipLabel}
        onBack={onBack}
        title={title}
      />

      <DrugPatientCard patient={patient} />

      <View style={styles.sectionCard}>
        <StepTitle
          iconName="document-text-outline"
          subtitle={recommendedText}
          title="1. DOSE"
        />

        <View style={styles.presetRow}>
          {dosePresets.map((preset) => {
            const active = Math.abs(doseValue - preset.value) < 0.001;

            return (
              <Pressable
                key={preset.label}
                onPress={() => setDose(String(preset.value))}
                style={[styles.presetButton, active && styles.presetButtonActive]}
              >
                <Text style={[styles.presetLabel, active && styles.presetLabelActive]}>
                  {preset.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.fieldLabel}>Dose personalizada ({doseUnit})</Text>
        <View style={styles.fieldShell}>
          <TextInput
            keyboardType="decimal-pad"
            onChangeText={(text) => setDose(cleanDecimal(text))}
            style={styles.fieldInput}
            value={dose.replace('.', ',')}
          />
          <Text style={styles.fieldUnit}>{doseUnit}</Text>
        </View>
        <Text style={styles.helperText}>Baseado no peso real do paciente.</Text>
      </View>

      <View style={styles.sectionCard}>
        <StepTitle
          iconName="flask-outline"
          subtitle={concentrationHint}
          title="2. CONCENTRAÇÃO"
        />

        <Text style={styles.fieldLabel}>Concentração da solução</Text>
        <View style={styles.inputRow}>
          <View style={[styles.fieldShell, styles.fieldShellFlex]}>
            <TextInput
              keyboardType="decimal-pad"
              onChangeText={(text) => setConcentration(cleanDecimal(text))}
              style={styles.fieldInput}
              value={concentration.replace('.', ',')}
            />
            <Text style={styles.fieldUnit}>{concentrationUnit}</Text>
          </View>

          <Pressable disabled style={styles.iconFieldButton}>
            <Ionicons color="#3d67c6" name="pencil-outline" size={18} />
          </Pressable>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <StepTitle
          iconName="calculator-outline"
          subtitle=""
          title="3. RESULTADO"
        />

        <View style={styles.resultGrid}>
          <View
            style={[
              styles.resultCard,
              { backgroundColor: leftResultTint, borderColor: leftResultBorder },
            ]}
          >
            <Text style={styles.resultLabel}>DOSE TOTAL</Text>
            <Text style={[styles.resultValue, { color: leftResultValueColor }]}>
              {formatNumber(totalDose, 0)} {resultDoseUnit}
            </Text>
            <Text style={styles.resultFormula}>
              {formatNumber(doseValue)} {doseUnit} × {formatNumber(patient.weight, 0)} kg
            </Text>
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>VOLUME NECESSÁRIO</Text>
            <Text style={[styles.resultValue, { color: rightResultValueColor }]}>
              {formatNumber(volume)} mL
            </Text>
            <Text style={styles.resultFormula}>
              {formatNumber(totalDose, 0)} {resultDoseUnit} ÷ {formatNumber(concentrationValue, 0)} {concentrationUnit}
            </Text>
          </View>
        </View>

        <View style={styles.infoBanner}>
          <Ionicons color="#7291d1" name="information-circle-outline" size={16} />
          <Text style={styles.infoBannerText}>{infoBannerText}</Text>
        </View>
      </View>

      <DrugActionButtons
        onClear={() => {
          setDose(defaultDose);
          setConcentration(defaultConcentration);
        }}
        onRecalculate={() => {
          setDose((current) => current);
          setConcentration((current) => current);
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
    flex: 1,
    minHeight: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dce5f5',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
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
  helperText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    lineHeight: 16,
    color: '#9ca6bd',
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
    minHeight: 110,
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
    textAlign: 'center',
  },
  resultFormula: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    lineHeight: 16,
    color: '#6f7b96',
    textAlign: 'center',
  },
  infoBanner: {
    minHeight: 34,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d6e1f5',
    backgroundColor: '#f5f9ff',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoBannerText: {
    flex: 1,
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    lineHeight: 16,
    color: '#6b7a99',
  },
});
