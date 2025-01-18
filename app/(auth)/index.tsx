import { Image, ScrollView, StyleSheet, Text } from "react-native";
import { hp, wp } from "@/helper/resposive";
import image from "@/constants/images";
import LoginForm from "@/components/LoginForm";

const Home = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Image
        source={image.login_image}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.title}>Aispeak</Text>
      <LoginForm />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  title: {
    fontSize: hp(4.5),
    fontFamily: "Poppins-Bold",
    color: "#ffbb00",
    marginBottom: 5,
    paddingTop: hp(20),
    height: hp(30),
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    display: "flex",
    paddingHorizontal: wp(10),
    position: "relative",
  },

  image: {
    width: 100,
    height: 500,
    position: "absolute",
    top: 0,
    right: 0,
  },
});
