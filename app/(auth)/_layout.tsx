import { StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="register"
        options={{ headerShown: false, presentation: "modal" }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({});
