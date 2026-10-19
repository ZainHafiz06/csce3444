import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { EventCardData } from '../data/events';
import { COLORS, FONTS } from '../theme';

type Props = {
  event: EventCardData;
  onPress?: () => void;
};

export default function EventCard({ event, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={event.image} style={styles.image} />

      <View style={styles.titleRow}>
        <Text numberOfLines={2} style={styles.title}>{event.title}</Text>
        <Text style={styles.price}>{event.price}</Text>
      </View>

      <Text style={styles.meta}><Text style={styles.metaLabel}>Host: </Text>{event.host}</Text>
      <Text style={styles.meta}><Text style={styles.metaLabel}>Line: </Text>{event.line}</Text>
      <Text style={styles.meta}><Text style={styles.metaLabel}>Cover: </Text>{event.price}</Text>

      {/* Capacity is deliberately optional — it must not appear on every listing. */}
      {event.fullness !== undefined ? (
        <View style={styles.fullnessRow}>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${event.fullness}%` }]}>
              <View style={styles.tip} />
            </View>
          </View>
          <Text style={styles.fullness}>{event.fullness}% full</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { width: '48%' },
  image: { width: '100%', aspectRatio: 2, borderRadius: 13, backgroundColor: COLORS.tile },
  titleRow: { marginTop: 7, flexDirection: 'row', alignItems: 'flex-start', gap: 6 },
  title: { flex: 1, color: COLORS.title, fontFamily: FONTS.medium, fontSize: 10.5, lineHeight: 14 },
  price: { color: COLORS.title, fontFamily: FONTS.medium, fontSize: 10.5, lineHeight: 14 },
  meta: { color: '#A5A5A5', fontFamily: FONTS.regular, fontSize: 9, lineHeight: 13 },
  metaLabel: { color: COLORS.subheader },
  fullnessRow: { marginTop: 2, height: 10, flexDirection: 'row', alignItems: 'center', gap: 8 },
  track: { flex: 1, height: 2, borderRadius: 1, backgroundColor: COLORS.track },
  fill: {
    height: 2,
    borderRadius: 1,
    backgroundColor: COLORS.find,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  // A very faint white glow on the leading tip only — not a loading bar.
  tip: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.55,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
  },
  fullness: { color: '#8E8E8E', fontFamily: FONTS.regular, fontSize: 7.5 },
});
