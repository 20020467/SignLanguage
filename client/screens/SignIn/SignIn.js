import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { LoginSuccess, useGlobalContext } from "../../context";
import { auth } from "../../server_connector";
import { SignInStyles as styles } from "../styles";

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
        console.log(`Login: ${reason}`)
      })
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
