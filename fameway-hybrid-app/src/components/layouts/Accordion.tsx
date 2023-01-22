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
};

export const Accordion = ({ title, children }: AccordionProps) => {
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
        onPress={() => {
          bodyScale.value = withTiming(open ? 0 : 1, timingConfig);
          rotation.value = withTiming(open ? 0 : 180, timingConfig);
          setOpen(!open);
        }}
      >
        <View className="flex flex-row space-between items-center p-1 pl-1.5">
          <Text
            position="left"
            weight="bold"
            size="lg"
            color="dark"
            className="flex-1 p-3"
          >
            {title}
          </Text>
          <Animated.View style={arrowAnimationStyle} className="px-3">
            <CustomIcon name="plus2" size={25} color="black" />
          </Animated.View>
        </View>
      </Pressable>
      <Animated.View
        className="overflow-hidden border-b-[1px]"
        style={[
          bodyAnimationStyle,
          {
            borderColor: "#E6E6E6",
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
