import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import Icon from "react-native-vector-icons/FontAwesome";
import Send from "react-native-vector-icons/Feather";
import Voice from "@react-native-voice/voice";
import Result from "./Result";
import { API_HOST } from "@env";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { token, user } = useContext(AppContext);
  console.log(user);
  console.log(token);

  const axiosOptions = {
    headers: {
      "x-access-token": token,
    },
  };

  const [sentence, setSentence] = useState();
  const [sentenceSend, setSentenceSend] = useState();

  const [isRecording, setIsRecording] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const translate = "Tôi là Quyết";
  const data = [
    "T.png",
    "ô.png",
    "i.png",
    "l.png",
    "à.png",
    "T.png",
    "ô.png",
    "i.png",
    "l.png",
    "à.png",
  ];

  const handelSend = async () => {
    const data = {
      sentence: sentence,
    };
    // try {
    //   console.log("fetch");
    //   const res = await axios.put(
    //     // `${API_HOST}/api/users/edit/username`,  đường dẫn api ở đây
    //     data,
    //     axiosOptions
    //   );
    //   const Response = res.data;
    //   console.log(Response);
    //   // alert("Thay đổi username thành công");
    // } catch (error) {
    //   let response = error.response.data;
    //   console.log(response);
    // }
    setSentenceSend(sentence);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.sentence}>
            <View style={styles.sentenceWrap}>
              <Text style={styles.text} numberOfLines={undefined}>
                {/* {sentenceSend} */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                vitae elit ac metus convallis ultrices. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Duis vitae elit ac metus
                convallis ultrices. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Duis vitae elit ac metus convallis ultrices.
              </Text>
            </View>
          </View>

          <View>
            {data.map((item, index) => {
              return <Result key={index} img={item} />;
            })}
          </View>
        </View>
      </ScrollView>

      <View style={styles.test}>
        <View style={styles.inputwrap}>
          <TextInput
            onChangeText={(text) => setSentence(text)}
            style={styles.input}
            placeholder="Nhập gì đó..."
          ></TextInput>

          <TouchableOpacity onPress={() => setIsRecording(!isRecording)}>
            <Icon
              style={isRecording ? styles.recording : styles.noRecording}
              name="microphone"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handelSend}>
            <Send style={styles.send} name="send" />
          </TouchableOpacity>
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
    paddingHorizontal: 13,
    paddingTop: 10,
  },
  sentenceWrap: {
    flex: 1,
  },
  sentence: {
    height: 50,
    backgroundColor: "pink",
    borderRadius: 10,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,

    maxHeight: 150,
    overflow: "hidden",
  },
  text: {
    fontSize: 17,
  },
  test: {
    elevation: 20,
    backgroundColor: "white",
  },
  inputwrap: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
  },
  input: {
    flex: 1,
    height: 50,
    marginHorizontal: 12,
    padding: 10,
    paddingRight: 15,
    marginRight: 10,
    fontSize: 17,
  },
  recording: {
    marginTop: 13,
    marginRight: 15,
    fontSize: 25,
    color: "#02B0F0",
  },
  noRecording: {
    marginTop: 13,
    marginRight: 15,
    fontSize: 25,
    color: "#748c94",
  },
  send: {
    marginTop: 13,
    marginRight: 15,
    fontSize: 25,
    color: "#02B0F0",
  },
});
