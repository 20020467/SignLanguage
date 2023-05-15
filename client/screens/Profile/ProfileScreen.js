import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { auth } from "../../server_connector";
import { AxiosError, HttpStatusCode } from "axios";
import Back from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialIcons";
import { LogOut, useGlobalContext } from "../../context";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { state: globalState, dispatch } = useGlobalContext();

  const [user, setUser] = useState();

  useEffect(() => {
    if (globalState.token) {
      auth.getUserInfo(globalState.token)
        .then(response => {
          if (response.status == HttpStatusCode.Ok) {
            updateInfo(response.data.data)
          }
        })
        .catch(error => {
          console.log(error) // TRACE
          if (error instanceof AxiosError && error.response.status == HttpStatusCode.Unauthorized) {
            Alert.alert('Đã hết hạn đăng nhập, vui lòng đăng nhập lại', null, [
              { text: 'Đồng ý', onPress: () => navigation.navigate("SignIn") }
            ])
          } else Alert.alert('Dữ liệu chưa được cập nhật, vui lòng tải lại.', null, null, { cancelable: true })
        })
    } else {
      Alert.alert('Đã hết hạn đăng nhập, vui lòng đăng nhập lại', null, [
        { text: 'Đồng ý', onPress: () => navigation.navigate("SignIn") }
      ])
    }
  }, []);

  const updateInfo = ({ username, email, phone }) => {
    setUser({ username, email, phone })
  }

  const logout = () => {
    Alert.alert("Bạn có chắc muốn đăng xuất không?", null, [
      {
        text: "Đồng ý", onPress: () => {
          dispatch(LogOut())
          navigation.navigate("SignIn")
        }
      },
      {
        text: "Hủy"
      }
    ], { cancelable: true })
  }

  return (
    <SafeAreaView style={styles.background}>
      <View style={{ height: '100%' }}>
        <ScrollView>
          {/* <TouchableOpacity style={styles.back}>
            <Back
              style={{ fontSize: 28 }}
              name="arrow-back"
              onPress={() => {
                navigation.goBack();
              }}
            />
          </TouchableOpacity> */}

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
            style={[
              styles.footer,
              {
                marginTop: '12%',
                paddingLeft: 30,
                borderBottomWidth: 1,
                borderTopWidth: 0.1,
                borderColor: "grey",
              },
            ]}
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
                top: '9%',
              },
            ]}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={[styles.textFooter, { color: "red" }]} onPress={logout}>Đăng xuất</Text>
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
    // marginTop: 50,
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
