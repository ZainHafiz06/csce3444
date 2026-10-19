import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, LAYOUT, TYPE } from '../theme';
import ModeToggle, { Mode } from './ModeToggle';
import FeatureMenu, { FIND_ITEMS, PLAN_ITEMS } from './FeatureMenu';
import BottomNav, { NavTab } from './BottomNav';
import { FeatureName, PlanFeatureName } from '../navigation/types';

type Props = {
  /** Header wording, e.g. "enjoy smarter." / "check the line." */
  title: string;
  mode?: Mode;
  onChangeMode?: (mode: Mode) => void;
  /** Which of the five feature tiles is highlighted, if any. */
  activeFeature?: FeatureName | PlanFeatureName;
  onSelectFeature: (feature: any) => void;
  activeTab?: NavTab;
  onSelectTab?: (tab: NavTab) => void;
  onCreate?: () => void;
  children?: React.ReactNode;
};

/**
 * The shared shell behind Home/Find, LiveLines, SafeRoute, CrashLink, Ghost,
 * Finder and the Plan side. Everything above `children` is fixed: the top
 * breathing room, the header position, the Find/Plan selector and the five
 * feature tiles never move between screens. A feature screen supplies only
 * `title`, `activeFeature` and a body.
 */
export default function FindShell({
  title,
  mode = 'find',
  onChangeMode,
  activeFeature,
  onSelectFeature,
  activeTab = 'home',
  onSelectTab,
  onCreate,
  children,
}: Props) {
  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>{title}</Text>

        <View style={styles.toggle}>
          <ModeToggle mode={mode} onChange={onChangeMode} />
        </View>

        <FeatureMenu
          items={mode === 'plan' ? (PLAN_ITEMS as any) : (FIND_ITEMS as any)}
          mode={mode}
          active={activeFeature as any}
          onSelect={onSelectFeature}
        />

        {children}
      </ScrollView>

      <BottomNav active={activeTab} onSelect={onSelectTab} onCreate={onCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  scroll: {
    paddingTop: LAYOUT.heroTop,
    paddingHorizontal: LAYOUT.horizontal,
    // Clears the floating nav (31 bottom + 44 tall) with room to spare.
    paddingBottom: LAYOUT.navBottom + LAYOUT.navHeight + 40,
  },
  header: {
    ...TYPE.hero,
    color: COLORS.title,
    textAlign: 'center',
  },
  toggle: {
    marginTop: LAYOUT.headerToToggle,
    marginBottom: LAYOUT.toggleToTiles,
  },
});
