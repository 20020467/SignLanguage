import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { HttpStatusCode } from "axios";
import { LogOut, useGlobalContext } from "../../context";
import { auth } from "../../server_connector";
import { COLOR, ProfileScreenStyles as styles } from "../styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// should put password setting to another page
const ProfileScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState(''); // not persist this, only handle on server
  const [rePassword, setRePassword] = useState(''); // not persist this, only handle on server
  const [oldPassword, setOldPassword] = useState(''); // not persist this, only handle on server
  const [changingPassword, setChangingPassword] = useState(false)

  const currentInfo = useRef({
    username: "",
    email: "",
    phone: "",
  })

  const { state: globalState } = useGlobalContext()

  const navigation = useNavigation();

  const insets = useSafeAreaInsets()

  useEffect(() => {
    if (globalState.token) {
      auth.getUserInfo(globalState.token)
        .then(response => {
          if (response.status == HttpStatusCode.Ok) {
            updateInfo(response.data.data)
          }
        })
        .catch(msg => {
          console.log(msg) // TRACE
          Alert.alert('Dữ liệu chưa được cập nhật. Vui lòng tải lại trang.', null, null, { cancelable: true })
        })
    } else {
      Alert.alert('Đã hết hạn đăng nhập. Vui lòng đăng nhập lại', null, [
        { text: 'Đồng ý', onPress: () => navigation.navigate("SignIn") }
      ], { cancelable: true })
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
        if ([HttpStatusCode.Ok, HttpStatusCode.Accepted].includes(response.status)) {
          updateInfo(response.data.data)
          Alert.alert("Cập nhật thông tin thành công", null, null, { cancelable: true })
        }
      }).catch(msg => {
        console.log(msg) // TRACE
        Alert.alert("Cập nhật không thành công. Vui lòng kiểm tra kết nối.", null, null, { cancelable: true })
      })
  }

  const handleUpdateUsername = () => {
    if (username !== currentInfo.username) {
      // console.log(username);
    } else {
      console.log("username not change");
    }
  };

  const handleUpdateEmail = () => {
    if (email !== currentInfo.email) {
      // console.log(email);
    } else {
      alert("email not change");
    }
  };

  const handleUpdatePhone = () => {
    if (phone !== currentInfo.phone) {
      // console.log(phone);
    } else {
      alert("phone not change");
    }
  };

  const handleUpdatePassword = () => {
    auth.changePassword({ oldPassword: oldPassword, newPassword: password, rePassword: rePassword }, globalState.token)
      .then(response => {
        if ([HttpStatusCode.Ok, HttpStatusCode.Accepted].includes(response.status)) {
          Alert.alert("Cập nhật mật khẩu thành công", null, null, { cancelable: true })
          setPassword('')
          setRePassword('')
          setOldPassword('')
          setChangingPassword(false)
          console.log(response.data) // TEST
        }
      }).catch(msg => {
        console.log(msg) // TRACE
        Alert.alert("Cập nhật không thành công", "Vui lòng kiểm tra mật khẩu đã nhập hoặc kết nối", null, { cancelable: true })
      })
  };

  const logout = useCallback(() => {
    Alert.alert("Bạn có muốn đăng xuất không", null, [
      {
        text: "Đồng ý", onPress: () => {
          LogOut()
          navigation.navigate("SignIn")
        }
      },
      { text: "Hủy" }
    ], { cancelable: true, })
  }, [navigation])

  const infoNotChanged = (() => {
    const current = currentInfo.current
    return (username == current.username) && (email == current.email) && (phone == current.phone)
  })

  return (
    <View style={{
      ...styles.background,
      // paddingTop: insets.top,
      // paddingBottom: insets.bottom,
      // paddingLeft: insets.left,
      // paddingRight: insets.right,
    }}>
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
                defaultValue={password}
                placeholder="Password"
                style={styles.inputText}
                // keyboardType="visible-password"assads
                secureTextEntry={true}
              />
            </View>
            {changingPassword &&
              <>
                <View style={styles.item}>
                  <Text style={styles.text}>Nhập lại mật khẩu</Text>
                  <TextInput
                    onChangeText={(text) => setRePassword(text)}
                    defaultValue={rePassword}
                    placeholder="Password"
                    style={styles.inputText}
                    // keyboardType="visible-password"assads
                    secureTextEntry={true}
                  />
                </View>
                <View style={styles.item}>
                  <Text style={styles.text}>Mật khẩu cũ</Text>
                  <TextInput
                    onChangeText={(text) => setOldPassword(text)}
                    defaultValue={oldPassword}
                    placeholder="Password"
                    style={styles.inputText}
                    // keyboardType="visible-password"assads
                    secureTextEntry={true}
                  />
                </View>
              </>
            }

          </View>
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}

          <View style={{ width: '100%', height: 180, alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={{ marginBottom: 1, backgroundColor: infoNotChanged() ? COLOR.disabled : COLOR.Secondary, height: 45, borderRadius: 5, width: '80%', justifyContent: 'center' }}
              onPress={requestUpdate}
              disabled={infoNotChanged()}
            >

              <Text style={{ textAlign: 'center', color: COLOR.White }}>Cập nhật thông tin</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginBottom: 1, backgroundColor: (password.length == 0) ? COLOR.disabled : COLOR.Secondary, height: 45, borderRadius: 5, width: '80%', justifyContent: 'center' }}
              onPress={handleUpdatePassword}
            >
              <Text style={{ textAlign: 'center', color: COLOR.White }}>Cập nhật mật khẩu</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ backgroundColor: COLOR.Secondary, height: 45, borderRadius: 5, width: '80%', justifyContent: 'center' }}
              onPress={logout}
            >
              <Text style={{ textAlign: 'center', color: COLOR.White }}>Đăng xuất</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProfileScreen;
