import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useShellNav } from '../navigation/useShellNav';
import FindShell from '../components/FindShell';
import SectionHeader from '../components/SectionHeader';
import EventCard from '../components/EventCard';
import { nearbyEvents, popularEvents } from '../data/events';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeFind'>;

export default function HomeFindScreen(_: Props) {
  const nav = useShellNav();

  return (
    <FindShell title="enjoy smarter." mode="find" {...nav}>
      <SectionHeader first>events in your area:</SectionHeader>
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
