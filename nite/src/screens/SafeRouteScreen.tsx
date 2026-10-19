import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FEATURE_HEADERS, RootStackParamList } from '../navigation/types';
import { useShellNav } from '../navigation/useShellNav';
import FindShell from '../components/FindShell';
import SectionHeader from '../components/SectionHeader';
import RouteCard from '../components/RouteCard';
import PickupCard from '../components/PickupCard';
import { pickupSpots, suggestedRoutes } from '../data/routes';

type Props = NativeStackScreenProps<RootStackParamList, 'SafeRoute'>;

/**
 * Matches ui_reference/saferoute.png. Same Find shell as Home/Find and
 * LiveLines — only the header, highlighted tile and body change. Core safety
 * features (routes, pickup spots) are never paywalled.
 */
export default function SafeRouteScreen(_: Props) {
  const nav = useShellNav();

  return (
    <FindShell title={FEATURE_HEADERS.SafeRoute} mode="find" activeFeature="SafeRoute" {...nav}>
      <SectionHeader first>suggested routes:</SectionHeader>
      <View style={styles.grid}>
        {suggestedRoutes.map((route) => <RouteCard key={route.id} route={route} />)}
      </View>

      <SectionHeader>nearby pick up spots:</SectionHeader>
      <View style={styles.grid}>
        {pickupSpots.map((spot) => <PickupCard key={spot.id} spot={spot} />)}
      </View>
    </FindShell>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
});
