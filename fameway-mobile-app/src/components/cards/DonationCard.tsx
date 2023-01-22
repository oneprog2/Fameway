import { Image, View } from "react-native";
import { CardContainer, Text, Button } from "@components";

export const DonationCard = ({ donation }: any) => {
  return (
    <CardContainer padding="md" light="off" backgroundColor={"#f5f5f5"}>
      <View className="flex-row items-center justify-center py-3">
        <Image
          resizeMode="contain"
          className="h-full w-full rounded-full h-10 w-10"
          source={require("@assets/images/wwf.jpeg")}
        />
        <Text weight="bold" size="lg" className="ml-2">
          {"WWF"}
        </Text>
      </View>
      <View>
        <Text family="Oblivian" weight="bold" size="xxxl">
          {"12$ donated"}
        </Text>
        <Text className="py-4" size="md" color="neutral-muted">
          {
            "To help Madascar childrens going to school. Distributing books, pens and school lessons."
          }
        </Text>
        <View className="px-10 pb-8">
          <Button
            roundness="full"
            role="white"
            label="En savoir plus à props de WWF"
          />
        </View>
      </View>
      <View className="h-56 w-full">
        <Image
          className="rounded-xl h-full w-full"
          source={require("@assets/images/panda.jpeg")}
        />
      </View>
    </CardContainer>
  );
};
