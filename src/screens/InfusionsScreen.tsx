import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { formatNumber } from '../lib/calculations';
import type { AppScreen } from '../lib/types';
import { radii, spacing } from '../theme';

type InfusionsScreenProps = {
  onNavigate: (screen: AppScreen) => void;
};

const infusionCards: Array<{
  key: string;
  name: string;
  rateValue: number;
  digits: number;
  rateUnit: string;
  tintColor: string;
  iconColor: string;
  borderColor: string;
  target?: AppScreen;
}> = [
  {
    key: 'propofol',
    name: 'Propofol (infusão)',
    rateValue: 6,
    digits: 0,
    rateUnit: 'mg/kg/h',
    tintColor: '#e9f4ff',
    iconColor: '#5a8cf1',
    borderColor: '#d8e9ff',
    target: 'propofol',
  },
  {
    key: 'remifentanil',
    name: 'Remifentanil',
    rateValue: 0.1,
    digits: 1,
    rateUnit: 'mcg/kg/min',
    tintColor: '#f2e9ff',
    iconColor: '#8c5ce4',
    borderColor: '#ead8ff',
    target: 'remifentanil',
  },
  {
    key: 'dexmedetomidina',
    name: 'Dexmedetomidina',
    rateValue: 0.4,
    digits: 1,
    rateUnit: 'mcg/kg/h',
    tintColor: '#ffefe6',
    iconColor: '#ec8a58',
    borderColor: '#ffe2d2',
    target: 'dexmedetomidina',
  },
  {
    key: 'noradrenalina',
    name: 'Noradrenalina',
    rateValue: 0.05,
    digits: 2,
    rateUnit: 'mcg/kg/min',
    tintColor: '#ffe8ed',
    iconColor: '#d96c7d',
    borderColor: '#ffd8e1',
  },
  {
    key: 'dopamina',
    name: 'Dopamina',
    rateValue: 5,
    digits: 0,
    rateUnit: 'mcg/kg/min',
    tintColor: '#fff6d7',
    iconColor: '#d5a11f',
    borderColor: '#ffebaf',
  },
  {
    key: 'dobutamina',
    name: 'Dobutamina',
    rateValue: 5,
    digits: 0,
    rateUnit: 'mcg/kg/min',
    tintColor: '#e9f8eb',
    iconColor: '#6fab7f',
    borderColor: '#d6f0da',
  },
] as const;

export function InfusionsScreen({ onNavigate }: InfusionsScreenProps) {
  return (
    <View style={styles.container}>
      {infusionCards.map((infusion) => (
        <Pressable
          key={infusion.key}
          disabled={!infusion.target}
          onPress={() => infusion.target && onNavigate(infusion.target)}
          style={styles.card}
        >
          <View style={styles.leftContent}>
            <View
              style={[
                styles.iconBadge,
                {
                  backgroundColor: infusion.tintColor,
                  borderColor: infusion.borderColor,
                },
              ]}
            >
              <MaterialCommunityIcons
                color={infusion.iconColor}
                name="bottle-tonic-plus-outline"
                size={22}
              />
            </View>

            <View style={styles.textBlock}>
              <Text numberOfLines={1} style={styles.name}>
                {infusion.name}
              </Text>
              <Text style={styles.rate}>
                {formatNumber(infusion.rateValue, infusion.digits)} {infusion.rateUnit}
              </Text>
            </View>
          </View>

          <Ionicons color="#c2c9da" name="chevron-forward" size={20} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    paddingBottom: spacing.sm,
  },
  card: {
    minHeight: 88,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#edf1f7',
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#15284d',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  leftContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconBadge: {
    width: 46,
    height: 46,
    borderRadius: radii.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 22,
    color: '#213569',
    letterSpacing: -0.2,
  },
  rate: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    lineHeight: 20,
    color: '#7983a2',
  },
});
