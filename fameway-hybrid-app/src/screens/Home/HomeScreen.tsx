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
import { useQuery } from "@apollo/client";
import { PROMOTION_CARD, STORES_DATA } from "@api";

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

      {/* <View className={"p-3 flex-1"}>
        <SectionName name="Nouveaux articles" />
      </View> */}

      {/* <ArticlesList horizontal articles={DATA.articles} /> */}
      {/* 
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
      </View> */}

      {/* <View className={"px-3 flex-1"}>
        <SectionName name="Trendy items" />
      </View> */}

      {/* <ArticlesList articles={DATA.articles} /> */}

      {/* <View className={"flex-1 p-4 pt-10"}>
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
      </View> */}

      <View className="p-3 flex-1 pb-10">
        <CreateAccountCard backgroundColor="#f5f5f5" />
      </View>
      {/* </ScrollView> */}
    </PageContainer>
  );
};
