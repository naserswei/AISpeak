import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Input from "./ConrolleredInput";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterShema } from "@/helper/types/authShema";
import { hp, wp } from "@/helper/resposive";
import { registerUser } from "@/helper/fakeDB/users";
import Toast from "react-native-toast-message";

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(RegisterShema) });

  const onSubmit = async (data: any) => {
    try {
      const email = data.email.trim().toLowerCase();
      const username = data.username.trim().toLowerCase();
      const res = await registerUser(username, email, data.password);

      if (!res.success) {
        Toast.show({
          type: "error",
          text1: "Register Failed",
          text2: res.message || "Something went wrong",
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Register successful",
        text2: "the account has been created 👋",
      });
      setTimeout(() => {
        router.back();
      }, 1500);
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
      console.error("error:", error);
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Sign Up</Text>
        <Text style={styles.headerSubtitle}>Please fill the information.</Text>
      </View>
      {/* Middle */}
      <View style={styles.inputContainer}>
        <Input
          control={control}
          name="username"
          placeholder="Username"
          errors={errors}
          props={{ placeholderTextColor: "gray" }}
        />
        <Input
          control={control}
          name="email"
          placeholder="Email"
          errors={errors}
          props={{ placeholderTextColor: "gray" }}
        />
        <Input
          control={control}
          name="password"
          placeholder="Password"
          errors={errors}
          props={{ secureTextEntry: true, placeholderTextColor: "gray" }}
        />
      </View>
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={styles.loginButton}
      >
        <Text style={styles.loginButtonText}>Create an account</Text>
      </TouchableOpacity>
      {/* Footer */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Text style={styles.registerText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  container: {
    padding: hp(4),
  },
  headerContainer: {
    marginBottom: hp(3),
    width: "100%",
  },
  headerTitle: {
    fontSize: hp(4),
    fontWeight: "bold",
    color: "#333",
    marginBottom: hp(0.5),
  },
  headerSubtitle: {
    fontSize: hp(1.5),
    color: "#666",
  },
  inputContainer: {
    width: "100%",
    display: "flex",
    gap: hp(2.5),
    alignItems: "center",
    marginBottom: hp(1.7),
  },
  loginButton: {
    backgroundColor: "#ffbb00",
    paddingVertical: hp(1.5),
    width: wp(80),
    borderRadius: 8,
    alignItems: "center",
    marginBottom: hp(2),
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: hp(1),
  },
  footerText: {
    fontSize: hp(1.5),
    color: "#666",
  },
  registerText: {
    color: "#ffbb00",
    fontWeight: "bold",
  },
});
