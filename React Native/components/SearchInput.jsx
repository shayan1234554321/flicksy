import { useState } from "react";
import { router, usePathname } from "expo-router";
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";

import { icons } from "../utility/constants";
import { Colors } from "../utility/colors";
import Toast from "react-native-toast-message";

const SearchInput = ({ initialQuery , refetch }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  const [focused, setFocused] = useState(false);

  return (
    <View
      style={{
        ...styles.container,
        ...(focused && { borderColor: Colors.primary }),
      }}
    >
      <TextInput
        style={styles.input}
        value={query}
        placeholder="Search a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      <TouchableOpacity
        onPress={() => {
          if (query === "") {
            Toast.show({
              type: "error",
              text1: "Missing Query",
              text2: "Please input something to search results across database",
            });
            return null;
          }

          if (pathname.startsWith("/search")) {
            router.setParams({ query });
            refetch();
          } else router.push(`/search/${query}`);
        }}
      >
        <Image
          source={icons.search}
          style={styles.image}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    width: "100%",
    height: 48,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: Colors.backgroundLight,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#d1d5db",
  },
  input: {
    marginTop: 1.5,
    color: Colors.text,
    flex: 1,
    fontWeight: "Poppins",
    fontSize: 16,
  },
  image: {
    width: 15,
    height: 15,
  },
});
