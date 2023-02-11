import {
  ArticleCard,
  Avatar,
  Button,
  CustomIcon,
  Text,
  QuantitySelector,
} from "@components";
import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import { useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { cartAtom } from "../../atoms/Atoms";

function SellerHeader({ first, store }: { first?: boolean; store: any }) {
  return (
    <View
      className={`w-full flex-row  ${
        first ? "pt-2" : "pt-4 border-t-[1px] border-[#E6E6E6]"
      }`}
    >
      <View className="flex-1">
        <Avatar
          size={34}
          influencer={{
            image: store?.profilePicture,
            name: store?.name,
          }}
        />
      </View>
      <View className="justify-center">
        <Text size="sm">Un code promo ?</Text>
      </View>
    </View>
  );
}

function ArticleItem({ article, quantity, setQuantity }: { article: any }) {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  return (
    <View className="flex-row mt-5">
      <View className="w-24 h-32">
        <ArticleCard size={"flex"} image={article?.articlePictures[0]} />
      </View>
      <View className="flex-1 pl-5 pb-2">
        <View className="flex-1 pr-1">
          <Text position="left" color="neutral-muted" family="DM">
            {article?.name}
          </Text>
          <View className="flex-row pt-2">
            <View className="flex-1">
              <Text position="left">42</Text>
            </View>

            <View>
              <Text weight="bold" position="left">
                {article?.price}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row items-center justify-end">
          <View className="flex-1 items-end pr-2">
            {!deleteConfirmation ? (
              <View className="w-8 h-8">
                <Button
                  onPress={() => setDeleteConfirmation(true)}
                  size={"full"}
                  roundness="full"
                  role="grey"
                  startSlot={<CustomIcon size={18} name="trash" />}
                ></Button>
              </View>
            ) : (
              <Button
                onPress={() => setDeleteConfirmation(false)}
                size="sm"
                roundness="full"
                label="Supprimer"
                role="critical"
                startSlot={<CustomIcon color="white" size={18} name="trash" />}
              ></Button>
            )}
          </View>
          {!deleteConfirmation ? (
            <View className="w-[85px]">
              <QuantitySelector
                quantity={quantity}
                onDecrement={() => quantity > 1 && setQuantity(quantity - 1)}
                onIncrement={() => quantity < 20 && setQuantity(quantity + 1)}
              />
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

export function TotalAmount({ onPress }: any) {
  return (
    <View className="flex-row w-full absolute bottom-2 bg-white py-3">
      <View className="flex-1">
        <View className="flex-1">
          <Text family="DM" position="left" weight="bold" color="neutral-muted">
            Total
          </Text>
        </View>

        <View className="flex-1">
          <Text family="DM" size="xl" position="left" weight="bold">
            500.00 €
          </Text>
        </View>
      </View>
      <View className="flex-1">
        <Button
          label="Commander"
          role="normal"
          size="lg"
          onPress={onPress}
          roundness="full"
          iconOnly
        ></Button>
      </View>
    </View>
  );
}

export function Subtotal({ last }: { last?: boolean }) {
  return (
    <View
      className={`flex-row w-full mt-3 ${
        last ? "border-b-[1px] border-[#E6E6E6] pb-3" : ""
      }`}
    >
      <View className="flex-1">
        <Text family="DM" position="left" weight="light" color="neutral-muted">
          Sub-total
        </Text>
      </View>

      <View>
        <Text family="DM" size="lg" position="left" weight="bold">
          90 €
        </Text>
      </View>
    </View>
  );
}

export function CartScreen({
  closeCart,
  navigation,
}: {
  closeCart?: () => void;
  navigation?: any;
}) {
  const [cart, setCart] = useAtom(cartAtom);
  return (
    <View className="flex-1 mx-4 mt-4">
      <View className="flex-row">
        <View className="flex-1 justify-center">
          <View className="flex-row">
            <CustomIcon size={30} name="shopping-bag-converted"></CustomIcon>
            <Text
              className="ml-2"
              position="left"
              weight="bold"
              family="DM"
              size="xxl"
              color="black"
            >
              Cart
            </Text>
          </View>
        </View>
        <View className="align-end p-2">
          <Button
            onPress={closeCart}
            roundness="full"
            iconOnly
            role="grey"
            startSlot={<CustomIcon name="close" size={30} />}
          />
        </View>
      </View>

      <ScrollView
        className="mb-20"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {cart?.map((item, index) => {
          if (item?.article)
            return (
              <View key={index}>
                <SellerHeader store={item?.store} first={index === 0} />
                <ArticleItem
                  article={item?.article}
                  quantity={item?.quantity}
                  setQuantity={(quantity) => {
                    const newCart = [...cart];
                    newCart[index].quantity = quantity;
                    setCart(newCart);
                  }}
                />
                <Subtotal last={index === cart.length - 1} />
              </View>
            );
        })}
      </ScrollView>
      <TotalAmount
        onPress={() => {
          closeCart && closeCart();
          navigation.navigate("OrderStack", {
            screen: "Shipping",
          });
        }}
      />
    </View>
  );
}
