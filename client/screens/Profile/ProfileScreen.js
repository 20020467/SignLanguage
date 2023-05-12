import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { API_HOST } from "@env";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import Back from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialIcons";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { token } = useContext(AppContext);
  const [user, setUser] = useState();

  const axiosOptions = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const getUser = useCallback(async () => {
    try {
      const res = await axios.get(`${API_HOST}/api/auth`, axiosOptions);
      setUser(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <View>
        <ScrollView>
          <TouchableOpacity style={styles.back}>
            <Back
              style={{ fontSize: 28 }}
              name="arrow-back"
              onPress={() => {
                navigation.goBack();
              }}
            />
          </TouchableOpacity>

          <View style={styles.header}>
            <Image
              style={styles.img}
              source={require("../../assets/img/cat.jpg")}
            ></Image>
            <View style={styles.info}>
              <Text style={styles.username}>{user?.username}</Text>
              <Text style={styles.email}>{user?.email}</Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.item}>
              <Icon style={styles.icon} name="email" />
              <Text style={styles.text}>{user?.email}</Text>
            </View>

            <View style={styles.item}>
              <Icon style={styles.icon} name="phone" />
              <Text style={styles.text}>{user?.phone}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.footer, { marginTop: 60, paddingLeft: 30 }]}
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
          >
            <Text style={styles.textFooter}>Thay đổi thông tin cá nhân</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.footer, { paddingLeft: 30 }]}
            onPress={() => {
              navigation.navigate("ChangePassword");
            }}
          >
            <Text style={styles.textFooter}>Đổi mật khẩu</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.footer,
              {
                marginBottom: 50,
                marginTop: 80,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={[styles.textFooter, { color: "red" }]}>Đăng xuất</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    marginTop: 25,
  },

  back: {
    position: "absolute",
    top: 5,
    left: 20,
  },
  header: {
    marginTop: 50,
    marginLeft: 30,
    display: "flex",
    flexDirection: "row",
  },
  img: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  info: {
    marginTop: 10,
    marginLeft: 15,
  },

  username: {
    fontSize: 20,
    fontFamily: "Poppins-Regular",
  },
  email: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },

  body: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  icon: {
    color: "#9FD0E6",
    fontSize: 20,
    marginRight: 10,
  },

  footer: {
    height: 60,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    borderColor: "grey",
    elevation: 1.5,
  },
  textFooter: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
});
