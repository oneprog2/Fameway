import { Image, View } from "react-native";
import { Text, Button, CustomIcon } from "@components";

export type StoreHeaderProps = {
  store: {
    name?: string;
    description?: string;
    bannerPicture?: string;
    profilePicture?: string;
    onPress?: () => void;
  };
};

export const StoreHeader = ({ store }: StoreHeaderProps) => {
  return (
    <View className="flex-1 rounded-full" pointerEvents="box-none">
      <View pointerEvents="none" className="flex-1">
        <Image
          resizeMode="cover"
          className="h-full w-full rounded-2xl"
          source={{ uri: store?.bannerPicture }}
        />
      </View>

      <View className="flex-row h-16" pointerEvents="box-none">
        <View
          pointerEvents="none"
          className="left-2 -top-10  p-1 w-28 h-28 rounded-full bg-white"
        >
          <Image
            resizeMode="cover"
            className="h-full w-full rounded-full bg-[#222222]"
            source={{ uri: store?.profilePicture }}
          />
        </View>

        <View className="ml-4 pr-2 flex-row flex-1" pointerEvents="box-none">
          <View className="flex-1 justify-center" pointerEvents="none">
            <Text position={"left"} size="xl" weight="bold">
              {store?.name}
            </Text>
            <Text position={"left"} size="sm" weight="light">
              @{store?.name}
            </Text>
          </View>
          <View className="flex-1  justify-center" pointerEvents="box-none">
            <Button
              roundness={"full"}
              label="Follow"
              startSlot={<CustomIcon color="white" size={20} name={"plus2"} />}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
