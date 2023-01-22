import { Button, CustomIcon } from "@components";
import { View } from "react-native";

export const AddToCartButton = () => {
  return (
    <View className="flex-row w-screen pt-3 transparent items-end px-3">
      <View className="flex-1 px-3">
        <Button
          role="normal"
          label="Ajouter au panier"
          size="lg"
          roundness="full"
        />
      </View>
      <View className="px-3">
        <Button
          role="grey"
          startSlot={<CustomIcon name="heart" color={"dark"} size={35} />}
          size="lg"
          roundness="full"
        />
      </View>
    </View>
  );
};
