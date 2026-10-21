import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FEATURE_HEADERS, RootStackParamList } from '../navigation/types';
import { useShellNav } from '../navigation/useShellNav';
import FindShell from '../components/FindShell';
import SectionHeader from '../components/SectionHeader';
import RouteCard from '../components/RouteCard';
import PickupCard from '../components/PickupCard';
import SafeRouteToolButton from '../components/SafeRouteToolButton';
import FormModal from '../components/FormModal';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS, FONTS, LAYOUT } from '../theme';
import { pickupSpots, suggestedRoutes } from '../data/routes';
import {
  LocationPermissionState,
  getCurrentLocation,
  requestLocationPermission,
  shareTrip,
} from '../services/safeRouteService';

type Props = NativeStackScreenProps<RootStackParamList, 'SafeRoute'>;

const CHECK_IN_SECONDS = 15 * 60;

const TRUSTED_CONTACTS = [
  { id: 'mom', name: 'Mom' },
  { id: 'roommate', name: 'Roommate — Jordan' },
  { id: 'friend', name: 'Sam (closest friend on campus)' },
];

function formatCountdown(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/**
 * Matches ui_reference/saferoute.png. Same Find shell as Home/Find and
 * LiveLines — only the header, highlighted tile and body change. Core safety
 * features (routes, pickup spots) are never paywalled.
 */
export default function SafeRouteScreen(_: Props) {
  const nav = useShellNav();

  const [permission, setPermission] = useState<LocationPermissionState | 'loading'>('loading');
  const [locating, setLocating] = useState(false);

  const [timerRunning, setTimerRunning] = useState(false);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [contactsOpen, setContactsOpen] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const [campusSafetyOpen, setCampusSafetyOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const status = await requestLocationPermission();
      setPermission(status);
      if (status === 'granted') {
        setLocating(true);
        try {
          await getCurrentLocation();
        } finally {
          setLocating(false);
        }
      }
    })();
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const locationStatus =
    permission === 'loading'
      ? 'locating…'
      : permission === 'granted'
      ? locating
        ? 'locating…'
        : 'current location found'
      : 'location access off — enable it for personalized routes';

  const onShareTrip = () => {
    const route = suggestedRoutes[0];
    if (!route) return;
    shareTrip(route.destination, route.arrives.replace('Arrives in ', ''));
  };

  const startCheckIn = () => {
    setRemaining(CHECK_IN_SECONDS);
    setTimerRunning(true);
    setCheckInOpen(true);
    timerRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev === null || prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endCheckIn = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimerRunning(false);
    setRemaining(null);
    setCheckInOpen(false);
  };

  const toggleContact = (id: string) => {
    setSelectedContacts((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  };

  return (
    <FindShell title={FEATURE_HEADERS.SafeRoute} mode="find" activeFeature="SafeRoute" {...nav}>
      <Text style={styles.locationStatus}>{locationStatus}</Text>

      <SectionHeader>suggested routes:</SectionHeader>
      <View style={styles.grid}>
        {suggestedRoutes.map((route) => <RouteCard key={route.id} route={route} />)}
      </View>

      <SectionHeader>nearby pick up spots:</SectionHeader>
      <View style={styles.grid}>
        {pickupSpots.map((spot) => <PickupCard key={spot.id} spot={spot} />)}
      </View>

      <SectionHeader>safety tools:</SectionHeader>
      <View style={styles.tools}>
        <SafeRouteToolButton icon="share-2" label="Share Trip" onPress={onShareTrip} />
        <SafeRouteToolButton
          icon="clock"
          label={timerRunning ? formatCountdown(remaining ?? 0) : 'Check-In Timer'}
          active={timerRunning}
          onPress={() => (timerRunning ? setCheckInOpen(true) : startCheckIn())}
        />
        <SafeRouteToolButton icon="users" label="Trusted Contacts" onPress={() => setContactsOpen(true)} />
        <SafeRouteToolButton icon="shield" label="Campus Safety" onPress={() => setCampusSafetyOpen(true)} />
      </View>

      <FormModal visible={checkInOpen} title="check-in timer" onClose={() => setCheckInOpen(false)}>
        <Text style={styles.countdown}>{formatCountdown(remaining ?? 0)}</Text>
        <Text style={styles.modalBody}>
          We’ll assume you’re safe when the timer ends. Mark yourself safe early, or cancel.
        </Text>
        <View style={styles.modalActions}>
          <PrimaryButton label="mark safe" onPress={endCheckIn} style={styles.modalButton} />
          <PrimaryButton label="cancel" onPress={endCheckIn} style={styles.modalButton} />
        </View>
      </FormModal>

      <FormModal visible={contactsOpen} title="trusted contacts" onClose={() => setContactsOpen(false)}>
        <View style={styles.contactList}>
          {TRUSTED_CONTACTS.map((contact) => {
            const selected = selectedContacts.includes(contact.id);
            return (
              <Text
                key={contact.id}
                onPress={() => toggleContact(contact.id)}
                style={[styles.contactRow, selected && styles.contactRowSelected]}
              >
                {selected ? '● ' : '○ '}{contact.name}
              </Text>
            );
          })}
        </View>
        <Text style={styles.modalBody}>Selected contacts are notified when you share a trip.</Text>
      </FormModal>

      <FormModal visible={campusSafetyOpen} title="campus safety" onClose={() => setCampusSafetyOpen(false)}>
        <Text style={styles.modalBody}>In an emergency, call 911.</Text>
        <Text style={styles.modalBody}>
          Campus police and escort service numbers aren’t configured yet — add your campus’s resources here.
        </Text>
      </FormModal>
    </FindShell>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  locationStatus: {
    marginTop: LAYOUT.tilesToSection,
    color: COLORS.subheader,
    fontFamily: FONTS.regular,
    fontSize: 9,
  },
  tools: { flexDirection: 'row', gap: 8 },
  countdown: {
    color: COLORS.title,
    fontFamily: FONTS.semibold,
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 12,
  },
  modalBody: { color: '#A5A5A5', fontFamily: FONTS.regular, fontSize: 10.5, lineHeight: 16, marginBottom: 8 },
  modalActions: { flexDirection: 'row', gap: 10, marginTop: 8 },
  modalButton: { flex: 1 },
  contactList: { gap: 12, marginBottom: 14 },
  contactRow: { color: '#CFCFCF', fontFamily: FONTS.regular, fontSize: 12 },
  contactRowSelected: { color: COLORS.findBright },
});
