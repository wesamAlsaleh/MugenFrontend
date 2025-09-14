import { useTheme } from "@/hooks/use-theme";
import React, { useEffect, useRef } from "react";

import BottomSheet from "@gorhom/bottom-sheet";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function CustomBottomSheet({
  isOpen,
  toggleSheet,
  duration = 500,
  children,
  snapPoints = ["25%", "50%", "75%", "90%"], // Available snap points at 25%, 50%, 75%, and 90% of the screen height
}: {
  isOpen: boolean;
  toggleSheet?: () => void;
  duration?: number;
  children: React.ReactNode;
  snapPoints?: string[];
}) {
  // Get the theme of the app
  const theme = useTheme();

  // ref to the bottom sheet (reference to a DOM element)
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.expand(); // open to first snap point
    } else {
      bottomSheetRef.current?.close(); // close when state = false
    }
  }, [isOpen]);

  return (
    <GestureHandlerRootView>
      {/* Container */}
      <View></View>

      {/* Bottom Sheet Container */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints || ["40%", "85%"]}
        index={-1} // start closed
        enablePanDownToClose={true} // allow closing by swiping down
        keyboardBehavior="extend" // this will allow the bottom sheet to extend when a keyboard is open
      >
        {children}
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16, // Screen padding (16 on left and right, total 32)
  },
});
