import { InfluencersCard } from "@components";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

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
    <FlatList
      keyExtractor={(item) => item.id}
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
