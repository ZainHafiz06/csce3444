import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS, LAYOUT } from '../theme';

export type Mode = 'find' | 'plan';

type Props = {
  mode?: Mode;
  onChange?: (mode: Mode) => void;
};

/**
 * The Find/Plan selector. Geometry is fixed across every screen that shows it:
 * 158x29, centred, 3pt inner padding (ui_reference/livelines.png).
 */
export default function ModeToggle({ mode = 'find', onChange }: Props) {
  return (
    <View style={styles.shell}>
      <Pressable
        style={[styles.choice, mode === 'find' && styles.findActive]}
        onPress={() => onChange?.('find')}
      >
        <Text style={[styles.text, mode === 'find' && styles.findText]}>find</Text>
      </Pressable>
      <Pressable
        style={[styles.choice, mode === 'plan' && styles.planActive]}
        onPress={() => onChange?.('plan')}
      >
        <Text style={[styles.text, mode === 'plan' && styles.planText]}>plan</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    width: LAYOUT.toggleWidth,
    height: LAYOUT.toggleHeight,
    alignSelf: 'center',
    borderRadius: LAYOUT.toggleHeight / 2,
    borderWidth: 1,
    borderColor: '#232323',
    backgroundColor: '#121212',
    flexDirection: 'row',
    padding: 3,
  },
  choice: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
  },
  findActive: { backgroundColor: COLORS.findSelected },
  planActive: { backgroundColor: COLORS.planSelected },
  text: { color: '#4A4A4A', fontFamily: FONTS.medium, fontSize: 14 },
  findText: { color: COLORS.findBright },
  planText: { color: COLORS.plan },
});
