import { API_HOST } from "@env";
import Voice from "@react-native-voice/voice";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Star from "react-native-vector-icons/Entypo";
import NoStar from "react-native-vector-icons/EvilIcons";
import Send from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/FontAwesome5";
import Header from "../../components/Header";
import { AppContext } from "../../context";
import { record } from "../../server_connector";
import Result from "./Result";
import { COLOR, HomeScreenStyles, iconSize } from "../styles";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { state: globalState } = useContext(AppContext);
  const route = useRoute();
  // const item = route.params?.sentence;

  const axiosOptions = {
    headers: {
      Authorization: "Bearer " + globalState.token,
    },
  };

  const [sentence, setSentence] = useState('');
  const [sentenceSend, setSentenceSend] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [word, setWord] = useState();
  const [idSentence, setIdSentence] = useState();
  // const [isLoading, setIsLoading] = useState(false) // show/hide loading modal
  // const [isTranslating, setIsTranslating] = useState(false) // show/hide loading modal
  const [isRecording, setIsRecording] = useState(false);

  const translatedRecordID = useRef(null)
  const history = useRef()

  // get history list first and refresh the variable for each translation request
  useEffect(() => {
    // setIsLoading(true)
    fetchHistory()
    // .then(() => setIsLoading(false))
  }, [translatedRecordID.current])

  // translate text taken from a history record
  if (typeof route.params?.storedText == 'string') {
    let text = route.params.storedText
    route.params.storedText = null

    if (text.length == 0) return

    setSentence(text)
    setSentenceSend(text)
  }

  // call to translate each time this variable is changed
  useEffect(() => {
    onTranslate()
  }, [sentenceSend])

  // useEffect(() => {
  //   if (item !== undefined) {
  //     console.log("run for what?")
  //     // setSentenceSend(item);
  //     // var arrResult = splitSentence(item);
  //     // setWord(arrResult);
  //   }
  // }, [item]);

  const fetchHistory = async () => {
    let response = null

    try {
      if (globalState.token) {
        response = await record.getHistory(globalState.token)

        if (response.data.data) {
          history.current = response.data.data
          console.log('fetched') // TEST
          return response.data.data
        }
      } else {
        navigation.navigate("SignIn") // may prompt user with an alert before navigating
      }
    } catch (error) {
      console.log(`Get history records: ${error}`) // TRACE
    }

    return
  }

  const splitSentence = (sentence) => {
    sentence = sentence?.trim()
    if (typeof sentence != 'string' || sentence.length == 0) return []

    return sentence.split(" ")
  };

  const onTranslate = async () => {
    Keyboard.dismiss();
    setSentenceSend(sentence);
    // setIsTranslating(true) // open loading modal

    var arrResult = splitSentence(sentence);
    if (arrResult.length == 0) setSentence('')
    else setWord(arrResult);

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
      } else {
        navigation.navigate("SignIn")
      }
    } catch (error) {
      console.log(`translate: ${error}`) // TRACE
    } finally {
      // setIsTranslating(false) // hide loading modal
    }
  };

  const onSave = async () => {
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
                // size={18}
                style={{ ...styles.star, color: isSaved ? COLOR.ActiveStar : COLOR.InactiveStar }}
                solid={isSaved}
                onPress={onSave}
              />
            }
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
            defaultValue={sentence}
            style={styles.input}
            placeholder="Nhập văn bản..."
          ></TextInput>

          <TouchableOpacity onPress={() => setIsRecording(!isRecording)}>
            <Icon
              style={isRecording ? styles.recording : styles.noRecording}
              name="microphone"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onTranslate}>
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
    fontSize: 25,
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
