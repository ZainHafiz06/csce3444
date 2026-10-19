import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/types';
import { COLORS, FONTS, LAYOUT, TYPE } from '../theme';
import { isValidEmail, passwordProblem } from '../data/validation';
import NiteLogo from '../components/NiteLogo';
import PlanetGlow from '../components/PlanetGlow';
import AuthChrome from '../components/AuthChrome';
import AuthField from '../components/AuthField';
import PrimaryButton from '../components/PrimaryButton';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateAccount'>;

/** Field order follows ui_reference/create_acc.png and must not change. */
export default function CreateAccountScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [university, setUniversity] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    if (!name.trim()) return setError('Enter your full name.');
    // Any valid email is accepted — a .edu address is NOT required.
    if (!isValidEmail(email)) return setError('Enter a valid email address.');
    const problem = passwordProblem(password);
    if (problem) return setError(problem);
    if (password !== confirm) return setError('Passwords do not match.');
    if (!accepted) return setError('Please agree to the Terms of Service and Privacy Policy.');
    setError(null);
    // TODO: createUserWithEmailAndPassword, then write the users/{uid} profile
    // document, then send the verification code.
    navigation.navigate('VerifyEmail', { email: email.trim() });
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <PlanetGlow placement="auth" />
      <AuthChrome onBack={() => navigation.goBack()} step={1} />

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <NiteLogo width={80} style={{ alignSelf: 'flex-start' }} />
        <Text style={styles.title}>create your{'\n'}account.</Text>
        <Text style={styles.sub}>join a more connected{'\n'}student experience.</Text>

        <View style={styles.fields}>
          <AuthField icon="user" placeholder="full name" value={name} onChangeText={setName} textContentType="name" />
          <AuthField
            icon="mail"
            placeholder="email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <AuthField icon="lock" placeholder="password" value={password} onChangeText={setPassword} secureTextEntry textContentType="newPassword" />
          <AuthField icon="lock" placeholder="confirm password" value={confirm} onChangeText={setConfirm} secureTextEntry textContentType="newPassword" />
          <AuthField icon="university" placeholder="university" value={university} onChangeText={setUniversity} dropdown />
        </View>

        <Pressable style={styles.termsRow} onPress={() => setAccepted((v) => !v)}>
          <View style={[styles.checkbox, accepted && styles.checked]}>
            {accepted ? <Feather name="check" size={13} color={COLORS.background} /> : null}
          </View>
          <Text style={styles.terms}>
            I agree to the <Text style={styles.link}>Terms of Service</Text>{'\n'}and <Text style={styles.link}>Privacy Policy</Text>.
          </Text>
        </Pressable>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <PrimaryButton label="create account" onPress={submit} style={styles.button} />

        <View style={styles.dividerRow}>
          <View style={styles.rule} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.rule} />
        </View>

        {/* Shown in the approved reference; providers are not wired up yet. */}
        <View style={styles.socialRow}>
          <View style={styles.social}><AntDesign name="apple" size={21} color="#FFFFFF" /></View>
          <View style={styles.social}><AntDesign name="google" size={19} color="#FFFFFF" /></View>
          <View style={styles.social}><FontAwesome5 name="discord" size={19} color="#FFFFFF" /></View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: LAYOUT.authHorizontal, paddingTop: 112, paddingBottom: 60 },
  title: { ...TYPE.authTitle, marginTop: 31, color: COLORS.title },
  sub: { ...TYPE.authSub, marginTop: 8, color: '#9A9A9A' },
  fields: { marginTop: 21, gap: 11 },
  termsRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 22, gap: 12 },
  checkbox: {
    width: 19,
    height: 19,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#5A5A5A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: { backgroundColor: '#FFFFFF', borderColor: '#FFFFFF' },
  terms: { flex: 1, color: '#A0A0A0', fontFamily: FONTS.regular, fontSize: 10, lineHeight: 15 },
  link: { color: '#C47BFF', textDecorationLine: 'underline' },
  error: { marginTop: 14, color: '#E0708A', fontFamily: FONTS.regular, fontSize: 10, lineHeight: 15 },
  button: { marginTop: 35 },
  dividerRow: { marginTop: 25, flexDirection: 'row', alignItems: 'center', gap: 14 },
  rule: { flex: 1, height: 1, backgroundColor: '#2A2A2A' },
  dividerText: { color: '#8E8E8E', fontFamily: FONTS.regular, fontSize: 11 },
  socialRow: { marginTop: 19, flexDirection: 'row', justifyContent: 'center', gap: 11.5 },
  social: {
    width: 65,
    height: 42,
    borderRadius: 13,
    backgroundColor: COLORS.field,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
