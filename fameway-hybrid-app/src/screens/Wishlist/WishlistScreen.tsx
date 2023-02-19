import { CART_DATA } from "@api";
import { useQuery } from "@apollo/client";
import { Button, PageContainer, Text } from "@components";
import { SafeAreaView } from "react-native";
import { Tabs, MaterialTabBar } from "react-native-collapsible-tab-view";

export const WishlistScreen = ({ navigation }) => {
  const { data, loading, error } = useQuery(CART_DATA, {
    variables: {
      wishlist: true,
    },
  });
  console.log(data);

  return (
    <PageContainer title={"Mes favoris"}>
      <Tabs.Container
        headerContainerStyle={{
          backgroundColor: "white",
          shadowOpacity: 0,
          elevation: 0,
          borderBottomColor: "transparent",
          flex: 1,
        }}
        containerStyle={{ backgroundColor: "white", flex: 1 }}
        allowHeaderOverscroll
        renderTabBar={(props) => {
          return (
            <MaterialTabBar
              indicatorStyle={{
                backgroundColor: "#000000",
                height: 2,
                borderRadius: 1000,
              }}
              labelStyle={{
                fontSize: 18,
                fontWeight: "bold",
                fontFamily: "DM-Regular",
                textTransform: "capitalize",
                width: "100%",
              }}
              contentContainerStyle={{
                flex: 1,
                width: "100%",
                // marginLeft: 30,
              }}
              style={{
                flex: 1,
                // marginLeft: 30,
              }}
              {...props}
              scrollEnabled
            />
          );
        }}
      >
        <Tabs.Tab name="❤️ Wishlist"></Tabs.Tab>
        <Tabs.Tab name="⭐ Créateurs"></Tabs.Tab>
      </Tabs.Container>
    </PageContainer>
  );
};
