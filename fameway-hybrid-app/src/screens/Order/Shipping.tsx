import { BottomButton, PageContainer, Text } from "@components";

export const ShippingScreen = ({ navigation }) => {
  return (
    <PageContainer
      edges={["top", "bottom", "left", "right"]}
      goBack
      onPress={() => navigation.navigate("Search")}
      title="🚚 Livraison"
      footer={
        <BottomButton
          label={"Choisir mon mode de paiement"}
          onPress={() => navigation.navigate("Payment")}
        ></BottomButton>
      }
    >
      <Text>ShippingScreen</Text>
    </PageContainer>
  );
};
