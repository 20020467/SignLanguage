import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View
} from "react-native";
import { LoadingModal } from 'react-native-loading-modal';
import Send from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/FontAwesome5";
import Header from "../../components/Header";
import { useGlobalContext } from "../../context";
import { record } from "../../server_connector";
import { COLOR, HomeScreenStyles as styles, iconSize } from "../styles";
import Result from "./Result";

// Make prompts based on translation history; mark as Saved if exists in saved list. 

const HomeScreen = ({ route }) => {
  const [sentence, setSentence] = useState();
  const [sentenceSend, setSentenceSend] = useState();
  const [isSaved, setIsSaved] = useState(false);
  const [word, setWord] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)

  const translatedRecordID = useRef(null)
  const history = useRef()

  const navigation = useNavigation();
  const { state: globalState } = useGlobalContext();

  // console.log(globalState.username) // TEST

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // get history list first and refresh the variable for each translation request
  useEffect(() => {
    setIsLoading(true)
    fetchHistory().then(() => setIsLoading(false))
  }, [translatedRecordID.current])

  if (typeof route.params?.storedText == 'string') {
    let text = route.params.storedText
    route.params.storedText = null // this works
    if (text.length == 0) return

    setSentence(text)
    setSentenceSend(text)
  }

  // call to translate each time this variable is changed
  useEffect(() => {
    translate()
  }, [sentenceSend])

  useEffect(() => {
    console.log("data changed")
  }, [history.current])

  const fetchHistory = async () => {
    let response = null

    try {
      if (globalState.token) {
        response = await record.getHistory(globalState.token)

        if (response.data.data) {
          history.current = response.data.data
          console.log(history.current) // TEST
          return response.data.data
        }
      } else {
        navigation.navigate("SignIn") // may prompt user with an alert before navigating
      }
    } catch (error) {
      console.log(`Get history records: ${error}`) // TEST
    }

    return 
  }

  const translate = async () => {
    if (typeof sentence != 'string' || sentence.length == 0) {
      return
    }

    setIsTranslating(true) // open loading modal

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

    // check if existed in history and cancel saving to history if true

    try {
      // do not allow to save translated text if cannot fetch history
      let data = null // mainly used to check if data is fetched

      if (!history.current) {
        data = await fetchHistory() // do assign data to history.current
        if (!data) {
          Alert.alert("Lỗi kết nối. Vui lòng gửi lại.")
          throw "History data fetching got error."
        }
      }

      for (item of history.current) {
        if (item.content == sentence) {
          translatedRecordID.current = item.id
          setIsSaved(item.favor) // change isSaved state if existed

          console.log(item.content) // TEST
          throw "Record existed"
        }
      }

      // store translated text
      if (globalState.token) { // check if token exists
        let res = await record.addRecord(sentence, globalState.token)
        translatedRecordID.current = res.data.data.id
        console.log("Saved to history") // TEST
        console.log(res.data.data) // TEST
      } else {
        navigation.navigate("SignIn")
      }
    } catch (error) {
      console.log(`translate: ${error}`)
    } finally {
      setIsTranslating(false)
    }
  };

  const save = () => {
    const id = translatedRecordID.current

    if (typeof id == 'number') {
      record.changeSaving(id, globalState.token)
        .then(response => {
          let res_saved = response.data.data.favor

          if (response.data.data.id == id) {
            setIsSaved(res_saved)
            ToastAndroid.show(res_saved ? "Đã lưu" : "Hủy lưu", ToastAndroid.SHORT)
            console.log(response.data)
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
            {typeof sentenceSend == 'string' && sentenceSend.length > 0 &&
              <Icon
                name="star"
                size={iconSize}
                style={{ ...styles.star, color: isSaved ? COLOR.ActiveStar : COLOR.InactiveStar }}
                solid={isSaved}
                onPress={save}
              />
            }
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
            defaultValue={sentence}
          >
          </TextInput>

          <TouchableOpacity onPress={() => setIsRecording(!isRecording)}>
            <Icon
              style={isRecording ? styles.recording : styles.noRecording}
              name="microphone"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSentenceSend(sentence)}>
            <Send style={styles.send} name="send" />
          </TouchableOpacity>
        </View>
      </View>
      <LoadingModal modalVisible={isLoading} task='Đang tải'></LoadingModal>
      <LoadingModal modalVisible={isTranslating} task='Đang dịch...'></LoadingModal>
    </SafeAreaView>
  );
};

export default HomeScreen;
