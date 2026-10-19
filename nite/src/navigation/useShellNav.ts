import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FeatureName, RootStackParamList } from './types';
import { Mode } from '../components/ModeToggle';

type Nav = NativeStackNavigationProp<RootStackParamList>;

/**
 * Shared wiring for the Find shell so every feature screen navigates
 * identically. Each feature has its own route, so new screens drop in without
 * touching the shell.
 */
export function useShellNav() {
  const navigation = useNavigation<Nav>();

  return {
    onSelectFeature: (feature: FeatureName) => navigation.navigate(feature),
    onChangeMode: (mode: Mode) => navigation.navigate(mode === 'plan' ? 'HomePlan' : 'HomeFind'),
    onSelectTab: (tab: string) => {
      if (tab === 'home') navigation.navigate('HomeFind');
      // Messages / settings / profile destinations are not built yet.
    },
  };
}
