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

const ProductHeaderInformations = () => {
  return (
    <>
      <Text
        position="left"
        size="sm"
        color="neutral-muted"
        className="pb-[1px]"
      >
        Space Fox
      </Text>
      <Text position="left" size="xxl" weight="bold" className="pb-[1px]">
        Sweat Sherpa SAT. VI
      </Text>
      <Text family="DM" position="left" size="lg">
        $75,99
      </Text>
    </>
  );
};

const ArticleInformations = () => {
  return (
    <View className="flex-1">
      <Accordion
        title="Description"
        children={
          <View className="px-3 py-3">
            <Text position="left">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              fpzoekfpeozfkezpofkzealiquet"
            </Text>
          </View>
        }
      />
      <Accordion
        title="About"
        children={
          <View className="px-3 py-3">
            <Text position="left">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              fpzoekfpeozfkezpofkzealiquet"
            </Text>
          </View>
        }
      />
      <Accordion
        title="Materials"
        children={
          <View className="px-3 py-3">
            <Text position="left">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              fpzoekfpeozfkezpofkzealiquet"
            </Text>
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
          {"Livraison gratuite"}
        </Text>
      </View>

      <View className="flex-1 flex-row items-center">
        <CustomIcon name="check-circle" color="black" size={20} />
        <Text className="pl-1" position="left" size="md" color="dark">
          4-5 jours ouvrés
        </Text>
      </View>
    </View>
  );
};

export const ArticleDetailScreen = ({ navigation }: any) => {
  let route = useRoute();
  // const { articleID } = route?.params;
  const [selected, setSelected] = useState({
    size: 0,
    type: 0,
  });

  navigation.setOptions({
    headerShown: false,
  });

  return (
    <PageContainer
      edges={["top", "bottom", "left", "right"]}
      title="Sweat Sherpa SAT. VI"
      goBack
      footer={<AddToCartButton />}
    >
      <View className="p-2">
        <BreadCrumbs
          store={{ id: "pokpok", name: "Amixem" }}
          categorie={{ id: "dowowo", name: "Tee-shirt" }}
          article={{ id: "pokpsok", name: "Spacefox 349" }}
        />
      </View>
      <Carousel articlePictures={DATA.articles} />
      <View className="px-5">
        <ProductHeaderInformations />
        <View className="pt-2">
          <DonationButton />
        </View>
        <View className="pb-6 border-b-[1px] border-[#E6E6E6]">
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
        </View>

        <ShippingInformations />

        <ArticleInformations />

        <View className="flex-1 pt-10">
          <DonationCard />
        </View>

        <View>
          <SectionName name="Autres produits" />
        </View>
      </View>
      <View className="pb-4">
        <ArticlesList articles={DATA.articles} horizontal />
      </View>
      <View className="p-3 flex-1 pb-10">
        <CreateAccountCard
          title="Create your account today"
          subtitle="Never miss exclusive drops again"
          backgroundColor="#f5f5f5"
        />
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
