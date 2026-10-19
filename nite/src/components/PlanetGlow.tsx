import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  /** 'welcome' matches login.png, 'auth' matches create_acc.png. */
  placement?: 'welcome' | 'auth';
};

/**
 * The purple atmospheric sphere.
 *
 * Centre and radius are solved from where the bright rim crosses the frame
 * edges in the references, so the arc lands in the same place. The sphere is
 * NOT a filled disc — the references read as black on both sides of the rim
 * with a soft halo around it.
 *
 * React Native has no radial gradient. Concentric *rings* leave antialiasing
 * seams at every boundary, so the halo is built from fully overlapping discs
 * instead: purple discs shrinking inwards build the alpha up to the rim, then
 * background-coloured discs shrinking further carve it back out. Each disc
 * covers its neighbour completely, so there is nothing to seam.
 */
const GEOMETRY = {
  // Rim passes through (0, 364) and (393, 595) in the 393x852 frame.
  // halo/peak/spread describe how the purple falls off away from the rim.
  welcome: { cx: -280, cy: 1200, r: 900, halo: 120, peak: 0.22, spread: 60 },
  // Rim passes through (217, 0) and (393, 203).
  auth: { cx: 450, cy: -24, r: 234, halo: 170, peak: 0.26, spread: 75 },
};

const STEPS = 36;

type Disc = { radius: number; color: string };

export default function PlanetGlow({ placement = 'welcome' }: Props) {
  const { cx, cy, r, halo, peak, spread } = GEOMETRY[placement];
  const box = r + halo;

  const discs = useMemo<Disc[]>(() => {
    const profile = (radius: number) => peak * Math.exp(-(((radius - r) / spread) ** 2));
    const out: Disc[] = [];

    // Outside the rim: purple discs, largest first, each adding just enough
    // alpha to hit the target profile at its own edge.
    let covered = 0;
    for (let i = 0; i <= STEPS; i += 1) {
      const radius = r + halo - (halo * i) / STEPS;
      const target = profile(radius);
      const alpha = 1 - (1 - target) / (1 - covered);
      covered = target;
      if (alpha > 0.0005) out.push({ radius, color: `rgba(127,63,191,${alpha.toFixed(4)})` });
    }

    // Inside the rim: background-coloured discs fade the purple back to black.
    let visible = peak;
    for (let i = 1; i <= STEPS; i += 1) {
      const radius = r - (halo * i) / STEPS;
      const target = profile(radius);
      const alpha = 1 - target / visible;
      visible = target;
      if (alpha > 0.0005) out.push({ radius, color: `rgba(12,12,12,${Math.min(alpha, 1).toFixed(4)})` });
    }

    return out;
  }, [r, halo, peak, spread]);

  return (
    <View
      pointerEvents="none"
      style={[styles.wrap, { left: cx - box, top: cy - box, width: box * 2, height: box * 2 }]}
    >
      {discs.map((disc, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            left: box - disc.radius,
            top: box - disc.radius,
            width: disc.radius * 2,
            height: disc.radius * 2,
            borderRadius: disc.radius,
            backgroundColor: disc.color,
          }}
        />
      ))}

      {/* The bright rim line itself. */}
      <View
        style={{
          position: 'absolute',
          left: box - r,
          top: box - r,
          width: r * 2,
          height: r * 2,
          borderRadius: r,
          borderWidth: 1.4,
          borderColor: 'rgba(196,108,255,0.8)',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', backgroundColor: 'transparent' },
});
