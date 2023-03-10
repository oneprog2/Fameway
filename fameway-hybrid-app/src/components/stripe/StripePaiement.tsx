import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Button, Alert } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { gql, useMutation } from "@apollo/client";
import { CREATE_PAYMENT_INTENT } from "@api";

//ADD localhost address of your server
const API_URL = "http://localhost:3000";

export const StripePaiement = ({
  startPaiement,
  setStartPaiement,
  billingDetails,
  paiementMethod,
  navigation,
  setLoading,
}: any) => {
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();
  const [createPaymentIntent] = useMutation(CREATE_PAYMENT_INTENT);

  const fetchPaymentIntentClientSecret = async () => {
    return await createPaymentIntent({
      variables: {
        paiementMethod: paiementMethod,
      },
    }).then((res) => {
      return {
        clientSecret: res.data.createPaymentIntent.clientSecret,
        error: res.errors,
      };
    });
  };

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (startPaiement) {
      handlePayPress();
    }
  }, [startPaiement]);

  const handlePayPress = async () => {
    if (!cardDetails?.complete) {
      setStartPaiement(false);
      setLoading(false);

      Alert.alert("Erreur", "Merci d'entrer les informations de votre carte.");
      return;
    }

    const { clientSecret, error } = await fetchPaymentIntentClientSecret();

    if (error) {
      setStartPaiement(false);
      setLoading(false);
      Alert.alert(`Error code: ${error.code}`, error.message);
      return;
    }
    const { paymentIntent, error: confirmError } = await confirmPayment(
      clientSecret,
      {
        paymentMethodType: "Card",
        paymentMethodData: {
          billingDetails,
        },
      }
    );

    if (confirmError) {
      setStartPaiement(false);
      setLoading(false);

      Alert.alert(`Error codesss: ${confirmError.code}`, confirmError.message);
      return;
    }
    if (paymentIntent) {
      setStartPaiement(false);
      setLoading(false);
      console.log("pokp");
      navigation.navigate("SuccessPaiement");
    }
  };

  return (
    <CardField
      postalCodeEnabled={false}
      placeholder={{
        number: "1234 1234 1234 1234",
      }}
      cardStyle={{
        borderRadius: 10,
        fontSize: 12,
      }}
      style={styles.cardContainer}
      onCardChange={(cardDetails) => {
        setCardDetails(cardDetails);
      }}
    />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    fontSize: 10,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
    height: 32,
  },
});
