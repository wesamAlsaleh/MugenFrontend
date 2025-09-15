import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function FilterLayout({
  children,
  title,
  snapPoints,
}: {
  children: React.ReactNode;
  title?: string;
  snapPoints?: string[];
}) {
  // Ref for the bottom sheet
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Render the children inside a BottomSheet View
  return (
    <GestureHandlerRootView>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints || ["40%", "85%"]} // min 40% and max 85% of the screen height or the snapPoints passed in
        index={0}
        keyboardBehavior="extend" // this will allow the bottom sheet to extend when a keyboard is open
      >
        <BottomSheetView style={{ flex: 1, padding: 20 }}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
