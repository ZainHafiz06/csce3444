import React, { useMemo } from 'react';
import { View } from 'react-native';

type Props = {
  size: number;
  color?: string;
  /** Alpha at the very centre. */
  intensity?: number;
  steps?: number;
};

/**
 * A soft radial halo. React Native has no radial gradient, so this stacks
 * concentric translucent discs — the alpha accumulates toward the centre and
 * falls off smoothly, with no visible edge.
 */
export default function RadialGlow({ size, color = '127,63,191', intensity = 0.16, steps = 14 }: Props) {
  const layers = useMemo(() => {
    // Per-layer alpha chosen so the accumulated centre alpha lands on `intensity`.
    const alpha = 1 - (1 - intensity) ** (1 / steps);
    return Array.from({ length: steps }, (_, i) => ({
      radius: (size / 2) * (1 - i / steps),
      alpha,
    }));
  }, [size, intensity, steps]);

  return (
    <View pointerEvents="none" style={{ position: 'absolute', width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {layers.map((layer, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            width: layer.radius * 2,
            height: layer.radius * 2,
            borderRadius: layer.radius,
            backgroundColor: `rgba(${color},${layer.alpha.toFixed(4)})`,
          }}
        />
      ))}
    </View>
  );
}
