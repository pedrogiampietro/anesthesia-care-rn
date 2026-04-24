import { BolusDrugCalculator } from '../components/BolusDrugCalculator';
import type { Patient } from '../lib/types';

type PropofolScreenProps = {
  patient: Patient;
  onBack: () => void;
};

export function PropofolScreen({ patient, onBack }: PropofolScreenProps) {
  return (
    <BolusDrugCalculator
      chipColor="#78a9ff"
      chipLabel="Indução"
      concentrationHint="Concentração padrão: 10 mg/mL"
      concentrationUnit="mg/mL"
      defaultConcentration="10"
      defaultDose="2"
      dosePresets={[
        { label: '1,5 mg/kg', value: 1.5 },
        { label: '2,0 mg/kg', value: 2 },
        { label: '2,5 mg/kg', value: 2.5 },
      ]}
      doseUnit="mg/kg"
      infoBannerText={`Valores calculados com base no peso real (${patient.weight} kg).`}
      leftResultBorder="#d9edda"
      leftResultTint="#f1fbf1"
      leftResultValueColor="#209154"
      onBack={onBack}
      patient={patient}
      recommendedText="Dose recomendada: 1,5 - 2,5 mg/kg"
      resultDoseUnit="mg"
      title="Propofol"
    />
  );
}
