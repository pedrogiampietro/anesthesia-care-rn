import React from 'react';
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar as NativeStatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { BottomNav } from './src/components/BottomNav';
import { TopBar } from './src/components/TopBar';
import { colors, spacing, typography } from './src/theme';
import type { AppScreen, Patient, TabKey } from './src/lib/types';
import { CalculatorsScreen } from './src/screens/CalculatorsScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { DexmedetomidinaScreen } from './src/screens/DexmedetomidinaScreen';
import { FentanilScreen } from './src/screens/FentanilScreen';
import { InfusionsScreen } from './src/screens/InfusionsScreen';
import { PatientFormScreen } from './src/screens/PatientFormScreen';
import { PatientsScreen } from './src/screens/PatientsScreen';
import { PropofolScreen } from './src/screens/PropofolScreen';
import { RemifentanilScreen } from './src/screens/RemifentanilScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { VentilationScreen } from './src/screens/VentilationScreen';

const initialPatients: Patient[] = [
  {
    id: 'patient-01',
    name: 'Paciente 01',
    age: 45,
    weight: 70,
    height: 170,
    sex: 'M',
    asa: 'ASA II',
  },
  {
    id: 'patient-02',
    name: 'Paciente 02',
    age: 60,
    weight: 80,
    height: 175,
    sex: 'F',
    asa: 'ASA II',
  },
  {
    id: 'patient-03',
    name: 'Paciente 03',
    age: 30,
    weight: 65,
    height: 168,
    sex: 'M',
    asa: 'ASA I',
  },
];

const emptyPatient: Patient = {
  id: '',
  name: '',
  age: 0,
  weight: 0,
  height: 0,
  sex: 'M',
  asa: 'ASA I',
};

const initialPatient: Patient = {
  id: 'patient-01',
  name: 'Paciente 01',
  age: 45,
  weight: 70,
  height: 170,
  sex: 'M',
  asa: 'ASA II',
};

const topLevelScreens: TabKey[] = ['dashboard', 'patients', 'calculators', 'settings'];

