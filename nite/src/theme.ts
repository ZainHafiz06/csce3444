import { Platform } from 'react-native';

/**
 * Colour system from the spec, cross-checked against ui_reference.
 * Purple = Find, green = Plan, everything else is white / grey on near-black.
 */
export const COLORS = {
  background: '#0C0C0C',
  tile: '#1E1E1E',
  field: '#161616',
  track: '#262626',
  icon: '#7F7F7F',
  header: '#AAAAAA',
  subheader: '#6D6D6D',
  title: '#FFFFFF',
  border: '#2A2A2A',
  find: '#7F3FBF',
  findBright: '#C46CFF',
  /** Selected Find segment — measured off ui_reference/livelines.png. */
  findSelected: 'rgba(127,63,191,0.20)',
  /** Active feature tile fill — measured off ui_reference/livelines.png. */
  findTile: '#190F22',
  plan: '#02C27A',
  planSelected: 'rgba(2,194,122,0.20)',
  planTile: '#0A1C16',
};

/**
 * Every number below is measured off the 393x852 reference frames in
 * ui_reference (the PNGs render that frame at 2.168x). Do not nudge these
 * without re-measuring — the shell geometry is shared across all Find screens.
 */
export const LAYOUT = {
  /** Page gutter for body content on the Find shell. */
  horizontal: 28,
  /** Gutter for the auth screens (sign in / create account / verify). */
  authHorizontal: 43,
  /** The tile row and bottom nav sit 3pt inside the body gutter (-> 31pt). */
  shellInset: 3,
  /** Top of the screen to the top of the main header text block. */
  heroTop: 130,
  headerToToggle: 52,
  toggleToTiles: 18,
  toggleWidth: 158,
  toggleHeight: 29,
  featureSize: 59,
  featureGap: 9,
  featureLabelGap: 7,
  /** Feature labels to the first section header. */
  tilesToSection: 26,
  /** Bottom of a card row to the next section header. */
  sectionGap: 22,
  sectionToBody: 13,
  navHeight: 44,
  navBottom: 31,
  plusSize: 58,
  radius: 17,
};

export const FONTS = {
  regular: 'JetBrainsMono_400Regular',
  medium: 'JetBrainsMono_500Medium',
  semibold: 'JetBrainsMono_600SemiBold',
  /** Display serif used only for the auth screen titles (see create_acc.png). */
  serif: Platform.OS === 'ios' ? 'Georgia' : 'serif',
};

export const TYPE = {
  /** "enjoy smarter." / "check the line." / "get there safe." */
  hero: { fontFamily: FONTS.regular, fontSize: 30, letterSpacing: -1.2 },
  /** "nearby now:" / "events in your area:" */
  section: { fontFamily: FONTS.regular, fontSize: 14 },
  /** Serif titles on the auth screens. */
  authTitle: { fontFamily: FONTS.serif, fontSize: 33, lineHeight: 34 },
  authSub: { fontFamily: FONTS.regular, fontSize: 13, lineHeight: 17 },
};
