import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import React, { useState } from "react";
import Header from "../../components/Header";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

// style
const width = Dimensions.get("window").width;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    height: 120,
    width: 170,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: "#9FD0E6",
  },
  item1: {
    marginRight: width / 15,
    marginLeft: width / 15,

    marginTop: 10,
    backgroundColor: "#9FD0E6",
    fontSize: 24,
    padding: 10,
    borderRadius: 10,
    alignContent: "center",
    justifyContent: "center",
  },
  item2: {
    marginRight: width / 15,
    marginLeft: width / 15,
    marginTop: 10,
    backgroundColor: "#FFFF99",
    fontSize: 24,
    padding: 10,
    borderRadius: 10,
  },
  suggest: {},
  text: {
    marginLeft: 10,
  },
});
const StudyScreen = () => {
  const navigation = useNavigation();
  const [type, setType] = useState("MaterialIcons");
  const [sentence, setSentence] = useState([
    {
      mean: "Chào bạn",
      key: "1",
      img: require("../../assets/img/hi.png"),
    },
    {
      mean: "Bạn có khỏe không",
      key: "2",
      img: require("../../assets/img/health.png"),
    },
    {
      mean: "Tôi khỏe",
      key: "3",
      img: require("../../assets/img/icon.png"),
    },
    {
      mean: "Cảm ơn",
      key: "4",
      img: require("../../assets/img/icon.png"),
    },
    {
      mean: "Tạm biệt",
      key: "5",
      img: require("../../assets/img/icon.png"),
    },
    {
      mean: "Quê bạn ở đâu?",
      key: "6",
      img: require("../../assets/img/icon.png"),
    },
  ]);
  const [shouldShow, setShoudShow] = useState(false);
  const [state, setState] = useState(0);

  return (
    <View
      style={[
        style.container,
        {
          flexDirection: "column",
        },
      ]}
    >
      {/*Header */}
      <View style={{ flex: 1 }}>
        <Header />
      </View>
      {/* Content 1*/}
      <View style={{ flex: 2 }}>
        <Text style={style.text}>Danh sách học phần</Text>
        <ScrollView horizontal>
          {/* Flashcard*/}
          <TouchableOpacity onPress={() => navigation.navigate("FlashCard")}>
            <View style={style.card}>
              <View style={{ marginHorizontal: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Flashcard
                </Text>
                <Text style={{ fontSize: 14, color: "brown", marginTop: 1 }}>
                  50 thẻ
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={require("../../assets/img/flashcard.jpg")}
                  style={{ height: 60, width: 100 }}
                />
              </View>
            </View>
          </TouchableOpacity>
          {/*Bảng chữ cái*/}
          <TouchableOpacity>
            <View style={style.card}>
              <View style={{ marginHorizontal: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Bảng chữ cái
                </Text>
                <Text style={{ fontSize: 14, color: "brown", marginTop: 2 }}>
                  29 chữ cái
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={require("../../assets/img/alphabet.jpg")}
                  style={{ height: 60, width: 100 }}
                />
              </View>
            </View>
          </TouchableOpacity>
          {/*Trắc nghiệm*/}
          <TouchableOpacity
            onPress={() => navigation.navigate("MultipleChoice")}
          >
            <View style={style.card}>
              <View style={{ marginHorizontal: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Trắc nghiệm
                </Text>
                <Text style={{ fontSize: 14, color: "brown", marginTop: 2 }}>
                  Hơn 100 câu
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={require("../../assets/img/multiple_choice.jpg")}
                  style={{ height: 60, width: 100 }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {/*Content 2*/}
      <View style={{ flex: 3 }}>
        <Text style={style.text}>Một số câu giao tiếp bằng thủ ngữ</Text>
        <ScrollView style={style.suggest}>
          {sentence.map((i) => {
            if (i.key % 2 == 0) {
              return (
                <View key={i.key} style={style.item1}>
                  <Text>{i.mean}</Text>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    {shouldShow && state == i ? (
                      <Image
                        source={i.img}
                        style={{ resizeMode: "contain", height: 200 }}
                      />
                    ) : null}
                    <Icon
                      name="arrow-drop-down"
                      type="MaterialIcons"
                      onPress={() => {
                        setShoudShow(!shouldShow), setState(i);
                      }}
                    />
                  </View>
                </View>
              );
            } else {
              return (
                <View key={i.key} style={style.item2}>
                  <Text>{i.mean}</Text>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    {shouldShow && state == i ? (
                      <Image
                        source={i.img}
                        style={{ resizeMode: "contain", height: 200 }}
                      />
                    ) : null}
                    <Icon
                      name="arrow-drop-down"
                      type={type}
                      onPress={() => {
                        setShoudShow(!shouldShow), setState(i);
                      }}
                    />
                  </View>
                </View>
              );
            }
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default StudyScreen;
