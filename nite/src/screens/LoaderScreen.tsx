import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { COLORS } from '../theme';
import NiteLogo from '../components/NiteLogo';
import RadialGlow from '../components/RadialGlow';

type Props = NativeStackScreenProps<RootStackParamList, 'Loader'>;

/**
 * Branding only, while the app boots. When Firebase lands this is where the
 * auth-state check goes: resolve the session, then replace with 'HomeFind' for
 * a signed-in user or 'Welcome' otherwise. Keep it minimal — not an onboarding.
 */
export default function LoaderScreen({ navigation }: Props) {
  const [opacity] = useState(() => new Animated.Value(0));
  const [scale] = useState(() => new Animated.Value(0.96));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, damping: 12, stiffness: 80, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => navigation.replace('Welcome'), 1250);
    return () => clearTimeout(timer);
  }, [navigation, opacity, scale]);

  return (
    <View style={styles.root}>
      <RadialGlow size={320} intensity={0.14} />
      <Animated.View style={{ opacity, transform: [{ scale }] }}>
        <NiteLogo width={130} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center' },
});
