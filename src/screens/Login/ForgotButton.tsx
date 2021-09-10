import React from "react";
import { TouchableOpacity, Text } from "react-native";
import ColorConstant from "../../utility/ColorConstants";
import Styles from "./Styles";

export interface Props {
  title: string;
  onPress: () => void;
}

const ForgotuButton: React.FC<Props> = (props: Props) => {
  const { title, onPress } = props;
  return (
    <TouchableOpacity style={Styles.forgotButtonContainer} onPress={onPress}>
      <Text style={Styles.forgotButtonTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ForgotuButton;
