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
import { API_HOST } from "@env";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

const SignUp = () => {
  const navigation = useNavigation();
  const { dispatch } = useContext(AppContext);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [show, setShow] = useState(false);

  const handelSignUp = async () => {
    const data = {
      username: username,
      password: password,
      email: email,
      phone: phone,
    };
    console.log(data);
    alert("Đăng ký thành công")

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
    setTimeout(() => {
      navigation.navigate("SignIn");
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          console.log("bakc");
          navigation.goBack();
        }}
        style={{ marginTop: 40, marginLeft: 28 }}
      >
        <Text style={{ fontSize: 20 }}>Back</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.login}>Sign up</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.item}>
          <Text>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(val) => setUsername(val)}
          ></TextInput>
        </View>

        <View style={styles.item}>
          <Text>Password</Text>
          <TextInput
            style={[styles.input, { paddingRight: 50 }]}
            placeholder="Password"
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

        <View style={[styles.item, { marginTop: -8 }]}>
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(val) => setEmail(val)}
          ></TextInput>
        </View>

        <View style={styles.item}>
          <Text>Phone</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone"
            onChangeText={(val) => setPhone(val)}
          ></TextInput>
        </View>
      </View>

      <TouchableOpacity style={styles.signUp} onPress={handelSignUp}>
        <Text style={{fontSize: 20}}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    marginTop: 50,
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
    marginBottom: 20,
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
  signUp: {
    marginHorizontal: 24,
    height: 50,
    backgroundColor: '#B4AAF2',
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",

  },
 
});
