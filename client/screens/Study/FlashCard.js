import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-navigation";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions, 
        Image, 
        StyleSheet, 
        Text, View, 
        Animated, 
        TouchableOpacity,
        Modal
} from "react-native";
import {Card} from 'react-native-paper';
import { Icon } from "react-native-elements";

//dimention
var height  = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

//style
const style = StyleSheet.create({
  img:{
    resizeMode:'contain',
   
  },
  container:{
    justifyContent: 'center',
    alignItems:'center'
  },
  hidden:{
    backfaceVisibility:'hidden'

  },
  back:{
    position:'absolute',
    top:0
  },
  text:{
    alignContent:'center',
    justifyContent:'center',
    fontSize: 24,
    fontWeight: 'bold'
  },
  icon:{
    marginTop:150,
    marginLeft:150

  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  card:{
    height: height/4,
    width: width/2,
    marginLeft: width/4,
    marginRight:width/4,
    marginHorizontal: 10,
    marginBottom: 10,
    margin: 10,
    borderRadius: 15,
    elevation: 13,
    backgroundColor:'#9FD0E6',
    justifyContent:'center',
    alignItems:'center'
  },
  cardback:{
    height: height/4,
    width: width/2,
    marginLeft: width/4,
    marginRight:width/4,
    marginHorizontal: 10,
    marginBottom: 10,
    margin: 10,
    borderRadius: 15,
    elevation: 13,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center'
  },
})
const Flashcard = ()=>{
  //data alphabet
  const [sentence, setSentence] =  useState([
    {
      mean: 'A', key: '1', img:require("../../assets/a.jpg")
    },
    {
      mean: 'B', key: '2',img: require("../../assets/b.jpg")
    },
    {
      mean: 'C', key: '3',img:require("../../assets/c.jpg")
    },
    {
      mean: 'D', key: '4',img: require("../../assets/d.jpg")
    },
    {
      mean: 'E', key: '5',img: require("../../assets/e.jpg")
    },
    {
      mean: 'G', key: '6',img: require("../../assets/g.jpg")
    },
    {
      mean: 'H', key: '7',img: require("../../assets/h.jpg")
    },
    {
      mean: 'I', key: '8',img: require("../../assets/i.jpg")
    },
    {
      mean: 'K', key: '9',img: require("../../assets/k.jpg")
    },
    {
      mean: 'L', key: '10',img: require("../../assets/l.jpg")
    },
    {
      mean: 'M', key: '11',img: require("../../assets/m.jpg")
    },
    {
      mean: 'N', key: '12',img: require("../../assets/icon.png")
    },
    {
      mean: 'O', key: '13',img: require("../../assets/icon.png")
    },
    {
      mean: 'P', key: '14',img: require("../../assets/icon.png")
    },
    {
      mean: 'Q', key: '15',img: require("../../assets/icon.png")
    },
    {
      mean: 'F', key: '16',img: require("../../assets/icon.png")
    },
    {
      mean: 'F', key: '17',img: require("../../assets/icon.png")
    }
  ]);

  //data number
  const [number, setNumber] = useState([
    {
      title: '1', key: '1', img:require("../../assets/1.png")
    },
    {
      title: '2', key: '2', img:require("../../assets/2.png")
    },
    {
      title: '3', key: '3', img:require("../../assets/3.png")
    },
    {
      title: '4', key: '4', img:require("../../assets/4.png")
    },
    {
      title:'5', key: '5',img:require("../../assets/5.png")
    },
    {
      title: '6', key: '6', img:require("../../assets/6.png")
    },
    {
      title: '7', key: '7', img:require("../../assets/7.png")
    },
    {
      title:'8', key: '8', img:require("../../assets/8.png")
    },
    {
      title:'9', key: '9', img:require("../../assets/9.png")
    },
    {
      title: '0', key: '10', img:require("../../assets/0.png")
    }


  ])
  const [title, setTitle] = useState([
    {
      title: 'Chữ cái',key: '1'
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
  const handleFlip = ()=>{
    Animated.timing(animate.current,{
      duration:300,
      toValue: isFlipped?0:180,
      useNativeDriver: true,
    }).start(()=>{
      setIsFlipped(!isFlipped)
    });
  }
  const interpolateFront = animate.current.interpolate({
    inputRange:[0,180],
    outputRange:['0deg', '180deg']
  });

  const interpolateBack = animate.current.interpolate({
    inputRange:[0,180],
    outputRange:['180deg', '360deg']
  });

  // change color title card
  const [show, setShow] = useState(0)
  //display alphabet
  const [display, setDisplay] = useState(0);
  //display number
  const [num, setNum] =useState(0);
  //display punctuation
  const [pun, setPun]= useState(0)
  //modal
  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <SafeAreaView>
      
      {/*header*/}
      <View style= {{ paddingTop: 20,
      marginBottom: 5,
      height: 85,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      backgroundColor: "#9FD0E6",}}>
        <View>
          <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Text  style={{
            position: "absolute",
            top: 0,
            left: -150,
          }}>
              Back
          </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style = {{fontWeight:'bold', fontSize:20}}>
              Flashcard
          </Text>
        </View>
      </View>

      {/*Title*/}
      <View>
        <Text style = {{fontSize: 19, fontWeight:'bold', marginLeft: 15, marginTop:10}}>Chọn chủ đề flashcard?</Text>
      </View>
      <View style={{flexDirection: 'row', 
                    alignContent:'center', 
                    justifyContent:'center',
                    marginTop:20, marginBottom:20,
                    }}>
        

       {title.map((i)=>{
        return (
          <TouchableOpacity onPress={()=>{
            setShow(i),
            i.key== 1 ? setDisplay(1): setDisplay(0),
            i.key == 2 ? setNum(1):setNum(0),
            i.key == 3 ? setPun(1):setPun(0),
            console.log(i)
          }
          }>
          <Card style={{marginRight:20, backgroundColor: show == i ? '#FFFF99': '#9FD0E6'  }}>
            <Text style = {{padding:10, fontSize: 15}}>{i.title}</Text>
          </Card>
          </TouchableOpacity>   
        )
           
       })}
            
      </View>

      {/*Main Alphabet FlashCard*/}
      {display ? (
        <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator = {false}>
        {
          sentence.map((i)=>{
            return (
              <View key={i.key} style = {style.container}>
                <TouchableOpacity onPress={handleFlip} style = {{}}>                    
                  <Animated.View style = {[{transform:[{rotateY: interpolateFront}]}, style.hidden]}>
                    <View style ={style.card}>
                      <Text style = {style.text}>
                        {i.mean}
                      </Text>
                    </View>
                  </Animated.View>

                  <Animated.View style = {[style.back, style.hidden, {transform:[{rotateY: interpolateBack}]}]}>
                    <View style ={style.cardback}>
                    <Image style = {style.img}source = {i.img}/>
                    </View>
                  </Animated.View>
                </TouchableOpacity>
                <Text>
                  {i.key}/29
                </Text>
              </View>               
            )
          })
        }
        </ScrollView>
      ): null}

      {/*Main Number FlashCard*/}
      {num ? (
        <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator = {false}>
        {
          number.map((i)=>{
            return (
              <View style = {style.container}>
                <TouchableOpacity onPress={handleFlip} style = {{}}>                    
                  <Animated.View style = {[{transform:[{rotateY: interpolateFront}]}, style.hidden]}>
                    <View style ={style.card}>
                      <Text style = {style.text}>
                        {i.title}
                      </Text>
                    </View>
                  </Animated.View>

                  <Animated.View style = {[style.back, style.hidden, {transform:[{rotateY: interpolateBack}]}]}>
                    <View style ={style.cardback}>
                    <Image style = {style.img}source = {i.img}/>
                    </View>
                  </Animated.View>
                </TouchableOpacity>
                <Text>
                  {i.key}/10
                </Text>
              </View>               
            )
          })
        }
        </ScrollView>

      ): null}

      {/*Main Puntuation FlashCard*/}
      {pun ? (
        <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator = {false}>
        {
          sentence.map((i)=>{
            return (
              <View style = {style.container}>
                <TouchableOpacity onPress={handleFlip} style = {{}}>                    
                  <Animated.View style = {[{transform:[{rotateY: interpolateFront}]}, style.hidden]}>
                    <View style ={style.card}>
                      <Text style = {style.text}>
                        {i.mean}
                      </Text>
                    </View>
                  </Animated.View>

                  <Animated.View style = {[style.back, style.hidden, {transform:[{rotateY: interpolateBack}]}]}>
                    <View style ={style.cardback}>
                    <Image style = {style.img}source = {i.img}/>
                    </View>
                  </Animated.View>
                </TouchableOpacity>
                <Text>
                  {i.key}/5
                </Text>
              </View>               
            )
          })
        }
        </ScrollView>

      ): null}

      {/* Expand*/}
      <View>
        <Text style = {{fontSize: 19, fontWeight:'bold', marginLeft: 15, marginTop:20}}>
          Có thể bạn thích?
        </Text>
      </View>
      <View style ={{marginLeft: width/15, 
                    marginRight: width/15}}>

        <TouchableOpacity onPress={()=>setModalOpen(true)}>
          <Card style={{backgroundColor:'#9FD0E6', alignItems:'center',marginBottom:20,marginTop:20}}>
            <Text style = {{padding:10, fontSize: 15}}>
              Xem toàn bộ bảng chữ cái
            </Text>
          </Card>

        </TouchableOpacity>
        <Modal visible = {modalOpen} style={{marginTop:90, backgroundColor:'black', justifyContent:'center', alignItems:'center'}} animationType="slide">
          <View style=  {{width: width/2, height: height/2, 
                          backgroundColor:'green', 
                          marginLeft: width/4, 
                          marginTop:height/4, justifyContent:'center', 
                          alignItems:'center'}}>
          <Image source={require('../../assets/alphabet.jpg')}></Image>
          <TouchableOpacity onPress={()=>setModalOpen(false)}>
            <Icon name="close">
            </Icon>
          </TouchableOpacity>
          </View>  
        </Modal>     
        <Card style={{backgroundColor:'#9FD0E6', alignItems:'center'}}>
          <Text style = {{padding:10, fontSize: 15}}>
            Làm bài tập trắc nghiệm
          </Text>
        </Card>    
      </View>
    </SafeAreaView>   
  )  
}

export default Flashcard;