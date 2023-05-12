import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from 'react-native-paper';
import { SafeAreaView } from "react-navigation";
import { COLOR } from '../styles';
import sentence from "../../constants/alphabetdata";
import { FlashCardStyles } from "../styles";

const Flashcard = () => {
  //data alphabet
  // const [sentence, setSentence] =  useState([
  //   {
  //     mean: 'A', key: '1', img:require("../../assets/a.jpg")
  //   },
  //   {
  //     mean: 'B', key: '2',img: require("../../assets/b.jpg")
  //   },
  //   {
  //     mean: 'C', key: '3',img:require("../../assets/c.jpg")
  //   },
  //   {
  //     mean: 'D', key: '4',img: require("../../assets/d.jpg")
  //   },
  //   {
  //     mean: 'E', key: '5',img: require("../../assets/e.jpg")
  //   },
  //   {
  //     mean: 'G', key: '6',img: require("../../assets/g.jpg")
  //   },
  //   {
  //     mean: 'H', key: '7',img: require("../../assets/h.jpg")
  //   },
  //   {
  //     mean: 'I', key: '8',img: require("../../assets/i.jpg")
  //   },
  //   {
  //     mean: 'K', key: '9',img: require("../../assets/k.jpg")
  //   },
  //   {
  //     mean: 'L', key: '10',img: require("../../assets/l.jpg")
  //   },
  //   {
  //     mean: 'M', key: '11',img: require("../../assets/m.jpg")
  //   },
  //   {
  //     mean: 'N', key: '12',img: require("../../assets/icon.png")
  //   },
  //   {
  //     mean: 'O', key: '13',img: require("../../assets/icon.png")
  //   },
  //   {
  //     mean: 'P', key: '14',img: require("../../assets/icon.png")
  //   },
  //   {
  //     mean: 'Q', key: '15',img: require("../../assets/icon.png")
  //   },
  //   {
  //     mean: 'F', key: '16',img: require("../../assets/icon.png")
  //   },
  //   {
  //     mean: 'F', key: '17',img: require("../../assets/icon.png")
  //   }
  // ]);

  //data number
  // const [number, setNumber] = useState([
  //   {
  //     title: '1', key: '1', img:require("../../assets/1.png")
  //   },
  //   {
  //     title: '2', key: '2', img:require("../../assets/2.png")
  //   },
  //   {
  //     title: '3', key: '3', img:require("../../assets/3.png")
  //   },
  //   {
  //     title: '4', key: '4', img:require("../../assets/4.png")
  //   },
  //   {
  //     title:'5', key: '5',img:require("../../assets/5.png")
  //   },
  //   {
  //     title: '6', key: '6', img:require("../../assets/6.png")
  //   },
  //   {
  //     title: '7', key: '7', img:require("../../assets/7.png")
  //   },
  //   {
  //     title:'8', key: '8', img:require("../../assets/8.png")
  //   },
  //   {
  //     title:'9', key: '9', img:require("../../assets/9.png")
  //   },
  //   {
  //     title: '0', key: '10', img:require("../../assets/0.png")
  //   }


  // ])
  const [title, setTitle] = useState([
    {
      title: 'Chữ cái', key: '1'
    },
    {
      title: "Số", key: '2'
    },
    {
      title: "Dấu", key: '3'
    }
  ])
  const navigation = useNavigation()
  const [isFlipped, setIsFlipped] = useState(false)
  const animate = useRef(new Animated.Value(0));
  const handleFlip = () => {
    Animated.timing(animate.current, {
      duration: 300,
      toValue: isFlipped ? 0 : 180,
      useNativeDriver: true,
    }).start(() => {
      setIsFlipped(!isFlipped)
    });
  }
  const interpolateFront = animate.current.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg']
  });

  const interpolateBack = animate.current.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg']
  });

  // change color title card
  const [show, setShow] = useState(0)
  //display alphabet
  const [display, setDisplay] = useState(0);
  //display number
  const [num, setNum] = useState(0);
  //display punctuation
  const [pun, setPun] = useState(0)
  //modal
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <SafeAreaView>

      {/*header*/}
      {/* <View style={{
        paddingTop: 20,
        marginBottom: 5,
        height: 85,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#9FD0E6",
      }}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={{
              position: "absolute",
              top: 0,
              left: -150,
            }}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
            Flashcard
          </Text>
        </View>
      </View> */}

      {/*Title*/}
      <View>
        <Text style={{ fontSize: 19, fontWeight: 'bold', marginLeft: 15, marginTop: 10 }}>Chọn chủ đề flashcard?</Text>
      </View>
      <View style={{
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 20, marginBottom: 20,
      }}>


        {title.map((i) => {
          return (

            <Card style={{ marginRight: 20, backgroundColor: show == i ? '#FFFF99' : '#9FD0E6', width: 80, justifyContent: 'center', alignContent: 'center' }}>
              <TouchableOpacity style={{ alignContent: 'center', justifyContent: 'center' }} activeOpacity={0.8} onPress={() => {
                setShow(i),
                  i.key == 1 ? setDisplay(1) : setDisplay(0),
                  i.key == 2 ? setNum(1) : setNum(0),
                  i.key == 3 ? setPun(1) : setPun(0),
                  console.log(i)
              }
              }>
                <Text style={{ padding: 10, fontSize: 15, alignContent: 'center', justifyContent: 'center' }}>{i.title}</Text>
              </TouchableOpacity>

            </Card>
          )

        })}

      </View>

      {/*Main Alphabet FlashCard*/}
      {display ? (
        <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false}>
          {
            sentence.map((i) => {
              return (
                <View key={i.key} style={FlashCardStyles.container}>
                  <Animated.View style={[{ transform: [{ rotateY: interpolateFront }] }, FlashCardStyles.hidden]}>
                    <TouchableOpacity onPress={handleFlip} style={{}}>
                      <View style={FlashCardStyles.card}>
                        <Text style={FlashCardStyles.text}>
                          {i.mean}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </Animated.View>

                  <Animated.View style={[FlashCardStyles.back, FlashCardStyles.hidden, { transform: [{ rotateY: interpolateBack }] }]}>
                    <View style={FlashCardStyles.cardback}>
                      <TouchableOpacity onPress={handleFlip} style={{}}>

                        <Image style={FlashCardStyles.img} source={i.img} />
                      </TouchableOpacity>
                    </View>
                  </Animated.View>
                  <Text>
                    {i.key}/29
                  </Text>
                </View>
              )
            })
          }
        </ScrollView>
      ) : null}

      {/*Main Number FlashCard*/}
      {num ? (
        <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false}>
          {
            number.map((i) => {
              return (
                <View style={FlashCardStyles.container}>
                  <Animated.View style={[{ transform: [{ rotateY: interpolateFront }] }, FlashCardStyles.hidden]}>
                    <TouchableOpacity onPress={handleFlip} style={{}}>

                      <View style={FlashCardStyles.card}>
                        <Text style={FlashCardStyles.text}>
                          {i.title}
                        </Text>
                      </View>
                    </TouchableOpacity>

                  </Animated.View>

                  <Animated.View style={[FlashCardStyles.back, FlashCardStyles.hidden, { transform: [{ rotateY: interpolateBack }] }]}>
                    <View style={FlashCardStyles.cardback}>
                      <TouchableOpacity onPress={handleFlip} style={{}}>
                        <Image style={FlashCardStyles.img} source={i.img} />
                      </TouchableOpacity>

                    </View>
                  </Animated.View>
                  <Text>
                    {i.key}/10
                  </Text>
                </View>
              )
            })
          }
        </ScrollView>

      ) : null}

      {/*Main Puntuation FlashCard*/}
      {pun ? (
        <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false}>
          {
            sentence.map((i) => {
              return (
                <View style={FlashCardStyles.container}>
                  <Animated.View style={[{ transform: [{ rotateY: interpolateFront }] }, FlashCardStyles.hidden]}>
                    <View style={FlashCardStyles.card}>
                      <TouchableOpacity activeOpacity={0.8} onPress={handleFlip} style={{}}>

                        <Text style={FlashCardStyles.text}>
                          {i.mean}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Animated.View>

                  <Animated.View style={[FlashCardStyles.back, FlashCardStyles.hidden, { transform: [{ rotateY: interpolateBack }] }]}>
                    <View style={FlashCardStyles.cardback}>
                      <TouchableOpacity activeOpacity={0.8} onPress={handleFlip} style={{}}>

                        <Image style={FlashCardStyles.img} source={i.img} />
                      </TouchableOpacity>
                    </View>
                  </Animated.View>
                  <Text>
                    {i.key}/5
                  </Text>
                </View>
              )
            })
          }
        </ScrollView>

      ) : null}

      {/* Expand*/}
      <View>
        <Text style={FlashCardStyles.suggestionTitle}>
          Có thể bạn thích?
        </Text>
      </View>
      <View style={FlashCardStyles.suggestionContainer}>

        <Card style={{ backgroundColor: '#9FD0E6', alignItems: 'center', marginBottom: 20, marginTop: 20 }}>
          <TouchableOpacity onPress={() => setModalOpen(true)}>

            <Text style={{ padding: 10, fontSize: 15 }}>
              Xem toàn bộ bảng chữ cái
            </Text>
          </TouchableOpacity>

        </Card>

        {/* <Modal visible = {modalOpen}  animationType="slide">
          <View style=  {{
                          backgroundColor:'green', 
                          justifyContent:'center', 
                          alignItems:'center',
                          
                          borderColor:"green"}}>
            <View style = {{width:'90%'}}>
            <Image source={require('../../assets/alphabet.jpg')}></Image>
          <TouchableOpacity onPress={()=>setModalOpen(false)}>
            <Icon name="close">
            </Icon>
          </TouchableOpacity>
            </View>
          
          </View>  
        </Modal>      */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalOpen}
        >

          <View style={{
            flex: 1,
            backgroundColor: COLOR.Black,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <View style={{
              backgroundColor: '#FFFF99',
              width: '90%',
              borderRadius: 20,
              padding: 20,
              alignItems: 'center'
            }}>
              <Text style={{ fontSize: 30 }}> Bảng chữ cái</Text>
              <Image source={require('../../assets/alphabet.jpg')} style={{ padding: 0, resizeMode: 'contain', width: '100%' }} />

              <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginVertical: 20
              }}>

              </View>
              {/*Close button */}
              <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity
                  onPress={() => setModalOpen(false)}
                  style={{
                    backgroundColor: '#9FD0E6',
                    padding: 20, width: '50%', borderRadius: 20
                  }}>
                  <Text style={{
                    textAlign: 'center', color: COLOR.White, fontSize: 20
                  }}>Close</Text>
                </TouchableOpacity>

              </View>
            </View>

          </View>
        </Modal>
        <TouchableOpacity onPress={() => navigation.navigate('MultipleChoice')}>
          <Card style={{ backgroundColor: '#9FD0E6', alignItems: 'center' }}>
            <Text style={{ padding: 10, fontSize: 15 }}>
              Làm bài tập trắc nghiệm
            </Text>
          </Card>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

export default Flashcard;