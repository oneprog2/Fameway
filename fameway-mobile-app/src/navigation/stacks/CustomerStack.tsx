import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeScreen,
  ProfileScreen,
  SearchScreen,
  WishlistScreen,
  CartScreen,
} from "@screens";
import { CartTabButton, CustomIcon, TabBarIcon } from "@components";

const CustomerStack = createBottomTabNavigator();

export const CustomerStackNavigator = () => {
  return (
    <CustomerStack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 90,
          backgroundColor: "white",
        },
      }}
    >
      <CustomerStack.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon screenName="Home" focused={focused} iconName={"icon"} />
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
      <CustomerStack.Screen
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
      <CustomerStack.Screen
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
          tabBarButton: (props) => <CartTabButton {...props} />,
        }}
      />
      <CustomerStack.Screen
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
      <CustomerStack.Screen
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
    </CustomerStack.Navigator>
  );
};
