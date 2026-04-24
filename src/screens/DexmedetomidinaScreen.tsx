import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { formatNumber } from '../lib/calculations';
import type { Patient } from '../lib/types';
import { spacing } from '../theme';
import { DrugActionButtons, DrugPatientCard, DrugScreenHeader } from '../components/DrugCommon';

type DexmedetomidinaScreenProps = {
  patient: Patient;
  onBack: () => void;
};

const attackPresets = [
  { key: '0.5', label: '0,5 mcg/kg', value: 0.5 },
  { key: '1', label: '1,0 mcg/kg', value: 1 },
  { key: 'custom', label: 'Personalizada' },
] as const;

const maintenancePresets = [
  { key: '0.2', label: '0,2', value: 0.2 },
  { key: '0.4', label: '0,4 mcg/kg/h', value: 0.4 },
  { key: '0.7', label: '0,7', value: 0.7 },
  { key: 'custom', label: 'Personalizada' },
] as const;

function cleanDecimal(text: string) {
  return text.replace(',', '.').replace(/[^\d.]/g, '');
}

function StepTitle({
  title,
  subtitle,
  iconName,
  iconColor,
}: {
  title: string;
  subtitle: string;
  iconName: React.ComponentProps<typeof Ionicons>['name'];
  iconColor: string;
}) {
  return (
    <View style={styles.stepHeader}>
      <View style={styles.stepTitleRow}>
        <Ionicons color={iconColor} name={iconName} size={18} />
        <Text style={styles.stepTitle}>{title}</Text>
      </View>
      <Text style={styles.stepSubtitle}>{subtitle}</Text>
    </View>
  );
}

