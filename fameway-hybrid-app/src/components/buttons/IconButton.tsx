import { createUseStyles, useTheme, ThemeType } from "@styles";
import { View, StyleProp, ViewStyle } from "react-native";
import { CustomIcon, Text } from "@components";
import { TouchableOpacity } from "react-native-gesture-handler";

interface DataProps {
  label: string;
  icon: {
    name: string;
    color?: string;
    size?: number;
  };
  onPress?: () => void;
}

interface ContextProps {
  theme?: ThemeType;
}

interface StyleTypes {
  containerStyle: StyleProp<ViewStyle>;
}

export const IconButton: React.FC<DataProps & ContextProps> = ({
  icon,
  label,
  onPress,
}: DataProps) => {
  const theme = useTheme();
  const styles = useStyles({ theme });

  return (
    <TouchableOpacity style={styles.containerStyle}>
      <CustomIcon name={icon.name} color={icon.color} size={icon.size} />
      <View>
        <Text family="DM" weight="regular" color="neutral-disabled">
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (context: ContextProps): StyleTypes => ({
  containerStyle: {
    height: 90,
    width: 90,
    alignItems: "center",
  },
});

const useStyles = createUseStyles(getStyles);
