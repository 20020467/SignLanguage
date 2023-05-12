import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { LoginSuccess, useGlobalContext } from "../../context";
import { auth } from "../../server_connector";
import { SignInStyles as styles } from "../styles";
import { HttpStatusCode } from "axios";

const SignIn = () => {
  const navigation = useNavigation();
  const { state, dispatch } = useGlobalContext();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);

  const handleLogin = () => {
    auth.login({ username, password })
      .then(res => {
        const data = res.data?.data?.data
        const token = res.data?.data?.token
        if (res.data.data) {
          dispatch(LoginSuccess({
            id: data.id,
            username: data.username,
            token,
          }))
        }
        navigation.navigate("MainScreen");
      })
      .catch(reason => {
        if (reason.response.status == HttpStatusCode.Unauthorized) {
          ToastAndroid.show("Sai thông tin đăng nhập, vui lòng thử lại", ToastAndroid.SHORT)
        }
      })
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.login}>Đăng nhập</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.item}>
          <Text>Tên đăng nhập</Text>
          <TextInput
            style={styles.input}
            placeholder="username"
            onChangeText={(val) => setUsername(val)}
          ></TextInput>
        </View>

        <View style={styles.item}>
          <Text>Mật khẩu</Text>
          <TextInput
            style={[styles.input, { paddingRight: 50 }]}
            placeholder="password"
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
        </View>
      </View>

      <Button title="Đăng nhập" onPress={handleLogin}></Button>

      <View style={styles.noAccount}>
        <Text>Chưa có tài khoản?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={{ color: "#2805FF", marginLeft: 5 }}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;
