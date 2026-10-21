import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FEATURE_HEADERS, RootStackParamList } from '../navigation/types';
import { useShellNav } from '../navigation/useShellNav';
import FindShell from '../components/FindShell';
import SectionHeader from '../components/SectionHeader';
import CrashListingCard from '../components/CrashListingCard';
import { FONTS } from '../theme';
import { getAvailableTonight, getPopularStays } from '../services/crashLinkService';
import { CrashListing } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'CrashLink'>;

/** Public listings only ever show an approximate area — never an exact address. */
export default function CrashLinkScreen(_: Props) {
  const nav = useShellNav();
  const [tonight, setTonight] = useState<CrashListing[] | null>(null);
  const [popular, setPopular] = useState<CrashListing[] | null>(null);

  useEffect(() => {
    getAvailableTonight().then(setTonight);
    getPopularStays().then(setPopular);
  }, []);

  return (
    <FindShell title={FEATURE_HEADERS.CrashLink} mode="find" activeFeature="CrashLink" {...nav}>
      <SectionHeader first>available tonight:</SectionHeader>
      {tonight && tonight.length === 0 ? (
        <Text style={styles.empty}>no stays available right now.</Text>
      ) : (
        <View style={styles.grid}>
          {tonight?.map((listing) => <CrashListingCard key={listing.id} listing={listing} />)}
        </View>
      )}

      <SectionHeader>popular stays:</SectionHeader>
      <View style={styles.grid}>
        {popular?.map((listing) => <CrashListingCard key={listing.id} listing={listing} />)}
      </View>
    </FindShell>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 18 },
  empty: { color: '#777777', fontFamily: FONTS.regular, fontSize: 11, lineHeight: 18 },
});
