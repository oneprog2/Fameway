import { BottomButton, PageContainer, Text } from "@components";

export const PaymentScreen = ({ navigation }) => {
  return (
    <PageContainer
      edges={["top", "bottom", "left", "right"]}
      goBack
      onPress={() => navigation.navigate("Search")}
      title="💳 Paiement"
      footer={
        <BottomButton
          label={"Voir le récapitulatif"}
          onPress={() => navigation.navigate("Recap")}
        ></BottomButton>
      }
    >
      <Text>ShippingScreen</Text>
    </PageContainer>
  );
};
