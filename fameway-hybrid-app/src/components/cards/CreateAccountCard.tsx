import { PROMOTION_CARD } from "@api";
import { useQuery } from "@apollo/client";
import { CardContainer, Text, Button, FamewayIcon } from "@components";
import { View } from "react-native";

export type CreateAccountCardProps = {
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
  buttonText?: string;
};

export const CreateAccountCard = ({
  backgroundColor,
}: CreateAccountCardProps) => {
  const {
    data: mainCardData,
    error: mainCardError,
    loading: mainCardLoading,
  } = useQuery(PROMOTION_CARD, {
    fetchPolicy: "cache-and-network",
  });

  const createAccountData = mainCardData?.promotionCard?.filter(
    (e: any) => e.type === "CREATE_ACCOUNT_CARD"
  )?.[0];

  if (mainCardLoading) return null;

  return (
    <CardContainer
      backgroundColor={backgroundColor}
      padding="none"
      role="primary"
      roundness="normal"
    >
      <View className="flex-1 items-center mt-10 ">
        <View className="h-20 w-20">
          <FamewayIcon />
        </View>
        <View className="flex-1 w-full">
          <Text color="neutral-muted" family="DM" weight="bold">
            {createAccountData?.title}
          </Text>
          <Text family="DM" weight="bold">
            {createAccountData?.description}
          </Text>
        </View>

        <View className="pt-10 pb-10">
          <Button
            label={createAccountData?.buttonText}
            size="lg"
            roundness="full"
          />
        </View>
      </View>
    </CardContainer>
  );
};
