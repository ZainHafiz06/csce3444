import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { COLORS, FONTS, LAYOUT, TYPE } from '../theme';
import NiteLogo from '../components/NiteLogo';
import PlanetGlow from '../components/PlanetGlow';
import AuthChrome from '../components/AuthChrome';
import PrimaryButton from '../components/PrimaryButton';

type Props = NativeStackScreenProps<RootStackParamList, 'VerifyEmail'>;

const CODE_LENGTH = 6;
const RESEND_SECONDS = 60;

/**
 * The approved six-box code UI (ui_reference/create_acc - 3.png).
 *
 * One off-screen TextInput backs all six boxes: that gives auto-advance,
 * backspace-to-previous and OS autofill/paste of the code for free, which
 * per-box inputs do not. Accepting any six digits is placeholder behaviour —
 * the code still has to be checked against a real backend.
 */
export default function VerifyEmailScreen({ navigation, route }: Props) {
  const [code, setCode] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const input = useRef<TextInput>(null);
  const [caret] = useState(() => new Animated.Value(1));

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(caret, { toValue: 0, duration: 500, delay: 400, useNativeDriver: true }),
        Animated.timing(caret, { toValue: 1, duration: 500, delay: 100, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [caret]);

  const onChange = (value: string) => {
    setCode(value.replace(/\D/g, '').slice(0, CODE_LENGTH));
  };

  const resend = () => {
    if (secondsLeft > 0) return;
    setSecondsLeft(RESEND_SECONDS);
    // TODO: re-issue the verification code.
  };

  const continueFlow = () => {
    if (code.length !== CODE_LENGTH) return;
    Keyboard.dismiss();
    // TODO: verify the code server-side before routing on.
    navigation.replace('HomeFind');
  };

  return (
    <View style={styles.root}>
      <PlanetGlow placement="auth" />
      <AuthChrome onBack={() => navigation.goBack()} step={2} />

      <View style={styles.content}>
        <NiteLogo width={80} style={{ alignSelf: 'flex-start' }} />
        <Text style={styles.title}>verify your{'\n'}email.</Text>
        <Text style={styles.sub}>we sent a 6-digit code to</Text>
        <Text style={styles.email}>{route.params.email}</Text>

        <Pressable style={styles.codeRow} onPress={() => input.current?.focus()}>
          {Array.from({ length: CODE_LENGTH }).map((_, index) => {
            const focused = index === code.length && code.length < CODE_LENGTH;
            return (
              <View key={index} style={[styles.codeBox, focused && styles.codeBoxActive]}>
                {code[index] ? (
                  <Text style={styles.codeText}>{code[index]}</Text>
                ) : focused ? (
                  <Animated.View style={[styles.caret, { opacity: caret }]} />
                ) : null}
              </View>
            );
          })}
        </Pressable>

        <TextInput
          ref={input}
          value={code}
          onChangeText={onChange}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete="one-time-code"
          maxLength={CODE_LENGTH}
          style={styles.hiddenInput}
          autoFocus
        />

        <Text style={styles.resend}>
          didn’t receive a code?{'  '}
          <Text style={[styles.link, secondsLeft > 0 && styles.linkDisabled]} onPress={resend}>
            resend{secondsLeft > 0 ? ` (${secondsLeft}s)` : ''}
          </Text>
        </Text>
      </View>

      <View style={styles.bottom}>
        <PrimaryButton label="continue" disabled={code.length !== CODE_LENGTH} onPress={continueFlow} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  content: { position: 'absolute', left: LAYOUT.authHorizontal, right: LAYOUT.authHorizontal, top: 161 },
  title: { ...TYPE.authTitle, marginTop: 32, color: COLORS.title },
  sub: { ...TYPE.authSub, marginTop: 13, lineHeight: 18, color: '#9A9A9A' },
  email: { ...TYPE.authSub, lineHeight: 18, color: COLORS.title },
  codeRow: { flexDirection: 'row', marginTop: 33, gap: 9 },
  codeBox: {
    flex: 1,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#141414',
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeBoxActive: { borderColor: COLORS.find },
  codeText: { color: COLORS.title, fontFamily: FONTS.medium, fontSize: 17 },
  caret: { width: 1.5, height: 17, backgroundColor: COLORS.findBright },
  hiddenInput: { position: 'absolute', opacity: 0, width: 1, height: 1 },
  resend: { marginTop: 21, textAlign: 'center', color: '#8C8C8C', fontFamily: FONTS.regular, fontSize: 11 },
  link: { color: '#C47BFF', textDecorationLine: 'underline' },
  linkDisabled: { color: '#6E5C7C' },
  bottom: { position: 'absolute', left: LAYOUT.authHorizontal, right: LAYOUT.authHorizontal, bottom: 139 },
});
