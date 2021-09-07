import React, { RefObject } from "react";
import {
  StyleProp,
  TextInput as RNTextInput,
  TextInputProps,
  TextStyle,
} from "react-native";
import { styles } from "./Styles";

export interface Props {
  textInputProps?: TextInputProps;
  onChangeText: (value: string) => void;
  value: string;
  placeholder: string;
  style?: StyleProp<TextStyle>;
  ref?: RefObject<RNTextInput>;
}

const TextInput: React.FC<Props> = (props: Props) => {
  const {
    textInputProps,
    onChangeText,
    value,
    placeholder,
    style,
    ref,
  } = props;
  return (
    <RNTextInput
      ref={ref}
      placeholder={placeholder}
      style={[styles.textInputStyle, style]}
      onChangeText={onChangeText}
      value={value}
      {...textInputProps}
    />
  );
};

export default TextInput;
