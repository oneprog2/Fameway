import { useMutation, useQuery } from "@apollo/client";
import {
  Accordion,
  AddressAccordion,
  BottomButton,
  Button,
  CustomIcon,
  PageContainer,
  Text,
} from "@components";

import { ADDRESSES_DATA, INSERT_ADDRESS } from "@api";
import { useState } from "react";
import { Stepper } from "@components";
import { View, TextInput } from "react-native";

const steps = [
  {
    label: "Récap",
  },
  {
    label: "Paiement",
  },
  {
    label: "Confirmation",
  },
];

const deliveryMethod = [
  {
    label: "Chez vous",
    icon: "home",
    disabled: false,
  },
  {
    label: "Point relais",
    icon: "pin",
    disabled: false,
  },
  {
    label: "Par mail",
    icon: "mail",
    disabled: false,
  },
];

const ShippingMethod = ({ shippingMethod, setShippingMethod }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {deliveryMethod?.map((method, index) => {
        return (
          <View
            style={{
              borderRadius: 20,
              aspectRatio: 1,
              backgroundColor:
                shippingMethod === method.label ? "#fff" : "#eee",
              borderColor: shippingMethod === method.label ? "#222" : "#E6E6E6",
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
              onPress={() => setShippingMethod(method.label)}
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
                  <CustomIcon
                    color={method.label === shippingMethod ? "#222" : "#9A9A9A"}
                    name={method.icon}
                    size={40}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight:
                        method.label === shippingMethod ? "bold" : "normal",
                      color:
                        method.label === shippingMethod ? "#222" : "#9A9A9A",
                    }}
                  >
                    {method.label}
                  </Text>
                  <View
                    style={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      borderColor: "#222",
                      height: 15,
                      width: 15,
                      backgroundColor:
                        method.label === shippingMethod ? "#FFD028" : "#FFF",
                      borderRadius: 200,
                      margin: 5,
                    }}
                  >
                    {method.label === shippingMethod ? (
                      <CustomIcon name="checkmark" size={15} />
                    ) : null}
                  </View>
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
    <View className="w-full mt-5 flex-column">
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

      <View className="h-10 w-full mt-2 px-10">
        <Button
          role="empty"
          size="full"
          roundness="full"
          iconOnly
          startSlot={
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#222",
                  borderRadius: 200,
                }}
              >
                <CustomIcon name="plus2" size={14} />
              </View>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 12,
                }}
              >
                Ajouter une adresse
              </Text>
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
      className="w-full mt-5 flex-row"
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

export const ShippingScreen = ({ navigation }) => {
  const [shippingAdress, setShippingAdress] = useState("");
  const [shippingMethod, setShippingMethod] = useState(deliveryMethod[2].label);
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

  if (adressesLoading) return <Text>Loading...</Text>;

  return (
    <PageContainer
      edges={["top", "bottom", "left", "right"]}
      goBack
      title="🔥 Récapitulatif"
      footer={
        <BottomButton
          label={"Choisir mon mode de paiement"}
          onPress={() => {
            addAdress().then((res) => {
              navigation.navigate("Payment", {
                shippingAddress: res?.data?.insert_address_one?.id,
              });
            });
          }}
        ></BottomButton>
      }
    >
      <View className="flex-1 py-6">
        <Stepper steps={steps} activeStep={0} />
      </View>
      <View
        style={{
          marginHorizontal: 20,
          justifyContent: "start",
          alignItems: "start",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          🚚 Livraison
        </Text>

        <ShippingMethod
          shippingMethod={shippingMethod}
          setShippingMethod={setShippingMethod}
        />

        {shippingMethod === "Chez vous" ? (
          <ShippingAddress />
        ) : shippingMethod === "Par mail" ? (
          <MailEdit />
        ) : null}

        <View className={"mt-5"}>
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            📦 Colis
          </Text>
        </View>
      </View>
    </PageContainer>
  );
};
