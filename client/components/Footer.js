import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Footer = () => {
  const navigation = useNavigation();
  const iconSize = 28;

  return (
    <View>
      <View style={styles.foot}>
        <TouchableOpacity>
          <Icon
            style={styles.icon}
            name="home"
            color="#9FD0E6"
            size={iconSize}
          />
          <Text>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Study")}>
          <Icon
            style={styles.icon}
            name="menu-book"
            color="#9FD0E6"
            size={iconSize}
          />
          <Text>Study</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("History")}>
          <Icon
            style={styles.icon}
            name="star-outline"
            color="#9FD0E6"
            size={iconSize}
          />
          <Text>History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  foot: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 50,
    marginTop: 35,
  },
  icon: {
    position: "absolute",
    top: -30,
    left: 4,
  },
});
