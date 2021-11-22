import React from "react";
import { Modal, View, TouchableOpacity, Text } from "react-native";
import Styles from "./Styles";
import { Octicons } from "@expo/vector-icons";
import ColorConstants from "../../utility/ColorConstants";

export interface Props {
  visible: boolean;
  onPressOk: () => void;
  title?: string;
  message?: string;
  buttonTitle?: string;
  useIcon?: boolean;
}

const ErrorPopUp: React.FC<Props> = (props: Props) => {
  const {
    visible = false,
    onPressOk,
    title,
    message = "Something went wrong",
    buttonTitle = "Ok",
    useIcon = false,
  } = props;

  return (
    <Modal
      transparent={true}
      visible={visible}
      hardwareAccelerated={true}
      onRequestClose={() => onPressOk()}
    >
      <View style={Styles.container}>
        <View style={Styles.popupContainer}>
          <View style={Styles.errorMessageContainer}>
            <View style={Styles.iconAndTitleContainer}>
              {useIcon ? (
                <Octicons
                  name="alert"
                  size={24}
                  color={ColorConstants.ORANGE}
                />
              ) : (
                <Text style={Styles.oopsTextStyle}>Error</Text>
              )}
            </View>
            <Text style={Styles.errorMessageStyle}>{message}</Text>
          </View>
          <TouchableOpacity
            style={Styles.buttonContainer}
            onPress={() => onPressOk()}
          >
            <Text style={Styles.okTextStyle}>{buttonTitle}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorPopUp;
