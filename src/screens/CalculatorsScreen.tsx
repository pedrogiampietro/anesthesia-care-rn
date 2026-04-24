import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { AppScreen } from '../lib/types';
import { radii, spacing } from '../theme';

type CalculatorsScreenProps = {
  onNavigate: (screen: AppScreen) => void;
};

const calculatorCards: Array<{
  key: string;
  title: string;
  subtitle: string;
  icon: string;
  target?: AppScreen;
}> = [
  {
    key: 'dose-weight',
    title: 'Dose por Peso',
    subtitle: 'Cálculo de dose (mg ou mcg/kg)',
    icon: 'weight-kilogram',
    target: 'propofol',
  },
  {
    key: 'dose-bsa',
    title: 'Dose por Superfície Corporal',
    subtitle: 'Cálculo de dose (mg/m²)',
    icon: 'human-male-female',
  },
  {
    key: 'infusion-rate',
    title: 'Taxa de Infusão',
    subtitle: 'Cálculo de mL/h ou mL/min',
    icon: 'chart-timeline-variant',
    target: 'remifentanil',
  },
  {
    key: 'dilution',
    title: 'Diluição',
    subtitle: 'Cálculo de diluições e concentrações',
    icon: 'beaker-outline',
  },
  {
    key: 'biss',
    title: 'BISS',
    subtitle: 'Índice Bispectral',
    icon: 'gauge',
  },
  {
    key: 'ventilation',
    title: 'Ventilação',
    subtitle: 'Parâmetros ventilatórios',
    icon: 'lungs',
    target: 'ventilation',
  },
];

export function CalculatorsScreen({ onNavigate }: CalculatorsScreenProps) {
  return (
    <View style={styles.container}>
      {calculatorCards.map((item) => (
        <Pressable
          key={item.key}
          disabled={!item.target}
          onPress={() => item.target && onNavigate(item.target)}
          style={styles.card}
        >
          <View style={styles.leftContent}>
            <View style={styles.iconWrap}>
              <MaterialCommunityIcons color="#4165d0" name={item.icon as never} size={24} />
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
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
    minHeight: 82,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#edf1f7',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#13254d',
    shadowOpacity: 0.035,
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
  iconWrap: {
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    flex: 1,
    gap: 3,
  },
  cardTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: '#22366c',
    letterSpacing: -0.2,
  },
  cardSubtitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    lineHeight: 19,
    color: '#7a8299',
  },
});
