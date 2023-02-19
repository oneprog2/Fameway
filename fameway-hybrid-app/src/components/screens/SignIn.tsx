import React, { useState } from "react";
import { View, Image } from "react-native";
import { Button, FamewayIcon, Input, Text } from "@components";
import { useAuth } from "@contexts";
import { CustomIcon } from "@components";
import { useNavigation } from "@react-navigation/native";

export const SignIn = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
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
          loading={loading}
          onPress={async () => {
            setLoading(true);
            await signin({
              email: email,
              password: password,
            }).then(() => {
              setLoading(false);
            });
          }}
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
