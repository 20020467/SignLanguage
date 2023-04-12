import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import Header from "../../components/Header";
import Voice from "@react-native-voice/voice";

const HomeScreen = ({ route, navigation }) => {
  // combine with triggering the search function
  const { storedText } = route.params ?? ""

  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.body}>
          <Text>test </Text>
        </View>
      </ScrollView>

      <View style={styles.test}>
        <View style={styles.inputwrap}>
          <TextInput
            style={styles.input}
            placeholder="Nhập gì đó..."
          >
            {storedText ?? ""}
          </TextInput>
        </View>
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
