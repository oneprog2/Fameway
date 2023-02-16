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
    height: PAGE_WIDTH * 1.2,
  } as const;

  return (
    <CarouselBase
      {...baseOptions}
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
      style={{
        marginTop: -10,
      }}
      data={articlePictures}
      renderItem={({ index }) => (
        <View
          style={{
            width: PAGE_WIDTH,
            height: PAGE_WIDTH * 1.2,
          }}
        >
          <CardContainer light="off" backgroundColor="#f3f3f3" padding={0}>
            <Image
              resizeMode="cover"
              source={{
                uri: articlePictures[index],
              }}
              className="h-full w-full p-0"
            />
          </CardContainer>
        </View>
      )}
    />
  );
};
