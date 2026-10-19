import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { FEATURE_HEADERS, FeatureName } from '../navigation/types';
import { useShellNav } from '../navigation/useShellNav';
import { FONTS } from '../theme';
import FindShell from '../components/FindShell';
import SectionHeader from '../components/SectionHeader';

/**
 * Temporary body for the Find features that have not been built yet. The shell
 * around it is already final, so building a feature means replacing only what
 * is below the feature tiles.
 */
export function featureStub(feature: FeatureName, section: string, blurb: string) {
  return function FeatureStubScreen() {
    const nav = useShellNav();
    return (
      <FindShell title={FEATURE_HEADERS[feature]} mode="find" activeFeature={feature} {...nav}>
        <SectionHeader first>{section}</SectionHeader>
        <Text style={styles.blurb}>{blurb}</Text>
      </FindShell>
    );
  };
}

const styles = StyleSheet.create({
  blurb: { color: '#777777', fontFamily: FONTS.regular, fontSize: 11, lineHeight: 18 },
});
