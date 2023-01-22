import { View, Image } from "react-native";
import { Button, Text } from "@components";

export const DonationButton = () => {
  return (
    <View className="bg-[#f5f5f5] rounded-full flex-row items-center">
      <View className="flex-1 h-full w-full flex-row align-start items-center p-2">
        <Image
          className="h-7 w-7 rounded-full bg-white"
          resizeMode="contain"
          source={require("@assets/images/wwf.jpeg")}
        ></Image>
        <Text position="left" size="md" weight="bold" className="pl-2">
          12€
        </Text>
        <Text position="left" size="md" className="pl-1">
          de dons à WWF
        </Text>
      </View>
      <View className="h-7 flex-1">
        <Button
          role="empty"
          size="full"
          startSlot={
            <View className="justify-end">
              <Text position="right" size="md" weight="bold" className="pl-5">
                En savoir plus
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
};
