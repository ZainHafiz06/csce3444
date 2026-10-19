import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FEATURE_HEADERS, RootStackParamList } from '../navigation/types';
import { useShellNav } from '../navigation/useShellNav';
import FindShell from '../components/FindShell';
import SectionHeader from '../components/SectionHeader';
import EventCard from '../components/EventCard';
import { nearbyEvents, popularEvents } from '../data/events';

type Props = NativeStackScreenProps<RootStackParamList, 'LiveLines'>;

/**
 * Crowd-sourced live information about events and gathering places — not just
 * nightclub queues. Same shell as Home/Find; only the header, the highlighted
 * tile and the body change.
 */
export default function LiveLinesScreen(_: Props) {
  const nav = useShellNav();

  return (
    <FindShell title={FEATURE_HEADERS.LiveLines} mode="find" activeFeature="LiveLines" {...nav}>
      <SectionHeader first>nearby now:</SectionHeader>
      <View style={styles.grid}>
        {nearbyEvents.map((event) => <EventCard key={event.id} event={event} />)}
      </View>

      <SectionHeader>popular tonight:</SectionHeader>
      <View style={styles.grid}>
        {popularEvents.map((event) => <EventCard key={event.id} event={event} />)}
      </View>
    </FindShell>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
});
