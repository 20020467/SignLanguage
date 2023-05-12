import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./screens/MainScreen/MainScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import ChangePasswordScreen from "./screens/Profile/ChangePasswordScreen";
import SignIn from "./screens/SignIn/SignIn";
import SignUp from "./screens/SignUp/SignUp";
import Flashcard from "./screens/Study/FlashCard";
import Exercise from "./screens/Study/MultipleChoice";
import { COLOR } from "./screens/styles";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { Image } from "react-native";
import Header from "./components/Header";

const Stack = createNativeStackNavigator();
function Sample() {
  return (
    <View style={{ justifyContent: 'center', height: '100%', width: '100%' }}>
      <Text style={{ height: '100%', textAlign: 'center', fontSize: 22, fontWeight: '700' }}>Thông tin cá nhân</Text>
    </View>
  )
}

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="MainScreen"
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={({ navigation, route }) => ({
          headerShown: true, // maybe set false by HomeScreen
          title: 'Đăng ký',
          // title: '',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: COLOR.Secondary_1,
          },
          headerTintColor: COLOR.White,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation, route }) => ({
          headerShown: true, // maybe set false by HomeScreen
          title: 'Thông tin cá nhân',
          headerTitleAlign: 'center',
          headerBackTitleStyle: { backgroundColor: 'yellow' },
          headerStyle: {
            backgroundColor: COLOR.Secondary_1,
          },
          headerTintColor: COLOR.White,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />
      {/* <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen} // consider making use of modal instead
        options={({ navigation, route }) => ({
          headerShown: true, // maybe set false by HomeScreen
          title: 'Thông tin cá nhân',
          headerTitleAlign: 'center',
          headerBackTitleStyle: { backgroundColor: 'yellow' },
          headerStyle: {
            backgroundColor: COLOR.Secondary_1,
          },
          headerTintColor: COLOR.White,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      /> */}
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen
        name="FlashCard"
        component={Flashcard}
        options={({ navigation, route }) => ({
          headerShown: true, // maybe set false by HomeScreen
          title: 'FlashCard',
          // title: '',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: COLOR.Secondary_1,
          },
          headerTintColor: COLOR.White,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />
      <Stack.Screen
        name="MultipleChoice"
        component={Exercise}
        options={({ navigation, route }) => ({
          headerShown: true, // maybe set false by HomeScreen
          title: 'Câu hỏi trắc nghiệm',
          // title: '',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: COLOR.Secondary_1,
          },
          headerTintColor: COLOR.White,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
