import { View } from "react-native";
import { Button, Text } from "@components";

export const SectionName = ({ name }: { name: string }) => {
  return (
    <View className="flex-1 my-6 flex-row items-center justify-center">
      <View className="justify-center  items-start h-full">
        <Text size="xxl" weight="bold">
          {name}
        </Text>
      </View>
      <View className="flex-1 items-end">
        <Button
          iconOnly
          role="empty"
          size="full"
          startSlot={<Text size="sm">Show all</Text>}
          backgroundColor="transparent"
        ></Button>
      </View>
    </View>
  );
};
