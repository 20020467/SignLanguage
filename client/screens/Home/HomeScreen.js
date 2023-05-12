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
  Keyboard,
  Image,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Header from "../../components/Header";
import Icon from "react-native-vector-icons/FontAwesome";
import Send from "react-native-vector-icons/Feather";
import Star from "react-native-vector-icons/Entypo";
import NoStar from "react-native-vector-icons/EvilIcons";
import Voice from "@react-native-voice/voice";
import Result from "./Result";
import { API_HOST } from "@env";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { token, user } = useContext(AppContext);
  const route = useRoute();
  const item = route.params?.sentence;

  const axiosOptions = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const [sentence, setSentence] = useState();
  const [sentenceSend, setSentenceSend] = useState(item);
  const [star, setStar] = useState(false);
  const [word, setWord] = useState();
  const [idSentence, setIdSentence] = useState();

  const [isRecording, setIsRecording] = useState(false);

  const splitSentence = (sentence) => {
    var arrTu = sentence?.split(" ");
    var arrKetQua = [];
    for (var i = 0; i < arrTu.length; i++) {
      if (arrTu[i] != "") {
        arrKetQua.push(arrTu[i]);
      }
    }
    return arrKetQua;
  };

  useEffect(() => {
    if (item !== undefined) {
      setSentenceSend(item);
      var arrResult = splitSentence(item);
      setWord(arrResult);
    }
  }, [item]);

  const handelSend = async () => {
    Keyboard.dismiss();
    setSentenceSend(sentence);
    var arrResult = splitSentence(sentence);
    setWord(arrResult);

    // const data = {
    //   content: sentence,
    // };
    // console.log(data);
    // try {
    //   const res = await axios.post(
    //     `${API_HOST}/api/sentence`,
    //     data,
    //     axiosOptions
    //   );
    //   console.log(res.data);
    //   if (res.data.message == "true") {
    //     setStar(true);
    //   } else {
    //     setStar(false);
    //   }
    //   setIdSentence(res.data.data.id);
    // } catch (error) {
    //   let response = error.response.data;
    //   if (response.error == "Internal Server Error") {
    //     console.log("loi");
    //   }
    // }
  };

  const handelStar = async () => {
    console.log(idSentence);
    setStar(!star);
    try {
      const res = await axios.get(
        `${API_HOST}/api/sentence/like/` + idSentence,
        axiosOptions
      );
      console.log(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.sentence}>
            <Text style={styles.text}>{sentenceSend}</Text>
            {star ? (
              <Star
                onPress={handelStar}
                name="star"
                style={[styles.star, { color: "#EFC615" }]}
              />
            ) : (
              <NoStar onPress={handelStar} name="star" style={styles.star} />
            )}
          </View>

          <View>
            {word ? (
              <>
                {word.length == 0 ? (
                  <View style={styles.background}>
                    <Image
                      style={styles.img}
                      source={require("../../assets/img/background.png")}
                    ></Image>
                  </View>
                ) : (
                  <>
                    {word?.map((item, index) => {
                      return <Result key={index} word={item} />;
                    })}
                  </>
                )}
              </>
            ) : (
              <>
                <View style={styles.background}>
                  <Image
                    style={styles.img}
                    source={require("../../assets/img/background.png")}
                  ></Image>
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.test}>
        <View style={styles.inputwrap}>
          <TextInput
            onChangeText={(text) => setSentence(text)}
            style={styles.input}
            placeholder="Nhập văn bản..."
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
    backgroundColor: "#F3F2F3",
  },
  body: {
    flex: 1,
    marginBottom: 10,
    paddingHorizontal: 13,
    paddingTop: 7,
  },
  sentence: {
    minHeight: 70,
    backgroundColor: "#E7E3E3",
    borderRadius: 10,
    elevation: 5,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
  },
  text: {
    fontSize: 17,
    display: "flex",
    flexWrap: "wrap-reverse",
    flexDirection: "column",
    padding: 15,
    marginRight: 23,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  star: {
    fontSize: 30,
    position: "absolute",
    top: 17,
    right: 10,
  },
  background: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  img: {
    width: "100%",
    height: 250,
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
