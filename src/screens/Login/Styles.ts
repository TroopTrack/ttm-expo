import { StyleSheet } from "react-native";
import ColorConstant from "../../utility/ColorConstants";

const styles = StyleSheet.create({
  forgotButtonContainer: {
    marginHorizontal: 10,
  },
  forgotButtonTextStyle: {
    color: ColorConstant.BLUE,
    fontWeight: "bold",
  },
  separatorStyle: {
    fontWeight: "bold",
    fontSize: 20,
    color: ColorConstant.GREY,
  },
  forgotPassUsernameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },
  backgroundImageStyle: {
    opacity: 0.2,
  },
  signUpButtonContainer: {
    flexDirection: "row",
    borderRadius: 5,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  dontHaveAccountText: {
    fontWeight: "700",
    color: ColorConstant.GREY,
  },
  signUpText: {
    fontWeight: "700",
    color: ColorConstant.ORANGE,
  },
});

export default styles;
