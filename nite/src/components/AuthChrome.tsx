import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS, FONTS } from '../theme';

type Props = {
  onBack: () => void;
  /** 1-indexed step for the create-account flow; omit on screens outside it. */
  step?: number;
  totalSteps?: number;
};

/** Back chevron plus the "step n/3" progress marker shared by the auth flow. */
export default function AuthChrome({ onBack, step, totalSteps = 3 }: Props) {
  return (
    <>
      <Pressable style={styles.back} hitSlop={12} onPress={onBack}>
        <Feather name="chevron-left" size={32} color={COLORS.title} />
      </Pressable>

      {step ? (
        <View style={styles.stepWrap}>
          <Text style={styles.stepText}>step {step}/{totalSteps}</Text>
          <View style={styles.progress}>
            {Array.from({ length: totalSteps }).map((_, index) => (
              <View key={index} style={[styles.dash, index < step && styles.dashActive]} />
            ))}
          </View>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  back: { position: 'absolute', top: 28, left: 16, zIndex: 5 },
  stepWrap: { position: 'absolute', right: 30, top: 32, zIndex: 5, alignItems: 'flex-end' },
  stepText: { color: '#9A9A9A', fontFamily: FONTS.regular, fontSize: 10.5 },
  progress: { flexDirection: 'row', gap: 5, marginTop: 7 },
  dash: { width: 20, height: 3, borderRadius: 2, backgroundColor: '#3A3A3A' },
  dashActive: { backgroundColor: COLORS.findBright },
});
