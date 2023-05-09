import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { LoginSuccess } from "../../context/AppAction";
import { API_HOST } from "@env";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

const SignIn = () => {
  const navigation = useNavigation();
  const { dispatch, user } = useContext(AppContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [warning, setWarning] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const isValid = () => {
    let isValid = true;
    console.log(username, password);
    if (username === "") {
      setWarning((prevState) => ({
        ...prevState,
        username: "Tên đăng nhập không được bỏ trống",
      }));
      isValid = false;
    }
    if (password === "") {
      setWarning((prevState) => ({
        ...prevState,
        password: "Mật khẩu không được bỏ trống",
      }));
      isValid = false;
    }
    if (isValid) {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    const data = {
      username: username,
      password: password,
    };
    console.log(data);

    try {
      console.log("fetch");
      const res = await axios.post(`${API_HOST}/api/auth/login`, data);
      const loginResponse = res.data;
      const userResponse = {
        username: loginResponse.data.data.username,
        token: loginResponse.data.token,
      };

      if (loginResponse.data.data.username == username) {
        dispatch(LoginSuccess(userResponse));
        navigation.navigate("MainScreen");
        setLoading(false);
      }
    } catch (error) {
      let response = error.response.data;
      if (response.error === "Unauthorized") {
        setLoading(false);
        alert("Tên đăng nhập hoặc mật khẩu không đúng");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text style={{ fontSize: 24, fontFamily: "Poppins-Regular" }}>
              Đăng nhập
            </Text>
          </View>

          <View style={styles.body}>
            <View style={styles.item}>
              <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16 }}>
                Tên đăng nhập
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập tên đăng nhập"
                onFocus={() =>
                  setWarning((prevState) => ({ ...prevState, username: "" }))
                }
                onChangeText={(val) => setUsername(val)}
              ></TextInput>
              <Text
                style={{
                  color: "red",
                  marginTop: -5,
                  fontFamily: "Poppins-Regular",
                }}
              >
                {warning.username}
              </Text>
            </View>

            <View style={styles.item}>
              <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16 }}>
                Mật khẩu
              </Text>
              <TextInput
                style={[styles.input, { paddingRight: 50 }]}
                placeholder="Nhập mật khẩu"
                onFocus={() =>
                  setWarning((prevState) => ({ ...prevState, password: "" }))
                }
                secureTextEntry={!show}
                onChangeText={(val) => setPassword(val)}
              ></TextInput>
              {show ? (
                <Icon
                  name="ios-eye-off-outline"
                  style={styles.show}
                  onPress={() => setShow(!show)}
                />
              ) : (
                <Icon
                  name="ios-eye-outline"
                  style={styles.show}
                  onPress={() => setShow(!show)}
                />
              )}
              <Text
                style={{
                  color: "red",
                  marginTop: -5,
                  fontFamily: "Poppins-Regular",
                }}
              >
                {warning.password}
              </Text>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={isValid}>
              {loading ? (
                <Image
                  style={styles.loading}
                  source={require("../../assets/img/Spinner-1s-200pxNew.gif")}
                ></Image>
              ) : (
                <Text style={{ fontSize: 20, fontFamily: "Poppins-Regular" }}>
                  Đăng nhập
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.noAccount}>
            <Text style={{ fontFamily: "Poppins-Regular" }}>
              Bạn chưa có tài khoản?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text
                style={{
                  color: "#2805FF",
                  marginLeft: 5,
                  fontFamily: "Poppins-Regular",
                }}
              >
                Đăng ký
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* </TouchableWithoutFeedback> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    marginTop: 50,
    marginLeft: 24,
    // position: "absolute",
    // top: 110,
    // left: 24
  },
  login: {
    fontSize: 28,
    fontWeight: 400,
  },
  body: {
    paddingHorizontal: 24,
    marginVertical: 20,
  },
  item: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 10,
  },
  input: {
    paddingHorizontal: 12,
    gap: 10,
    height: 43,
    borderRadius: 4,
    borderColor: "#A2A2A6",
    borderStyle: "solid",
    borderWidth: 1,
    fontFamily: "Poppins-Regular",
  },
  show: {
    position: "absolute",
    fontSize: 25,
    right: 15,
    top: 45,
  },
  loginButton: {
    marginHorizontal: 24,
    height: 50,
    backgroundColor: "#9FD0E6",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  noAccount: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  loading: {
    width: 50,
    height: 50,
    position: "absolute",
  },
});
