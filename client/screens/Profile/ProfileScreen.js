import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLOR, ProfileScreenStyles as styles } from "../styles";
import { auth } from "../../server_connector";
import { useGlobalContext, LogOut } from "../../context";

// should put password setting to another page
const ProfileScreen = () => {
  const { state: globalState } = useGlobalContext()

  const currentInfo = useRef({
    username: "",
    email: "",
    phone: "",
  })

  const [username, setUsername] = useState(currentInfo.username);
  const [email, setEmail] = useState(currentInfo.email);
  const [phone, setPhone] = useState(currentInfo.phone);
  const [password, setPassword] = useState(''); // not persist this, only handle on server
  const [rePassword, setRePassword] = useState(''); // not persist this, only handle on server
  const [changingPassword, setChangingPassword] = useState(false)

  const navigation = useNavigation();

  useEffect(() => {
    if (globalState.token) {
      auth.getUserInfo(globalState.token)
        .then(response => {
          updateInfo(response.data.data)
        })
        .catch(msg => {
          console.log(msg) // TRACE
          Alert.alert('Dữ liệu chưa được cập nhật. Vui lòng tải lại trang.')
        })
    } else {
      Alert.alert('Đã hết hạn đăng nhập. Vui lòng đăng nhập lại', null, [
        { text: 'Đồng ý', onPress: () => navigation.navigate("SignIn") }
      ])
    }

  }, [])

  const updateInfo = ({ username, email, phone }) => {
    currentInfo.current = { username, email, phone }
    setUsername(username)
    setEmail(email)
    setPhone(phone)
  }

  const requestUpdate = () => {
    auth.changeInfo({ username, email, phone }, globalState.token)
      .then(response => {
        if (response.status == 200) {
          updateInfo(response.data.data)
        }
      }).catch(msg => {
        console.log(msg) // TRACE
        Alert.alert("Cập nhật không thành công. Vui lòng kiểm tra kết nối.")
      })
  }

  const handleUpdateUsername = () => {
    if (username !== currentInfo.username) {
      console.log(username);
    } else {
      console.log("username not change");
    }
  };

  const handleUpdateEmail = () => {
    if (email !== currentInfo.email) {
      console.log(email);
    } else {
      alert("email not change");
    }
  };

  const handleUpdatePassword = () => {
    if (password !== currentInfo.password) {
      console.log(password);
    } else {
      alert("Password not change");
    }
  };

  const handleUpdatePhone = () => {
    if (phone !== currentInfo.phone) {
      console.log(phone);
    } else {
      alert("phone not change");
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <View>
        <ScrollView>
          <View style={styles.header}>
            <Image
              style={styles.img}
              source={require("../../assets/icon.png")}
            ></Image>
            <TouchableOpacity>
              <Text style={styles.headerText}>
                Change profile photo
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            <View style={styles.item}>
              <Text style={styles.text}>Username</Text>
              <TextInput
                onChangeText={(text) => setUsername(text)}
                placeholder="Username"
                defaultValue={username}
                style={styles.inputText}
              />
              <TouchableOpacity onPress={handleUpdateUsername}>
                <Text style={styles.update}>Update</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.item}>
              <Text style={styles.text}>Email</Text>
              <TextInput
                onChangeText={(text) => setEmail(text)}
                placeholder="Email"
                defaultValue={email}
                style={styles.inputText}
                keyboardType="email-address"
              />
              <TouchableOpacity onPress={handleUpdateEmail}>
                <Text style={styles.update}>Update</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.item}>
              <Text style={styles.text}>Phone</Text>
              <TextInput
                onChangeText={(text) => setPhone(text)}
                placeholder="Phone"
                defaultValue={phone}
                style={styles.inputText}
                keyboardType="number-pad"
              />
              <TouchableOpacity onPress={handleUpdatePhone}>
                <Text style={styles.update}>Update</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.item}>
              <Text style={styles.text}>Mật khẩu</Text>
              <TextInput
                onChangeText={(text) => {
                  setPassword(text)
                  setChangingPassword(text.length > 0)
                }}
                placeholder="Password"
                style={styles.inputText}
                // keyboardType="visible-password"assads
                secureTextEntry={true}
              />
            </View>
            {changingPassword &&
              <View style={styles.item}>
                <Text style={styles.text}>Nhập lại mật khẩu</Text>
                <TextInput
                  onChangeText={(text) => setRePassword(text)}
                  placeholder="Password"
                  style={styles.inputText}
                  // keyboardType="visible-password"assads
                  secureTextEntry={true}
                />
              </View>
            }

          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              position: "absolute",
              top: 40,
              left: 20,
            }}
          >
            <Text>Back</Text>
          </TouchableOpacity>

          <View style={{ width: '100%', height: 180, alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity style={{ marginBottom: 1, backgroundColor: COLOR.Secondary, height: 45, borderRadius: 5, width: '80%', justifyContent: 'center' }} onPress={handleUpdatePassword}>
              <Text style={{ textAlign: 'center', color: COLOR.White }}>Cập nhật thông tin</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginBottom: 1, backgroundColor: COLOR.Secondary, height: 45, borderRadius: 5, width: '80%', justifyContent: 'center' }} onPress={handleUpdatePassword}>
              <Text style={{ textAlign: 'center', color: COLOR.White }}>Cập nhật mật khẩu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ backgroundColor: COLOR.Secondary, height: 45, borderRadius: 5, width: '80%', justifyContent: 'center' }} onPress={() => {
              LogOut()
              navigation.navigate("SignIn")
            }}
            >
              <Text style={{ textAlign: 'center', color: COLOR.White }}>Đăng xuất</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
