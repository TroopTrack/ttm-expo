import * as React from "react";
import { ActivityIndicator } from "react-native";
import { styles } from "./Styles";

interface Props {}

const Loader: React.FC<Props> = (props: Props) => (
  <ActivityIndicator size="large" color="#0000ff" style={styles.loaderStyle} />
);

export default Loader;
