import {
  ShippingScreen,
  PaymentScreen,
  RecapScreen,
  ConfirmationScreen,
} from "@screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const OrderStack = createNativeStackNavigator();

export const OrderStackNavigator = () => {
  return (
    <OrderStack.Navigator screenOptions={{ headerShown: false }}>
      <OrderStack.Screen name="Shipping" component={ShippingScreen} />
      <OrderStack.Screen name="Payment" component={PaymentScreen} />
      <OrderStack.Screen name="Recap" component={RecapScreen} />
      <OrderStack.Screen name="Confirmation" component={ConfirmationScreen} />
    </OrderStack.Navigator>
  );
};
