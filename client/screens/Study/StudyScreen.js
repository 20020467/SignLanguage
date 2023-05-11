import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Header from "../../components/Header";
import { StudyScreenStyles as styles } from '../styles';

const StudyScreen = () => {
  const navigation = useNavigation()
  const [type, setType] = useState("chevron-down-sharp");
  const [sentence, setSentence] = useState([
    {
      mean: 'Chào bạn', key: '1', img: require("../../assets/hi.png")
    },
    {
      mean: 'Bạn có khỏe không', key: '2', img: require("../../assets/health.png")
    },
    {
      mean: 'Tôi khỏe', key: '3', img: require("../../assets/icon.png")
    },
    {
      mean: 'Cảm ơn', key: '4', img: require("../../assets/icon.png")
    },
    {
      mean: 'Tạm biệt', key: '5', img: require("../../assets/icon.png")
    },
    {
      mean: 'Quê bạn ở đâu?', key: '6', img: require("../../assets/icon.png")
    }
  ]);
  const [shouldShow, setShoudShow] = useState(false);
  const [state, setState] = useState(0);

  return (
    <View style={[
      styles.container,
      {
        flexDirection: 'column',
      },
    ]}>
      {/*Header */}
      <View style={{ flex: 1 }} >
        <Header />
      </View>
      {/* Content 1*/}
      <View style={{ flex: 2, }}>
        <Text style={styles.text}>
          Danh sách học phần
        </Text>
        <ScrollView horizontal>
          {/* Flashcard*/}
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => navigation.navigate("FlashCard")}
              activeOpacity={0.7}>
              <View style={{ marginHorizontal: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Flashcard</Text>
                <Text style={{ fontSize: 14, color: 'brown', marginTop: 1 }}>
                  50 thẻ
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Image source={require('../../assets/flashcard.jpg')} style={{ height: 60, width: 100 }} />
              </View>
            </TouchableOpacity>
          </View>
          {/*Bảng chữ cái*/}
          <View style={styles.card}>
            <TouchableOpacity activeOpacity={0.8}>

              <View style={{ marginHorizontal: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Bảng chữ cái</Text>
                <Text style={{ fontSize: 14, color: 'brown', marginTop: 2 }}>
                  29 chữ cái
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Image source={require('../../assets/alphabet.jpg')} style={{ height: 60, width: 100 }} />
              </View>
            </TouchableOpacity>

          </View>
          {/*Trắc nghiệm*/}
          <View style={styles.card}>
            <TouchableOpacity onPress={() => navigation.navigate("MultipleChoice")}
              activeOpacity={0.8}>
              <View style={{ marginHorizontal: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Trắc nghiệm</Text>
                <Text style={{ fontSize: 14, color: 'brown', marginTop: 2 }}>
                  Hơn 100 câu
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Image source={require('../../assets/multiple_choice.jpg')} style={{ height: 60, width: 100 }} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      {/*Content 2*/}
      <View style={{ flex: 3, marginTop: -20 }}>
        <Text style={styles.text}>
          Một số câu giao tiếp bằng thủ ngữ
        </Text>
        <ScrollView style={styles.suggest}>
          {
            sentence.map((i) => {
              if (i.key % 2 == 0) {
                return (
                  <View key={i.key} style={styles.item1}>
                    <Text >
                      {i.mean}
                    </Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      {
                        shouldShow && state == i ? (
                          <Image source={i.img} style={{ resizeMode: 'contain', height: 200 }} />

                        ) : null
                      }
                      <Ionicons
                        name={shouldShow && state == i ? 'chevron-up' : 'chevron-down'}
                        size={20}
                        onPress={() => {
                          setShoudShow(!shouldShow),
                            setState(i)
                        }}
                      />
                    </View>
                  </View>
                )
              } else {
                return (
                  <View key={i.key} style={styles.item2}>
                    <Text >
                      {i.mean}
                    </Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      {
                        shouldShow && state == i ? (
                          <Image source={i.img} style={{ resizeMode: 'contain', height: 200 }} />

                        ) : null
                      }
                      <Ionicons
                        name={shouldShow && state == i ? 'chevron-up' : 'chevron-down'}
                        size={20}
                        onPress={() => {
                          setShoudShow(!shouldShow),
                            setState(i)
                        }}
                      />
                    </View>
                  </View>
                )
              }
            })
          }
        </ScrollView>
      </View>
    </View>
  );
};

export default StudyScreen;
