
import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
import { Animated, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Button, Icon } from "react-native-elements";
import { Card } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Modal } from "react-native";
import { useState } from "react";
import { Pressable } from "react-native";
import { transform } from "typescript";
const Flashcard = ()=>{
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false);
    const animate = useRef(new Animated.Value(0));
    const interpolateFront =animate.current.interpolate({
      inputRange:[0,180],
      outputRange:['0deg', '180deg']
    });
    
    return (
        <SafeAreaView >
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

            <View style = {style.container}>
              <Animated.View style = {[{transform:[{rotateY: interpolateFront}]}]}>
                <View style ={style.card}>
                 

                </View>
                

              </Animated.View>
              <View style = {[style.back]}>
                <View style ={style.card}>

                </View>

              </View>
              <Button>
                Flip
              </Button>
            </View>
           



        </SafeAreaView>
        
        
    )
    
}
const style = StyleSheet.create({
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
  height: 120,
  width: 170,
  marginHorizontal: 10,
  marginBottom: 10,
  margin: 50,
  marginRight:110,
  marginLeft:110,
  borderRadius: 15,
  elevation: 13,
  backgroundColor:'#9FD0E6',

},



})
export default Flashcard;