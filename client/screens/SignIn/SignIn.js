import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AppContext } from "../../context";
import { SignInStyles as styles } from "../styles";

const SignIn = () => {
  const navigation = useNavigation();
  const { dispatch } = useContext(AppContext);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);

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
