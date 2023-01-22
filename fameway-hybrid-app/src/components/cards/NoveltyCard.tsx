import { CardContainer, Text, Button } from "@components";
import { View, Image } from "react-native";

export type NoveltyCardProps = {
  title?: string;
  buttonLabel?: string;
  images?: any;
  onPress?: () => void;
  backgroundColor?: string;
};

export const NoveltyCard = ({
  title,
  buttonLabel,
  images,
  onPress,
  backgroundColor,
}: NoveltyCardProps) => {
  return (
    <CardContainer
      backgroundColor={backgroundColor}
      padding="normal"
      role="primary"
      roundness="xl"
      light="left"
    >
      <View className="p-4 pt-6">
        <Text
          position="left"
          size="xxl"
          className="leading-10 font-[26px]"
          weight="bold"
        >
          {title}
        </Text>
        <View className="pr-40 pt-6 pb-4">
          <Button onPress={onPress} label={buttonLabel} roundness="full" />
        </View>
      </View>

      <View className="pb-2">
        <View className="flex-row h-28 overflow-hidden rounded-xl">
          <View className="flex-1 pr-1">
            <Image
              className="h-full w-full"
              resizeMode="contain"
              source={images && images[0]}
            />
          </View>

          <View className="flex-1 px-1">
            <Image
              className="h-full w-full"
              resizeMode="contain"
              source={images && images[1]}
            />
          </View>

          <View className="flex-1 pl-1">
            <Image
              className="h-full w-full"
              resizeMode="contain"
              source={images && images[2]}
            />
          </View>
        </View>
      </View>
    </CardContainer>
  );
};
