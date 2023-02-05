import {
  CustomIcon,
  CollectionCard,
  NoveltyCard,
  PageContainer,
  SectionName,
  SellersList,
  CreateAccountCard,
} from "@components";
import { Linking, View } from "react-native";
import { ArticlesList, InfluencersCard } from "@components";
import { useQuery } from "@apollo/client";
import { PROMOTION_CARD, STORES_DATA } from "@api";

const DATA = {
  id: "1",
  title: "Bienvenue sur la première version de Fameway !",
  buttonLabel: "Découvrir",
  images: [
    require("@assets/images/test1.jpg"),
    require("@assets/images/test2.jpg"),
    require("@assets/images/test3.jpg"),
  ],
  influencers: [
    {
      id: "1",
      name: "Amixem",
      image: require("@assets/images/influencer.png"),
    },
    {
      id: "2",
      name: "Pokimane",
      image: require("@assets/images/influencer1.png"),
    },
    {
      id: "3",
      name: "Squeezie Gaming",
      image: require("@assets/images/influencer2.png"),
    },
    {
      id: "4",
      name: "Illiasse RIFKI",
      image: require("@assets/images/influencer3.png"),
    },
  ],
  articles: [
    {
      tag: "Nouveau",
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

export const HomeScreen = ({ navigation }) => {
  const {
    data: storeData,
    error: storeError,
    loading: storeLoading,
  } = useQuery(STORES_DATA);

  const {
    data: mainCardData,
    error: mainCardError,
    loading: mainCardLoading,
  } = useQuery(PROMOTION_CARD, {
    fetchPolicy: "cache-and-network",
  });

  const mainCard = mainCardData?.promotionCard?.filter(
    (e: any) => e.type === "MAIN_CARD"
  )?.[0];

  const createAccountData = mainCardData?.promotionCard?.filter(
    (e: any) => e.type === "CREATE_ACCOUNT_CARD"
  )?.[0];

  const loading = mainCardLoading || storeLoading;
  let influencers = storeData?.store.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      image: item.profilePicture,
    };
  });

  if (loading) return null;

  return (
    <PageContainer
      onPress={() => navigation.navigate("Search")}
      startSlot={<CustomIcon name="search" size={30} color="#717171" />}
      title="Fameway"
    >
      {/* <View className="fixed h-14 mt-2">
        <HorizontalNavbar />
      </View> */}
      {/* <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        className={"flex-1"}
      > */}
      <View className={"p-3"}>
        <NoveltyCard
          title={mainCard?.title}
          buttonLabel={mainCard?.buttonText}
          images={mainCard?.pictures}
          onPress={() => Linking.openURL(mainCard?.link)}
        />
        <SectionName name="Nouveaux créateurs" />
      </View>
      <View className="flex-1">
        <SellersList sellers={influencers} />
      </View>

      <View className={"p-3 flex-1"}>
        <SectionName name="Nouveaux articles" />
      </View>

      {/* <ArticlesList horizontal articles={DATA.articles} /> */}

      <View className={"flex-1 p-4 pt-10"}>
        <CollectionCard
          onPress={() =>
            navigation.navigate("Store", {
              collectionID: DATA.collection.id,
            })
          }
          collectionID={DATA.collection?.id}
          backgroundColor="#fb4e7c"
          name={DATA.collection?.name}
          description={DATA.collection?.description}
          articles={DATA.collection?.articles}
          influencer={DATA.collection?.influencer}
        />
      </View>

      <View className={"px-3 flex-1"}>
        <SectionName name="Trendy items" />
      </View>

      {/* <ArticlesList articles={DATA.articles} /> */}

      <View className={"flex-1 p-4 pt-10"}>
        <CollectionCard
          startingDate="2021-01-01"
          onPress={() =>
            navigation.navigate("Store", {
              collectionID: DATA.collection.id,
            })
          }
          backgroundColor="#b655f0"
          name={DATA.collection2?.name}
          description={DATA.collection2?.description}
          articles={DATA.collection2?.articles}
          influencer={DATA.collection2?.influencer}
        />
      </View>

      <View className="p-3 flex-1 pb-10">
        <CreateAccountCard backgroundColor="#f5f5f5" />
      </View>
      {/* </ScrollView> */}
    </PageContainer>
  );
};
