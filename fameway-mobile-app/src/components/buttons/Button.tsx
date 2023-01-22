import type { VariantProps } from "class-variance-authority";
import { variants } from "nativewind";
import React from "react";
import { Pressable, PressableProps, Text } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const buttonClassName = variants("flex flex-row items-center justify-center", {
  variants: {
    role: {
      normal: "",
      primary: "",
      critical: "",
      grey: "bg-[#f0f0f0]",
      outline: "border border-neutral-10",
      white: "bg-[#FFFFFF]",
      fameway: "bg-fameway",
    },
    size: {
      sm: "h-8",
      md: "h-10",
      lg: "h-14",
      full: "h-full w-full",
    },
    iconOnly: {
      true: "",
      false: "",
    },
    roundness: {
      none: "",
      normal: "rounded-lg",
      full: "rounded-full",
    },
    disabled: {
      true: "",
      false: "",
    },
    shadow: {
      true: "shadow",
      false: "",
    },
  },
  compoundVariants: [
    {
      role: "normal",
      disabled: false,
      className: "bg-dark border-neutral-a-2",
    },
    {
      role: "normal",
      disabled: true,
      className: "bg-neutral-11 border-neutral-a-6",
    },
    {
      role: "primary",
      disabled: false,
      className: "bg-primary-9 border-primary-10",
    },
    {
      role: "primary",
      disabled: true,
      className: "bg-transparent border-neutral-a-3",
    },
    {
      role: "critical",
      disabled: false,
      className: "bg-critical-9",
    },
    { role: "critical", disabled: true, className: "" },

    { size: "sm", iconOnly: false, className: "px-2 space-x-1" },
    { size: "sm", iconOnly: true, className: "w-8" },

    { size: "md", iconOnly: false, className: "px-3 space-x-2" },
    { size: "md", iconOnly: true, className: "w-10" },

    { size: "lg", iconOnly: false, className: "px-4 space-x-3" },
    { size: "lg", iconOnly: true, className: "w-14" },
  ],
});

const buttonLabelClassName = variants("font-boldDM", {
  variants: {
    role: {
      normal: "",
      primary: "",
      critical: "",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-base",
    },
    disabled: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      role: "normal",
      disabled: false,
      className: "text-light",
    },
    {
      role: "normal",
      disabled: true,
      className: "text-white",
    },
    {
      role: "primary",
      disabled: false,
      className: "text-neutral-12",
    },
    {
      role: "primary",
      disabled: true,
      className: "text-neutral-6",
    },
    { role: "critical", disabled: false, className: "text-white" },
    { role: "critical", disabled: true, className: "text-neutral-6" },
  ],
});

const timingConfig = {
  duration: 140,
  easing: Easing.out(Easing.ease),
};

export type ButtonProps = VariantProps<typeof buttonClassName> & {
  label?: string;
  startSlot?: React.ReactNode;
  endSlot?: React.ReactNode;
  disabled?: boolean;
  onPress?: PressableProps["onPress"];
  animScale: number;
};

export function Button(props: ButtonProps) {
  const {
    label,
    startSlot,
    endSlot,
    role = "normal",
    size = "md",
    roundness = "normal",
    disabled = false,
    onPress = () => {},
    shadow,
    animScale = 0.95,
    ...rest
  } = props;

  const scale = useSharedValue(1);

  const iconOnly =
    (startSlot !== undefined || endSlot !== undefined) && label === undefined;

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      {...rest}
      disabled={disabled}
      onPress={onPress}
      onTouchStart={() => {
        if (!disabled) {
          scale.value = withTiming(animScale, timingConfig);
        }
      }}
      onTouchEnd={() => {
        scale.value = withTiming(1, timingConfig);
      }}
    >
      <Animated.View
        className={buttonClassName({
          role,
          size,
          roundness,
          disabled,
          iconOnly,
          shadow,
        })}
        style={buttonStyle}
      >
        {startSlot}
        {label ? (
          <Text className={buttonLabelClassName({ role, size, disabled })}>
            {label}
          </Text>
        ) : null}
        {endSlot}
      </Animated.View>
    </Pressable>
  );
}
