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
import Icon from "react-native-vector-icons/Ionicons";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { token } = useContext(AppContext);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const axiosOptions = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const [input, setInput] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [warning, setWarning] = useState({
    username: "",
    email: "",
    phone: "",
  });

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

  useEffect(() => {
    if (user) {
      setInput({
        username: user.username,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user]);

  const isValid = () => {
    console.log(input);
    let valid = true;
    if (
      input.username === user.username &&
      input.email === user.email &&
      input.phone === user.phone
    ) {
      alert("Thông tin chưa thay đổi");
    } else {
      if (!isValidEmail(input.email)) {
        setWarning((prevState) => ({
          ...prevState,
          email: "Email khong hop le",
        }));
        valid = false;
      }
      if (!isPhone(input.phone)) {
        setWarning((prevState) => ({
          ...prevState,
          phone: "Số điện thoại không đúng định dạng",
        }));
        valid = false;
      }

      if (valid) {
        handelSave();
      }
    }
  };

  function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  function isPhone(phone) {
    const pattern = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    return pattern.test(phone);
  }

  const handelSave = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        `${API_HOST}/api/auth/update`,
        input,
        axiosOptions
      );
      if (res.data.status == "OK") {
        setLoading(false);
        alert("Thay đổi thông tin thành công!");
      } else {
        alert("Thay đổi thông tin không thành công!");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Thay đổi thông tin không thành công!");
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <View>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity style={styles.back}>
              <Icon
                style={{ fontSize: 28 }}
                name="arrow-back"
                onPress={() => {
                  navigation.goBack();
                }}
              />
            </TouchableOpacity>
            <Image
              style={styles.img}
              source={require("../../assets/img/cat.jpg")}
            ></Image>
            {loading ? (
              <Image
                style={styles.loading}
                source={require("../../assets/img/Spinner-1s-200pxNew.gif")}
              />
            ) : (
              <TouchableOpacity style={styles.save} onPress={isValid}>
                <Text style={{ fontSize: 18, fontFamily: "Poppins-Regular" }}>
                  Lưu
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.body}>
            <View style={styles.item}>
              <Text style={styles.text}>Tên đăng nhập</Text>
              <TextInput
                placeholder="Tên đăng nhập"
                defaultValue={user?.username}
                style={styles.inputText}
                onFocus={() =>
                  setWarning((prevState) => ({ ...prevState, username: "" }))
                }
                onChangeText={(val) =>
                  setInput((prevState) => ({ ...prevState, username: val }))
                }
              />
              <Text style={styles.warning}>{warning.username}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.text}>Email</Text>
              <TextInput
                placeholder="Email"
                defaultValue={user?.email}
                style={styles.inputText}
                keyboardType="email-address"
                onFocus={() =>
                  setWarning((prevState) => ({ ...prevState, email: "" }))
                }
                onChangeText={(val) =>
                  setInput((prevState) => ({ ...prevState, email: val }))
                }
              />
              <Text style={styles.warning}>{warning.email}</Text>
            </View>

            {/* <View style={styles.item}>
              <Text style={styles.text}>Mật khẩu</Text>
              <TextInput
                placeholder="Mật khẩu"
                defaultValue={"123456"}
                style={styles.inputText}
                secureTextEntry={true}
                editable={false}
              />
              <Text style={styles.warning}></Text>
            </View> */}

            <View style={styles.item}>
              <Text style={styles.text}>Số điện thoại</Text>
              <TextInput
                placeholder="Số điện thoại"
                defaultValue={user?.phone}
                style={styles.inputText}
                keyboardType="number-pad"
                onFocus={() =>
                  setWarning((prevState) => ({ ...prevState, phone: "" }))
                }
                onChangeText={(val) =>
                  setInput((prevState) => ({ ...prevState, phone: val }))
                }
              />
              <Text style={styles.warning}>{warning.phone}</Text>
            </View>
          </View>

          {/* <TouchableOpacity
            style={styles.footer}
            onPress={() => {
              navigation.navigate("ChangePassword");
            }}
          >
            <Text style={styles.textFooter}>Thay đổi mật khẩu</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.footer, { marginBottom: 50 }]}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={[styles.textFooter, { color: "red" }]}>Đăng xuất</Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity
            style={styles.ChangePassword}
            onPress={() => {
              navigation.navigate("ChangePassword");
            }}
          >
            <Text style={{ fontSize: 20, fontFamily: "Poppins-Regular" }}>
              Thay đổi mật khẩu
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={{ fontSize: 20, fontFamily: "Poppins-Regular" }}>
              Đăng xuất
            </Text>
          </TouchableOpacity> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // paddingTop: 25,
  },

  header: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  back: {
    position: "absolute",
    top: 5,
    left: 20,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  save: {
    position: "absolute",
    right: 20,
    top: 5,
  },
  loading: {
    width: 50,
    height: 50,
    position: "absolute",
    right: 15,
    top: 0,
  },
  body: {
    marginBottom: 20,
    padding: 30,
  },
  item: {
    marginVertical: 10,
  },

  text: {
    marginBottom: 5,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
  inputText: {
    fontSize: 14,
    borderBottomWidth: 1,
    borderColor: "#607D8B",
    marginBottom: 10,
    // opacity: 0.5,
    fontFamily: "Poppins-Regular",
  },
  warning: {
    color: "red",
    marginTop: -10,
    fontFamily: "Poppins-Regular",
  },
  ChangePassword: {
    marginHorizontal: 50,
    marginBottom: 10,
    height: 50,
    backgroundColor: "#9FD0E6",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    // elevation: 2,
  },
  logoutButton: {
    marginHorizontal: 50,
    height: 50,
    backgroundColor: "#9FD0E6",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },

  footer: {
    height: 60,
    // backgroundColor: "#E7E3E3",
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    // borderBottomWidth: 0.5,
    borderColor: "grey",
    borderWidth: 0.5,
    elevation: 1.5,
  },
  textFooter: {
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
});
