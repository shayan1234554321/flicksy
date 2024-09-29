import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../utility/colors";

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }) => {
  return (
    <View style={containerStyles}>
      <Text style={{ ...styles.text, ...titleStyles }}>{title}</Text>
      <Text style={styles.text2}>{subtitle}</Text>
    </View>
  );
};

export default InfoBox;

const styles = StyleSheet.create({
  text: {
    color: Colors.text,
    textAlign: "center",
    fontFamily: "PoppinsBold",
  },
  text2: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: "center",
    fontFamily: "Poppins",
  },
});
