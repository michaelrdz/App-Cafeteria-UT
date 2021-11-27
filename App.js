import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import Home from "./screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// We create an instance of the StackNavigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // Navigator container will contain all navigation flow of our app
    <NavigationContainer>
      {/* We set the navigator as a Stack navigator, this one will allow us to handle navigation with a stack instead of tabs */}
      <Stack.Navigator>
        {/* Each stack screen will contain a children with the inner props required to work */}
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {(props) => <Login {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => <Home {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
