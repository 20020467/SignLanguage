import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Icon from "react-native-vector-icons/Ionicons";
import Lock from "react-native-vector-icons/EvilIcons";
import { useNavigation } from "@react-navigation/native";
import { API_HOST } from "@env";
import axios from "axios";

const ChangePassword = () => {
  const navigation = useNavigation();
  const { token } = useContext(AppContext);
  const axiosOptions = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    newPassword: "",
    rePassword: "",
    oldPassword: "",
  });
  const [warning, setWarning] = useState({
    newPassword: "",
    rePassword: "",
    oldPassword: "",
  });

  const handelUpdate = async () => {
    if (
      input.oldPassword == "" ||
      input.newPassword == "" ||
      input.rePassword == ""
    ) {
      if (input.oldPassword == "") {
        setWarning((prevState) => ({
          ...prevState,
          oldPassword: "Mật khẩu cũ không được bỏ trống",
        }));
      }

      if (input.newPassword == "") {
        setWarning((prevState) => ({
          ...prevState,
          newPassword: "Mật khẩu mới không được bỏ trống",
        }));
      }

      if (input.rePassword == "") {
        setWarning((prevState) => ({
          ...prevState,
          rePassword: "Mật khẩu nhập lại không được bỏ trống",
        }));
      }
      return;
    }

    if (input.newPassword != input.rePassword) {
      alert(
        "Mật khẩu mới và nhập lại mật khẩu mới không trùng nhau. Vui lòng kiểm tra lại!"
      );
      return;
    }

    if (input.oldPassword == input.newPassword) {
      alert("Mật khẩu mới không được trùng với mật khẩu cũ!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${API_HOST}/api/auth/change-password`,
        input,
        axiosOptions
      );
      if (res.data.message == "Password changed successfully") {
        setLoading(false);
        const ConfirmButton = {
          text: "Đồng ý",
          onPress: () => navigation.navigate("Profile"),
        };

        Alert.alert(
          "Thay đổi mật khẩu thành công!",
          undefined,
          [ConfirmButton],
          {
            cancelable: true,
          }
        );
      }
    } catch (error) {
      setLoading(false);
      let response = error.response.data;
      if (response.message === "Incorrect old password") {
        setWarning((prevState) => ({
          ...prevState,
          oldPassword: "Mật khẩu cũ không đúng",
        }));
      } else {
        console.log(error);
        alert("Hệ thống đang lỗi");
      }
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.back}>
          <Icon
            style={{ fontSize: 28 }}
            name="arrow-back"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 22,
            textAlign: "center",
            fontFamily: "Poppins-Regular",
          }}
        >
          Đổi mật khẩu
        </Text>
      </View>

      <View style={styles.body}>
        <View style={styles.item}>
          <Lock style={styles.lock} name="lock" />
          <TextInput
            style={styles.inputText}
            placeholder="Mật khẩu cũ"
            onFocus={() =>
              setWarning((prevState) => ({ ...prevState, oldPassword: "" }))
            }
            onChangeText={(val) =>
              setInput((prevState) => ({ ...prevState, oldPassword: val }))
            }
          />
          <Text style={styles.warning}>{warning.oldPassword}</Text>
        </View>
        <View style={styles.item}>
          <Lock style={styles.lock} name="lock" />
          <TextInput
            style={styles.inputText}
            placeholder="Mật khẩu mới"
            onFocus={() =>
              setWarning((prevState) => ({ ...prevState, newPassword: "" }))
            }
            onChangeText={(val) =>
              setInput((prevState) => ({ ...prevState, newPassword: val }))
            }
          />
          <Text style={styles.warning}>{warning.newPassword}</Text>
        </View>
        <View style={styles.item}>
          <Lock style={styles.lock} name="lock" />
          <TextInput
            style={styles.inputText}
            placeholder="Nhập lại mật khẩu mới"
            onFocus={() =>
              setWarning((prevState) => ({ ...prevState, rePassword: "" }))
            }
            onChangeText={(val) =>
              setInput((prevState) => ({ ...prevState, rePassword: val }))
            }
          />
          <Text style={styles.warning}>{warning.rePassword}</Text>
        </View>
      </View>
      <View style={styles.updateWrap}>
        <TouchableOpacity style={styles.update} onPress={handelUpdate}>
          {loading ? (
            <Image
              style={styles.loading}
              source={require("../../assets/img/Spinner-1s-200pxNew.gif")}
            ></Image>
          ) : (
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Poppins-Regular",
              }}
            >
              Đổi mật khẩu
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: 25,
  },
  header: {
    // backgroundColor: "#9FD0E6",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  back: {
    position: "absolute",
    top: 10,
    left: 20,
  },
  body: {
    padding: 25,
  },
  item: {
    marginVertical: 25,
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#607D8B",
    marginBottom: 10,
  },
  lock: {
    fontSize: 30,
    color: "#9FD0E6",
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    paddingBottom: 5,
  },
  warning: {
    position: "absolute",
    top: 33,
    left: 10,
    color: "red",
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
  updateWrap: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  update: {
    width: 150,
    backgroundColor: "#9FD0E6",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 5,
    elevation: 2,
  },
  loading: {
    width: 50,
    height: 50,
    position: "absolute",
  },
});
