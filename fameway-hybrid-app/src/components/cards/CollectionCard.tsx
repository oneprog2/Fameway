import { CardContainer, ArticleCard, Text, Button, Avatar } from "@components";
import { View } from "react-native";

export type CollectionCardProps = {
  name?: string;
  description?: string;
  collectionID?: string;
  articles?: {
    id: string;
    name: string;
    image: string;
    price: string;
  }[];
  influencer?: {
    id: string;
    name: string;
    image: string;
  };
  onPress?: () => void;
  startingDate?: string;
  backgroundColor?: string;
  buttonRole?: string;
};

export const CollectionCard = ({
  name,
  articles,
  description,
  collectionID,
  influencer,
  onPress,
  startingDate,
  backgroundColor,
  buttonRole = "primary",
}: CollectionCardProps) => {
  return (
    <CardContainer
      backgroundColor={backgroundColor}
      padding="none"
      role="primary"
      roundness="normal"
      size="lg"
      light="left"
    >
      <View className="h-full flex-1 ">
        <View className="p-8">
          <Avatar
            textColor="white"
            influencer={{
              name: influencer?.name,
              image: influencer?.image,
            }}
          />
        </View>
        <View className="flex-1 px-6 pb-6">
          <Text
            className="pb-3"
            position="left"
            weight="bold"
            size="xxl"
            color="white"
          >
            {name}
          </Text>
          <Text position="left" color="white" size="xl">
            {description}
          </Text>
        </View>

        <View className="flex-row h-44 w-full mb-10 items-center px-2">
          {articles?.map((article) => (
            <View className="flex-1 px-1">
              <CardContainer light="off" backgroundColor="white">
                <View className="h-full w-full">
                  <ArticleCard
                    wishlistButton={false}
                    size={"flex"}
                    position="center"
                    backgroundColor="#f4f4f4"
                    key={article.id}
                    collectionCard={true}
                    name={article.name}
                    price={article.price + "€"}
                    image={article.image}
                  />
                </View>
              </CardContainer>
            </View>
          ))}
        </View>
        <View className="pb-8 items-center px-6">
          <Button
            onPress={onPress}
            role={buttonRole}
            roundness="full"
            size="lg"
            label="See collection"
          ></Button>
        </View>
      </View>
    </CardContainer>
  );
};
