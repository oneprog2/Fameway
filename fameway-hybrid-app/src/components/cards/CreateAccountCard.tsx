import { CardContainer, Text, Button, FamewayIcon } from "@components";
import { View, Image } from "react-native";

export type CreateAccountCardProps = {
  title?: string;
  subtitle?: string;
  onPress?: () => void;
  backgroundColor?: string;
};

export const CreateAccountCard = ({
  title,
  subtitle,
  onPress,
  backgroundColor,
}: CreateAccountCardProps) => {
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
            {title}
          </Text>
          <Text family="DM" weight="bold">
            {subtitle}
          </Text>
        </View>

        <View className="pt-10 pb-10">
          <Button label="Create Account" size="lg" roundness="full" />
        </View>
      </View>
    </CardContainer>
  );
};
