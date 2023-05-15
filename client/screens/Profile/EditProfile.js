import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AppContext } from "../../context";
import { auth } from "../../server_connector";
import { AxiosError, HttpStatusCode } from "axios";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { state: globalState } = useContext(AppContext);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          {loading ? (
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../../assets/img/Spinner-1s-200pxNew.gif")}
            />
          ) : (
            <TouchableOpacity style={{}} onPress={onSave}>
              <Text style={{ fontSize: 18, fontFamily: "Poppins-Regular" }}>
                Lưu
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )
    })
  }, [navigation, loading])

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

  const getUser = useCallback(async () => {
    try {
      const res = await auth.getUserInfo(globalState.token);
      setUser(res.data?.data);
    } catch (error) {
      console.log(error); // TRACE
    }
  }, []);

  const inputIsValid = () => {
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
          email: "Email không hợp lệ",
        }));

        valid = false;
      }
      if (!isValidPhone(input.phone)) {
        setWarning((prevState) => ({
          ...prevState,
          phone: "Số điện thoại không đúng định dạng",
        }));

        valid = false;
      }

      // if (valid) {
      //   onSave();
      // }
    }

    return valid
  };

  const onSave = async () => {
    if (!inputIsValid()) return
    setLoading(true);

    try {
      const { username, email, phone } = input
      const res = await auth.changeInfo({ username, email, phone }, globalState.token)

      if (res.data.status == "OK") {
        Alert.alert("Thay đổi thông tin thành công!");
      } else {
        Alert.alert("Thay đổi thông tin không thành công!");
      }
    } catch (error) {
      console.log(error.response.data); // TRACE
      if (error instanceof AxiosError && error.response.status == HttpStatusCode.BadRequest)
        Alert.alert("Thay đổi thông tin không thành công!");

    } finally {
      setLoading(false);
    }
  };

  function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  function isValidPhone(phone) {
    const pattern = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    return pattern.test(phone);
  }

  return (
    <SafeAreaView style={styles.background}>
      <View>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.back}>
              {/* <Icon
                style={{ fontSize: 28 }}
                name="arrow-back"
                onPress={() => {
                  navigation.goBack();
                }}
              /> */}
            </TouchableOpacity>
            <Image
              style={styles.img}
              source={require("../../assets/img/cat.jpg")}
            />
            {/* {loading ? (
              <Image
                style={styles.loading}
                source={require("../../assets/img/Spinner-1s-200pxNew.gif")}
              />
            ) : (
              <TouchableOpacity style={styles.save} onPress={validate}>
                <Text style={{ fontSize: 18, fontFamily: "Poppins-Regular" }}>
                  Lưu
                </Text>
              </TouchableOpacity>
            )} */}
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
                placeholder="name@mail.com"
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
                placeholder="0987654321"
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

export const SaveButton = (props) => (
  <TouchableOpacity {...props} >
    <Text style={{ fontSize: 18, fontFamily: "Poppins-Regular" }}>
      Lưu
    </Text>
  </TouchableOpacity>
)

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
    alignSelf: 'center',
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
