import { BottomButton, PageContainer, Text } from "@components";

export const ConfirmationScreen = ({ navigation }) => {
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
      <Text>ShippingScreen</Text>
    </PageContainer>
  );
};
