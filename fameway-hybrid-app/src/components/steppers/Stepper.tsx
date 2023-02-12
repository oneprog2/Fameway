import { View } from "react-native";
import { CustomIcon } from "../icons";
import { Text } from "../texts";

export const Stepper = ({ steps, activeStep }) => {
  const StatusButton = ({ isActive, isCompleted, index }) => {
    if (isActive) {
      return (
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#FFD028",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            borderColor: "#FFD028",
            borderWidth: 2,
            borderRadius: 3000,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              lineHeight: 16.5,
              fontWeight: "bold",
            }}
          >
            {index}
          </Text>
        </View>
      );
    } else if (isCompleted) {
      return (
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#222222",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <CustomIcon name="checkmark" size={25} color="white" />
        </View>
      );
    } else {
      return (
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            borderColor: "#E6E6E6",
            borderWidth: 2,
            borderRadius: 3000,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "#B7B7B7",
              fontSize: 14,
              lineHeight: 16.5,
            }}
          >
            {index}
          </Text>
        </View>
      );
    }
  };

  return (
    <View className="flex-row flex-1 px-3">
      {steps?.map((step, index) => {
        const isActive = index === activeStep;
        const isCompleted = index < activeStep;
        return (
          <View
            className="flex-row flex-1 align-center items-center"
            key={index}
          >
            <View className="h-6 w-6 rounded-full justify-center items-center overflow-hidden mr-[8px]">
              <StatusButton
                index={index + 1}
                isActive={isActive}
                isCompleted={isCompleted}
              />
            </View>

            <View>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: isActive ? "bold" : "normal",
                }}
              >
                {step.label}
              </Text>
            </View>
            <View className="flex-1 items-center justify-center px-1.5">
              <View
                style={{
                  width: "100%",
                  height: 1.5,
                  backgroundColor: "#F0F0F0",
                }}
              ></View>
            </View>
          </View>
        );
      })}
    </View>
  );
};
