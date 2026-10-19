import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS, LAYOUT } from '../theme';

export type NavTab = 'home' | 'messages' | 'settings' | 'profile';

type Props = {
  active?: NavTab;
  onSelect?: (tab: NavTab) => void;
  onCreate?: () => void;
};

const ACTIVE = '#FFFFFF';
const INACTIVE = COLORS.icon;

/**
 * The floating bottom navigation. Reused verbatim by every Find screen — width,
 * height, radius, icon sizes and the plus button must not change per screen.
 * The plus is a sibling of the bar so it can overflow it on both platforms.
 */
export default function BottomNav({ active = 'home', onSelect, onCreate }: Props) {
  const tint = (tab: NavTab) => (tab === active ? ACTIVE : INACTIVE);

  return (
    <View style={styles.wrap} pointerEvents="box-none">
      <View style={styles.bar}>
        <Pressable style={styles.slot} onPress={() => onSelect?.('home')}>
          <Feather name="home" size={22} color={tint('home')} />
        </Pressable>
        <Pressable style={styles.slot} onPress={() => onSelect?.('messages')}>
          <Feather name="message-circle" size={22} color={tint('messages')} />
        </Pressable>
        <View style={styles.plusSpacer} />
        <Pressable style={styles.slot} onPress={() => onSelect?.('settings')}>
          <Feather name="settings" size={22} color={tint('settings')} />
        </Pressable>
        <Pressable style={styles.slot} onPress={() => onSelect?.('profile')}>
          <Feather name="user" size={22} color={tint('profile')} />
        </Pressable>
      </View>

      <Pressable style={styles.plus} onPress={onCreate}>
        <Feather name="plus" size={30} color="#0C0C0C" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: LAYOUT.horizontal + LAYOUT.shellInset,
    right: LAYOUT.horizontal + LAYOUT.shellInset,
    bottom: LAYOUT.navBottom,
    height: LAYOUT.navHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: LAYOUT.navHeight / 2,
    backgroundColor: 'rgba(26,26,26,0.94)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  slot: { width: 46, alignItems: 'center', justifyContent: 'center' },
  plusSpacer: { width: LAYOUT.plusSize },
  plus: {
    width: LAYOUT.plusSize,
    height: LAYOUT.plusSize,
    borderRadius: LAYOUT.plusSize / 2,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
