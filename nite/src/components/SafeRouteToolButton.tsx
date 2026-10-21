import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS, FONTS } from '../theme';

type Props = {
  icon: React.ComponentProps<typeof Feather>['name'];
  label: string;
  onPress: () => void;
  active?: boolean;
};

export default function SafeRouteToolButton({ icon, label, onPress, active = false }: Props) {
  return (
    <Pressable style={[styles.button, active && styles.buttonActive]} onPress={onPress}>
      <Feather name={icon} size={16} color={active ? COLORS.findBright : COLORS.icon} />
      <Text style={[styles.label, active && styles.labelActive]} numberOfLines={1}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 60,
    borderRadius: 13,
    backgroundColor: COLORS.tile,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  buttonActive: { borderWidth: 1, borderColor: COLORS.find, backgroundColor: COLORS.findTile },
  label: { color: '#CFCFCF', fontFamily: FONTS.regular, fontSize: 8.5, textAlign: 'center' },
  labelActive: { color: COLORS.findBright },
});
