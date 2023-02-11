import { BottomButton, PageContainer, Text } from "@components";

export const RecapScreen = ({ navigation }) => {
  return (
    <PageContainer
      edges={["top", "bottom", "left", "right"]}
      goBack
      onPress={() => navigation.navigate("Search")}
      title="🔥 Récapitulatif"
      footer={
        <BottomButton
          label={"Confirmer la commande"}
          onPress={() => navigation.navigate("Payment")}
        ></BottomButton>
      }
    >
      <Text>ShippingScreen</Text>
    </PageContainer>
  );
};
