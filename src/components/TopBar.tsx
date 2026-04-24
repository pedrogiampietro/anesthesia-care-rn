import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { getPatientInitials } from '../lib/calculations';
import type { Patient } from '../lib/types';
import { cardShadow, colors, radii, spacing } from '../theme';

type TopBarProps = {
  patient?: Patient;
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
  variant?: 'default' | 'centered';
  leftIconName?: string;
  rightIconName?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  rightIconColor?: string;
  leftIconColor?: string;
};

export function TopBar({
  patient,
  showBack = false,
  onBack,
  title = 'Infusões',
  variant = 'default',
  leftIconName,
  rightIconName,
  onLeftPress,
  onRightPress,
  rightIconColor = stylesVars.homeIconColor,
  leftIconColor = stylesVars.homeIconColor,
}: TopBarProps) {
  if (variant === 'centered') {
    return (
      <View style={styles.homeContainer}>
        {leftIconName ? (
          <Pressable disabled={!onLeftPress} onPress={onLeftPress} style={styles.homeMenuButton}>
            <Ionicons color={leftIconColor} name={leftIconName as never} size={27} />
          </Pressable>
        ) : (
          <View style={styles.homeMenuSpacer} />
        )}
        <Text style={styles.homeTitle}>{title}</Text>
        {rightIconName ? (
          <Pressable disabled={!onRightPress} onPress={onRightPress} style={styles.homeMenuButton}>
            <Ionicons color={rightIconColor} name={rightIconName as never} size={27} />
          </Pressable>
        ) : (
          <View style={styles.homeMenuSpacer} />
        )}
      </View>
    );
  }

  return (
    <View style={[styles.container, cardShadow]}>
      <View style={styles.leading}>
        {showBack ? (
          <Pressable onPress={onBack} style={styles.backButton}>
            <MaterialIcons color={colors.onSurfaceVariant} name="arrow-back" size={22} />
          </Pressable>
        ) : (
          <View style={styles.backSpacer} />
        )}
        <Text style={styles.brand}>AnesthesiaCare</Text>
      </View>
      <View style={styles.avatar}>
        <Text style={styles.avatarLabel}>{getPatientInitials(patient?.name ?? 'Paciente 01')}</Text>
      </View>
    </View>
  );
}

const stylesVars = {
  homeBorder: '#edf1f7',
  homeIconColor: '#4d5f93',
  homeTitleColor: '#22366c',
};

const styles = StyleSheet.create({
  container: {
    height: 64,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surfaceContainerLowest,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceVariant,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.full,
  },
  backSpacer: {
    width: 40,
  },
  brand: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    lineHeight: 24,
    color: colors.primaryContainer,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryFixed,
  },
  avatarLabel: {
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
    lineHeight: 16,
    color: colors.onPrimaryFixedVariant,
  },
  homeContainer: {
    height: 68,
    paddingHorizontal: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: stylesVars.homeBorder,
    backgroundColor: colors.surfaceContainerLowest,
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeMenuButton: {
    width: 44,
    height: 44,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeMenuSpacer: {
    width: 44,
    height: 44,
  },
  homeTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    lineHeight: 24,
    color: stylesVars.homeTitleColor,
    letterSpacing: -0.3,
  },
});
