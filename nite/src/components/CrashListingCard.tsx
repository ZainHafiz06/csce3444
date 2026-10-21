import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { CrashListing, CrashRequestStatus } from '../types';
import { COLORS, FONTS } from '../theme';
import { getMyRequest, requestStay } from '../services/crashLinkService';

const GUEST_ID = 'me';

type Props = {
  listing: CrashListing;
};

export default function CrashListingCard({ listing }: Props) {
  const [status, setStatus] = useState<CrashRequestStatus | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    getMyRequest(listing.id, GUEST_ID).then((req) => {
      if (active) setStatus(req?.status ?? null);
    });
    return () => {
      active = false;
    };
  }, [listing.id]);

  const onRequestStay = async () => {
    if (loading || status || !listing.available) return;
    setLoading(true);
    const request = await requestStay(listing, GUEST_ID);
    setStatus(request.status);
    setLoading(false);
  };

  const buttonLabel = !listing.available ? 'Full' : status === 'pending' ? 'Pending' : 'Request Stay';

  return (
    <View style={styles.card}>
      <View style={styles.image}>
        <MaterialCommunityIcons name="bed-outline" size={22} color={COLORS.icon} />
      </View>

      <View style={styles.titleRow}>
        <Text numberOfLines={1} style={styles.title}>{listing.title}</Text>
        <Text style={styles.price}>{listing.isFree ? 'Free' : listing.price}</Text>
      </View>

      <Text style={styles.meta}>
        <Text style={styles.metaLabel}>Host: </Text>{listing.hostName}
        {listing.verifiedHost ? <Text style={styles.verified}>  • verified</Text> : null}
      </Text>
      <Text style={styles.meta}>{listing.approximateArea} • {listing.distanceMiles} mi</Text>
      <Text style={styles.meta}>
        {listing.available ? `${listing.spotsRemaining} spot${listing.spotsRemaining === 1 ? '' : 's'} left` : 'No spots remaining'}
      </Text>

      <Pressable
        style={[styles.button, (status || !listing.available) && styles.buttonDisabled]}
        onPress={onRequestStay}
        disabled={!!status || !listing.available || loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={COLORS.title} />
        ) : (
          <>
            {status === 'pending' ? <Feather name="clock" size={11} color="#CFCFCF" /> : null}
            <Text style={styles.buttonText}>{buttonLabel}</Text>
          </>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { width: '48%' },
  image: {
    width: '100%',
    aspectRatio: 2,
    borderRadius: 13,
    backgroundColor: COLORS.tile,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: { marginTop: 7, flexDirection: 'row', alignItems: 'flex-start', gap: 6 },
  title: { flex: 1, color: COLORS.title, fontFamily: FONTS.medium, fontSize: 10.5, lineHeight: 14 },
  price: { color: COLORS.title, fontFamily: FONTS.medium, fontSize: 10.5, lineHeight: 14 },
  meta: { color: '#A5A5A5', fontFamily: FONTS.regular, fontSize: 9, lineHeight: 13 },
  metaLabel: { color: COLORS.subheader },
  verified: { color: COLORS.findBright },
  button: {
    marginTop: 8,
    height: 28,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.find,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  buttonDisabled: { borderColor: COLORS.border },
  buttonText: { color: '#E6E6E6', fontFamily: FONTS.medium, fontSize: 9.5 },
});
