import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeScreen,
  ProfileScreen,
  SearchScreen,
  WishlistScreen,
  ArticleDetailScreen,
  StoreScreen,
} from "@screens";
import { CartTabButton, CustomIcon, TabBarIcon } from "@components";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Dashboard" component={HomeScreen} />
      <HomeStack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
      <HomeStack.Screen name="Store" component={StoreScreen} />
    </HomeStack.Navigator>
  );
};

export const CustomerStackNavigator = () => {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 90,
          backgroundColor: "white",
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon screenName="Home" focused={focused} iconName={"icon"} />
          ),
        }}
        name="HomeStack"
        component={HomeStackNavigator}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              screenName="Search"
              focused={focused}
              iconName={focused ? "search-fill" : "search-line"}
            />
          ),
        }}
        name="Search"
        component={SearchScreen}
      />
      <Tab.Screen
        name="Cart"
        component={HomeScreen}
        listeners={{
          tabPress: (e) => {},
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomIcon
              name="shopping-bag-converted"
              color="#4f4f4f"
              size={30}
            />
          ),
          tabBarButton: (props) => (
            <CartTabButton navigation={navigation} {...props} />
          ),
        }}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              screenName="Wishlist"
              focused={focused}
              iconName={focused ? "heart-fill" : "heart-line"}
            />
          ),
        }}
        name="Wishlist"
        component={WishlistScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              screenName="Profile"
              focused={focused}
              iconName={focused ? "account-circle-fill" : "account-circle-line"}
            />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};
