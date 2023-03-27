import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";

const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.body}>
        <Text>body</Text>
      </View>

      <View style={styles.test}>
        <View style={styles.inputwrap}>
          <TextInput
            style={styles.input}
            placeholder="Nhập gì đó..."
          ></TextInput>
        </View>

        {/* <Footer /> */}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#e7feff",
    backgroundColor: "#F3F2F3",
  },
  body: {
    flex: 1,
    // backgroundColor: "pink",
    marginBottom: 10,
  },
  test: {
    elevation: 20,
    backgroundColor: "white",
  },
  inputwrap: {
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
  },
  input: {
    height: 45,
    marginHorizontal: 12,
    padding: 10,
    fontSize: 15,
  },
});
