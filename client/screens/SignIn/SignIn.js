import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import CustomText from "../../components/CustomText";
import { LoginSuccess } from "../../context/AppAction";
import { API_HOST } from "@env";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

const SignIn = () => {
  const navigation = useNavigation();
  const { dispatch } = useContext(AppContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [warning, setWarning] = useState({
    username: "",
    password: ""
  })
console.log(warning);
  const isValid = () => {
    let isValid = true
    console.log(username, password);
    if (username === "") {
      setWarning(prevState => ({...prevState, username: "Nhap username"}));
      isValid = false
    }
    if (password === "") {
      setWarning(prevState => ({...prevState, password: "Nhap password"}));
      isValid = false
    }
    if(isValid) {
      handleLogin();
    }

  }

  const handleLogin = async () => {
    // const data = {
    //   username: username,
    //   password: password,
    // };
    // console.log(data);

    // try {
    //   // console.log("fetch");
    //   const res = await axios.post(`${API_HOST}/api/auth/login`, data);
    //   const loginResponse = res.data;

    //   const userResponse = {
    //     username: loginResponse.data.data.username,
    //     token: loginResponse.data.token,
    //   };
    //   if (loginResponse.data.data.username == username) {
    //     dispatch(LoginSuccess(userResponse));
    //     navigation.navigate("MainScreen");
    //   }
    // } catch (error) {
    //   console.log(error, "Không fetch dc // SigninScreen");
    //   // let response = error.response.data;
    // }
    navigation.navigate("MainScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomText textValue={"Đăng nhập"} fontSize={28} />
      </View>

      <View style={styles.body}>
        <View style={styles.item}>
          <Text>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onFocus={() => setWarning(prevState => ({...prevState, username: ""}))}
            onChangeText={(val) => setUsername(val)}
          ></TextInput>
          <Text style={{color: "red", marginTop: -5}}>{warning.username}</Text>
        </View>

        <View style={styles.item}>
          <Text>Password</Text>
          <TextInput
            style={[styles.input, { paddingRight: 50 }]}
            placeholder="Password"
            onFocus={() => setWarning(prevState => ({...prevState, password: ""}))}
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
          <Text style={{color: "red", marginTop: -5}}>{warning.password}</Text>
        </View>
      </View>

      {/* <Button title="Login" onPress={isValid}></Button> */}

      <TouchableOpacity style={styles.loginButton} onPress={isValid}>
        <Text style={{fontSize: 20}}>Đăng nhập</Text>
      </TouchableOpacity>

      <View style={styles.noAccount}>
        <Text>Bạn chưa có tài khoản?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={{ color: "#2805FF", marginLeft: 5 }}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    marginTop: 110,
    marginLeft: 24,
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
  },
  show: {
    position: "absolute",
    fontSize: 25,
    right: 15,
    top: 37,
  },
  loginButton: {
    marginHorizontal: 24,
    height: 50,
    backgroundColor: '#B4AAF2',
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",

  },
  noAccount: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
