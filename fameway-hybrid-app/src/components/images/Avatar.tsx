import { Image, View } from "react-native";
import { Text } from "@components";

export type AvatarProps = {
  influencer?: {
    id?: string;
    name?: string;
    image?: any;
  };
  textColor?: string;
  size?: number;
};

export const Avatar = ({ influencer, textColor, size = 44 }: AvatarProps) => {
  return (
    <View className="flex-row items-center">
      {influencer && influencer.image ? (
        <Image
          style={{ width: size, height: size }}
          resizeMode="contain"
          className={"rounded-full bg-neutral-100"}
          source={influencer.image}
        />
      ) : null}
      <Text
        className="pl-3"
        color={textColor}
        size="xl"
        weight="bold"
        family="DM"
      >
        {influencer?.name}
      </Text>
    </View>
  );
};
