import clsx from "clsx";
import { variants, VariantProps } from "nativewind";
import React from "react";
import { TextInput as TextInputBase, View } from "react-native";

const inputClassName = variants("flex-row items-center justify-center", {
  variants: {
    role: {
      normal: "",
      primary: "",
      critical: "",
      white: "",
      empty: "",
    },
    size: {
      sm: "h-12",
      md: "h-16",
      lg: "h-20",
    },
    iconOnly: {
      true: "",
      false: "",
    },
    roundness: {
      none: "",
      normal: "rounded-2xl",
      full: "rounded-full",
    },
    disabled: {
      true: "",
      false: "",
    },
    selected: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      role: "normal",
      disabled: false,
      className: "border border-neutral-3",
    },
  ],
});

const inputContentClassName = variants("flex-1 text-neutral-3 h-full", {
  variants: {
    role: {
      normal: "",
      primary: "",
      critical: "",
      white: "",
      empty: "",
    },
    iconOnly: {
      true: "",
      false: "",
    },
    disabled: {
      true: "",
      false: "",
    },
    selected: {
      true: "",
      false: "",
    },
  },
});

export type InputProps = VariantProps<typeof inputClassName> & {
  disabled?: boolean;
  placeholder?: string;
  placeholderTextColor?: string;
  startSlot?: React.ReactNode;
  endSlot?: React.ReactNode;
  secureTextEntry?: boolean;
};

export function Input(props: InputProps) {
  const {
    role = "normal",
    size = "md",
    roundness = "normal",
    disabled = false,
    placeholder,
    placeholderTextColor = "red",
    startSlot,
    endSlot,
    ...rest
  } = props;

  return (
    <View
      {...rest}
      className={inputClassName({ role, size, roundness, disabled })}
    >
      <View className="pl-3">{startSlot}</View>
      <TextInputBase
        {...rest}
        style={{ fontSize: 16 }}
        className={clsx(
          !startSlot ? "pl-2" : "pl-2",
          !endSlot ? "pr-2" : "pr-2",
          inputContentClassName({ role, disabled })
        )}
        placeholderTextColor={placeholderTextColor}
        placeholder={placeholder}
      />
      <View className="pr-3">{endSlot}</View>
    </View>
  );
}
