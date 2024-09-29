import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Image } from "react-native";
import React from "react";
import { router, Redirect } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";
import { Colors } from "../utility/colors";
import { images } from "../utility/constants";
import CustomButton from "../elements/button";

const Index = () => {
  const { user, loading } = useGlobalContext();

  if (user && !loading) return <Redirect href="/home" />;

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={Colors.primary} size="large" />
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{
              height: "100%",
            }}
          >
            <View style={styles.containerInside}>
              <Image
                source={images.logo}
                style={styles.image1}
                resizeMode="contain"
                />

              <Image
                source={images.cards}
                style={styles.image2}
                resizeMode="contain"
              />

              <View style={styles.container2}>
                <Text style={styles.text3}>
                  Discover Endless{"\n"}
                  Possibilities with{" "}
                  <Text className="text-secondary-200">Flicksy</Text>
                </Text>

                <Image
                  source={images.path}
                  style={styles.image3}
                  resizeMode="contain"
                />
              </View>

              <Text style={styles.text4}>
                Where Creativity Meets Innovation: Embark on a Journey of
                Limitless Exploration with Flicksy
              </Text>

              <CustomButton
                title="Continue with Email"
                onPress={() => router.push("/signin")}
                containerStyles={styles.button}
              />
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  containerInside: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
  },
  image1: {
    width: 130,
    height: 84,
    marginBottom: 20
  },
  image2: {
    maxWidth: 380,
    width: "100%",
    height: 298
  },
  container2: {
    position: "relative",
    marginTop: 5,
  },
  text3: {
    fontSize: 24,
    color: Colors.text,
    fontFamily: "PoppinsBold",
    textAlign: "center",
  },
  image3: {
    width: 136,
    height: 15,
    position: "absolute",
    bottom: -2,
    right: -25
  },
  text4: {
    fontSize: 14,
    color: Colors.textLight,
    fontFamily: "PoppinsLight",
    textAlign: "center",
    marginTop: 7,
    width: "95%",
    maxWidth: 400,
    marginTop: 20
  },
  button: {
    maxWidth: 400,
    width: "90%",
    marginTop: 20
  }
});
