import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./screens/MainScreen/MainScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import EditProfile from "./screens/Profile/EditProfile";
import ChangePassword from "./screens/Profile/ChangePassword";
import SignIn from "./screens/SignIn/SignIn";
import SignUp from "./screens/SignUp/SignUp";
import Flashcard from "./screens/Study/FlashCard";
import Exercise from "./screens/Study/MultipleChoice";
import SplashScreen from "./screens/Splash/SplashScreen";

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
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="FlashCard" component={Flashcard} />
      <Stack.Screen name="MultipleChoice" component={Exercise} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
