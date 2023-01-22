import { FlashList } from "@shopify/flash-list";
import clsx from "clsx";
import { View, Image } from "react-native";
import { Button, CustomIcon } from "@components";
type SelectTypeProps = {
  selectedType: number;
  setSelectedType: (value: number) => void;
};

export const SelectType = ({
  selectedType,
  setSelectedType,
}: SelectTypeProps) => {
  const DATA = [
    {
      id: "20",
      name: require("@assets/images/article1.png"),
    },
    {
      id: "39",
      name: require("@assets/images/article2.png"),
    },
  ];

  return (
    <View className="flex-1 w-full h-full">
      <FlashList
        horizontal
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return (
            <View className="rounded-full h-full w-full pr-2">
              {index === selectedType ? (
                <View className="justify-center absolute items-center h-4 w-4 rounded-full bg-dark z-10">
                  <CustomIcon name="checkmark" color="white" size={17} />
                </View>
              ) : null}
              <Button
                onPress={() => setSelectedType(index)}
                size="lg"
                className="bg-[#f5f5f5] rounded-full"
                role="empty"
                startSlot={
                  <Image
                    resizeMode="contain"
                    className={clsx(
                      index === selectedType ? "border-2" : "opacity-70",
                      "flex-1  h-full w-full rounded-full"
                    )}
                    source={item.name}
                  ></Image>
                }
                roundness="full"
              ></Button>
            </View>
          );
        }}
      />
    </View>
  );
};
