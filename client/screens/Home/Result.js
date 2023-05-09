import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getImage } from "../../components/getImage";

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

const styles = StyleSheet.create({
  item: {
    flexDirection: "column",
    backgroundColor: "#E7E3E3",

    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  imgWrap: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap-reverse",

    gap: 15,
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 10,
  },
  imgWrapItem: {
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  img: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  text: {
    fontSize: 17,
    marginTop: 9,
    marginLeft: 5,
    marginBottom: 10,
  },
});
