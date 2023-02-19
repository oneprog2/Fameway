import { useMutation, useQuery } from "@apollo/client";
import {
  AddressAccordion,
  BottomButton,
  Button,
  CustomIcon,
  PageContainer,
  Text,
  StripePaiement,
} from "@components";

import { ADDRESSES_DATA, CART_DATA, INSERT_ADDRESS, USER_DATA } from "@api";
import { useRef, useState } from "react";
import { View, TextInput, Image } from "react-native";
import { Switch } from "react-native-switch";
import { useAtom } from "jotai";
import { userAtom } from "../../atoms/Atoms";

const deliveryMethod = [
  {
    label: "A domicile",
    icon: "home",
    disabled: false,
    price: "5,99€",
    key: "home",
  },
  {
    label: "Point relais",
    icon: "pin",
    disabled: false,
    price: "3,99€",
    key: "relay",
  },
  {
    label: "Mail (digital)",
    icon: "mail",
    disabled: false,
    price: "GRATUIT",
    key: "mail",
  },
];

const paiementMethods = [
  {
    image: (
      <View
        style={{
          height: "100%",
          alignContent: "center",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        <Image
          style={{
            width: 45,
            height: 45,
            marginRight: 3,
            resizeMode: "contain",
          }}
          source={require("../../assets/images/visa.png")}
        ></Image>
        <Image
          style={{
            width: 45,
            height: 45,
            resizeMode: "contain",
          }}
          source={require("../../assets/images/mastercard.png")}
        ></Image>
      </View>
    ),
    disabled: false,
    key: "card",
  },
  {
    disabled: false,
    key: "wallet",
    image: (
      <View
        style={{
          height: "100%",
          alignContent: "center",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        <Image
          style={{
            width: 45,
            height: 45,
            marginRight: 3,
            resizeMode: "contain",
          }}
          source={require("../../assets/images/applePay.png")}
        ></Image>
        <Image
          style={{
            width: 45,
            height: 45,
            resizeMode: "contain",
          }}
          source={require("../../assets/images/paypal.png")}
        ></Image>
      </View>
    ),
  },
  {
    image: (
      <View
        style={{
          height: "100%",
          alignContent: "center",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        <Image
          style={{
            width: 45,
            height: 45,
            marginRight: 3,
            resizeMode: "contain",
          }}
          source={require("../../assets/images/klarna.png")}
        ></Image>
        <Image
          style={{
            width: 45,
            height: 45,
            resizeMode: "contain",
          }}
          source={require("../../assets/images/alma.png")}
        ></Image>
      </View>
    ),
    disabled: true,
    key: "klarna",
  },
];

const MethodButton = ({ methods, setMethods, selectedMethod }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {methods?.map((method, index) => {
        const selected = selectedMethod === method.key;

        return (
          <View
            key={method.key}
            style={{
              borderRadius: 20,
              aspectRatio: 1,
              opacity: method.disabled ? 0.5 : 1,
              backgroundColor: selected ? "#fff" : "#eee",
              borderColor: selected ? "#222" : "#E6E6E6",
              borderWidth: 1,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 5,
            }}
          >
            <Button
              disabled={method.disabled}
              role="empty"
              onPress={() => setMethods(method.key)}
              size="full"
              iconOnly
              startSlot={
                <View
                  style={{
                    height: "100%",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {method.icon ? (
                    <CustomIcon
                      color={selected ? "#222" : "#9A9A9A"}
                      name={method.icon}
                      size={36}
                    />
                  ) : method.image ? (
                    <>{method.image}</>
                  ) : null}
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {method.label ? (
                      <Text
                        style={{
                          height: 18,
                          fontSize: 12,
                          fontWeight: selected ? "bold" : "normal",
                          color: selected ? "#222" : "#9A9A9A",
                        }}
                      >
                        {method.label}
                      </Text>
                    ) : null}
                    {method.price ? (
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "normal",
                          color: selected ? "#222" : "#9A9A9A",
                        }}
                      >
                        {method.price}
                      </Text>
                    ) : null}
                  </View>

                  {!method.disabled ? (
                    <View
                      style={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        borderColor: "#222",
                        height: 15,
                        width: 15,
                        backgroundColor: selected ? "#222222" : "#FFF",
                        borderRadius: 200,
                        margin: 5,
                      }}
                    >
                      {selected ? (
                        <CustomIcon name="checkmark" size={16} color="white" />
                      ) : null}
                    </View>
                  ) : null}
                </View>
              }
            ></Button>
          </View>
        );
      })}
    </View>
  );
};

const ShippingAddress = () => {
  const [selected, setSelected] = useState(0);

  return (
    <View className="w-full mt-5 flex-column mb-2">
      <View
        style={{
          borderWidth: 1,
          borderRadius: 20,
          padding: 5,
          backgroundColor: selected === 0 ? "#fff" : "#eee",
          borderColor: selected === 0 ? "#222" : "#E6E6E6",
        }}
      >
        <AddressAccordion
          selected={selected === 0}
          setSelected={setSelected}
          title="Maison"
          subtitle="86 rue des grèzes, 34070 Montpellier"
          icon="pen"
          children={
            <View className="px-3 py-3">
              <TextInput placeholder="Adresse" />
              <TextInput placeholder="Complément d'adresse" />
              <TextInput placeholder="Ville" />
              <TextInput placeholder="Code postal" />
              <TextInput placeholder="Pays" />
            </View>
          }
        ></AddressAccordion>
      </View>

      <View className="h-10 w-full mt-3 px-10">
        <Button
          role="empty"
          size="full"
          roundness="full"
          iconOnly
          startSlot={
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  backgroundColor: "#222",
                  borderRadius: 200,
                }}
              >
                <CustomIcon name="plus2" size={30} color="white" />
              </View>
            </View>
          }
        ></Button>
      </View>
    </View>
  );
};

const MailEdit = () => {
  return (
    <View
      style={{
        borderColor: "#E6E6E6",
        borderWidth: 1,
        borderRadius: 20,
        padding: 5,
      }}
      className="w-full mt-5 flex-row mb-6"
    >
      <AddressAccordion
        title="Email de livraison"
        subtitle="i.rifki@oneprog.fr"
      >
        <View>
          <TextInput placeholder="Adresse" />
          <TextInput placeholder="Complément d'adresse" />
          <TextInput placeholder="Ville" />
          <TextInput placeholder="Code postal" />
          <TextInput placeholder="Pays" />
        </View>
      </AddressAccordion>
    </View>
  );
};

export const groupCartItems = ({ cartItems }: any) => {
  const groupedByStore =
    cartItems &&
    cartItems.length > 0 &&
    cartItems?.reduce((acc: any, item: any) => {
      const storeName = item?.article?.store?.name;
      if (!acc[storeName]) {
        acc[storeName] = [];
      }
      acc[storeName].push({
        articles: item?.article,
        quantity: item?.quantity,
        store: item?.article?.store,
        cartItemID: item?.id,
      });
      return acc;
    }, {});

  return (
    groupedByStore &&
    Object.keys(groupedByStore).map((key) => {
      return {
        storeName: key,
        cartItemID: groupedByStore[key][0]?.cartItemID,
        data: groupedByStore[key],
      };
    })
  );
};

export const CheckoutScreen = ({ navigation }) => {
  const [shippingAdress, setShippingAdress] = useState("");
  const [shippingMethod, setShippingMethod] = useState(deliveryMethod[2].key);
  const [paiementMethod, setPaiementMethod] = useState(paiementMethods[0].key);
  const [startPaiement, setStartPaiement] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registerCard, setRegisterCard] = useState(false);
  const [user, setUser] = useAtom(userAtom);

  const {
    data: cartData,
    error: cartError,
    loading: cartLoading,
  } = useQuery(CART_DATA, {
    variables: {
      ownerID: user?.sub,
    },
  });
  console.log(cartData);

  const [
    addAdress,
    {
      data: insertAdressData,
      error: insertAdressError,
      loading: insertAdressLoading,
    },
  ] = useMutation(INSERT_ADDRESS, {
    variables: {
      name: "Maison",
      ownerID: "auth0|63e7b39a0f6f582e30bb6fd4",
      addressLineOne: "86 rue des grèzes",
      addressLineTwo: "Appartement 2",
      city: "Paris",
      state: "Ile de France",
      zipCode: "75015",
      country: "France",
      isDefault: true,
    },
  });

  const {
    data: adressesData,
    error: adressesError,
    loading: adressesLoading,
  } = useQuery(ADDRESSES_DATA);

  const {
    data: userData,
    error: userError,
    loading: userLoading,
  } = useQuery(USER_DATA, {
    variables: {
      id: user?.sub,
    },
  });

  if (adressesLoading) return <Text>Loading...</Text>;

  const groupedArticles = groupCartItems({
    cartItems: cartData?.cart[0]?.cartItems || {},
  });
  console.log("groupedArticles");
  console.log(groupedArticles);
  console.log("groupedArticles");

  return (
    <PageContainer
      edges={["top", "bottom", "left", "right"]}
      goBack
      title="✨ Commander"
      footer={
        <BottomButton
          loading={loading}
          label={"Confirmer et payer"}
          onPress={() => {
            setStartPaiement(true);
            setLoading(true);
          }}
        ></BottomButton>
      }
    >
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 24,
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          🚚 Livraison
        </Text>

        <MethodButton
          methods={deliveryMethod}
          setMethods={setShippingMethod}
          selectedMethod={shippingMethod}
        />

        {shippingMethod === "home" ? (
          <ShippingAddress />
        ) : shippingMethod === "mail" ? (
          <MailEdit />
        ) : (
          <View
            style={{
              marginBottom: 24,
            }}
          ></View>
        )}

        <View>
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            💳 Paiement
          </Text>
        </View>

        <MethodButton
          methods={paiementMethods}
          setMethods={setPaiementMethod}
          selectedMethod={paiementMethod}
        />

        {/* {shippingMethod === "home" ? (
          <ShippingAddress />
        ) : shippingMethod === "mail" ? (
          <MailEdit />
        ) : (
          <View
            style={{
              marginBottom: 24,
            }}
          ></View>
        )} */}
        <View
          style={{
            marginTop: 14,
            width: "100%",
            borderColor: "#222",
            borderRadius: 20,
            padding: 17,
            paddingTop: 20,
            borderWidth: 1,
            paddingBottom: 26,
          }}
        >
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                textAlign: "left",
                marginBottom: 15,
              }}
            >
              Règlement par carte
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                textAlign: "left",
                marginBottom: 10,
              }}
            >
              Numéros de carte
            </Text>
            <StripePaiement
              navigation={navigation}
              setLoading={setLoading}
              billingDetails={{
                name: userData?.user?.name,
                email: userData?.user?.email,
                phone: userData?.user?.phonenumber,
                firstname: userData?.user?.firstname,
                lastname: userData?.user?.lastname,
                adress: shippingAdress,
              }}
              startPaiement={startPaiement}
              setStartPaiement={setStartPaiement}
              paiementMethod={paiementMethod}
            />
            <View className="flex-row align-center  items-center ml-1 mt-6">
              <Switch
                value={registerCard}
                onValueChange={setRegisterCard}
                circleSize={14}
                barHeight={14}
                circleBorderWidth={0}
                backgroundActive="green"
                backgroundInactive="#E6E6E6"
                circleActiveColor="white"
                circleInActiveColor="white"
                renderActiveText={false}
                renderInActiveText={false}
                changeValueImmediately
              />
              <View className="ml-2">
                <Text size="sm">Enregistrer ma carte</Text>
              </View>
            </View>
          </View>
        </View>

        <View className={"mt-5"}>
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            🔥 Récapitulatif
          </Text>
        </View>
      </View>
    </PageContainer>
  );
};
