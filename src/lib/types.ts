export type Sex = 'M' | 'F';

export type TabKey = 'dashboard' | 'patients' | 'calculators' | 'settings';

export type AppScreen =
  | TabKey
  | 'patient-form'
  | 'propofol'
  | 'fentanil'
  | 'remifentanil'
  | 'dexmedetomidina'
  | 'infusions'
  | 'ventilation';

export interface Patient {
  id: string;
  name: string;
  age: number;
  weight: number;
  height: number;
  sex: Sex;
  asa: string;
}

export interface DrugCategory {
  key: string;
  title: string;
  subtitle: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  icon: string;
  target?: AppScreen;
  fullWidth?: boolean;
}

export interface CalculatorCardData {
  key: string;
  title: string;
  subtitle: string;
  accentColor: string;
  icon: string;
  target: AppScreen;
}

export interface Infusion {
  name: string;
  classLabel: string;
  rateValue: number;
  rateUnit: string;
  concentration: string;
  accentColor: string;
  tintColor: string;
  icon: string;
}

export interface VentilationMetric {
  key: string;
  title: string;
  value: string;
  unit: string;
  supporting: string;
  accentColor: string;
  icon: string;
}
