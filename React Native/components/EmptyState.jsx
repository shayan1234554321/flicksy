import { router } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";

import { images } from "../utility/constants";
import CustomButton from "../elements/button";
import { Colors } from "../utility/colors";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Image source={images.empty} resizeMode="contain" style={styles.image} />

      <Text style={styles.text}>{title}</Text>
      <Text style={styles.text2}>{subtitle}</Text>

      {/* <CustomButton
        title="Back to Explore"
        onPress={() => router.push("/home")}
        containerStyles={styles.button}
      /> */}
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 12,
  },
  image: {
    width: 270,
    height: 216,
  },
  text: {
    fontSize: 14,
    fontFamily: "PoppinsBold",
    color: Colors.textLight,
  },
  text2: {
    fontSize: 24,
    textAlign: "center",
    color: Colors.text,
    fontFamily: "PoppinsBold",
    marginTop: 6,
  },
  button: {
    width: "100%",
    marginTop: 15,
    marginBottom: 15,
  },
});
