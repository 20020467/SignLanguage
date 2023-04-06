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
        TouchableOpacity 
} from "react-native";

//dimention
var height  = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

//style
const style = StyleSheet.create({
  img:{
    height: height/4,
    width: width/2,
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
})
const Flashcard = ()=>{
  //data bang chu cai va hinh anh
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
  
  return (
    <SafeAreaView >
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
        <Text style ={{margin:20}}>
          Chữ cái không dấu
        </Text>
      </View>

      {/*Main Card*/}
      <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator = {false}  >
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
                    <View style ={style.card}>
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
    </SafeAreaView>   
  )  
}

export default Flashcard;