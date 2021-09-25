import React from "react";
import {
  StyleProp,
  TextInput as RNTextInput,
  TextInputProps,
  TextStyle,
} from "react-native";
import { styles } from "./Styles";

export interface Props {
  textInputProps?: TextInputProps | React.ClassAttributes<RNTextInput>;
  onChangeText: (value: string) => void;
  value: string;
  placeholder: string;
  style?: StyleProp<TextStyle>;
}

const TextInput: React.FC<Props> = (props: Props) => {
  const { textInputProps, onChangeText, value, placeholder, style } = props;
  return (
    <RNTextInput
      placeholder={placeholder}
      style={[styles.textInputStyle, style]}
      onChangeText={onChangeText}
      value={value}
      {...textInputProps}
    />
  );
};

export default TextInput;
