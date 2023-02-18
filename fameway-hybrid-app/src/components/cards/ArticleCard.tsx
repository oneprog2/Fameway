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
  position = "right",
  backgroundColor = "#f4f4f4",
}: ArticleCardProps) => {
  return (
    <View
      className="flex-1 border-1"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
          marginBottom: 8,
        }}
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
              resizeMode="cover"
              resizeMethod="resize"
              source={{ uri: image }}
              style={{
                width: "100%",
                height: "100%",
              }}
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

      <View>
        {name ? (
          <Text
            adjustsFontSizeToFit={true}
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
            adjustsFontSizeToFit={true}
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
