import React from 'react';
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';

type Props = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  buttonStyle?: ViewStyle;
  labelStyle?: TextStyle;
};

const Button: React.FC<Props> = ({
  label,
  onClick,
  disabled = false,
  buttonStyle = {},
  labelStyle = {},
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      disabled={disabled}
      style={[styles.button, buttonStyle, disabled ? styles.disabled : null]}>
      <Text style={[styles.text, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '100%',
    borderRadius: 25,
    backgroundColor: '#3178c6',
  },
  text: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '500',
    color: '#fff',
  },
  disabled: {
    backgroundColor: '#717171',
  },
});

export default Button;
