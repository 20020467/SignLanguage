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
  // console.log(user);
  // console.log(token);

  const axiosOptions = {
    headers: {
      "x-access-token": token,
    },
  };

  const [sentence, setSentence] = useState();
  const [sentenceSend, setSentenceSend] = useState();
  const [star, setStar] = useState(false);
  const [word, setWord] = useState();

  const [isRecording, setIsRecording] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handelSend = async () => {
    // const data = {
    //   sentence: sentence,
    // };
    // console.log(data);
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
    var arrTu = sentence?.split(" ");
    var arrKetQua = [];
    for (var i = 0; i < arrTu.length; i++) {
      if (arrTu[i] != "") {
        arrKetQua.push(arrTu[i]);
      }
    }
    setWord(arrKetQua);
  };

  const handelStar = async () => {
    setStar(!star);

    if (!star) {
      const data = {
        sentence: sentenceSend,
      };
      console.log(data);
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
            {word?.map((item, index) => {
              return <Result key={index} word={item} />;
            })}
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
    // backgroundColor: "white",
  },
  body: {
    flex: 1,
    // backgroundColor: "pink",
    marginBottom: 10,
    paddingHorizontal: 13,
    paddingTop: 7,
  },
  sentence: {
    minHeight: 70,
    backgroundColor: "#E7E3E3",
    borderRadius: 10,
    elevation: 5,
    // justifyContent: "center",
    // alignItems: "center",
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
