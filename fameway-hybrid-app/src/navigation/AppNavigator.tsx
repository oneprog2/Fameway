import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { PresentationScreen, ArticleDetailScreen, StoreScreen } from "@screens";
import { useColorScheme } from "react-native";
import { useGetOnboardingStatus } from "@hooks";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OrderStackNavigator, CustomerStackNavigator } from "@navigation";
import { useState } from "react";
import * as Linking from "expo-linking";

const prefix = Linking.createURL("/");

const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();

export const AppNavigator = () => {
  const scheme = useColorScheme();
  const { isFirstLaunch, isLoading: onboardingIsLoading } =
    useGetOnboardingStatus();
  const [logged, setlogged] = useState(false);

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        CustomerStack: {
          screens: {
            CustomerStackTabs: {
              screens: {
                Home: "home",
                Profile: "profile",
                Search: "search",
                WishList: "wishlist",
              },
            },
          },
        },
      },
    },
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      theme={scheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Presentation"}
      >
        {/* {(() => {
          if (isFirstLaunch)
            return (
              <>
                <Stack.Screen
                  name="Presentation"
                  component={PresentationScreen}
                />
              </>
            );
          return ( */}
        <Stack.Screen name="CustomerStack" component={CustomerStackNavigator} />

        <Stack.Screen
          name="OrderStack"
          component={OrderStackNavigator}
          options={{
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
