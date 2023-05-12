import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getImage } from "../../components/getImage";

const Result = (props) => {
  const convertVietnameseString = (str) => {
    // Chuyển đổi tiếng Việt có dấu thành không dấu
    const noAccentStr = str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    // Chuyển đổi từ viết hoa thành từ không viết hoa
    const lowercaseStr = noAccentStr.toLowerCase();

    return lowercaseStr;
  };

  const word = convertVietnameseString(props.word);
  const charactors = word.split("");

  return (
    <View>
      <View style={styles.item}>
        <Text style={styles.text}>{props.word}</Text>
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
    flexWrap: "wrap",

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
