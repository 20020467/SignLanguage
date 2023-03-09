import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Voice from "@react-native-voice/voice";

export default function App() {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  Voice.onSpeechStart = () => setIsRecording(true);
  Voice.onSpeechEnd = () => setIsRecording(false);
  // Voice.onSpeechError = (err) => setError(err.error);
  Voice.onSpeechResults = (results) => setResult(results.value[0]);

  const startRecording = async () => {
    try {
      await Voice.start("en-US");
    } catch (err) {
      console.log(err);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Text style={{ color: "red" }}>
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Text>
      </TouchableOpacity>
      <Text style={styles.text}>{result}</Text>
      {/* <Text style={styles.text}>{error}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   // backgroundColor: "#fff",
  //   backgroundColor: "gray",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 20,
    backgroundColor: "#43BFFA",
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 24,
    marginTop: 20,
  },
});
