import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

type Props = {
  /** Layout width of the logo box; the artwork is letterboxed inside it. */
  width?: number;
  style?: StyleProp<ImageStyle>;
};

/** Aspect ratio of assets/nite-logo-outline.png (300x145). */
const RATIO = 145 / 300;

export default function NiteLogo({ width = 138, style }: Props) {
  return (
    <Image
      source={require('../../assets/nite-logo-outline.png')}
      resizeMode="contain"
      style={[{ width, height: width * RATIO }, style]}
    />
  );
}
