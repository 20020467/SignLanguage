import { View, Text, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const SignIn = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>SignIn</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate("MainScreen")}
      ></Button>
    </View>
  );
};

export default SignIn;