function getActiveTab(screen: AppScreen): TabKey {
  if (screen === 'propofol' || screen === 'ventilation') {
    return 'calculators';
  }

  if (
    screen === 'infusions'
    || screen === 'fentanil'
    || screen === 'remifentanil'
    || screen === 'dexmedetomidina'
  ) {
    return 'dashboard';
  }

  if (screen === 'patient-form') {
    return 'patients';
  }

  return screen;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  const [screen, setScreen] = React.useState<AppScreen>('dashboard');
  const [previousScreen, setPreviousScreen] = React.useState<AppScreen>('dashboard');
  const [patients, setPatients] = React.useState<Patient[]>(initialPatients);
  const [selectedPatientId, setSelectedPatientId] = React.useState(initialPatient.id);
  const [formPatient, setFormPatient] = React.useState<Patient>(emptyPatient);

  const navigateTo = React.useCallback(
    (nextScreen: AppScreen) => {
      if (nextScreen === screen) {
        return;
      }

      setPreviousScreen(screen);
      setScreen(nextScreen);
    },
    [screen],
  );

  const goBack = React.useCallback(() => {
    setScreen(previousScreen);
  }, [previousScreen]);

  const activeTab = getActiveTab(screen);
  const showBack = !topLevelScreens.includes(screen as TabKey);
  const isDashboard = screen === 'dashboard';
  const isPatients = screen === 'patients';
  const isCalculators = screen === 'calculators';
  const isInfusions = screen === 'infusions';
  const isDrugScreen =
    screen === 'propofol'
    || screen === 'fentanil'
    || screen === 'remifentanil'
    || screen === 'dexmedetomidina';
  const showBottomNav = !isDrugScreen;
  const patient = patients.find((item) => item.id === selectedPatientId) ?? initialPatient;

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingScreen}>
        <StatusBar style="dark" />
        <ActivityIndicator color={colors.primaryContainer} size="large" />
        <Text style={styles.loadingText}>Carregando AnesthesiaCare...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        Platform.OS === 'android' && {
          paddingTop: NativeStatusBar.currentHeight ?? spacing.md,
        },
      ]}
    >
      <StatusBar style="dark" />
      <View style={styles.container}>
        {!isDrugScreen
          ? isDashboard ? (
            <TopBar
              leftIconName="menu"
              onRightPress={() => navigateTo('patients')}
              rightIconName="person-circle-outline"
              title="Painel de Drogas"
              variant="centered"
            />
          ) : isPatients ? (
            <TopBar
              onRightPress={() => {
                setFormPatient({
                  ...emptyPatient,
                  id: `patient-${Date.now()}`,
                });
                navigateTo('patient-form');
              }}
              rightIconColor="#2b6df6"
              rightIconName="add"
              title="Pacientes"
              variant="centered"
            />
          ) : isCalculators ? (
            <TopBar title="Calculadoras" variant="centered" />
          ) : isInfusions ? (
            <TopBar title="Infusões" variant="centered" />
          ) : (
            <TopBar patient={patient} showBack={showBack} onBack={goBack} />
          )
          : null}
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            isDashboard && styles.dashboardScrollContent,
            isPatients && styles.patientsScrollContent,
            isCalculators && styles.calculatorsScrollContent,
            isInfusions && styles.infusionsScrollContent,
            isDrugScreen && styles.drugScrollContent,
            !showBottomNav && styles.contentWithoutBottomNav,
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {screen === 'dashboard' ? (
            <DashboardScreen patient={patient} onNavigate={navigateTo} />
          ) : null}
          {screen === 'patients' ? (
            <PatientsScreen
              onOpenPatient={(patientId) => {
                const nextPatient = patients.find((item) => item.id === patientId);

                if (!nextPatient) {
                  return;
                }

                setSelectedPatientId(patientId);
                setFormPatient(nextPatient);
                navigateTo('patient-form');
              }}
              patients={patients}
              selectedPatientId={selectedPatientId}
            />
          ) : null}
          {screen === 'patient-form' ? (
            <PatientFormScreen
              patient={formPatient}
              onSave={(nextPatient) => {
                setPatients((currentPatients) => {
                  const patientIndex = currentPatients.findIndex((item) => item.id === nextPatient.id);

                  if (patientIndex >= 0) {
                    return currentPatients.map((item) =>
                      item.id === nextPatient.id ? nextPatient : item,
                    );
                  }

                  return [nextPatient, ...currentPatients];
                });
                setSelectedPatientId(nextPatient.id);
                setPreviousScreen('patients');
                setScreen('patients');
              }}
            />
          ) : null}
          {screen === 'calculators' ? <CalculatorsScreen onNavigate={navigateTo} /> : null}
          {screen === 'propofol' ? (
            <PropofolScreen onBack={goBack} patient={patient} />
          ) : null}
          {screen === 'fentanil' ? (
            <FentanilScreen onBack={goBack} patient={patient} />
          ) : null}
          {screen === 'remifentanil' ? (
            <RemifentanilScreen onBack={goBack} patient={patient} />
          ) : null}
          {screen === 'dexmedetomidina' ? (
            <DexmedetomidinaScreen onBack={goBack} patient={patient} />
          ) : null}
          {screen === 'infusions' ? <InfusionsScreen onNavigate={navigateTo} /> : null}
          {screen === 'ventilation' ? <VentilationScreen /> : null}
          {screen === 'settings' ? <SettingsScreen patient={patient} /> : null}
        </ScrollView>
        {showBottomNav ? <BottomNav activeTab={activeTab} onSelect={navigateTo} /> : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLowest,
  },
  container: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLowest,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: 128,
    gap: spacing.md,
  },
  dashboardScrollContent: {
    paddingHorizontal: 18,
    paddingTop: 10,
  },
  patientsScrollContent: {
    paddingHorizontal: 18,
    paddingTop: 12,
  },
  calculatorsScrollContent: {
    paddingHorizontal: 18,
    paddingTop: 12,
  },
  infusionsScrollContent: {
    paddingHorizontal: 18,
    paddingTop: 12,
  },
  drugScrollContent: {
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  contentWithoutBottomNav: {
    paddingBottom: spacing.lg,
  },
  loadingScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
  },
  loadingText: {
    ...typography.body,
    color: colors.onSurfaceVariant,
  },
});
