import React from "react";
import StackNavigator from "./StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { AppContextProvider } from "./context/AppContext";

export default function App() {

  return (
    <AppContextProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </AppContextProvider>
  );
}
