import { Pressable, View } from "react-native";
import { Button } from "@components";
import { Portal, PortalHost } from "@gorhom/portal";
import BottomSheet from "@gorhom/bottom-sheet";
import { CartScreen } from "@screens";
import { useMemo, useRef, useState } from "react";

interface DataProps {
  children: React.ReactNode;
  navigation: any;
}

export const CartTabButton: React.FC<DataProps> = ({
  children,
  navigation,
}: any) => {
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
        {open ? (
          <Pressable
            onPress={() => {
              bottomSheetRef?.current?.close();
              setOpen(!open);
            }}
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              marginBottom: 20,
              backgroundColor: "#222",
              opacity: 0.4,
              zIndex: 0,
            }}
          ></Pressable>
        ) : null}
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
            zIndex: 2000,
            marginHorizontal: 10,
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 3,
          }}
          handleComponent={() => null}
        >
          <CartScreen
            navigation={navigation}
            closeCart={() => bottomSheetRef?.current?.close()}
          />
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
