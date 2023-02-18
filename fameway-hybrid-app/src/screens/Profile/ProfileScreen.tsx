import {
  Button,
  CustomIcon,
  FamewayIcon,
  Input,
  PageContainer,
  Text,
} from "@components";
// import { useAuth } from "@contexts";
// import bcrypt from "bcryptjs";
// import * as AppleAuthentication from "expo-apple-authentication";
// import * as Google from "expo-auth-session/providers/google";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, View } from "react-native";

// function hashPassword({ password, salt }: any) {
//   return bcrypt.hashSync(password, salt);
// }

export function ProfileScreen({ navigation }) {
  const [hidePassword, setHidePassword] = useState(true);

  // const [x, response, promptAsync] = Google.useAuthRequest({
  //   expoClientId:
  //     "459464991184-jlnkk8pt89pq8kof385r0t319flsv5eo.apps.googleusercontent.com",
  //   iosClientId:
  //     "459464991184-abun6umttol56st2jn5kkfdj9ajqdpb4.apps.googleusercontent.com",
  //   // androidClientId: "GOOGLE_GUID.apps.googleusercontent.com",
  //   // webClientId: "GOOGLE_GUID.apps.googleusercontent.com",
  // });

  // const login = async () => {
  //   const email = "testbeta4@yopmail.com";
  //   const password = "immortal1234!";

  //   const saltAPIResponse = await fetch(
  //     `https://immortal.game/api/salt/${email}`
  //   );
  //   const { salt } = await saltAPIResponse.json();

  //   const saltedPassword = hashPassword({
  //     password: password as string,
  //     salt,
  //   });

  //   await fetch("https://auth.dev.immortal.game/auth/signin", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       rid: "emailpassword",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       formFields: [
  //         { id: "email", value: email },
  //         { id: "password", value: saltedPassword },
  //       ],
  //     }),
  //   });

  //   await syncAuth();
  // };

  // const loginGoogle = async (res) => {
  //   await fetch("https://auth.dev.immortal.game/auth/signinup", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       rid: "thirdparty",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       redirectURI: "",
  //       thirdPartyId: "google",
  //       authCodeResponse: {
  //         access_token: res.authentication.accessToken,
  //       },
  //     }),
  //   });

  //   await syncAuth();
  // };

  // const loginApple = async (res) => {
  //   try {
  //     const result = await fetch(
  //       "https://auth.dev.immortal.game/auth/signinup",
  //       {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //           rid: "thirdparty",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           redirectURI: "",
  //           thirdPartyId: "apple",
  //           code: res.authorizationCode,
  //           clientId: "game.immortal.app",
  //         }),
  //       }
  //     );
  //     console.log("res", result);
  //     const data = await result.json();
  //     console.log("data", data);
  //     await syncAuth();
  //   } catch (err) {
  //     console.log("err", err);
  //   }
  // };

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     loginGoogle(response);
  //   }
  // }, [response]);

  return (
    <PageContainer>
      <View className="flex-1 flex flex-col px-4 mt-14">
        <View className="mb-20 items-center">
          <View className="flex-row items-center mr-4">
            <View className="h-20 w-20">
              <FamewayIcon />
            </View>
            <Text family="Oblivian" weight="regular" size="5xl">
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

        <View className="pb-2 pt-2">
          <Input
            size="sm"
            role="normal"
            secureTextEntry={hidePassword}
            startSlot={<CustomIcon size={20} color="black" name="lock" />}
            placeholderTextColor="black"
            placeholder="Mot de passe"
          />
        </View>
        <View className="pt-4">
          <Button
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
    </PageContainer>
  );
}
