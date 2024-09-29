import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../utility/colors";
import { useGlobalContext } from "../context/GlobalProvider";
import Toast from "react-native-toast-message";

const CustomButton = ({
  title,
  onPress,
  containerStyles = {},
  textStyles = {},
  isLoading,
}) => {
  const { internetAccess } = useGlobalContext();

  const handlePress = () => {
    if (!isLoading) {
      if (internetAccess) {
        onPress();
      } else {
        Toast.show({
          type: "error",
          text1: "No Internet",
          text2: "Please check your internet connection",
        });
      }
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={{
        ...styles.button,
        ...(isLoading && { opacity: 0.5, pointerEvents: "none" }),
        ...containerStyles,
      }}
      disabled={isLoading}
    >
      {!isLoading && (
        <Text
          style={{
            ...styles.text,
            ...textStyles,
          }}
        >
          {title}
        </Text>
      )}

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color={Colors.primary}
          size="small"
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    minHeight: 62,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.black,
    fontSize: 20,
    fontFamily: "PoppinsBold",
  },
});

export default CustomButton;
