import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useRef, useState } from "react";
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
import { useGlobalContext } from "../../context";
import { record } from "../../server_connector";
import { HomeScreenStyles as styles } from "../styles";
import Result from "./Result";

// Make prompts based on translation history; mark as Saved if exists in saved list. 

const HomeScreen = () => {
  const [sentence, setSentence] = useState();
  const [sentenceSend, setSentenceSend] = useState();
  const [star, setStar] = useState(false);
  const [word, setWord] = useState();
  const [isRecording, setIsRecording] = useState(false);

  const translatedRecordID = useRef(null)

  const navigation = useNavigation();
  const { state: globalState } = useGlobalContext();

  console.log(globalState.username) // TEST

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleSend = () => {
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

    // store translated text
    if (globalState.token) {
      record.addRecord(sentence, globalState.token)
        .then(res => {
          translatedRecordID.current = res.data.data.id
          console.log(res.data.data)
        })
        .catch(msg => console.log(`Store translated text: ${msg}`))

    } else console.log("Store translated text: Unauthorized")

    // split text into characters and show result
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

  const save = () => {
    const id = translatedRecordID.current

    if (typeof id == 'number') {
      record.changeSaving(id, globalState.token)
        .then(res => {
          if (res.data.data.id == id) {
            setStar(!star);
            console.log(res.data)
          } else console.log("don't match")
        })
        .catch(msg => console.log(msg))
    } else {
      console.log(translatedRecordID)
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
                onPress={save}
                name="star"
                style={[styles.star, { color: "#EFC615" }]}
              />
            ) : (
              <NoStar onPress={save} name="star" style={styles.star} />
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
          <TouchableOpacity onPress={handleSend}>
            <Send style={styles.send} name="send" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
