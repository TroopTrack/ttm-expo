import { StyleSheet } from "react-native";
import ColorConstant from "../../utility/ColorConstants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.4)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  popupContainer: {
    minHeight: 110,
    width: "65%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
  },
  errorMessageContainer: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: ColorConstant.LIGHT_GREY,
    paddingBottom: 16,
  },
  oopsTextStyle: {
    flexWrap: "wrap",
    fontWeight: "bold",
    fontSize: 18,
  },
  buttonContainer: {
    alignItems: "center",
    paddingTop: 10,
  },
  okTextStyle: {
    color: ColorConstant.BLUE,
    fontWeight: "bold",
    fontSize: 16,
  },
  iconAndTitleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    paddingBottom: 10,
  },
  errorMessageStyle: {
    textAlign: "center",
    fontSize: 14,
    color: ColorConstant.BLACk,
  },
});

export default styles;
