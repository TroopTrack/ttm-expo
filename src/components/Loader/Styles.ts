import { StyleSheet } from "react-native";
import ColorConstant from '../../utility/ColorConstants';

export const styles = StyleSheet.create({
  loaderStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    backgroundColor: ColorConstant.WHITE,
    opacity: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
