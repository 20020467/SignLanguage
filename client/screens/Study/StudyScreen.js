import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import Header from "../../components/Header";
import { TouchEvent , TouchableOpacity, Button} from "react-native";
import { Icon } from 'react-native-elements'

const style = StyleSheet.create({
  container: {
    flex: 1,
    
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
  }
}
  
)
const StudyScreen = () => {
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
      <View style={{flex:3,}}>
        <Text>
          Danh sách học phần
        </Text>

      </View>
      <View style={{flex:2,}}>
        <Text>
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
      <View style={{flex:1}} >
        
      </View>
      
    </View>
  );
};

export default StudyScreen;
