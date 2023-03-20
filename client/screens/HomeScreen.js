import { View, Text, Button, SafeAreaView } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    // <View>
    //   <Text>HomeScreen</Text>
    //   <Button
    //     title="Go to History Screen"
    //     onPress={() => navigation.navigate("History")}
    //   />
    // </View>
    <SafeAreaView>
      <Text>test</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
