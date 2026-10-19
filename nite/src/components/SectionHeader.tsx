import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { COLORS, LAYOUT, TYPE } from '../theme';

type Props = {
  children: string;
  /** First section on the page sits closer to the feature tiles. */
  first?: boolean;
};

export default function SectionHeader({ children, first = false }: Props) {
  return (
    <Text style={[styles.text, { marginTop: first ? LAYOUT.tilesToSection : LAYOUT.sectionGap }]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    ...TYPE.section,
    color: COLORS.title,
    marginBottom: LAYOUT.sectionToBody,
  },
});
