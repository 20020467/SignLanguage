import React from "react";
import { Image, Text, View } from "react-native";
import { getImage } from "../../components/getImage";
import { ResultStyles as styles } from "../styles";

const Result = (props) => {
  const word = props.word;
  // const path = getImage(charator);
  const charactors = word.split("");

  return (
    <View>
      <View style={styles.item}>
        {/* <Text style={styles.text}>{charator}</Text>
        <View style={{ flex: 1 }}></View>
        <View style={styles.imgWrap}>
          <Image style={styles.img} source={path}></Image>
        </View> */}
        <Text style={styles.text}>{word}</Text>
        <View style={styles.imgWrap}>
          {charactors.map((charactor, index) => {
            return (
              <View key={index} style={styles.imgWrapItem}>
                <Image style={styles.img} source={getImage(charactor)}></Image>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Result;
