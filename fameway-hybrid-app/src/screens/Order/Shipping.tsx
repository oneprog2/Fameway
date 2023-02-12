import { useMutation, useQuery } from "@apollo/client";
import { BottomButton, PageContainer, Text } from "@components";

import { ADDRESSES_DATA, INSERT_ADDRESS } from "@api";
import { useState } from "react";
import { Stepper } from "@components";
import { View } from "react-native";

export const ShippingScreen = ({ navigation }) => {
  const [shippingAdress, setShippingAdress] = useState("");

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

  const steps = [
    {
      label: "Livraison",
    },
    {
      label: "Paiement",
    },
    {
      label: "Récapitulatif",
    },
  ];

  return (
    <PageContainer
      edges={["top", "bottom", "left", "right"]}
      goBack
      title="🚚 Livraison"
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
      <Text>ShippingScreen</Text>
    </PageContainer>
  );
};
