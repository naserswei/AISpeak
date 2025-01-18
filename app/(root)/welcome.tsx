import { router, useRootNavigationState } from "expo-router";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from "react-native";
import images from "@/constants/images";
import { hp, wp } from "@/helper/resposive";
import { useAuth } from "@/context/user";
import { useEffect } from "react";

const Welcome = () => {
  const { isLogin, setIsLogin, setUser } = useAuth();
  //This helps determine if navigation is properly initialized
  const rootNavigationState = useRootNavigationState();
  // check if the user logedin
  useEffect(() => {
    if (rootNavigationState?.key && !isLogin) {
      router.replace("/");
    }
  }, [rootNavigationState?.key, isLogin]);

  if (!rootNavigationState?.key) return null;

  function handlelogout() {
    setUser({});
    setIsLogin(false);
    router.replace("/");
  }
  return (
    <ImageBackground
      source={images.background}
      resizeMode="cover"
      style={styles.container}
    >
      {/* Title Section */}
      <Image
        style={styles.image2}
        source={images.normal}
        resizeMode="contain"
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcom to </Text>
        <Image
          style={styles.image}
          source={images.bubble}
          resizeMode="contain"
        />
        <Text style={styles.title}>AiSpeak</Text>
      </View>

      {/* Welcome Text */}
      <Text selectable style={styles.welcomeText}>
        Whether you're a beginner or looking to refine your skills, we've got
        you covered with engaging lessons, real-world practice, and smart
        AI-powered tools.
      </Text>

      {/* Button Section */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handlelogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%", // Makes the background cover the full width
    height: "100%",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
  },
  image2: {
    width: wp(50),
    height: hp(25),
  },
  title: {
    fontSize: hp(3),
    color: "#017cfe",
    fontFamily: "Poppins-Bold",
  },
  welcomeText: {
    textAlign: "center",
    fontSize: hp(2.2),
    color: "#4A5568",
    fontFamily: "Poppins-Regular",
    marginVertical: hp(2),
    paddingHorizontal: wp(5),
    lineHeight: hp(3),
  },
  button: {
    backgroundColor: "#017cfe",
    paddingVertical: hp(2),
    paddingHorizontal: wp(10),
    width: wp(80),
    borderRadius: 10,
    shadowColor: Platform.OS === "ios" ? "#000" : "rgba(0,0,0,0.2)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
    marginTop: hp(3),
  },
  buttonText: {
    color: "white",
    fontSize: hp(2.5),
    width: "100%",
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
  },
});
