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
import { RootStackParamList } from '../navigation/types';
import { COLORS, FONTS, LAYOUT, TYPE } from '../theme';
import { isValidEmail } from '../data/validation';
import NiteLogo from '../components/NiteLogo';
import PlanetGlow from '../components/PlanetGlow';
import AuthChrome from '../components/AuthChrome';
import AuthField from '../components/AuthField';
import PrimaryButton from '../components/PrimaryButton';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

export default function SignInScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    // No .edu restriction — any valid address signs in.
    if (!isValidEmail(email)) return setError('Enter a valid email address.');
    if (!password) return setError('Enter your password.');
    setError(null);
    // TODO: signInWithEmailAndPassword; Firebase persists the session so a
    // returning user is routed straight past Welcome by the Loader.
    navigation.replace('HomeFind');
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <PlanetGlow placement="auth" />
      <AuthChrome onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <NiteLogo width={80} style={{ alignSelf: 'flex-start' }} />
        <Text style={styles.title}>welcome back.</Text>
        <Text style={styles.sub}>sign in to keep your night, campus,{'\n'}and plans connected.</Text>

        <View style={styles.fields}>
          <AuthField
            icon="mail"
            placeholder="email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <AuthField
            icon="lock"
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textContentType="password"
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <PrimaryButton label="sign in" onPress={submit} style={styles.button} />

        <Pressable onPress={() => navigation.navigate('CreateAccount')}>
          <Text style={styles.switch}>new here? <Text style={styles.link}>create account</Text></Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: LAYOUT.authHorizontal, paddingTop: 161, paddingBottom: 60 },
  title: { ...TYPE.authTitle, marginTop: 31, color: COLORS.title },
  sub: { ...TYPE.authSub, marginTop: 8, color: '#9A9A9A' },
  fields: { marginTop: 21, gap: 11 },
  error: { marginTop: 14, color: '#E0708A', fontFamily: FONTS.regular, fontSize: 10, lineHeight: 15 },
  button: { marginTop: 24 },
  switch: { marginTop: 18, textAlign: 'center', color: '#8E8E8E', fontFamily: FONTS.regular, fontSize: 10.5 },
  link: { color: '#C47BFF', textDecorationLine: 'underline' },
});
