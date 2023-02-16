import { ARTICLE_DATA } from "@api";
import { useQuery } from "@apollo/client";
import {
  Text,
  AddToCartButton,
  BreadCrumbs,
  Carousel,
  DonationButton,
  SelectType,
  SelectSize,
  PageContainer,
  CustomIcon,
  Accordion,
  DonationCard,
  SectionName,
  ArticlesList,
  CreateAccountCard,
} from "@components";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { View } from "react-native";

const ProductHeaderInformations = ({ title, storeName, price }: any) => {
  return (
    <>
      <Text
        position="left"
        size="sm"
        color="neutral-muted"
        className="pb-[1px]"
      >
        {storeName}
      </Text>
      <Text position="left" size="xxl" weight="bold" className="pb-[1px]">
        {title}
      </Text>
      <Text family="DM" position="left" size="lg">
        {price} €
      </Text>
    </>
  );
};

const ArticleInformations = ({ description }: any) => {
  return (
    <View className="flex-1">
      <Accordion
        title="Description"
        children={
          <View className="px-3 py-3">
            <Text position="left">{description}</Text>
          </View>
        }
      />
      <Accordion
        title="About"
        children={
          <View className="px-3 py-3">
            <Text position="left">...</Text>
          </View>
        }
      />
      <Accordion
        title="Materials"
        children={
          <View className="px-3 py-3">
            <Text position="left">{"..."}</Text>
          </View>
        }
      />
    </View>
  );
};

const ShippingInformations = () => {
  return (
    <View className="py-4 flex-1">
      <View className="flex-1 flex-row items-center">
        <CustomIcon name="check-circle" color="black" size={20} />
        <Text className="pl-1" position="left" size="md" color="dark">
          {"Livraison instantanée"}
        </Text>
      </View>

      {/* <View className="flex-1 flex-row items-center">
        <CustomIcon name="check-circle" color="black" size={20} />
        <Text className="pl-1" position="left" size="md" color="dark">
          {"Téléchargement immédiat"}
        </Text>
      </View> */}
    </View>
  );
};

export const ArticleDetailScreen = ({ navigation }: any) => {
  let route = useRoute();
  const { articleID } = route?.params;
  const [selected, setSelected] = useState({
    size: 0,
    type: 0,
  });

  navigation.setOptions({
    headerShown: false,
  });

  const {
    data: articleData,
    error: articleError,
    loading: articleLoading,
  } = useQuery(ARTICLE_DATA, {
    variables: {
      articleID: articleID,
    },
  });
  const article = articleData?.article_by_pk;

  return (
    <PageContainer
      edges={["top", "bottom", "left", "right"]}
      title={article?.name}
      goBack
    >
      <View className="p-2">
        <BreadCrumbs
          store={{ id: article?.store?.id, name: article?.store?.name }}
          // categorie={{ id: "dowowo", name: "" }}
          article={{ id: article?.id, name: article?.name }}
        />
      </View>
      <Carousel articlePictures={article?.articlePictures} />
      <View className="px-5">
        <ProductHeaderInformations
          price={article?.price}
          storeName={article?.store?.name}
          title={article?.name}
        />
        <View className="pb-2 flex-1">
          <AddToCartButton store={article?.store} article={article} />
        </View>
        {/* <View className="pt-2">
          <DonationButton />
        </View> */}
        {/* <View className="pb-6 border-b-[1px] border-[#E6E6E6]">
          <View className="pt-5 pb-2 flex-row">
            <Text position="left" size="md" color="dark">
              {"Color :"}
            </Text>
            <Text
              position="left"
              size="md"
              weight="bold"
              color="dark"
              className="pl-1"
            >
              {"Black"}
            </Text>
          </View>
          <SelectType
            selectedType={selected.type}
            setSelectedType={(selectedType: number) =>
              setSelected({
                ...selected,
                type: selectedType,
              })
            }
          />
        </View>
        <View className="pb-4 border-b-[1px] border-[#E6E6E6] flex-1">
          <Text className="py-4" position="left" size="md" color="dark">
            {"Size"}
          </Text>
          <SelectSize
            selectedSize={selected.size}
            setSelectedSize={(selectedSize: number) =>
              setSelected({
                ...selected,
                size: selectedSize,
              })
            }
          />
        </View> */}

        <ShippingInformations />

        <ArticleInformations description={article?.description} />

        {/* <View className="flex-1 pt-10">
          <DonationCard />
        </View> */}
        {/* 
        <View>
          <SectionName name="Autres produits" />
        </View> */}
      </View>
      <View className="pb-4 flex-1">
        {/* <ArticlesList articles={DATA.articles} horizontal /> */}
      </View>
      <View className="p-3 flex-1">
        <CreateAccountCard backgroundColor="#f5f5f5" />
      </View>
    </PageContainer>
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
