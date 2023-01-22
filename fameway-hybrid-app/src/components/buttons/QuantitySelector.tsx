import { View } from "react-native";
import { CustomIcon, Text, Button } from "@components";

type QuantitySelectorProps = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

export const QuantitySelector = ({
  quantity,
  onIncrement,
  onDecrement,
}: QuantitySelectorProps) => {
  return (
    <View className="flex-row bg-[#f0f0f0] rounded-full">
      <View className="h-8 w-8">
        <Button
          roundness="full"
          role={quantity > 1 ? "white" : "empty"}
          className="p-1"
          size="full"
          startSlot={
            <View className="w-full h-full rounded-full justify-center items-center">
              <CustomIcon size={14} name="minus" />
            </View>
          }
          onPress={onDecrement}
        ></Button>
      </View>

      <View className="flex-1 justify-center">
        <Text size="sm" weight="bold" position="center">
          {quantity}
        </Text>
      </View>

      <View className="h-8 w-8">
        <Button
          size="full"
          roundness="full"
          role={quantity < 20 ? "white" : "empty"}
          className="p-1"
          startSlot={
            <View className="w-full h-full rounded-full justify-center items-center">
              <CustomIcon size={14} name="plus2" />
            </View>
          }
          onPress={onIncrement}
        ></Button>
      </View>
    </View>
  );
};
