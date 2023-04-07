import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { getImage } from "../../components/getImage";

const Result = (props) => {
  const charator = props.img[0];
  const path = getImage(charator);

  return (
    <View>
      <View style={styles.item}>
        <Text style={styles.text}>{charator}</Text>
        <View style={{ flex: 1 }}></View>
        <View style={styles.imgWrap}>
          <Image style={styles.img} source={path}></Image>
        </View>
      </View>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "pink",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  imgWrap: {
    // position: "absolute",
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
    // right: 15,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  text: {
    fontSize: 25,
    marginTop: 9,
    marginLeft: 20,
  },
});
