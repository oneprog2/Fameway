import {
  ArticleCard,
  Avatar,
  Button,
  CustomIcon,
  Text,
  QuantitySelector,
} from "@components";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useMutation, useQuery } from "@apollo/client";

import { CART_DATA, DELETE_CART_ITEM, UPDATE_CART_ITEM } from "@api";
import { useRecoilState } from "recoil";
import { currentUserState } from "../../atoms/Atoms";
import { useAtom } from "jotai";

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
        {/* <Text size="sm">Un code promo ?</Text> */}
      </View>
    </View>
  );
}

function ArticleItem({ article, quantity, setQuantity, deleteCartItem }: any) {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  return (
    <View className="flex-row mt-5">
      <View
        style={{
          height: 100,
          width: 80,
        }}
      >
        <ArticleCard size="flex" image={article?.articlePictures[0]} />
      </View>
      <View className="pl-5 pb-2 flex-1">
        <View className="flex-1">
          <Text size="sm" position="left" color="neutral-muted" family="DM">
            {article?.name}
          </Text>
          <View className="flex-row pb-4  pt-1 pr-2 justify-start">
            <View>
              <Text
                style={{
                  color: "#222",
                  fontWeight: "bold",
                }}
                size="sm"
                weight="bold"
                position="left"
              >
                {article?.price} €
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
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Button
                  onPress={() => {
                    deleteCartItem(article?.id);
                    setDeleteConfirmation(false);
                  }}
                  size="sm"
                  roundness="full"
                  label="Supprimer"
                  role="critical"
                  startSlot={
                    <CustomIcon color="white" size={18} name="trash" />
                  }
                ></Button>
                <Button
                  onPress={() => {
                    setDeleteConfirmation(false);
                  }}
                  size="sm"
                  roundness="full"
                  label="Annuler"
                  role="grey"
                  style={{
                    marginLeft: 10,
                  }}
                  startSlot={<CustomIcon color="#222" size={18} name="close" />}
                ></Button>
              </View>
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

export function TotalAmount({ onPress, totalPrice }: any) {
  return (
    <View className="flex-row w-full absolute bottom-2 bg-white py-3 border-t-[0.5px] border-[#E6E6E6] px-4">
      <View className="flex-1">
        <View className="flex-1">
          <Text
            family="DM"
            position="left"
            weight="bold"
            size="sm"
            color="neutral-muted"
          >
            Total
          </Text>
        </View>

        <View className="flex-1">
          <Text family="DM" size="xl" position="left" weight="bold">
            {totalPrice} €
          </Text>
        </View>
      </View>
      <View className="flex-1">
        <Button
          disabled={totalPrice === 0 || !totalPrice}
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
  const [user, setUser] = useRecoilState(currentUserState);
  const [offset, setOffset] = useState(0);

  const { data, loading, error, refetch } = useQuery(CART_DATA, {
    variables: { userId: user?.id },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data)
      setUser({
        ...user,
        cartID: data?.cart[0].id,
      });
  }, [data]);

  const cartItems = data?.cart[0]?.cartItems || {};

  const [deleteCartItem] = useMutation(DELETE_CART_ITEM, {
    onCompleted: () => {
      refetch();
    },
  });

  const [updateCartItem] = useMutation(UPDATE_CART_ITEM, {
    onCompleted: () => {
      refetch();
    },
  });

  const totalPrice =
    (cartItems?.length > 0 &&
      cartItems?.reduce(
        (acc: number, item: any) => acc + item?.quantity * item?.article?.price,
        0
      )) ||
    0;

  return (
    <View className="flex-1">
      <View className="flex-row px-4 py-2">
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
              Panier
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

      {cartItems && cartItems?.length > 0 ? (
        <ScrollView
          onScroll={(e) => {
            setOffset(e.nativeEvent.contentOffset.y);
          }}
          style={{
            borderTopColor: "#E2E2E2",
            borderTopWidth: offset > 0 ? 1 : 0,
          }}
          className="mb-20"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {cartItems?.map((item, index) => {
            if (item?.article)
              return (
                <View key={index} className="mx-4 mb-2">
                  <SellerHeader
                    store={item?.article?.store}
                    first={index === 0}
                  />
                  <ArticleItem
                    article={item?.article}
                    quantity={item?.quantity ? item?.quantity : 1}
                    deleteCartItem={() => {
                      deleteCartItem({
                        variables: {
                          cartItemID: item?.id,
                        },
                      });
                    }}
                    setQuantity={(quantity) => {
                      updateCartItem({
                        variables: {
                          cartItemID: item?.id,
                          quantity,
                        },
                      });
                    }}
                  />
                  {/* <Subtotal last={index === cart.length - 1} /> */}
                </View>
              );
          })}
          <View className="mb-4"></View>
        </ScrollView>
      ) : (
        <View className="flex-1 justify-center items-center mb-20">
          <Text
            position="center"
            weight="bold"
            family="DM"
            size="xl"
            color="black"
          >
            Ton panier est vide
          </Text>
        </View>
      )}

      <TotalAmount
        totalPrice={totalPrice}
        onPress={() => {
          closeCart && closeCart();
          navigation.navigate("OrderStack", {
            screen: "Checkout",
          });
        }}
      />
    </View>
  );
}
