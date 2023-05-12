import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { API_HOST } from "@env";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

const SignUp = () => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [showRepassword, setShowRepassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    rePassword: "",
  });
  const [warning, setWarning] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    rePassword: "",
  });

  const isValid = () => {
    let isValid = true;
    if (input.username === "") {
      setWarning((prevState) => ({
        ...prevState,
        username: "Nhập tên đăng nhập",
      }));
      isValid = false;
    }
    if (input.password === "") {
      setWarning((prevState) => ({ ...prevState, password: "Nhập mật khẩu" }));
      isValid = false;
    }
    if (input.rePassword === "") {
      setWarning((prevState) => ({
        ...prevState,
        rePassword: "Nhập lại mật khẩu",
      }));
      isValid = false;
    } else if (input.rePassword != input.password) {
      setWarning((prevState) => ({
        ...prevState,
        rePassword: "Mật khẩu không khớp",
      }));
      isValid = false;
    }
    if (input.email === "") {
      setWarning((prevState) => ({ ...prevState, email: "Nhập email" }));
      isValid = false;
    } else if (!isValidEmail(input.email)) {
      setWarning((prevState) => ({
        ...prevState,
        email: "Email khong hop le",
      }));
      isValid = false;
    }
    if (input.phone === "") {
      setWarning((prevState) => ({
        ...prevState,
        phone: "Nhập số điện thoại",
      }));
      isValid = false;
    } else if (!isPhone(input.phone)) {
      setWarning((prevState) => ({
        ...prevState,
        phone: "Số điện thoại không đúng định dạng",
      }));
      isValid = false;
    }
    if (isValid) {
      handelSignUp();
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

  const handelSignUp = async () => {
    setLoading(true);
    const data = {
      username: input.username,
      password: input.password,
      email: input.email,
      phone: input.phone,
      rePassword: input.rePassword,
    };

    try {
      const res = await axios.post(`${API_HOST}/api/auth/register`, data);
      if (res.data.message == "Register successfully") {
        const ConfirmButton = {
          text: "Đồng ý",
          onPress: () => navigation.navigate("SignIn"),
        };

        Alert.alert("Đăng ký thành công!", undefined, [ConfirmButton], {
          cancelable: true,
        });
      }
    } catch (error) {
      let response = error.response.data;
      if (response.message === "This username already exist") {
        setWarning((prevState) => ({
          ...prevState,
          username: "Tên đăng nhập này đã có người sử dụng!",
        }));
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Icon
        style={styles.back}
        name="arrow-back"
        onPress={() => {
          console.log("bakc");
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.signup}>Đăng ký tài khoản</Text>
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
              onChangeText={(val) =>
                setInput((prevState) => ({ ...prevState, username: val }))
              }
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
              secureTextEntry={!show}
              onFocus={() =>
                setWarning((prevState) => ({ ...prevState, password: "" }))
              }
              onChangeText={(val) =>
                setInput((prevState) => ({ ...prevState, password: val }))
              }
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
                marginBottom: 5,
                fontFamily: "Poppins-Regular",
              }}
            >
              {warning.password}
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16 }}>
              Nhập lại mật khẩu
            </Text>
            <TextInput
              style={[styles.input, { paddingRight: 50 }]}
              placeholder="Nhập lại mật khẩu"
              secureTextEntry={!showRepassword}
              onFocus={() =>
                setWarning((prevState) => ({ ...prevState, rePassword: "" }))
              }
              onChangeText={(val) =>
                setInput((prevState) => ({ ...prevState, rePassword: val }))
              }
            ></TextInput>
            {showRepassword ? (
              <Icon
                name="ios-eye-off-outline"
                style={styles.show}
                onPress={() => setShowRepassword(!showRepassword)}
              />
            ) : (
              <Icon
                name="ios-eye-outline"
                style={styles.show}
                onPress={() => setShowRepassword(!showRepassword)}
              />
            )}
            <Text
              style={{
                color: "red",
                marginTop: -5,
                marginBottom: 5,
                fontFamily: "Poppins-Regular",
              }}
            >
              {warning.rePassword}
            </Text>
          </View>

          <View style={[styles.item, { marginTop: -8 }]}>
            <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16 }}>
              Email
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              onFocus={() =>
                setWarning((prevState) => ({ ...prevState, email: "" }))
              }
              onChangeText={(val) =>
                setInput((prevState) => ({ ...prevState, email: val }))
              }
            ></TextInput>
            <Text
              style={{
                color: "red",
                marginTop: -5,
                fontFamily: "Poppins-Regular",
              }}
            >
              {warning.email}
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16 }}>
              Số điện thoại
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập số điện thoại"
              keyboardType="number-pad"
              onFocus={() =>
                setWarning((prevState) => ({ ...prevState, phone: "" }))
              }
              onChangeText={(val) =>
                setInput((prevState) => ({ ...prevState, phone: val }))
              }
            ></TextInput>
            <Text
              style={{
                color: "red",
                marginTop: -5,
                fontFamily: "Poppins-Regular",
              }}
            >
              {warning.phone}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.signUp} onPress={isValid}>
          {loading ? (
            <Image
              style={styles.loading}
              source={require("../../assets/img/Spinner-1s-200pxNew.gif")}
            ></Image>
          ) : (
            <Text style={{ fontSize: 20, fontFamily: "Poppins-Regular" }}>
              Đăng ký
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
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
    display: "flex",
    marginTop: 10,
    marginLeft: 24,
    flexDirection: "row",
  },
  back: {
    marginTop: 40,
    marginLeft: 28,
    fontSize: 28,
  },
  signup: {
    fontSize: 24,
    fontWeight: 400,
    fontFamily: "Poppins-Regular",
  },
  body: {
    paddingHorizontal: 24,
    marginVertical: 20,
  },
  item: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 5,
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
  signUp: {
    marginHorizontal: 24,
    height: 50,
    backgroundColor: "#9FD0E6",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  loading: {
    width: 50,
    height: 50,
    position: "absolute",
  },
});
