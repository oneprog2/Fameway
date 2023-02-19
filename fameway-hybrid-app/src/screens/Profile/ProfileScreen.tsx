import { Button, FamewayIcon, PageContainer, SignIn } from "@components";
import { useAuth } from "@contexts";
import { useAtom } from "jotai";
// import * as AppleAuthentication from "expo-apple-authentication";
// import * as Google from "expo-auth-session/providers/google";
import React, { useState } from "react";
import { Image, View } from "react-native";
import { userAtom } from "../../atoms/Atoms";

const Profile = () => {
  const { signout } = useAuth();

  return (
    <View className="flex-1 flex flex-col px-4 mt-14">
      <View className="mb-16 items-center">
        <View className="flex-row items-center mr-4">
          <View className="h-16 w-16">
            <FamewayIcon />
          </View>
          <Button onPress={() => signout()}></Button>
        </View>
      </View>
    </View>
  );
};

export function ProfileScreen({ navigation }) {
  const [user, setUser] = useAtom(userAtom);
  return (
    <PageContainer>
      {!user?.sub ? <SignIn navigation={navigation}></SignIn> : <Profile />}
    </PageContainer>
  );
}
