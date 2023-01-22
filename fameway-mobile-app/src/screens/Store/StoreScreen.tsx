import {
  CollectionCard,
  CreateAccountCard,
  StoreHeader,
  ArticlesList,
  Text,
  CustomIcon,
  Button,
  CollectionHeader,
} from "@components";
import { useRoute } from "@react-navigation/native";
import clsx from "clsx";
import { View } from "react-native";
import { Tabs, MaterialTabBar } from "react-native-collapsible-tab-view";
import Animated from "react-native-reanimated";

const MainPage = () => (
  <Tabs.ScrollView>
    <View className="pt-6">
      <ArticlesList disabled articles={DATA.articles} />
    </View>
    <View className={"flex-1 p-4"}>
      <CollectionCard
        buttonRole="white"
        backgroundColor="#000000"
        name={DATA.collection?.name}
        description={DATA.collection?.description}
        articles={DATA.collection?.articles}
        influencer={DATA.collection?.influencer}
      />
    </View>

    <View className="p-3 flex-1 pb-10">
      <CreateAccountCard
        title="Create your account today"
        subtitle="Never miss exclusive drops again"
        backgroundColor="#f5f5f5"
      />
    </View>
  </Tabs.ScrollView>
);

const ArticlePage = ({ articles }) => (
  <Tabs.ScrollView>
    <View className="pt-6">
      <ArticlesList disabled articles={DATA.articles} />
    </View>
  </Tabs.ScrollView>
);

const Header = ({ collectionID }: { collectionID: string }) => {
  return (
    <Animated.View
      pointerEvents="box-none"
      className={clsx(
        "px-4 pb-4 pt-2 flex-1",
        collectionID ? "h-[400px]" : "h-80"
      )}
    >
      {collectionID ? <CollectionHeader /> : <StoreHeader />}
    </Animated.View>
  );
};

export const StoreScreen = ({ navigation }: any) => {
  let route = useRoute();
  const { collectionID } = route?.params;

  navigation.setOptions({
    headerShown: true,
    headerShadowVisible: false,
    headerStyle: {
      backgroundColor: "white",
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerTitle: () => (
      <Text size="xxl" weight="bold">
        Amixem
      </Text>
    ),
    headerLeft: () => (
      <Button
        role="empty"
        onPress={() => navigation.goBack()}
        iconOnly
        startSlot={<CustomIcon name="chevron-left" color="black" size={40} />}
      />
    ),
  });
  return (
    <Tabs.Container
      containerStyle={{ backgroundColor: "white" }}
      allowHeaderOverscroll
      renderTabBar={(props) => {
        return (
          <MaterialTabBar
            indicatorStyle={{
              backgroundColor: "#000000",
              height: 2,
              borderRadius: 1000,
            }}
            labelStyle={{
              fontSize: 16,
              fontFamily: "DM-Regular",
              textTransform: "capitalize",
            }}
            {...props}
            scrollEnabled
          />
        );
      }}
      renderHeader={() => <Header collectionID={collectionID} />}
    >
      <Tabs.Tab name={"All"}>
        <MainPage />
      </Tabs.Tab>

      {DATA.categories.map((item: any, index: number) => (
        <Tabs.Tab name={item} key={index}>
          <ArticlePage item={DATA.articles} />
        </Tabs.Tab>
      ))}
    </Tabs.Container>
  );
};

const DATA = {
  categories: [
    "Tee shirt",
    "Album",
    "Visio",
    "Image de référence",
    "NFT",
    "Album2",
    "Visi2o",
    "Ima2ge de référence",
    "NF2T",
    "Al42bum",
    "Vi2sio",
    "Im3age de référence",
    "NF4T",
  ],
  articles: [
    {
      id: "1",
      name: "Tee shirt - Lacoste",
      description: "Taille M - Blanc",
      price: "40",
      image: require("@assets/images/article.png"),
    },
    {
      id: "2",
      name: "Album - Oreilles sales",
      price: "40.40",
      description: "Edition limité le 12/12/2020",
      image: require("@assets/images/article1.png"),
    },
    {
      id: "3",
      name: "Visio 10 minutes",
      price: "25",
      description: "Call friendly",
      image: require("@assets/images/article2.png"),
    },
    {
      id: "4",
      name: "Image de référence",
      description: "Et pourquoi pas ??",
      price: "18.29",
      image: require("@assets/images/article3.png"),
    },
  ],
  collection: {
    id: "1",
    name: "SpaceFOX",
    description:
      "This incredible collection is made by one of the most popular girl in the world",
    influencer: {
      id: "1",
      name: "Amixem",
      image: require("@assets/images/influencer3.png"),
    },
    articles: [
      {
        id: "1",
        name: "Tee shirt - Lacoste",
        price: "40",
        image: require("@assets/images/article.png"),
      },
      {
        id: "2",
        name: "Album - Oreilles sales",
        price: "40.40",
        image: require("@assets/images/article1.png"),
      },
      {
        id: "3",
        name: "Visio 10 minutes",
        price: "25",
        image: require("@assets/images/article2.png"),
      },
    ],
  },
  collection2: {
    id: "1",
    name: "Elsa bitch",
    description:
      "This incredible collection is made by one of the most popular girl in the world",
    influencer: {
      id: "1",
      name: "Elsa Bitch",
      image: require("@assets/images/influencer2.png"),
    },
    articles: [
      {
        tag: "New",
        id: "1",
        name: "Tee shirt - Lacoste",
        price: "40",
        image: require("@assets/images/article2.png"),
      },
      {
        id: "2",
        name: "Album - Oreilles sales",
        price: "40.40",
        image: require("@assets/images/article1.png"),
      },
      {
        id: "3",
        name: "Visio 10 minutes",
        price: "25",
        image: require("@assets/images/article2.png"),
      },
    ],
  },
};
