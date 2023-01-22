import { createUseStyles, useTheme, ThemeType } from "@styles";
import { View, StyleProp, ViewStyle } from "react-native";
import { Dot } from "./Dot";

interface DataProps {
  numberOfPages: number;
  currentIndex: number;
}

interface ContextProps {
  theme?: ThemeType;
}

interface StyleTypes {
  containerStyle: StyleProp<ViewStyle>;
}

export const PaginationDots: React.FC<DataProps & ContextProps> = ({
  numberOfPages,
  currentIndex,
}) => {
  const theme = useTheme();
  const styles = useStyles({ theme });

  return (
    <View style={styles.containerStyle}>
      {new Array(numberOfPages).fill(0).map((_, index) => (
        <Dot key={index} focused={index === currentIndex}></Dot>
      ))}
    </View>
  );
};

const getStyles = (context: ContextProps): StyleTypes => ({
  containerStyle: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

const useStyles = createUseStyles(getStyles);
