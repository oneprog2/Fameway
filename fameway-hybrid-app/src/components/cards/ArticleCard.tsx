import { CardContainer, Text, Button, CustomIcon } from "@components";
import { View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export type ArticleCardProps = {
  name?: string;
  description?: string;
  price?: string;
  image?: any;
  tag?: string;
  onPress?: () => void;
  backgroundColor?: string;
  position?: "left" | "center" | "right";
  size?: "sm" | "md" | "flex";
  wishlistButton?: boolean;
  horizontal?: boolean;
  collectionCard?: boolean;
};

export const ArticleCard = ({
  name,
  image,
  description,
  price,
  size,
  wishlistButton,
  tag,
  collectionCard,
  onPress,
  horizontal,
  position = "left",
  backgroundColor = "#f4f4f4",
}: ArticleCardProps) => {
  return (
    <View className="w-full h-full flex-1 items-center ">
      <View
        className={
          size === "flex"
            ? "flex-1 w-full h-full"
            : horizontal
            ? "h-48 w-44 pl-4"
            : "h-48 w-full px-4"
        }
      >
        <CardContainer
          backgroundColor={backgroundColor}
          padding="none"
          role="primary"
          roundness="normal"
          size="lg"
          light="off"
        >
          <TouchableOpacity onPress={onPress}>
            <Image
              resizeMode="contain"
              resizeMethod="resize"
              source={image}
              className={"h-full w-full"}
            ></Image>
          </TouchableOpacity>

          {tag ? (
            <Button
              size="sm"
              disabled
              label={tag}
              roundness="full"
              role="white"
              shadow
              className="absolute top-2 left-2"
            />
          ) : null}
          {wishlistButton ? (
            <Button
              size="sm"
              roundness="full"
              role="white"
              shadow
              className="absolute top-2 right-2"
              startSlot={<CustomIcon name="heart" size={25} color="#323232" />}
            />
          ) : null}
        </CardContainer>
      </View>

      <View
        className={
          size === "flex"
            ? "flex-1 w-full h-full justify-center"
            : horizontal
            ? "w-44 px-4 pt-1"
            : "w-full px-5 pt-1 pb-4"
        }
      >
        {name ? (
          <Text
            numberOfLines={collectionCard ? 2 : 1}
            weight="bold"
            size={description ? "md" : "xs"}
            family="DM"
            position={position}
          >
            {name}
          </Text>
        ) : null}
        {description ? (
          <Text
            numberOfLines={collectionCard ? 0 : 1}
            className="pt-1"
            weight="regular"
            family="DM"
            position={position}
            size="xs"
          >
            {description}
          </Text>
        ) : null}
        {price ? (
          <Text
            className="pt-1 text-grey"
            weight={description ? "bold" : "light"}
            size={description ? "md" : "sm"}
            family="DM"
            position={position}
          >
            {price}
          </Text>
        ) : null}
      </View>
    </View>
  );
};
