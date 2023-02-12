import { BottomButton, PageContainer, Stepper, Text } from "@components";
import { View } from "react-native";

export const ConfirmationScreen = ({ navigation }) => {
  const steps = [
    {
      label: "Livraison",
    },
    {
      label: "Paiement",
    },
    {
      label: "Récapitulatif",
    },
  ];

  return (
    <PageContainer
      edges={["top", "bottom", "left", "right"]}
      goBack
      onPress={() => navigation.navigate("Search")}
      title="✅ Confirmation"
      footer={
        <BottomButton
          label={"🛍️ Continuer le shopping"}
          onPress={() =>
            navigation.navigate("CustomerStack", {
              screen: "Home",
            })
          }
        ></BottomButton>
      }
    >
      <View className="flex-1 py-6">
        <Stepper steps={steps} activeStep={3} />
      </View>
      <Text>ShippingScreen</Text>
    </PageContainer>
  );
};
