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
import { LoginSuccess } from "../../context/AppAction";
import { API_HOST } from "@env";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

const SignIn = () => {
  const navigation = useNavigation();
  const { dispatch } = useContext(AppContext);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);

  const handleLogin = async () => {
    const data = {
      username: username,
      password: password,
    };
    console.log(data);

    try {
      // console.log("fetch");
      const res = await axios.post(`${API_HOST}/api/auth/login`, data);
      const loginResponse = res.data;

      const userResponse = {
        username: loginResponse.data.data.username,
        token: loginResponse.data.token,
      };
      if (loginResponse.data.data.username == username) {
        dispatch(LoginSuccess(userResponse));
        navigation.navigate("MainScreen");
      }
    } catch (error) {
      console.log(error, "khong fetch dc");
      // let response = error.response.data;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.login}>Login</Text>
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
      </View>

      <Button title="Login" onPress={handleLogin}></Button>

      <View style={styles.noAccount}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={{ color: "#2805FF", marginLeft: 5 }}>Sign Up</Text>
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
  noAccount: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
