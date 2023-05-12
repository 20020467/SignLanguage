import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import CopyRight from "react-native-vector-icons/AntDesign";

const SplashScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={styles.body}>
        <Text
          style={{
            // fontFamily: "RobotoBold",
            fontSize: 24,
            textAlign: "center",
            fontWeight: 400,
            marginVertical: 20,
            marginTop: 40,
          }}
        >
          SIGN LANGUAGE
        </Text>
        <Image
          style={styles.img}
          source={require("../../assets/img/greeting.png")}
        ></Image>
        <View style={styles.greeting}>
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Chào mừng đến với ứng dụng Sign Language của chúng tôi - nơi bạn có
            thể học và giao tiếp bằng ngôn ngữ ký hiệu!
          </Text>
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={{ fontSize: 20, fontFamily: "Poppins-Regular" }}>
            Bắt đầu!
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.copyright}>
        <CopyRight
          name="copyright"
          style={{ marginRight: 2, marginBottom: 2 }}
        />
        <Text style={{ fontFamily: "Poppins-Regular", textAlign: "center" }}>
          2023 SignLanguage by proTeam
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  body: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  img: {
    width: "100%",
    // flex: 1
  },
  loginButton: {
    marginTop: 20,
    marginHorizontal: 24,
    height: 50,
    // width: 80,
    backgroundColor: "#9FD0E6",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  greeting: {
    marginTop: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  copyright: {
    // position: "absolute",
    // bottom: -160,
    // left: 30,
    marginTop: 100,
    width: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
