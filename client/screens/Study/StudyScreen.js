import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import Header from "../../components/Header";
import { TouchEvent , TouchableOpacity, Button} from "react-native";
import { Card, Icon } from 'react-native-elements'
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Flashcard from "./FlashCard";


const style = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  card:{
    height: 120,
    width: 170,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 15,
    elevation: 13,
    backgroundColor:'#9FD0E6',

  },
  item1:{
    marginLeft: 30,
    marginRight:30,
    marginTop:10,
    backgroundColor:'#9FD0E6',
    fontSize:24,
    padding:10,
    borderRadius:10
  },
  item2:{
    marginLeft: 30,
    marginRight:30,
    marginTop:10,
    backgroundColor:'#FFFF99',
    fontSize:24,
    padding:10,
    borderRadius:10
  },
  suggest:{
    margin:10
  },
  text:{
    marginLeft: 10
  }
}
  
)
const StudyScreen = () => {
  const navigation = useNavigation()
  const [sentence, setSentence] =  useState([
    {
      mean: 'Hello', key: '1', img:''
    },
    {
      mean: 'Goodbye', key: '2',img: ''
    },
    {
      mean: 'How are you', key: '3',img: ''
    },
    {
      mean: 'Thank you', key: '4',img: ''
    },
    {
      mean: 'How are you?', key: '5',img: ''
    },
    {
      mean: 'What is your address?', key: '6',img: ''
    }
  ]);

  return (
    <View  style={[
      style.container,
      {
        flexDirection: 'column',
      },
    ]}>
      <View style={{flex:1}} >
        <Header/>
      </View>
      <View style={{flex:2,}}>
        <Text style = {style.text}>
          Danh sách học phần
        </Text>
        <ScrollView horizontal>
          <TouchableOpacity onPress={() => navigation.navigate("FlashCard")}>
            <View style={style.card}>
            <View style={{marginHorizontal: 20}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Flashcard</Text>
              <Text style={{fontSize: 14, color: 'gray', marginTop: 1}}>
                Hơn 30 thẻ
              </Text>
            </View>
            
            <View style={{alignItems: 'center'}}>
              <Image source={require('../../assets/flashcard.jpg')} style={{height: 60, width: 100}} />
            </View>
            
           
            </View>          
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={style.card}>
            <View style={{marginHorizontal: 20}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Bảng chữ cái</Text>
              <Text style={{fontSize: 14, color: 'gray', marginTop: 2}}>
                29 chữ cái
              </Text>
            </View>
            
            <View style={{alignItems: 'center'}}>
              <Image source={require('../../assets/flashcard.jpg')} style={{height: 60, width: 100}} />
            </View>
            
            <View
              style={{
                marginTop: 10,
                marginHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
            
            </View>
            </View>          
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={style.card}>
            <View style={{marginHorizontal: 20}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Trắc nghiệm</Text>
              <Text style={{fontSize: 14, color: 'gray', marginTop: 2}}>
                Hơn 100 câu
              </Text>
            </View>
            
            <View style={{alignItems: 'center'}}>
              <Image source={require('../../assets/flashcard.jpg')} style={{height: 60, width: 100}} />
            </View>
            
            <View
              style={{
                marginTop: 10,
                marginHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
            
            </View>
            </View>          
          </TouchableOpacity>


          
        
        </ScrollView>
       
      </View>
      <View style={{flex:3,}}>
        <Text style ={style.text}>
          Một số câu giao tiếp bằng thủ ngữ
        </Text>
        <ScrollView style = {style.suggest}>
          {
            sentence.map((i) => {if(i.key%2==0){
              return (
                <View key = {i.key} style = {style.item1}>
                  <Text >
                    {i.mean}
                  </Text>
                  <Icon
                  name="arrow-drop-down"
                  type="MaterialIcons"
                  />
                </View>
              )
            } else{
              return (
                <View key = {i.key} style = {style.item2}>
                  <Text >
                    {i.mean}
                  </Text>
                  <Icon
                  name="arrow-drop-down"
                  type="MaterialIcons"
                  />
                </View>
              )

            }})
          }
        </ScrollView>
      </View>
      
    </View>
  );
};

export default StudyScreen;
