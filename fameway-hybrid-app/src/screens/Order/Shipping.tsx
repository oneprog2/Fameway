import { CustomIcon, PageContainer } from "@components";

export const ShippingScreen = ({ navigation }) => {
  return (
    <PageContainer
      onPress={() => navigation.navigate("Search")}
      startSlot={<CustomIcon name="search" size={30} color="#717171" />}
      title="Fameway"
    ></PageContainer>
  );
};
