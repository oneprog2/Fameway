import {
  Button,
  CustomIcon,
  FamewayIcon,
  Input,
  PageContainer,
  Text,
} from "@components";
import React from "react";
import { Image, View } from "react-native";

export function SignUpScreen({ navigation }) {
  return (
    <PageContainer goBack>
      <View className="flex-1 flex flex-col px-4">
        <View className="pb-10 items-center">
          <View className="flex-row items-center">
            <View className="h-12 w-12">
              <FamewayIcon />
            </View>
            <Text family="Oblivian" weight="regular" size="4xl">
              Fameway
            </Text>
          </View>
        </View>
        <Input
          size="sm"
          role="normal"
          startSlot={<CustomIcon size={20} color="black" name="mail" />}
          placeholderTextColor="black"
          placeholder="Email"
        />

        <View className="pt-4">
          <Button role="normal" size="lg" roundness={"full"} label="Log in" />
        </View>
        <View className="pt-4">
          <Button
            role="normal"
            size="lg"
            disabled
            roundness={"full"}
            label="Create an account"
          />
        </View>

        <View>
          <View className="flex-row items-center py-6">
            <View className="flex-1 h-[1px] bg-neutral-12" />
            <View>
              <Text className="mx-4 align-center" color="neutral-8">
                or continue with
              </Text>
            </View>
            <View className="flex-1 h-[1px] bg-neutral-12" />
          </View>
        </View>
        <View className="pb-4">
          <Button
            onPress={() => navigation.navigate("SignUp")}
            role="outline"
            size="lg"
            roundness={"full"}
            startSlot={
              <View className="w-5 h-5">
                <Image
                  resizeMode="contain"
                  className="h-full w-full"
                  source={require("@assets/images/google.png")}
                />
              </View>
            }
            label="Log in with Google"
          />
        </View>
        <Button
          roundness={"full"}
          size="lg"
          role="outline"
          startSlot={<CustomIcon name="apple-logo" color="white" size={20} />}
          label="Log in with Apple"
        />
        <View className="pt-6">
          <Button
            onPress={() => navigation.navigate("SignUp")}
            className="text-primary-10"
            role="empty"
            label="Don’t have an account? Sign up"
          />
        </View>
      </View>
    </PageContainer>
  );
}
