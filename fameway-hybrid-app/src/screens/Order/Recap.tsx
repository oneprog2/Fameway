import { BottomButton, PageContainer, Stepper, Text } from "@components";
import { View } from "react-native";

export const RecapScreen = ({ navigation }) => {
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
      title="🔥 Récapitulatif"
      footer={
        <BottomButton
          label={"Confirmer la commande"}
          onPress={() => navigation.navigate("Confirmation")}
        ></BottomButton>
      }
    >
      <View className="flex-1 py-6">
        <Stepper steps={steps} activeStep={2} />
      </View>
      <Text>ShippingScreen</Text>
    </PageContainer>
  );
};
