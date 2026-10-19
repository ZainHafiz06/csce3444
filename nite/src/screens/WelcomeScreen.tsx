import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { COLORS, FONTS } from '../theme';
import NiteLogo from '../components/NiteLogo';
import PlanetGlow from '../components/PlanetGlow';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

/**
 * Matches ui_reference/login.png. The logo is small, "enjoy smarter." is the
 * largest thing on the screen, and the purple sphere stays atmospheric.
 */
export default function WelcomeScreen({ navigation }: Props) {
  return (
    <View style={styles.root}>
      <PlanetGlow placement="welcome" />

      <View style={styles.hero}>
        <NiteLogo width={138} />
        <Text style={styles.tagline}>enjoy smarter.</Text>
        <Text style={styles.sub}>events, people, and a better{'\n'}student life.</Text>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.primary} onPress={() => navigation.navigate('CreateAccount')}>
          <Text style={styles.primaryText}>create account</Text>
        </Pressable>
        <Pressable style={styles.secondary} onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.secondaryText}>sign in</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  hero: { position: 'absolute', top: 194, left: 0, right: 0, alignItems: 'center' },
  tagline: { marginTop: 13, color: '#F6F6F6', fontFamily: FONTS.regular, fontSize: 25, letterSpacing: -0.6 },
  sub: {
    marginTop: 10,
    textAlign: 'center',
    color: '#8E8E8E',
    fontFamily: FONTS.regular,
    fontSize: 11,
    lineHeight: 17.5,
  },
  actions: { position: 'absolute', left: 38, right: 38, bottom: 62, gap: 13 },
  primary: { height: 47, borderRadius: 15, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: '#0F0F0F', fontFamily: FONTS.semibold, fontSize: 14 },
  secondary: {
    height: 47,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#333333',
    backgroundColor: 'rgba(20,20,20,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: { color: '#F5F5F5', fontFamily: FONTS.medium, fontSize: 14 },
});
