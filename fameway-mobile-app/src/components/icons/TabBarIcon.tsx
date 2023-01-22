import { CustomIcon, Text, FamewayIcon } from "@components";
import { Image, View } from "react-native";

type PlayTabIconProps = {
  screenName: string;
  iconName: string;
  focused: boolean;
};

export const TabBarIcon = ({
  screenName,
  iconName,
  focused,
}: PlayTabIconProps) => (
  <View
    style={{
      marginTop: 5,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {iconName === "icon" ? (
      <View
        className={`h-[25px] w-[25px] border-2 ${
          focused ? "border-neutral-8 bg-neutral-2" : "border-neutral-10"
        } rounded-full`}
      >
        {focused ? (
          <FamewayIcon color="#FFCF26" />
        ) : (
          <FamewayIcon color="#717171" />
        )}
      </View>
    ) : (
      <CustomIcon
        color={focused ? "#1f1f1f" : "#717171"}
        name={iconName}
        size={25}
      />
    )}
    <View style={{ marginTop: 3 }}>
      <Text
        family="DM-Bold"
        color={focused ? "#1f1f1f" : "#717171"}
        size="t5"
        position="center"
      >
        {screenName}
      </Text>
    </View>
  </View>
);
