import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen"

// SplashScreen.preventAutoHideAsync();

const CustomText = ({ textValue, fontSize }) => {
  const [fontsLoaded] = useFonts({
    'Roboto-Thin': require('../assets/fonts/Roboto-Thin.ttf'),
  });

  // useEffect(() => {
  //   async function prepare() {
  //     await SplashScreen.preventAutoHideAsync();
  //   }
  //   prepare();
  // }, []);

  // if (!fontsLoaded) {
  //   console.log("load font fail");
  // } else {
  //   console.log("thanh cong");
  //   SplashScreen.hideAsync();
    
  // }

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
    <View>
      <Text style={ { fontSize: fontSize }}>Login</Text>
    </View>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'RobotoBlack',
  },
});
