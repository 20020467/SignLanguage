import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { LoadingModal } from 'react-native-loading-modal'
import { LoginSuccess, useGlobalContext } from "../../context";
import { auth } from "../../server_connector";
import { SignInStyles as styles } from "../styles";
import { HttpStatusCode } from "axios";

const SignUp = () => {
  const navigation = useNavigation();
  const { state, dispatch } = useGlobalContext();

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();
  const [show, setShow] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const { state: globalState } = useGlobalContext()

  const signUp = async () => {
    setIsRegistering(true)

    try {
      let response = await auth.register({ username, email, phone, password, rePassword }, globalState.token)
      let data = response.data
      // const token = res.data?.data?.token
      if (data) {
        setIsRegistering(false)
        ToastAndroid.show("Đăng ký thành công!", ToastAndroid.SHORT)

        response = await auth.login({ username, password }, globalState.token)
        let data = response.data.data

        if (response.data) {
          dispatch(LoginSuccess({
            id: data.id,
            username: data.username,
            token: data.token,
          }))
          navigation.navigate("MainScreen");
        }

        // setup to handle potential errors
      }
    } catch (error) {
      console.log(`SignUp: ${error}`)
      if (error.response.status == HttpStatusCode.Unauthorized) {
        // console.log(response.data)
        ToastAndroid.show("Sai thông tin đăng nhập, vui lòng thử lại", ToastAndroid.SHORT)
      } else if (error.response.status == HttpStatusCode.BadRequest) {
        // console.log(response.data)
        ToastAndroid.show("Sai thông tin đăng nhập, vui lòng thử lại", ToastAndroid.SHORT)
      }
    } finally {
      setIsRegistering(false)
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.login}>Đăng ký</Text>
      </View> */}

      <View style={styles.body}>
        <View style={styles.item}>
          <Text>Tên đăng nhập</Text>
          <TextInput
            style={styles.input}
            placeholder="(bắt buộc)"
            defaultValue={username}
            onChangeText={(val) => setUsername(val)}
          ></TextInput>
        </View>

        <View style={styles.item}>
          <Text>email</Text>
          <TextInput
            style={styles.input}
            placeholder="(tùy chọn)"
            defaultValue={email}
            onChangeText={(val) => setEmail(val)}
          ></TextInput>
        </View>

        <View style={styles.item}>
          <Text>Số điện thoại</Text>
          <TextInput
            style={styles.input}
            placeholder="(tùy chọn)"
            defaultValue={phone}
            onChangeText={(val) => setPhone(val)}
          ></TextInput>
        </View>

        <View style={styles.item}>
          <Text>Mật khẩu</Text>
          <TextInput
            style={[styles.input, { paddingRight: 50 }]}
            placeholder="(bắt buộc)"
            defaultValue={password}
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

        <View style={styles.item}>
          <Text>Nhập lại mật khẩu</Text>
          <TextInput
            style={[styles.input, { paddingRight: 50 }]}
            placeholder="(bắt buộc)"
            defaultValue={rePassword}
            secureTextEntry={!show}
            onChangeText={(val) => setRePassword(val)}
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

      <Button title="Đăng ký" onPress={signUp}></Button>

      <View style={styles.noAccount}>
        <Text>Đã có tài khoản?</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: "#2805FF", marginLeft: 5 }}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>

      <LoadingModal modalVisible={isRegistering} task='Đang đăng ký' />
    </View>
  );
};

export default SignUp;
