import { useState } from "react";
import { Link, router } from "expo-router";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";

import { images } from "../../utility/constants";
import { FormField } from "../../elements/input";
import CustomButton from "../../elements/button";

import { useGlobalContext } from "../../context/GlobalProvider";
import { Colors } from "../../utility/colors";
import { LoginSchema } from "../../validation/auth";
import axios from "axios";
import API from "../../utility/api";
import { saveToLocalStorage } from "../../hooks/localStorage";
import Toast from "react-native-toast-message";

const SignIn = () => {
  const { setUser } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    LoginSchema.validate(form, { abortEarly: false })
      .then(async () => {
        try {
          setSubmitting(true);
          const user = await axios.post(API.user.signin, { ...form });
          setUser(user.data.user);
          await saveToLocalStorage("userToken", user.data.token);

          if(router.canDismiss()){
            router.dismissAll();
          }
          router.replace("/home");
        } catch (error) {
          console.log(error);
          if (error.response.status == 404) {
            setErrors((prev) => ({
              ...prev,
              email: "Email not found",
            }));
          } else if (error.response.status == 401) {
            Toast.show({
              type: "error",
              text1: "Invalid credentials",
              text2: "Please check your Fields",
            });
          } else if (error.response.status == 500) {
            Toast.show({
              type: "error",
              text1: "Something Went Wrong",
              text2: "Please try again",
            });
          }
        } finally {
          setSubmitting(false);
        }
      })
      .catch((validationErrors) => {
        if (validationErrors.inner) {
          const errors = {};
          validationErrors.inner.forEach((error) => {
            errors[error.path] = error.message;
          });
          setErrors(errors);
        }
      });
  };

  const handleChangeFormValue = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  return (
    <ScrollView
      contentContainerStyle={{
        height: "100%",
        backgroundColor: Colors.background,
      }}
    >
      <View style={styles.container}>
        <Image source={images.logo} resizeMode="contain" style={styles.image} />

        <Text style={styles.text}>Log in to Flicksy</Text>

        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => handleChangeFormValue("email", e)}
          otherStyles={{ marginTop: 7, maxWidth: 400, width: "90%" }}
          keyboardType="email-address"
          hint={errors.email}
        />

        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => handleChangeFormValue("password", e)}
          otherStyles={{ marginTop: 7, maxWidth: 400, width: "90%" }}
          hint={errors.password}
        />

        <CustomButton
          title="Sign In"
          onPress={submit}
          containerStyles={{ marginTop: 30, maxWidth: 400, width: "90%" }}
          isLoading={isSubmitting}
        />

        <View style={styles.container2}>
          <Text style={styles.text2}>Don't have an account?</Text>
          <Link href="/signup" style={styles.link}>
            Signup
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 12,
  },
  image: {
    width: 115,
    height: 34,
  },
  text: {
    fontSize: 24,
    fontFamily: "PoppinsBold",
    color: Colors.text,
    marginTop: 10,
  },
  container2: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 5,
    flexDirection: "row",
    gap: 2,
  },
  text2: {
    fontSize: 14,
    color: Colors.textLight,
    fontFamily: "Poppins",
  },
  link: {
    fontSize: 14,
    fontFamily: "PoppinsBold",
    color: Colors.primary,
  },
});
