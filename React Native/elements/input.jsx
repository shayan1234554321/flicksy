import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

import { icons } from "../utility/constants";
import { Colors } from "../utility/colors";

export const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  hint,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <View style={{ ...styles.container, ...otherStyles }}>
      <Text style={styles.text}>{title}</Text>

      <View
        style={{
          ...styles.container2,
          ...(focused && { borderColor: Colors.primary }),
        }}
      >
        <TextInput
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={styles.text2}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      {hint && <Text style={styles.hint}>{hint}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  text: {
    color: Colors.text,
    fontSize: 16,
    fontFamily: "PoppinsBold",
  },
  container2: {
    width: "100%",
    height: 64,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: Colors.backgroundLight,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#d1d5db",
    flexDirection: "row",
    alignItems: "center",
  },
  text2: {
    flex: 1,
    color: Colors.text,
    fontFamily: "PoppinsBold",
    fontSize: 16,
  },
  image: {
    width: 30,
    height: 30,
  },
  hint: {
    color: "red",
    fontSize: 14,
  },
});
