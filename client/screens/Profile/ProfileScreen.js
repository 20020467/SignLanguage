import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ProfileScreenStyles as styles } from "../styles";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const user = {
    username: "Quyet",
    password: "123456",
    email: "quyet@gmail.com",
    phone: "123456789",
  };

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [phone, setphone] = useState(user.phone);

  const handleUpdateUsername = async () => {
    if (username !== user.username) {
      console.log(username);
    } else {
      console.log("username not change");
    }
  };

  const handleUpdateEmail = async () => {
    if (email !== user.email) {
      console.log(email);
    } else {
      alert("email not change");
    }
  };

  const handleUpdatePassword = async () => {
    if (password !== user.password) {
      console.log(password);
    } else {
      alert("Password not change");
    }
  };

  const handleUpdatePhone = async () => {
    if (phone !== user.phone) {
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
              <Text style={{ color: "#0C8CE9", marginTop: 10 }}>
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
                defaultValue={user.username}
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
                defaultValue={user.email}
                style={styles.inputText}
                keyboardType="email-address"
              />
              <TouchableOpacity onPress={handleUpdateEmail}>
                <Text style={styles.update}>Update</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.item}>
              <Text style={styles.text}>Password</Text>
              <TextInput
                onChangeText={(text) => setPassword(text)}
                placeholder="Password"
                defaultValue={user.password}
                style={styles.inputText}
                // keyboardType="visible-password"assads
                secureTextEntry={true}
              />
              <TouchableOpacity onPress={handleUpdatePassword}>
                <Text style={styles.update}>Update</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.item}>
              <Text style={styles.text}>Phone</Text>
              <TextInput
                onChangeText={(text) => setphone(text)}
                placeholder="Phone"
                defaultValue={user.phone}
                style={styles.inputText}
                keyboardType="number-pad"
              />
              <TouchableOpacity onPress={handleUpdatePhone}>
                <Text style={styles.update}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              console.log("bakc");
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

          <Button title="logout" onPress={() => navigation.navigate("SignIn")}>
            Log out
          </Button>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
