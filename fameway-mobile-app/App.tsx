import { AppNavigator } from "@navigation";
import * as React from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import "./styles.css";
import "react-native-gesture-handler";
import { PortalProvider } from "@gorhom/portal";

SplashScreen.preventAutoHideAsync();

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
function App() {
  const [fontsLoaded] = useFonts({
    "Oblivian-Light": require("@assets/fonts/Oblivian/Oblivian-Light.otf"),
    "Oblivian-Regular": require("@assets/fonts/Oblivian/Oblivian-Medium.otf"),
    "Oblivian-Bold": require("@assets/fonts/Oblivian/Oblivian-Bold.otf"),
    "Oblivian-Thin": require("@assets/fonts/Oblivian/Oblivian-Thin.otf"),
    "DM-Bold": require("@assets/fonts/DM/DM-Bold.ttf"),
    "DM-Regular": require("@assets/fonts/DM/DM-Regular.ttf"),
    "DM-Medium": require("@assets/fonts/DM/DM-Medium.ttf"),
    IcoMoon: require("@assets/fonts/icomoon.ttf"),
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <PortalProvider>
        <StatusBar style="dark" />
        <AppNavigator />
      </PortalProvider>
    </View>
  );
}

export default App;
