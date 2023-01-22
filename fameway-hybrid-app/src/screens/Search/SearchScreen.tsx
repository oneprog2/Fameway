import { Button, CustomInput } from "@components";
import { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";

export const SearchScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Button
        leftIcon={{ name: "home", color: "white" }}
        // title="Go to Profile"
        // onPress={() => navigation.navigate("Profile")}
      />
      {/* <CustomInput value={first} setValue={setfirst}></CustomInput> */}
    </SafeAreaView>
  );
};
