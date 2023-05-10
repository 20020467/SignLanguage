import StackNavigator from "./StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { AppContextProvider } from "./context/AppContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppContextProvider>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </AppContextProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
