import { Button } from "@components";
import { View } from "react-native";

export const BottomButton = ({
  onPress,
  label,
  loading,
}: {
  onPress: () => void;
  label: string;
  loading: boolean;
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
          disabled={loading}
          loading={loading}
        />
      </View>
    </View>
  );
};
