import { Button, CustomIcon } from "@components";
import { View } from "react-native";
import { useAtom } from "jotai";
import { currentUserState } from "../../atoms/Atoms";
import { useMutation } from "@apollo/client";
import { CREATE_CART_ITEM } from "@api";

export const AddToCartButton = ({ article, store }) => {
  const [createCartItem] = useMutation(CREATE_CART_ITEM);
  const [user, setUser] = useAtom(currentUserState);

  return (
    <View className="flex-row flex-1 pt-3 items-end">
      <View className="flex-1">
        <Button
          role="normal"
          onPress={() => {
            createCartItem({
              variables: {
                articleID: article?.id,
                cartID: user?.cartID,
              },
            });
          }}
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
