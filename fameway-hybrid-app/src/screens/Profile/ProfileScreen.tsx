import {
  Button,
  CustomIcon,
  FamewayIcon,
  Input,
  PageContainer,
  Text,
} from "@components";
import { useAuth } from "@contexts";
import { useAtom } from "jotai";
// import * as AppleAuthentication from "expo-apple-authentication";
// import * as Google from "expo-auth-session/providers/google";
import React, { useState } from "react";
import { Image, View } from "react-native";
import { userAtom } from "../../atoms/Atoms";

const SignIn = () => {
  const [email, setEmail] = useState(true);
  const [password, setPassword] = useState(true);
  const [hidePassword, setHidePassword] = useState(true);
  const { signin } = useAuth();

  return (
    <View className="flex-1 flex flex-col px-4 mt-14">
      <View className="mb-16 items-center">
        <View className="flex-row items-center mr-4">
          <View className="h-16 w-16">
            <FamewayIcon />
          </View>
          <Text
            style={{
              fontSize: 40,
              lineHeight: 40,
            }}
            family="Oblivian"
            weight="regular"
          >
            Fameway
          </Text>
        </View>
      </View>

      <Input
        value={email}
        onChange={(e) => setEmail(e.nativeEvent.text)}
        size="sm"
        role="normal"
        startSlot={<CustomIcon size={20} color="black" name="mail" />}
        placeholderTextColor="black"
        placeholder="Email"
      />

      <View className="pb-2 pt-2">
        <Input
          value={password}
          onChange={(e) => setPassword(e.nativeEvent.text)}
          size="sm"
          role="normal"
          secureTextEntry={hidePassword}
          startSlot={<CustomIcon size={20} color="black" name="lock" />}
          placeholderTextColor="black"
          placeholder="Mot de passe"
        />
      </View>
      <View className="h-8 w-full items-end">
        <View className="w-24">
          <Button
            role="empty"
            size="full"
            startSlot={
              <View className="pb-2 pt-2 pr-2">
                <Text position="right" size="xs">
                  Un petit oubli ?
                </Text>
              </View>
            }
          ></Button>
        </View>
      </View>

      <View className="pt-4">
        <Button
          onPress={() =>
            signin({
              email: email,
              password: password,
            })
          }
          role="normal"
          size="md"
          roundness={"full"}
          label="Me connecter"
        />
      </View>

      <View>
        <View className="flex-row items-center py-6">
          <View className="flex-1 h-[1px] bg-neutral-12" />
          <View>
            <Text className="mx-4 align-center" color="neutral-8">
              Ou
            </Text>
          </View>
          <View className="flex-1 h-[1px] bg-neutral-12" />
        </View>
      </View>
      <View className="pb-4">
        <Button
          onPress={() => navigation.navigate("SignUp")}
          role="outline"
          size="md"
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
          label="Continuer avec Google"
        />
      </View>
      <Button
        roundness={"full"}
        size="md"
        role="outline"
        startSlot={
          <View className="w-5 h-5">
            <Image
              resizeMode="contain"
              className="h-full w-full"
              source={require("@assets/images/apple.png")}
            />
          </View>
        }
        label="Continuer avec Apple"
        // onPress={async () => {
        //   try {
        //     const credential = await AppleAuthentication.signInAsync({
        //       requestedScopes: [
        //         AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        //         AppleAuthentication.AppleAuthenticationScope.EMAIL,
        //       ],
        //     });

        //     loginApple(credential);
        //   } catch (e) {
        //     console.error(e);
        //   }
        // }}
      />
      <View className="h-10 mt-10">
        <Button
          onPress={() => navigation.navigate("SignUp")}
          className="text-[14px]"
          role="empty"
          size="full"
          startSlot={
            <View className="flex-1 flex-row items-center justify-center">
              <Text size="md">Tu n'as pas encore de compte ? </Text>
              <Text size="md" weight="bold">
                {" Inscris-toi"}
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
};

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
      {!user?.sub ? <SignIn></SignIn> : <Profile />}
    </PageContainer>
  );
}
