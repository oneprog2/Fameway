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
import { AuthStackNavigator, CustomerStackNavigator } from "@navigation";
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
      theme={scheme === "dark" ? DarkTheme : DefaultTheme}
      linking={linking}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Presentation"}
      >
        {(() => {
          if (isFirstLaunch)
            return (
              <>
                <Stack.Screen
                  name="Presentation"
                  component={PresentationScreen}
                />
              </>
            );
          return (
            <Stack.Group>
              <Stack.Screen
                name="CustomerStack"
                component={CustomerStackNavigator}
              />
              <Stack.Screen name="Store" component={StoreScreen} />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="ArticleDetail"
                component={ArticleDetailScreen}
              />
            </Stack.Group>
          );
        })()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
