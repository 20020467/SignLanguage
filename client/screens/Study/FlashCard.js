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
import {COLORS} from '../../constant'
import alphabetdata from "../../constant/alphabetdata";
import numbers from "../../constant/number";
import IonIcon from '@expo/vector-icons/Ionicons'
//dimention
var height  = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

//data
const sentence = alphabetdata;
const number = numbers;

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
  const [title, setTitle] = useState([
    {
      title: 'Chữ cái',key: '1'
    },
    {
      title: "Chữ số", key: '2'
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
         <IonIcon name="arrow-back-outline" size={30} style={{
                position: "absolute",
                top: -12,
                left: -140,
            }}/>
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
        <Text style = {{fontSize: 18, fontWeight:'600', marginLeft: 15, marginTop:10}}>CHỌN CHỦ ĐỀ FLASHCARD</Text>
      </View>
      <View style={{flexDirection: 'row', 
                    alignContent:'center', 
                    justifyContent:'center',
                    marginTop:20, marginBottom:20,
                    }}>
        

       {title.map((i)=>{
        return (
         
          <Card style={{marginRight:20, backgroundColor: show == i ? '#FFFF99': '#9FD0E6', width:80, justifyContent:'center', alignContent:'center'  }}>
             <TouchableOpacity style= {{alignContent:'center', justifyContent:'center'}} activeOpacity={0.8} onPress={()=>{
            setShow(i),
            i.key== 1 ? setDisplay(1): setDisplay(0),
            i.key == 2 ? setNum(1):setNum(0),
            i.key == 3 ? setPun(1):setPun(0),
            console.log(i)
          }
          }>
            <Text style = {{padding:10, fontSize: 15, alignContent:'center', justifyContent:'center'}}>{i.title}</Text>
            </TouchableOpacity>   

          </Card>
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
                  <Animated.View style = {[{transform:[{rotateY: interpolateFront}]}, style.hidden]}>
                    <TouchableOpacity onPress={handleFlip} style = {{}}>                    
                      <View style ={style.card}>
                        <Text style = {style.text}>
                          {i.mean}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </Animated.View>

                  <Animated.View style = {[style.back, style.hidden, {transform:[{rotateY: interpolateBack}]}]}>
                    <View style ={style.cardback}>
                    <TouchableOpacity onPress={handleFlip} style = {{}}>                    

                    <Image style = {style.img}source = {i.img}/>
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
      ): null}

      {/*Main Number FlashCard*/}
      {num ? (
        <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator = {false}>
        {
          number.map((i)=>{
            return (
              <View style = {style.container} key={i.key}>
                  <Animated.View style = {[{transform:[{rotateY: interpolateFront}]}, style.hidden]}>
                    <TouchableOpacity onPress={handleFlip} style = {{}}>                    
                      <View style ={style.card}>
                        <Text style = {style.text}>
                          {i.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </Animated.View>
                  <Animated.View style = {[style.back, style.hidden, {transform:[{rotateY: interpolateBack}]}]}>
                    <View style ={style.cardback}>
                    <TouchableOpacity onPress={handleFlip} style = {{}}>                    
                    <Image style = {style.img}source = {i.img}/>
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

      ): null}

      {/*Main Puntuation FlashCard*/}
      {pun ? (
        <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator = {false}>
        {
          sentence.map((i)=>{
            return (
              <View style = {style.container}>
                  <Animated.View style = {[{transform:[{rotateY: interpolateFront}]}, style.hidden]}>
                    <View style ={style.card}>
                    <TouchableOpacity activeOpacity={0.8} onPress={handleFlip} style = {{}}>                    

                      <Text style = {style.text}>
                        {i.mean}
                      </Text>
                      </TouchableOpacity>
                    </View>
                  </Animated.View>
                  <Animated.View style = {[style.back, style.hidden, {transform:[{rotateY: interpolateBack}]}]}>
                    <View style ={style.cardback}>
                    <TouchableOpacity activeOpacity={0.8} onPress={handleFlip} style = {{}}>                    
                    <Image style = {style.img}source = {i.img}/>
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

      ): null}

      {/* Expand*/}
      <View>
        <Text style = {{fontSize: 18, fontWeight:'600', marginLeft: 15, marginTop:20}}>
          CÓ THỂ BẠN THÍCH?
        </Text>
      </View>
      <View style ={{marginLeft: width/15, 
                    marginRight: width/15}}>

          <Card style={{backgroundColor:'#9FD0E6', alignItems:'center',marginBottom:20,marginTop:20}}>
          <TouchableOpacity onPress={()=>setModalOpen(true)}>

            <Text style = {{padding:10, fontSize: 15}}>
              Xem toàn bộ bảng chữ cái
            </Text>
          </TouchableOpacity>

          </Card>

         <Modal
               animationType="slide"
               transparent={true}
               visible={modalOpen}
               >

                   <View style={{
                       flex: 1,
                       backgroundColor: COLORS.black,
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
                          <Text style ={{fontSize:20}}> BẢNG CHỮ CÁI</Text>
                        <Image source={require('../../assets/img/alphabet.jpg')} style = {{padding:0,resizeMode:'contain', width: '100%'}}/>

                           <View style={{
                               flexDirection: 'row',
                               justifyContent: 'flex-start',
                               alignItems: 'center',
                               marginVertical: 20
                           }}>
                              
                           </View>
                           {/*Close button */}
                           <View style ={{flexDirection:'row'}}>
                           
                           <TouchableOpacity
                           onPress={()=>setModalOpen(false)}
                           style={{
                            backgroundColor:'#9FD0E6',
                               padding: 20, width: '50%', borderRadius: 20
                           }}>
                               <Text style={{
                                   textAlign: 'center', color: COLORS.white, fontSize: 20
                               }}>Đóng</Text>
                           </TouchableOpacity>

                           </View>
                       </View>

                   </View>
               </Modal>
        <TouchableOpacity onPress={()=>navigation.navigate('MultipleChoice')}>
        <Card style={{backgroundColor:'#9FD0E6', alignItems:'center'}}>
          <Text style = {{padding:10, fontSize: 15}}>
            Làm bài tập trắc nghiệm
          </Text>
        </Card>    
        </TouchableOpacity>
       
      </View>
    </SafeAreaView>   
  )  
}

export default Flashcard;