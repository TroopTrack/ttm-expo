import { Platform, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    marginTop: Platform.OS === "android" ? getStatusBarHeight(false) : 0,
  },
  logoContainer: {
    marginTop: getStatusBarHeight(false),
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  root: {
    height: 45,
    padding: 10,
    marginBottom: 10,
    width: "80%",
    backgroundColor: "#ffe6cc",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginTop: getStatusBarHeight(false),
  },
  loginButtonStyle: {
    width: "20%",
    height: 45,
    backgroundColor: "#2179de",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  loginTextStyle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginFormContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.6,
  },
  logoStyle: {
    width: 300,
    height: 60,
    marginBottom: 30,
    marginTop: 50,
  },
});
