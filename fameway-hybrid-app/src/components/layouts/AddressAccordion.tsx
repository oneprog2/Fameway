import { CustomIcon, Text } from "@components";
import React from "react";
import { Pressable, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
  subtitle: string;
  icon?: string;
};

export const AddressAccordion = ({
  title,
  children,
  subtitle,
  icon = "plus2",
}: AccordionProps) => {
  const bodyScale = useSharedValue(0);
  const rotation = useSharedValue(0);
  const [open, setOpen] = React.useState(false);
  const [bodyHeight, setBodyHeight] = React.useState(55);

  const timingConfig = {
    duration: 140,
    easing: Easing.out(Easing.ease),
  };

  const arrowAnimationStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
  }));

  const computeHeight = (event: any) => {
    setBodyHeight(event.nativeEvent.layout.height);
  };

  const bodyAnimationStyle = useAnimatedStyle(() => ({
    height: bodyScale.value * bodyHeight,
  }));

  return (
    <>
      <Pressable
        className="w-full"
        onPress={() => {
          bodyScale.value = withTiming(open ? 0 : 1, timingConfig);
          rotation.value = withTiming(open ? 0 : 180, timingConfig);
          setOpen(!open);
        }}
      >
        <View className="flex flex-row space-between items-center p-1 pl-1.5">
          <View className="flex-column flex-1">
            <Text
              position="left"
              weight="bold"
              size="sm"
              color="dark"
              className="flex-1 px-3"
            >
              {title}
            </Text>

            <Text
              position="left"
              weight="regular"
              size="xs"
              color="dark"
              className="flex-1 px-3"
            >
              {subtitle}
            </Text>
          </View>
          <Animated.View style={arrowAnimationStyle}>
            <CustomIcon name={icon} size={25} color="black" />
          </Animated.View>
        </View>
      </Pressable>
      <Animated.View
        className="overflow-hidden z-90 border-b-[1px]"
        style={[
          bodyAnimationStyle,
          {
            borderColor: "#E6E6E6",
            backgroundColor: "red",
          },
        ]}
      >
        <View
          onLayout={computeHeight}
          className="p-1 pl-[1.5px] absolute bottom-[1px]"
        >
          {children}
        </View>
      </Animated.View>
    </>
  );
};
