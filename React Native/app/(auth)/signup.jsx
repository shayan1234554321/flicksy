import { useState } from "react";
import { Link, router } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  StyleSheet,
} from "react-native";
import { images } from "../../utility/constants";
import { FormField } from "../../elements/input";
import CustomButton from "../../elements/button";
import { Colors } from "../../utility/colors";
import { SignupSchema } from "../../validation/auth";
import axios from "axios";
import API from "../../utility/api";
import Toast from "react-native-toast-message";

const Signup = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    SignupSchema.validate(form, { abortEarly: false })
      .then(async () => {
        try {
          setSubmitting(true);
          await axios.post(API.user.signup, { ...form });
          Toast.show({
            type: "success",
            text1: "Signup Success",
            text2: "Please continue Signing In",
          });
          router.push("/signin");
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
    <ScrollView contentContainerStyle={{ height: "100%", backgroundColor: Colors.background }}>
      <View style={styles.container}>
        <Image source={images.logo} resizeMode="contain" style={styles.image} />

        <Text style={styles.text}>Sign up to Flicksy</Text>

        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => handleChangeFormValue("email", e)}
          otherStyles={{ marginTop: 7, maxWidth: 400, width: "90%" }}
          keyboardType="email-address"
          hint={errors.email}
        />

        <FormField
          title="Name"
          value={form.name}
          handleChangeText={(e) => handleChangeFormValue("name", e)}
          otherStyles={{ marginTop: 7, maxWidth: 400, width: "90%" }}
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
          title="Sign Up"
          onPress={submit}
          containerStyles={{ marginTop: 30, maxWidth: 400, width: "90%" }}
          isLoading={isSubmitting}
        />

        <View style={styles.container2}>
          <Text style={styles.text2}>Already have an account?</Text>
          <Link href="/signin" style={styles.link}>
            Signin
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingLeft: 12,
    paddingRight: 12,
    minHeight: Dimensions.get("window").height - 100,
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
