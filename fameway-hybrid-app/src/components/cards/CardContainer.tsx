import { variants, VariantsProps } from "nativewind";
import React from "react";
import { View } from "react-native";
import { Light } from "@components";

const CardContainerClassName = variants("flex-1 overflow-hidden", {
  variants: {
    padding: {
      none: "",
      normal: "p-2",
      md: "p-4",
      lg: "p-8",
    },
    roundness: {
      none: "",
      normal: "rounded-lg",
      xl: "rounded-3xl",
      full: "rounded-full",
    },
    disabled: {
      true: "",
      false: "",
    },
  },
});

export type CardContainerProps = VariantsProps<
  typeof CardContainerClassName
> & {
  children: React.ReactNode;
};

export function CardContainer(props: CardContainerProps) {
  const {
    children,
    padding = "normal",
    roundness = "normal",
    backgroundColor = "#ffce00",
    light = "center",
  } = props;

  return (
    <View
      style={{ backgroundColor: backgroundColor }}
      className={CardContainerClassName({
        roundness,
        padding,
      })}
    >
      {light === "off" ? null : (
        <View className="absolute h-full w-full">
          <Light position={light} color="#FFFFFF" />
        </View>
      )}
      {children}
    </View>
  );
}