export function DexmedetomidinaScreen({
  patient,
  onBack,
}: DexmedetomidinaScreenProps) {
  const [attackDose, setAttackDose] = React.useState('1');
  const [attackPresetKey, setAttackPresetKey] = React.useState('1');
  const [maintenanceDose, setMaintenanceDose] = React.useState('0.4');
  const [maintenancePresetKey, setMaintenancePresetKey] = React.useState('0.4');

  const concentrationPerMl = 4;

  const attackDoseValue = Number(cleanDecimal(attackDose)) || 0;
  const attackTotal = patient.weight * attackDoseValue;
  const attackVolume = concentrationPerMl > 0 ? attackTotal / concentrationPerMl : 0;
  const attackSpeed = attackVolume * 6;

  const maintenanceDoseValue = Number(cleanDecimal(maintenanceDose)) || 0;
  const maintenanceInfusion = concentrationPerMl > 0
    ? (patient.weight * maintenanceDoseValue) / concentrationPerMl
    : 0;

  return (
    <View style={styles.container}>
      <DrugScreenHeader
        chipColor="#ffb347"
        chipLabel="Infusão"
        onBack={onBack}
        title="Dexmedetomidina"
      />

      <DrugPatientCard patient={patient} />

      <View style={styles.sectionCard}>
        <StepTitle
          iconColor="#4d7ef2"
          iconName="document-text-outline"
          subtitle="Administrar em 10 minutos. Dose recomendada: 0,5 - 1 mcg/kg"
          title="1. DOSE DE ATAQUE (BOLUS)"
        />

        <View style={styles.presetRow}>
          {attackPresets.map((preset) => {
            const active = attackPresetKey === preset.key;

            return (
              <Pressable
                key={preset.key}
                onPress={() => {
                  setAttackPresetKey(preset.key);

                  if ('value' in preset) {
                    setAttackDose(String(preset.value));
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

        {attackPresetKey === 'custom' ? (
          <>
            <Text style={styles.fieldLabel}>Dose personalizada (mcg/kg)</Text>
            <View style={styles.fieldShell}>
              <TextInput
                keyboardType="decimal-pad"
                onChangeText={(text) => setAttackDose(cleanDecimal(text))}
                style={styles.fieldInput}
                value={attackDose.replace('.', ',')}
              />
              <Text style={styles.fieldUnit}>mcg/kg</Text>
            </View>
          </>
        ) : null}

        <Text style={styles.fieldLabel}>Concentração da solução</Text>
        <View style={styles.inputRow}>
          <View style={[styles.fieldShell, styles.fieldShellFlex]}>
            <Text style={styles.selectValue}>200 mcg em 50 mL (4 mcg/mL)</Text>
            <Ionicons color="#6d7a98" name="caret-down" size={16} />
          </View>

          <Pressable disabled style={styles.iconFieldButton}>
            <Ionicons color="#3d67c6" name="pencil-outline" size={18} />
          </Pressable>
        </View>

        <View style={styles.attackResultPanel}>
          <Text style={styles.attackPanelTitle}>RESULTADO DO ATAQUE</Text>
          <View style={styles.tripleGrid}>
            <View style={styles.tripleItem}>
              <Text style={styles.tripleLabel}>DOSE TOTAL</Text>
              <Text style={styles.tripleValue}>{formatNumber(attackTotal, 0)} mcg</Text>
            </View>
            <View style={styles.tripleDivider} />
            <View style={styles.tripleItem}>
              <Text style={styles.tripleLabel}>VOLUME</Text>
              <Text style={styles.tripleValue}>{formatNumber(attackVolume)} mL</Text>
            </View>
            <View style={styles.tripleDivider} />
            <View style={styles.tripleItem}>
              <Text style={styles.tripleLabel}>VELOCIDADE (10 min)</Text>
              <Text style={styles.tripleValue}>{formatNumber(attackSpeed, 0)} mL/h</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <StepTitle
          iconColor="#3db56d"
          iconName="water-outline"
          subtitle="Dose recomendada: 0,2 - 0,7 mcg/kg/h"
          title="2. MANUTENÇÃO (INFUSÃO CONTÍNUA)"
        />

        <View style={styles.presetRow}>
          {maintenancePresets.map((preset) => {
            const active = maintenancePresetKey === preset.key;

            return (
              <Pressable
                key={preset.key}
                onPress={() => {
                  setMaintenancePresetKey(preset.key);

                  if ('value' in preset) {
                    setMaintenanceDose(String(preset.value));
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

        {maintenancePresetKey === 'custom' ? (
          <>
            <Text style={styles.fieldLabel}>Dose personalizada (mcg/kg/h)</Text>
            <View style={styles.fieldShell}>
              <TextInput
                keyboardType="decimal-pad"
                onChangeText={(text) => setMaintenanceDose(cleanDecimal(text))}
                style={styles.fieldInput}
                value={maintenanceDose.replace('.', ',')}
              />
              <Text style={styles.fieldUnit}>mcg/kg/h</Text>
            </View>
          </>
        ) : null}

        <Text style={styles.fieldLabel}>Concentração da solução</Text>
        <View style={styles.inputRow}>
          <View style={[styles.fieldShell, styles.fieldShellFlex]}>
            <Text style={styles.selectValue}>200 mcg em 50 mL (4 mcg/mL)</Text>
            <Ionicons color="#6d7a98" name="caret-down" size={16} />
          </View>

          <Pressable disabled style={styles.iconFieldButton}>
            <Ionicons color="#3d67c6" name="pencil-outline" size={18} />
          </Pressable>
        </View>

        <View style={styles.maintenancePanel}>
          <Text style={styles.maintenancePanelTitle}>RESULTADO DA MANUTENÇÃO</Text>
          <Text style={styles.maintenanceLabel}>INFUSÃO</Text>
          <Text style={styles.maintenanceValue}>{formatNumber(maintenanceInfusion)} mL/h</Text>
        </View>
      </View>

      <DrugActionButtons
        onClear={() => {
          setAttackDose('1');
          setAttackPresetKey('1');
          setMaintenanceDose('0.4');
          setMaintenancePresetKey('0.4');
        }}
        onRecalculate={() => {
          setAttackDose((current) => current);
          setMaintenanceDose((current) => current);
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
  attackResultPanel: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dce8ff',
    backgroundColor: '#f5f9ff',
    padding: 12,
    gap: 10,
  },
  attackPanelTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 13,
    lineHeight: 16,
    color: '#3165d5',
    textAlign: 'center',
  },
  tripleGrid: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  tripleItem: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  tripleDivider: {
    width: 1,
    backgroundColor: '#dce8ff',
    marginHorizontal: 8,
  },
  tripleLabel: {
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    lineHeight: 12,
    color: '#7b88a5',
    textAlign: 'center',
  },
  tripleValue: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    lineHeight: 20,
    color: '#2767de',
    textAlign: 'center',
  },
  maintenancePanel: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d9efd8',
    backgroundColor: '#f2fbf1',
    padding: 14,
    alignItems: 'center',
    gap: 6,
  },
  maintenancePanelTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 13,
    lineHeight: 16,
    color: '#2f9b56',
    textAlign: 'center',
  },
  maintenanceLabel: {
    fontFamily: 'Inter_700Bold',
    fontSize: 11,
    lineHeight: 13,
    color: '#7b88a5',
  },
  maintenanceValue: {
    fontFamily: 'Inter_700Bold',
    fontSize: 26,
    lineHeight: 30,
    color: '#1f9a4b',
  },
});
