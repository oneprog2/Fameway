import { PageContainer } from "@components";
import { View } from "react-native";

export const SuccessPaiementScreen = ({ navigation }) => {
  return (
    <PageContainer
      edges={["top", "bottom", "left", "right"]}
      goBack
      onPress={() =>
        navigation.navigate("CustomerStack", {
          screen: "HomeStack",
        })
      }
      title="✅ Confirmation"
    >
      <View></View>
    </PageContainer>
  );
};
