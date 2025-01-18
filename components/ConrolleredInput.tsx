import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React from "react";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import { hp, wp } from "@/helper/resposive";

type InputProps = {
  control: Control<FieldValues>;
  placeholder: string;
  name: string;
  errors?: FieldErrors<FieldValues>;
  props?: TextInputProps;
};

const Input = ({ control, placeholder, name, errors, props }: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
            {...props}
          />
        )}
        name={name}
      />
      {errors && errors[name] && (
        <Text style={styles.error}>
          {typeof errors[name]?.message === "string"
            ? errors[name]?.message
            : "Invalid input"}
        </Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    width: wp(80),
    height: hp(6),
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: hp(1.6),
    backgroundColor: "#fff",
  },
  inputContainer: {
    width: "100%",
  },
  error: {
    maxWidth: "100%",
    width: "100%",
    color: "red",
    padding: hp(0.2),
  },
});
