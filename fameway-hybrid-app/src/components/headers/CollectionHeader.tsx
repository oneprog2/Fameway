import { Image, View } from "react-native";
import { Text, Button, CustomIcon, CardContainer } from "@components";

export type CollectionHeaderProps = {
  name?: string;
  description?: string;
  bannerPicture?: string;
  profilePicture?: string;
  onPress?: () => void;
};

export const CollectionHeader = ({
  name,
  description,
  bannerPicture,
  profilePicture,
  onPress,
}: CollectionHeaderProps) => {
  return (
    <CardContainer
      padding="none"
      roundness="xl"
      backgroundColor="#f5f5f5"
      light="off"
    >
      <View className="pt-8 pb-3">
        <Text weight="bold" size="4xl">
          SPCFX
        </Text>
      </View>
      <View className="flex-row justify-center items-center">
        <View>
          <Text color="neutral-muted" family="DM" size="xl" className="mr-2">
            By
          </Text>
        </View>
        <View className="h-6 w-6 mr-1">
          <Image
            resizeMode="contain"
            className="h-full w-full rounded-full bg-black"
            source={require("@assets/images/influencer2.png")}
          />
        </View>
        <Text color="neutral-muted" family="DM" size="xl" className="mr-2">
          Amixem
        </Text>
      </View>
      <View className="px-32 py-3">
        <Button
          onPress={onPress}
          size="sm"
          label="Follow"
          role="white"
          startSlot={<CustomIcon size={20} name="plus2" />}
          roundness="full"
        />
      </View>
      <View pointerEvents="none" className="flex-1 p-3">
        <Image
          resizeMode="cover"
          className="h-full w-full rounded-2xl"
          source={require("@assets/images/storeBanner.png")}
        />
      </View>
    </CardContainer>
  );
};
