import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  JetBrainsMono_400Regular,
  JetBrainsMono_500Medium,
  JetBrainsMono_600SemiBold,
} from '@expo-google-fonts/jetbrains-mono';
import { RootStackParamList } from './src/navigation/types';
import LoaderScreen from './src/screens/LoaderScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import VerifyEmailScreen from './src/screens/VerifyEmailScreen';
import HomeFindScreen from './src/screens/HomeFindScreen';
import HomePlanScreen from './src/screens/HomePlanScreen';
import LiveLinesScreen from './src/screens/LiveLinesScreen';
import SafeRouteScreen from './src/screens/SafeRouteScreen';
import { CrashLinkScreen, FinderScreen, GhostScreen } from './src/screens/features';
import { COLORS } from './src/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    JetBrainsMono_400Regular,
    JetBrainsMono_500Medium,
    JetBrainsMono_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <NavigationContainer
        theme={{
          ...DarkTheme,
          colors: { ...DarkTheme.colors, background: COLORS.background },
        }}
      >
        <StatusBar hidden />
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
          <Stack.Screen name="Loader" component={LoaderScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
          <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
          <Stack.Screen name="HomeFind" component={HomeFindScreen} />
          <Stack.Screen name="HomePlan" component={HomePlanScreen} />
          <Stack.Screen name="LiveLines" component={LiveLinesScreen} />
          <Stack.Screen name="SafeRoute" component={SafeRouteScreen} />
          <Stack.Screen name="CrashLink" component={CrashLinkScreen} />
          <Stack.Screen name="Ghost" component={GhostScreen} />
          <Stack.Screen name="Finder" component={FinderScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
