import {
  ArticleCard,
  Avatar,
  Button,
  CustomIcon,
  Text,
  QuantitySelector,
} from "@components";
import { useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

function SellerHeader({ first }: { first?: boolean }) {
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
            image: require("@assets/images/influencer.png"),
            name: "Gotaga",
          }}
        />
      </View>
      <View className="justify-center">
        <Text size="sm">Un code promo ?</Text>
      </View>
    </View>
  );
}

function ArticleItem() {
  const [quantity, setQuantity] = useState(1);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  return (
    <View className="flex-row mt-5">
      <View className="w-24 h-32">
        <ArticleCard
          size={"flex"}
          image={require("@assets/images/article1.png")}
        />
      </View>
      <View className="flex-1 pl-5 pb-2">
        <View className="flex-1 pr-1">
          <Text position="left" color="neutral-muted" family="DM">
            Baskets for running
          </Text>
          <View className="flex-row pt-2">
            <View className="flex-1">
              <Text position="left">42</Text>
            </View>

            <View>
              <Text weight="bold" position="left">
                34 €
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

export function TotalAmount() {
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
          label="Checkout"
          role="normal"
          size="lg"
          roundness="full"
          onPress={() => {}}
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

export function CartScreen({ closeCart }: { closeCart?: () => void }) {
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
        <SellerHeader first />
        <View className="mb-3">
          <ArticleItem />
          <ArticleItem />
          <Subtotal />
        </View>
        <SellerHeader />
        <View className="mb-3">
          <ArticleItem />
          <ArticleItem />
          <Subtotal />
        </View>
        <SellerHeader />
        <View className="mb-3">
          <ArticleItem />
          <ArticleItem />
          <Subtotal />
        </View>
        <SellerHeader />
        <View className="mb-3">
          <ArticleItem />
          <ArticleItem />
          <Subtotal last />
        </View>
      </ScrollView>
      <TotalAmount />
    </View>
  );
}
