import { View } from "react-native";
import { Button } from "@components";
import { Portal, PortalHost } from "@gorhom/portal";
import BottomSheet from "@gorhom/bottom-sheet";
import { CartScreen } from "@screens";
import { useMemo, useRef, useState } from "react";

interface DataProps {
  children: React.ReactNode;
}

export const CartTabButton: React.FC<DataProps> = ({ children }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["90%"], []);
  const [open, setOpen] = useState(false);

  const onAddButtonPress = () => {
    if (open) bottomSheetRef?.current?.close();
    else bottomSheetRef?.current?.expand();
    setOpen(!open);
  };

  return (
    <View
      style={[
        {
          bottom: 20,
          marginHorizontal: 8,
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
          elevation: 3,
        },
      ]}
    >
      <Portal>
        <BottomSheet
          enablePanDownToClose
          detached={true}
          bottomInset={120}
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={(index) => {
            if (index === -1) setOpen(false);
            else setOpen(true);
          }}
          style={{
            marginHorizontal: 10,
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 3,
          }}
          handleComponent={() => null}
        >
          <CartScreen closeCart={() => bottomSheetRef?.current?.close()} />
        </BottomSheet>
      </Portal>

      <PortalHost name="custom_host" />
      <Button
        role="fameway"
        size={"none"}
        roundness="full"
        onPress={onAddButtonPress}
        iconOnly
        startSlot={
          <View
            style={[
              {
                justifyContent: "center",
                alignItems: "center",
                height: 61,
                width: 61,
              },
            ]}
          >
            {children}
          </View>
        }
      ></Button>
    </View>
  );
};
