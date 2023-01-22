import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { Button, Text, CustomIcon } from "@components";

type BreadCrumbsProps = {
  store?: {
    id: string;
    name: string;
  };
  categorie?: {
    id: string;
    name: string;
  };
  article?: {
    id: string;
    name: string;
  };
};

export const BreadCrumbs = ({
  store,
  categorie,
  article,
}: BreadCrumbsProps) => {
  const navigation = useNavigation();

  return (
    <View className="flex-row align-center">
      {store ? (
        <Button
          role="empty"
          size="flex"
          className="flex-row justify-center items-center px-2"
          startSlot={<Text weight="light">{store.name}</Text>}
          onPress={() => navigation.navigate("Store", { storeID: store.id })}
        />
      ) : null}
      {categorie && store ? (
        <View className="align-center justify-center flex-row">
          <CustomIcon
            name="chevron-right"
            size={30}
            className="text-gray-500"
          />

          <Button
            role="empty"
            size="flex"
            className="flex-row justify-center items-center px-2"
            startSlot={<Text weight="light">{categorie.name}</Text>}
            onPress={() =>
              navigation.navigate("Store", {
                storeID: store.id,
                categorieID: categorie.id,
              })
            }
          />
        </View>
      ) : null}
      {article ? (
        <View className="flex-row ">
          <CustomIcon
            name="chevron-right"
            size={30}
            className="text-gray-500"
          />
          <Button
            disabled
            role="empty"
            size="flex"
            className="flex-row justify-center items-center px-2"
            startSlot={<Text weight="bold">{article.name}</Text>}
            onPress={() =>
              navigation.navigate("Store", {
                articleID: article.id,
              })
            }
          />
        </View>
      ) : null}
    </View>
  );
};
