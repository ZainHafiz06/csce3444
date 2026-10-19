import React from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, LAYOUT } from '../theme';
import { FeatureName, PlanFeatureName } from '../navigation/types';
import { Mode } from './ModeToggle';

type Item<T extends string> = {
  name: T;
  label: string;
  render: (size: number, color: string) => React.ReactNode;
};

/**
 * The five Find features, in fixed order. Never reorder them, never change the
 * tile size between screens — only the `active` tile changes.
 */
export const FIND_ITEMS: Item<FeatureName>[] = [
  {
    name: 'LiveLines',
    label: 'LiveLines',
    render: (size, color) => <Feather name="corner-up-right" size={size} color={color} />,
  },
  {
    // A rhombus with a route running through it (see ui_reference/saferoute.png).
    name: 'SafeRoute',
    label: 'SafeRoute',
    render: (size, color) => (
      <View style={[styles.rhombus, { width: size * 0.8, height: size * 0.8, borderColor: color }]}>
        <MaterialCommunityIcons
          name="sine-wave"
          size={size * 0.62}
          color={color}
          style={{ transform: [{ rotate: '-45deg' }] }}
        />
      </View>
    ),
  },
  {
    name: 'CrashLink',
    label: 'CrashLink',
    render: (size, color) => <MaterialCommunityIcons name="bed-outline" size={size} color={color} />,
  },
  {
    name: 'Ghost',
    label: 'Ghost',
    render: (size, color) => <MaterialCommunityIcons name="ghost-outline" size={size} color={color} />,
  },
  {
    name: 'Finder',
    label: 'Finder',
    render: (size, color) => <Feather name="search" size={size} color={color} />,
  },
];

/** The Plan-side equivalents (same geometry, green accent). */
export const PLAN_ITEMS: Item<PlanFeatureName>[] = [
  {
    name: 'Schedule',
    label: 'Schedule',
    render: (size, color) => <Feather name="calendar" size={size} color={color} />,
  },
  {
    name: 'Tasks',
    label: 'Tasks',
    render: (size, color) => <Feather name="check-square" size={size} color={color} />,
  },
  {
    name: 'StudyHub',
    label: 'Study Hub',
    render: (size, color) => <MaterialCommunityIcons name="book-open-outline" size={size} color={color} />,
  },
  {
    name: 'Groups',
    label: 'Groups',
    render: (size, color) => <Feather name="users" size={size} color={color} />,
  },
  {
    name: 'Resources',
    label: 'Resources',
    render: (size, color) => <Feather name="compass" size={size} color={color} />,
  },
];

type Props<T extends string> = {
  items: Item<T>[];
  mode?: Mode;
  active?: T;
  onSelect: (name: T) => void;
};

export default function FeatureMenu<T extends string>({ items, mode = 'find', active, onSelect }: Props<T>) {
  const { width } = useWindowDimensions();
  // Keep the reference gutters and 9pt gap; let the tile grow on wider phones
  // rather than stretching the gaps. Resolves to exactly 59pt at 393pt wide.
  const available = width - 2 * LAYOUT.horizontal - 2 * LAYOUT.shellInset - 4 * LAYOUT.featureGap;
  const tile = Math.max(52, Math.min(72, Math.round(available / 5)));
  const iconSize = Math.round(tile * 0.46);

  const accent = mode === 'plan' ? COLORS.plan : COLORS.findBright;
  const border = mode === 'plan' ? COLORS.plan : COLORS.find;
  const activeFill = mode === 'plan' ? COLORS.planTile : COLORS.findTile;

  return (
    <View style={styles.row}>
      {items.map((item) => {
        const selected = item.name === active;
        const color = selected ? accent : '#CFCFCF';
        return (
          <Pressable key={item.name} style={{ width: tile }} onPress={() => onSelect(item.name)}>
            <View
              style={[
                styles.tile,
                { width: tile, height: tile },
                selected && {
                  borderWidth: 1,
                  borderColor: border,
                  backgroundColor: activeFill,
                  shadowColor: accent,
                  shadowOpacity: 0.3,
                  shadowRadius: 6,
                  shadowOffset: { width: 0, height: 0 },
                },
              ]}
            >
              {item.render(iconSize, color)}
            </View>
            <Text numberOfLines={1} style={styles.label}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: LAYOUT.shellInset,
  },
  tile: {
    borderRadius: LAYOUT.radius,
    backgroundColor: COLORS.tile,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rhombus: {
    borderWidth: 1.6,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '45deg' }],
  },
  label: {
    marginTop: LAYOUT.featureLabelGap,
    textAlign: 'center',
    color: '#E6E6E6',
    fontFamily: FONTS.regular,
    fontSize: 9,
  },
});
