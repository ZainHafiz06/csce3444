import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GhostPost } from '../types';
import { COLORS, FONTS } from '../theme';
import { relativeTime } from '../data/time';

type Props = {
  post: GhostPost;
};

export default function GhostPostCard({ post }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <MaterialCommunityIcons name="ghost-outline" size={14} color={COLORS.icon} />
        <Text style={styles.author}>{post.authorLabel}</Text>
        <Text style={styles.time}>{relativeTime(post.createdAt)}</Text>
      </View>
      <Text style={styles.text}>{post.text}</Text>
      {post.approximateLocation ? <Text style={styles.location}>{post.approximateLocation}</Text> : null}
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
  row: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  author: { color: '#CFCFCF', fontFamily: FONTS.medium, fontSize: 9.5 },
  time: { marginLeft: 'auto', color: COLORS.subheader, fontFamily: FONTS.regular, fontSize: 9 },
  text: { marginTop: 7, color: COLORS.title, fontFamily: FONTS.regular, fontSize: 11, lineHeight: 16 },
  location: { marginTop: 6, color: COLORS.icon, fontFamily: FONTS.regular, fontSize: 9 },
});
