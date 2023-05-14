import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./screens/MainScreen/MainScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import SignIn from "./screens/SignIn/SignIn";
import SignUp from "./screens/SignUp/SignUp";
import Flashcard from "./screens/Study/FlashCard";
import Exercise from "./screens/Study/MultipleChoice";
import { COLOR } from "./screens/styles";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={({ navigation, route }) => ({
          headerShown: true, // set false by Navigator (above)
          title: 'Đăng ký',
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
