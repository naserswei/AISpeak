import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React from "react";
import Input from "./ConrolleredInput";
import { Link } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formShema } from "@/helper/types/authShema";
import { hp, wp } from "@/helper/resposive";
import { router } from "expo-router";
import { login } from "@/helper/fakeDB/users";
import Toast from "react-native-toast-message";
import { useAuth } from "@/context/user";

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formShema) });

  const { setUser, setIsLogin } = useAuth();
  const onSubmit = async (data: any) => {
    const email = data.email.trim().toLowerCase();
    try {
      const res = await login(email, data.password);

      if (!res.success) {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: res.message || "Something went wrong",
        });
        return;
      }
      if (!res.other) {
        return;
      }
      setUser(res.other);
      setIsLogin(true);
      Toast.show({
        type: "success",
        text1: "login successful",
        text2: "This is some something 👋",
      });

      router.replace("/welcome");
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Login</Text>
        <Text style={styles.headerSubtitle}>Please sign in to continue.</Text>
      </View>
      {/* Middle */}
      <View style={styles.inputContainer}>
        <Input
          control={control}
          name="email"
          placeholder="Email or Username"
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
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      {/* Footer */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          Don't have an account?{" "}
          <Link href="/register">
            <Text style={styles.registerText}>Register</Text>
          </Link>
        </Text>
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
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
    alignItems: "center",
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
