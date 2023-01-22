import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen, SignUpScreen } from "@screens";

const AuthStack = createNativeStackNavigator();

export const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={LoginScreen}
      />
      <AuthStack.Screen
        options={{
          headerShown: false,
        }}
        name="SignUp"
        component={SignUpScreen}
      />
    </AuthStack.Navigator>
  );
};
