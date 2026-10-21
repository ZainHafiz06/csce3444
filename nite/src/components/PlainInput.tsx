import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { COLORS, FONTS } from '../theme';

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  multiline?: boolean;
};

export default function PlainInput({ placeholder, value, onChangeText, multiline = false }: Props) {
  return (
    <View style={[styles.wrap, multiline && styles.wrapMultiline]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#7A7A7A"
        multiline={multiline}
        style={[styles.input, multiline && styles.inputMultiline]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    minHeight: 42,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.field,
    justifyContent: 'center',
    paddingHorizontal: 13,
  },
  wrapMultiline: { paddingVertical: 10 },
  input: { padding: 0, color: '#F2F2F2', fontFamily: FONTS.regular, fontSize: 11 },
  inputMultiline: { minHeight: 70, textAlignVertical: 'top' },
});
