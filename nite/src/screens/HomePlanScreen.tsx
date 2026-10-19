import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useShellNav } from '../navigation/useShellNav';
import { FONTS } from '../theme';
import FindShell from '../components/FindShell';
import SectionHeader from '../components/SectionHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'HomePlan'>;

/**
 * The Plan side of the same product. The shell is unchanged — only the accent
 * and the body differ. Schedule, Tasks, Study Hub, Study Groups, Resources and
 * the AI study plan are built on top of this.
 */
export default function HomePlanScreen(_: Props) {
  const nav = useShellNav();

  return (
    <FindShell title="plan smarter." mode="plan" {...nav}>
      <SectionHeader first>coming up:</SectionHeader>
      <Text style={styles.blurb}>
        Schedule, tasks, study hub, study groups and resources plug in here.
      </Text>
    </FindShell>
  );
}

const styles = StyleSheet.create({
  blurb: { color: '#777777', fontFamily: FONTS.regular, fontSize: 11, lineHeight: 18 },
});
