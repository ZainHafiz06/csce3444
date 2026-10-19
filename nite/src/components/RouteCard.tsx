import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { RouteCardData } from '../data/routes';
import { COLORS, FONTS } from '../theme';

type Props = {
  route: RouteCardData;
  onPress?: () => void;
};

/**
 * A route preview card for SafeRoute — a stylised map with a start/end pin
 * and a stepped route line, badge, ETA/distance overlay, then the pickup
 * details and a thin purple progress bar toward arrival.
 */
export default function RouteCard({ route, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.preview}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{route.badge}</Text>
        </View>

        <View style={styles.routeLine}>
          <View style={[styles.pin, styles.pinStart]} />
          {[18, -14, 20, -12].map((rotation, i) => (
            <View key={i} style={[styles.segment, { transform: [{ rotate: `${rotation}deg` }] }]} />
          ))}
          <View style={[styles.pin, styles.pinEnd]} />
        </View>

        <View style={styles.etaOverlay}>
          <Text style={styles.etaText}>{route.eta}</Text>
          <Text style={styles.distanceText}>{route.distance}</Text>
        </View>
      </View>

      <View style={styles.titleRow}>
        <Text numberOfLines={1} style={styles.title}>{route.destination}</Text>
        <Text style={styles.price}>{route.price}</Text>
      </View>
      <Text style={styles.meta}>{route.provider} • {route.arrives}</Text>

      <View style={styles.progressRow}>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${route.progress * 100}%` }]}>
            <View style={styles.tip} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { width: '48%' },
  preview: {
    width: '100%',
    aspectRatio: 1.55,
    borderRadius: 13,
    backgroundColor: '#0F0F0F',
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    padding: 8,
    justifyContent: 'space-between',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(30,30,30,0.9)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: { color: '#D9D9D9', fontFamily: FONTS.regular, fontSize: 8.5 },
  routeLine: { position: 'absolute', left: 14, right: 20, top: '38%', flexDirection: 'row', alignItems: 'center' },
  segment: { width: 16, height: 1.4, backgroundColor: COLORS.findBright, opacity: 0.8, marginHorizontal: -3 },
  pin: {
    width: 9,
    height: 9,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: COLORS.findBright,
    backgroundColor: '#1A0F22',
  },
  pinStart: {},
  pinEnd: {
    shadowColor: COLORS.findBright,
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
  },
  etaOverlay: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  etaText: { color: COLORS.title, fontFamily: FONTS.medium, fontSize: 11 },
  distanceText: { color: '#9A9A9A', fontFamily: FONTS.regular, fontSize: 8.5 },
  titleRow: { marginTop: 7, flexDirection: 'row', alignItems: 'flex-start', gap: 6 },
  title: { flex: 1, color: COLORS.title, fontFamily: FONTS.medium, fontSize: 10.5, lineHeight: 14 },
  price: { color: COLORS.title, fontFamily: FONTS.medium, fontSize: 10.5, lineHeight: 14 },
  meta: { marginTop: 2, color: '#A5A5A5', fontFamily: FONTS.regular, fontSize: 9, lineHeight: 13 },
  progressRow: { marginTop: 7, height: 6, justifyContent: 'center' },
  track: { height: 2, borderRadius: 1, backgroundColor: COLORS.track },
  fill: {
    height: 2,
    borderRadius: 1,
    backgroundColor: COLORS.find,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
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
});
