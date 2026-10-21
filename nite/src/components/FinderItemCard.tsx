import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FinderItem } from '../types';
import { COLORS, FONTS } from '../theme';
import { relativeTime } from '../data/time';

type Props = {
  item: FinderItem;
};

export default function FinderItemCard({ item }: Props) {
  const lost = item.reportType === 'lost';

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={[styles.badge, lost ? styles.badgeLost : styles.badgeFound]}>
          <Text style={[styles.badgeText, lost ? styles.badgeTextLost : styles.badgeTextFound]}>
            {lost ? 'LOST' : 'FOUND'}
          </Text>
        </View>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.time}>{relativeTime(item.createdAt)}</Text>
      </View>
      <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
      <Text style={styles.meta}>
        {[item.category, item.approximateLocation].filter(Boolean).join(' • ')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 13,
    backgroundColor: COLORS.tile,
    padding: 12,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  badge: { borderRadius: 7, paddingHorizontal: 7, paddingVertical: 2 },
  badgeLost: { backgroundColor: 'rgba(127,63,191,0.20)' },
  badgeFound: { backgroundColor: 'rgba(2,194,122,0.20)' },
  badgeText: { fontFamily: FONTS.semibold, fontSize: 8 },
  badgeTextLost: { color: COLORS.findBright },
  badgeTextFound: { color: COLORS.plan },
  title: { flex: 1, color: COLORS.title, fontFamily: FONTS.medium, fontSize: 10.5 },
  time: { color: COLORS.subheader, fontFamily: FONTS.regular, fontSize: 9 },
  description: { marginTop: 7, color: '#A5A5A5', fontFamily: FONTS.regular, fontSize: 10, lineHeight: 15 },
  meta: { marginTop: 6, color: COLORS.icon, fontFamily: FONTS.regular, fontSize: 9 },
});
