// App.js  (or wherever your root component lives)

import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store"; // ← adjust path
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SimpleGridLayout from "./screens/SimpleGridLayout"; // your grid screen
// import ReelsViewer from './screens/ReelsViewer';
// import other screens...

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Grid" component={SimpleGridLayout} />
          {/* <Stack.Screen name="Reels" component={ReelsViewer} /> */}
          {/* other screens */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
