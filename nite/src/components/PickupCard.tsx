import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { PickupSpot } from '../data/routes';
import { COLORS, FONTS } from '../theme';

type Props = {
  spot: PickupSpot;
  onPress?: () => void;
};

/**
 * No campus photography exists yet for these specific locations, so the card
 * uses a dark map-pin placeholder rather than an unrelated stock photo.
 */
export default function PickupCard({ spot, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.image}>
        <Feather name="map-pin" size={22} color={COLORS.icon} />
      </View>

      <View style={styles.titleRow}>
        <Text numberOfLines={1} style={styles.title}>{spot.name}</Text>
        <Text style={styles.price}>{spot.price}</Text>
      </View>
      <Text style={styles.meta}>{spot.subtitle}</Text>
      <Text style={styles.meta}>{spot.distance}</Text>
    </Pressable>
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
});
