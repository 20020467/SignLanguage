import { useNavigation } from "@react-navigation/native";
import React, { useContext, useLayoutEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Star from "react-native-vector-icons/Entypo";
import NoStar from "react-native-vector-icons/EvilIcons";
import Send from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/FontAwesome";
import Header from "../../components/Header";
import Voice from "@react-native-voice/voice";
import { AppContext } from "../../context";
import { HomeScreenStyles as styles } from "../styles";
import Result from "./Result";

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
