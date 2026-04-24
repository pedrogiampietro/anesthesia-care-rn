import { BolusDrugCalculator } from '../components/BolusDrugCalculator';
import type { Patient } from '../lib/types';

type FentanilScreenProps = {
  patient: Patient;
  onBack: () => void;
};

export function FentanilScreen({ patient, onBack }: FentanilScreenProps) {
  return (
    <BolusDrugCalculator
      chipColor="#9a63ff"
      chipLabel="Opioide"
      concentrationHint="Concentração padrão: 50 mcg/mL"
      concentrationUnit="mcg/mL"
      defaultConcentration="50"
      defaultDose="2"
      dosePresets={[
        { label: '1 mcg/kg', value: 1 },
        { label: '2 mcg/kg', value: 2 },
        { label: '3 mcg/kg', value: 3 },
      ]}
      doseUnit="mcg/kg"
      infoBannerText={`Valores calculados com base no peso real (${patient.weight} kg).`}
      leftResultBorder="#ebe3fb"
      leftResultTint="#f7f2ff"
      leftResultValueColor="#8b54e5"
      onBack={onBack}
      patient={patient}
      recommendedText="Dose recomendada: 1 - 3 mcg/kg"
      resultDoseUnit="mcg"
      rightResultValueColor="#7b5de4"
      title="Fentanil"
    />
  );
}
