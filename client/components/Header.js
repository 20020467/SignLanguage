import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { HeaderStyles as styles } from "../screens/styles";

const Header = () => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.top}>
        <View style={styles.title}>
          <Text style={{ fontSize: 19 }}>SignLanguage</Text>
          <Text style={styles.textSmall}>byProteam</Text>
        </View>
        <TouchableOpacity
          style={styles.imgwrap}
          onPress={() => {
            console.log("Profile");
            navigation.navigate("Profile");
          }}
        >
          <Image style={styles.img} source={require("../assets/icon.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
