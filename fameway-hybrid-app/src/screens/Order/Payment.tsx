import { BottomButton, PageContainer, Stepper, Text } from "@components";
import { View } from "react-native";

export const PaymentScreen = ({ navigation, route }) => {
  const shippingAddress = route?.params?.shippingAddress;

  const steps = [
    {
      label: "Récap",
    },
    {
      label: "Paiement",
    },
    {
      label: "Confirmation",
    },
  ];

  return (
    <PageContainer
      edges={["top", "bottom", "left", "right"]}
      goBack
      onPress={() => navigation.navigate("Search")}
      title="💳 Paiement"
      footer={
        <BottomButton
          label={"Confirmer le paiement"}
          onPress={() => navigation.navigate("Recap")}
        ></BottomButton>
      }
    >
      <View className="flex-1 py-6">
        <Stepper steps={steps} activeStep={1} />
      </View>
      <Text>ShippingScreen</Text>
    </PageContainer>
  );
};
