import { STORE_DATA } from "@api";
import { useQuery } from "@apollo/client";
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

const MainPage = (store: any) => {
  return (
    <Tabs.ScrollView>
      <View className="p-3 pt-10 pb-10">
        <ArticlesList articles={store?.store?.articles} />
      </View>
      {/* <View className={"flex-1 p-4"}>
      <CollectionCard
        buttonRole="white"
        backgroundColor="#000000"
        name={store?.collection?.name}
        description={store?.collection?.description}
        articles={store?.collection?.articles}
        influencer={store?.collection?.influencer}
      />
    </View> */}
      {/* 
    <View className="p-3 pb-10">
      <CreateAccountCard backgroundColor="#f5f5f5" />
    </View> */}
    </Tabs.ScrollView>
  );
};
const Header = ({
  collectionID,
  store,
}: {
  collectionID: string;
  store: any;
}) => {
  return (
    <Animated.View
      pointerEvents="box-none"
      className={clsx(
        "px-4 pb-4 pt-2 flex-1",
        collectionID ? "h-[400px]" : "h-80"
      )}
    >
      {collectionID ? (
        <CollectionHeader store={store} />
      ) : (
        <StoreHeader store={store} />
      )}
    </Animated.View>
  );
};

export const StoreScreen = ({ navigation }: any) => {
  let route = useRoute();
  const { collectionID, storeID } = route?.params;

  const {
    data: storeData,
    error: storeError,
    loading: storeLoading,
  } = useQuery(STORE_DATA, {
    variables: {
      storeID: storeID,
    },
  });
  const store = storeData?.store_by_pk;

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
        {store?.name}
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
      headerContainerStyle={{
        backgroundColor: "white",
        shadowOpacity: 0,
        elevation: 0,
        borderBottomColor: "transparent",
      }}
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
              marginTop: 10,
              fontSize: 16,
              fontFamily: "DM-Regular",
              textTransform: "capitalize",
            }}
            style={{
              marginLeft: 20,
            }}
            {...props}
            scrollEnabled
          />
        );
      }}
      renderHeader={() => <Header store={store} collectionID={collectionID} />}
    >
      <Tabs.Tab name={"All"}>
        <MainPage store={store} />
      </Tabs.Tab>

      {/* {store.categories.map((item: any, index: number) => (
        <Tabs.Tab name={item} key={index}>
          <ArticlePage item={item?.articles} />
        </Tabs.Tab>
      ))} */}
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
