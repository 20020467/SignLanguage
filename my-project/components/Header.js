import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import useNavigation from "@react-navigation/native";
import ProfileScreen from "../screens/Profile/ProfileScreen";

const Header = () => {
  return (
    <View>
      <View style={styles.top}>
        <View style={styles.title}>
          <Text style={{ fontSize: 19 }}>SignLanguage</Text>
          <Text style={styles.textSmall}>byProteam</Text>
        </View>
        <TouchableOpacity
          style={styles.imgwrap}
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          <Image style={styles.img} source={require("../assets/icon.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  top: {
    paddingTop: 20,
    marginBottom: 5,
    height: 85,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#9FD0E6",
  },
  title: {
    marginBottom: 10,
  },
  imgwrap: {
    position: "absolute",
    top: 35,
    right: 20,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  textSmall: {
    position: "absolute",
    top: 25,
    right: -20,
    fontSize: 10,
  },
});
