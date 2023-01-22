import { Button } from "@components";
import { SafeAreaView } from "react-native";

export const WishlistScreen = ({ navigation }) => {
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
