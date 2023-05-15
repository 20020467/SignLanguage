import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./screens/MainScreen/MainScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import EditProfile, { SaveButton } from "./screens/Profile/EditProfile";
import ChangePassword from "./screens/Profile/ChangePassword";
import SignIn from "./screens/SignIn/SignIn";
import SignUp from "./screens/SignUp/SignUp";
import Flashcard from "./screens/Study/FlashCard";
import Exercise from "./screens/Study/MultipleChoice";
import SplashScreen from "./screens/Splash/SplashScreen";
import { COLOR } from "./screens/styles";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SplashScreen"
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen}
        options={({ route }) => ({
          headerShown: true,
          headerTitle: 'Thông tin cá nhân',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: COLOR.Background },
          headerTitleStyle: {
            fontSize: 21,
            textAlign: "center",
            fontFamily: "Poppins-Regular",
          },
        })}
      />
      <Stack.Screen name="EditProfile" component={EditProfile}
        options={({ route }) => ({
          headerShown: true,
          headerTitle: 'Sửa thông tin',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: COLOR.Background },
          headerTitleStyle: {
            fontSize: 21,
            textAlign: "center",
            fontFamily: "Poppins-Regular",
          },
          headerRight: SaveButton,
        })}
      />
      <Stack.Screen name="ChangePassword" component={ChangePassword}
        options={({ route }) => ({
          headerShown: true,
          headerTitle: 'Đổi mật khẩu',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: COLOR.Background },
          headerTitleStyle: {
            fontSize: 21,
            textAlign: "center",
            fontFamily: "Poppins-Regular",
          },
        })}
      />
      <Stack.Screen name="FlashCard" component={Flashcard} />
      <Stack.Screen name="MultipleChoice" component={Exercise} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
