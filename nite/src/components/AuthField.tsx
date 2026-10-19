import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../theme';

type IconName = 'user' | 'mail' | 'lock' | 'university';

type Props = {
  icon: IconName;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address';
  textContentType?: 'name' | 'emailAddress' | 'password' | 'newPassword' | 'none';
  /** Renders the chevron shown on the university field in create_acc.png. */
  dropdown?: boolean;
  onPress?: () => void;
};

const MUTED = '#9A9A9A';

export default function AuthField({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType = 'default',
  textContentType = 'none',
  dropdown = false,
  onPress,
}: Props) {
  const [hidden, setHidden] = useState(!!secureTextEntry);

  const iconNode =
    icon === 'university' ? (
      <MaterialCommunityIcons name="school-outline" size={18} color={MUTED} />
    ) : (
      <Feather name={icon} size={17} color={MUTED} />
    );

  return (
    <View style={styles.wrap}>
      {iconNode}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={MUTED}
        secureTextEntry={hidden}
        keyboardType={keyboardType}
        textContentType={textContentType}
        autoCapitalize={icon === 'user' ? 'words' : 'none'}
        autoCorrect={false}
        onPressIn={onPress}
        style={styles.input}
      />
      {secureTextEntry ? (
        <Pressable hitSlop={10} onPress={() => setHidden((v) => !v)}>
          <Feather name={hidden ? 'eye-off' : 'eye'} size={17} color={MUTED} />
        </Pressable>
      ) : null}
      {dropdown ? <Feather name="chevron-down" size={17} color={MUTED} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 42,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.field,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    gap: 13,
  },
  input: {
    flex: 1,
    padding: 0,
    color: '#F2F2F2',
    fontFamily: FONTS.regular,
    fontSize: 11,
  },
});
