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
      <Image
        style={{ width: size, height: size }}
        resizeMode="contain"
        className={"rounded-full bg-[#222]"}
        source={{ uri: influencer.image }}
      />
      <Text
        numberOfLines={1}
        className={"pl-2"}
        adjustsFontSizeToFit={true}
        color={textColor}
        size="lg"
        weight="bold"
        family="DM"
      >
        {influencer?.name?.charAt(0).toUpperCase() + influencer?.name?.slice(1)}
      </Text>
    </View>
  );
};
