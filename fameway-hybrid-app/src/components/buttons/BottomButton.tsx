import { Button } from "@components";
import { View } from "react-native";

export const BottomButton = ({
  onPress,
  label,
}: {
  onPress: () => void;
  label: string;
}) => {
  return (
    <View className="flex-row w-screen pt-3 transparent items-end px-3">
      <View className="flex-1 px-3">
        <Button
          role="normal"
          onPress={onPress}
          label={label}
          size="md"
          roundness="full"
        />
      </View>
      {/* <View className="px-3">
        <Button
          role="grey"
          startSlot={<CustomIcon name="heart" color={"dark"} size={35} />}
          size="lg"
          roundness="full"
        />
      </View> */}
    </View>
  );
};
