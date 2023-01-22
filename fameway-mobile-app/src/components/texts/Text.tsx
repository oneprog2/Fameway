import { variants, VariantsProps } from "nativewind";
import { Text as TextBase, TextProps as TextPropsBase } from "react-native";

const textClassName = variants("", {
  variants: {
    color: {
      white: "text-white",
      neutral: "text-neutral-12",
      "neutral-faded": "text-neutral-11",
      "neutral-muted": "text-neutral-9",
      "neutral-disabled": "text-neutral-6",
      dark: "text-neutral-3",
      positive: "text-positive-9",
      critical: "text-critical-9",
      none: "",
    },
    size: {
      "2xs": "text-[10px]",
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      xxl: "text-2xl",
      xxxl: "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
    },
    weight: {
      bold: "font-bold",
      thin: "font-thin",
      light: "font-light",
      regular: "font-regular",
    },
    family: {
      DM: "",
      Oblivian: "font-Oblivian",
    },
    position: {
      center: "text-center",
      left: "text-left",
      right: "text-right",
    },
  },
  compoundVariants: [
    {
      weight: "bold",
      family: "DM",
      className: "font-boldDM",
    },
    {
      weight: "regular",
      family: "DM",
      className: "font-mediumDM",
    },
    {
      weight: "regular",
      family: "DM",
      className: "font-regularDM",
    },
  ],
});

export type TextProps = VariantProps<typeof textClassName> &
  TextPropsBase & {
    className?: string;
  };

export function Text(props: TextProps) {
  const {
    color,
    size = "md",
    position = "center",
    weight = "medium",
    family = "DM",
    ...rest
  } = props;
  return (
    <TextBase
      {...rest}
      className={textClassName({
        color,
        size,
        position,
        weight,
        family,
      })}
    />
  );
}
