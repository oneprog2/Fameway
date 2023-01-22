import { createUseStyles, useTheme, ThemeType } from "@styles";
import { View, StyleProp, ViewStyle } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { IconButton } from "@components";

interface DataProps {}

interface ContextProps {
  theme?: ThemeType;
}

interface StyleTypes {
  containerStyle: StyleProp<ViewStyle>;
}

const DATA = [
  {
    icon: {
      name: "gaming",
      color: "#717171",
      size: 30,
    },
    label: "Gaming",
  },
  {
    icon: {
      name: "music",
      color: "#717171",
      size: 30,
    },
    label: "Music",
  },
  {
    icon: {
      name: "dumbell",
      color: "#717171",
      size: 30,
    },
    label: "Sport",
  },
  {
    icon: {
      name: "star",
      color: "#717171",
      size: 30,
    },
    label: "Beauty",
  },
  {
    icon: {
      name: "paintbrush-2",
      color: "#717171",
      size: 30,
    },
    label: "Painting",
  },
  {
    icon: {
      name: "dumbell",
      color: "#717171",
      size: 30,
    },
    label: "Sport",
  },
];

export const HorizontalNavbar: React.FC<DataProps & ContextProps> = (props) => {
  const theme = useTheme();
  const styles = useStyles({ theme });

  return (
    <FlashList
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      horizontal
      data={DATA}
      renderItem={(item) => (
        <IconButton label={item.item.label} icon={item.item.icon} />
      )}
      style={styles.containerStyle}
    />
  );
};

const getStyles = (context: ContextProps): StyleTypes => ({
  containerStyle: {},
});

const useStyles = createUseStyles(getStyles);
