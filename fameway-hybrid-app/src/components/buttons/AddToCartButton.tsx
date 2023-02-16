import { Button, CustomIcon } from "@components";
import { View } from "react-native";
import { useAtom } from "jotai";
import { cartAtom } from "../../atoms/Atoms";

export const AddToCartButton = ({ article, store }) => {
  const [cart, setCart] = useAtom(cartAtom);

  return (
    <View className="flex-row flex-1 pt-3 transparent items-end">
      <View className="flex-1">
        <Button
          role="normal"
          onPress={() => {
            const articleInCart = cart.find(
              (item) => item?.article?.id === article.id
            );
            if (articleInCart) {
              articleInCart.quantity += 1;
            } else {
              setCart((cart) => [...cart, { article, store, quantity: 1 }]);
            }
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
