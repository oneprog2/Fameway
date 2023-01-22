import { View, FlatList } from "react-native";
import clsx from "clsx";
import { Button, Text } from "@components";

type SelectSizeProps = {
  selectedSize: number;
  setSelectedSize: (value: number) => void;
};

const SizeButton = ({
  sizeValue,
  setSelectedSize,
  selectedSize,
  index,
  outOfStock,
}: {
  sizeValue: string;
  setSelectedSize: (value: number) => void;
  selectedSize: number;
  index: number;
  outOfStock?: boolean;
}) => {
  return (
    <View
      className={clsx(
        outOfStock
          ? "bg-[#f5f5f5] border border-[#b3b3b3]"
          : selectedSize === index
          ? "bg-dark"
          : "border opacity-70",
        "items-center justify-center rounded-full h-14 w-14 mr-2"
      )}
    >
      <Button
        disabled={outOfStock}
        onPress={() => setSelectedSize(index)}
        size="md"
        iconOnly
        startSlot={
          <View className={clsx("h-full w-full items-center justify-center")}>
            {outOfStock ? (
              <View
                style={{
                  transform: [{ rotate: "45deg" }],
                }}
                className="border border-[#B3B3B3] h-14 absolute"
              />
            ) : null}
            <Text
              color={
                outOfStock
                  ? "neutral-faded"
                  : selectedSize === index
                  ? "white"
                  : "dark"
              }
              position="center"
              size="full"
              weight="bold"
            >
              {sizeValue}
            </Text>
          </View>
        }
        role="empty"
        roundness="full"
      ></Button>
    </View>
  );
};

export const SelectSize = ({
  selectedSize,
  setSelectedSize,
}: SelectSizeProps) => {
  const DATA = [
    {
      id: "1",
      name: "S",
    },
    {
      id: "2",
      name: "M",
    },
    {
      id: "3",
      name: "L",
    },
    {
      id: "4",
      name: "XL",
    },
  ];

  return (
    <View className="w-full h-full">
      <FlatList
        keyExtractor={(item) => item.id}
        horizontal
        data={DATA}
        renderItem={({ item, index }) => {
          return (
            <SizeButton
              sizeValue={item.name}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              index={index}
              outOfStock={index === 2}
            />
          );
        }}
      />
    </View>
  );
};
