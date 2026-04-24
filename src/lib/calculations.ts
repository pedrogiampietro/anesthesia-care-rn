import type { Patient, Sex } from './types';

function round(value: number, digits = 1) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

export function calculateBmi(weight: number, heightCm: number) {
  if (!weight || !heightCm) {
    return null;
  }

  const heightMeters = heightCm / 100;
  return round(weight / (heightMeters * heightMeters), 1);
}

export function calculateIdealBodyWeight(heightCm: number, sex: Sex) {
  if (!heightCm) {
    return null;
  }

  const inches = heightCm / 2.54;
  const base = sex === 'M' ? 50 : 45.5;
  return round(base + Math.max(0, inches - 60) * 2.3, 1);
}

export function calculatePropofolTotalDose(weightKg: number, doseMgKg: number) {
  if (!weightKg || !doseMgKg) {
    return null;
  }

  return round(weightKg * doseMgKg, 1);
}

export function calculateVolume(totalMg: number | null, concentrationMgMl: number) {
  if (!totalMg || !concentrationMgMl) {
    return null;
  }

  return round(totalMg / concentrationMgMl, 1);
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function formatNumber(value: number | null | undefined, digits = 1) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return '--';
  }

  return round(value, digits)
    .toFixed(digits)
    .replace(/\.0+$/, '')
    .replace(/(\.\d*[1-9])0+$/, '$1')
    .replace('.', ',');
}

export function getPatientSummary(patient: Patient) {
  return `${formatNumber(patient.weight, 0)} kg • ${patient.age} anos • ${patient.asa}`;
}

export function getPatientInitials(name: string) {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

  return initials.slice(0, 2) || 'P1';
}
