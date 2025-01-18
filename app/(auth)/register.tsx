import { Image, ScrollView, StyleSheet, Text } from "react-native";
import { hp, wp } from "@/helper/resposive";
import image from "@/constants/images";
import RegisterForm from "@/components/RegisterForm";
import Toast from "react-native-toast-message";
import React from "react";
const Register = () => {
  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Aispeak</Text>
        <Image
          source={image.login_image}
          resizeMode="contain"
          style={styles.image}
        />
        <RegisterForm />
      </ScrollView>
      <Toast />
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  title: {
    fontSize: hp(5),
    fontFamily: "Poppins-Bold",
    color: "#ffbb00",
  },
  scrollContent: {
    flex: 1,
    width: wp(100),
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    display: "flex",
    position: "relative",
  },
  image: {
    width: 100,
    height: 200,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});
