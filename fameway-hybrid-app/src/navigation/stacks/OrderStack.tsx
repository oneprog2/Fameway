import { CheckoutScreen, SuccessPaiementScreen } from "@screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const OrderStack = createNativeStackNavigator();

export const OrderStackNavigator = () => {
  return (
    <OrderStack.Navigator
      screenOptions={{ headerShown: false, animation: "none" }}
    >
      <OrderStack.Screen name="Checkout" component={CheckoutScreen} />
      <OrderStack.Screen
        name="SuccessPaiement"
        component={SuccessPaiementScreen}
      />
    </OrderStack.Navigator>
  );
};
