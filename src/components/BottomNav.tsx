import { Ionicons } from '@expo/vector-icons';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme';
import type { TabKey } from '../lib/types';

type BottomNavProps = {
  activeTab: TabKey;
  onSelect: (tab: TabKey) => void;
};

const tabs: Array<{ key: TabKey; label: string; icon: string; activeIcon: string }> = [
  { key: 'dashboard', label: 'Painel', icon: 'home-outline', activeIcon: 'home' },
  { key: 'patients', label: 'Pacientes', icon: 'people-outline', activeIcon: 'people' },
  { key: 'calculators', label: 'Calculadoras', icon: 'calculator-outline', activeIcon: 'calculator' },
  { key: 'settings', label: 'Configurações', icon: 'settings-outline', activeIcon: 'settings' },
];

const palette = {
  active: '#2b6df6',
  inactive: '#a5acc0',
  border: '#edf1f7',
  label: '#9ca4bc',
  background: colors.surfaceContainerLowest,
};

export function BottomNav({ activeTab, onSelect }: BottomNavProps) {
  return (
    <View style={styles.shell}>
      <View style={styles.row}>
        {tabs.map((tab) => {
          const active = tab.key === activeTab;

          return (
            <Pressable
              key={tab.key}
              onPress={() => onSelect(tab.key)}
              style={styles.tab}
            >
              <Ionicons
                color={active ? palette.active : palette.inactive}
                name={(active ? tab.activeIcon : tab.icon) as never}
                size={24}
              />
              <Text style={[styles.label, active && styles.activeLabel]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: palette.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: palette.border,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 14 : 12,
    shadowColor: '#13254d',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -3 },
    elevation: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  tab: {
    flex: 1,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  label: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    lineHeight: 12,
    color: palette.label,
    textAlign: 'center',
    maxWidth: 74,
  },
  activeLabel: {
    color: palette.active,
    fontFamily: 'Inter_600SemiBold',
  },
});
