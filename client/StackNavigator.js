import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./screens/MainScreen/MainScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import SignIn from "./screens/SignIn/SignIn";
import SignUp from "./screens/SignUp/SignUp";
import Flashcard from "./screens/Study/FlashCard";
import Exercise from "./screens/Study/MultipleChoice";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SignIn"
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name = 'FlashCard' component={Flashcard}/>
      <Stack.Screen name="MultipleChoice" component={Exercise}/>
    </Stack.Navigator>
  );
};

export default StackNavigator;
