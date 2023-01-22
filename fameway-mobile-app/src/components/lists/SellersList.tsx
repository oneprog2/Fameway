import { FlashList } from "@shopify/flash-list";
import { InfluencersCard } from "@components";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

type Seller = {
  id: string;
  name: string;
  image: any;
};

export type SellersListProps = {
  sellers: Seller[];
  horizontal?: boolean;
};

export const SellersList = ({
  sellers,
  horizontal = true,
}: SellersListProps) => {
  const navigation = useNavigation();

  return (
    <FlashList
      estimatedItemSize={200}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={() => <View className="pl-4" />}
      data={sellers}
      renderItem={({ item }) => (
        <View className="pl-4">
          <InfluencersCard
            onPress={() => navigation.navigate("Store", { item: item })}
            backgroundColor="#f4f4f4"
            key={item.id}
            name={item.name}
            image={item.image}
          />
        </View>
      )}
    />
  );
};
