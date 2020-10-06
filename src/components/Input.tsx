import React, {forwardRef} from 'react';
import {View, TextInput, StyleSheet, TextInputProps, Text} from 'react-native';

type Props = {
  value: string;
  label: string;
  ref?: any;
} & TextInputProps;

const Input: React.FC<Props> = forwardRef(({value, label, ...rest}, ref) => {
  return (
    <View style={styles.contailner}>
      <Text style={styles.label}>{label}</Text>
      <TextInput ref={ref} value={value} style={styles.input} {...rest} />
    </View>
  );
});

const styles = StyleSheet.create({
  contailner: {
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: '#1d1d1d',
  },
});

export default Input;
