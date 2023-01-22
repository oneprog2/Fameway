import { PageHeader, PageHeaderProps } from "@components";
import { View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Edge, SafeAreaView } from "react-native-safe-area-context";

type PageContainerProps = PageHeaderProps & {
  children: React.ReactNode;
  isModal?: boolean;
  footer?: React.ReactNode;
  edges?: readonly Edge[] | undefined;
};

export function PageContainer({
  children,
  footer,
  icon,
  title,
  goBack = false,
  onPress,
  edges = ["right", "top", "left"],
}: PageContainerProps) {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const borderStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 5], [0, 1]);
    return { opacity };
  });

  return (
    <SafeAreaView edges={edges} className="flex-1 bg-white">
      <PageHeader icon={icon} title={title} goBack={goBack} onPress={onPress} />
      <Animated.View className="h-[1px] bg-neutral-12" style={borderStyle} />
      <Animated.ScrollView
        className="flex-1"
        onScroll={scrollHandler}
        scrollEventThrottle={1}
      >
        <View className={"flex-1"}>{children}</View>
      </Animated.ScrollView>
      {footer ? (
        <>
          <Animated.View
            style={borderStyle}
            className="h-[1px] bg-neutral-12"
          />
          <Animated.View>{footer}</Animated.View>
        </>
      ) : null}
    </SafeAreaView>
  );
}
