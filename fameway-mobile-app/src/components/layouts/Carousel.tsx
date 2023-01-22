import { Dimensions, Image, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import CarouselBase from "react-native-reanimated-carousel";
import { CardContainer } from "../cards";

type CarouselProps = {
  articlePictures: any[];
};

export const Carousel = ({ articlePictures, ...props }: CarouselProps) => {
  const PAGE_WIDTH = Dimensions.get("window").width;
  const progressValue = useSharedValue<number>(0);
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: PAGE_WIDTH,
  } as const;

  return (
    <CarouselBase
      {...baseOptions}
      loop
      snapEnabled={true}
      autoPlay={false}
      autoPlayInterval={1500}
      onProgressChange={(_, absoluteProgress) =>
        (progressValue.value = absoluteProgress)
      }
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 50,
      }}
      data={[3, 2, 1]}
      renderItem={({ index }) => (
        <CardContainer
          light="off"
          backgroundColor="#f3f3f3"
          size="full"
          style={{
            alignItems: "center",
            width: PAGE_WIDTH,
            height: PAGE_WIDTH,
            backgroundColor: "red",
          }}
        >
          <Image
            resizeMode="contain"
            source={require("@assets/images/article5.png")}
            className="h-full w-full"
          />
        </CardContainer>
      )}
    />
  );
};
