import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-rn";

import SimpleGridLayout from "./screens/SimpleGridLayout";

import Home from "./Home";
import CallScreen from "./VideoCalling";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <ZegoUIKitPrebuilt
        appID={410706962}
        appSign={
          "6d3a4cddc01f199cd4c67f5c23fe0095914d5d4bcba9dca17d27c4d20441f08f"
        } // ⚠️ NOT serverSecret
      >
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Grid" component={SimpleGridLayout} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Call" component={CallScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ZegoUIKitPrebuilt>
    </Provider>
  );
}

export default App;
