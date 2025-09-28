import { useTheme } from "@/hooks/use-theme";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback } from "react";
import { StyleSheet } from "react-native";

interface Props {
  bottomSheetRef: React.RefObject<any>;
  snapPoints: string[];
  children: React.ReactNode;
}

/**
 *
 * Custom Bottom Sheet component that have themed styles based on the device theme, and backdrop to close when clicking outside.
 *
 * @import `BottomSheet` from `@gorhom/bottom-sheet`
 * @import `BottomSheetBackdrop` from `@gorhom/bottom-sheet`
 * @import `BottomSheetView` from `@gorhom/bottom-sheet`
 * @import `GestureHandlerRootView` from `react-native-gesture-handler`
 * @requires GestureHandlerRootView component, `<CustomBottomSheet />` must be wrapped inside `<GestureHandlerRootView />` to work as expected!
 *
 * @param bottomSheetRef Ref to control the BottomSheet (used to control the sheet from outside, e.g., open/close)
 * @param snapPoints Snap points for the BottomSheet
 * @param children Content to be rendered inside the BottomSheet
 * @returns Bottom sheet component to be used in various screens (page)
 *
 * @Usage
 * First, wrap the parent component with `GestureHandlerRootView` from `react-native-gesture-handler` to make it work as expected.
 * Second, declare a ref using `useRef<BottomSheet>(null)` and pass it to the `bottomSheetRef` prop.
 * Third, define the snap points as an array of strings {{in a useMemo}} (e.g., `["25%", "50%"]`) and pass it to the `snapPoints` prop.
 * Fourth, use the `CustomBottomSheet` component and pass the `bottomSheetRef`, `snapPoints`, and the content as `children`.
 * Finally, control the bottom sheet using the ref (e.g., `bottomSheetRef.current?.expand()` to open, `bottomSheetRef.current?.close()` to close).
 *
 * @example
 * const bottomSheetRef = useRef<BottomSheet>(null);
 *
 * <GestureHandlerRootView>
 *   <CustomBottomSheet
 *     bottomSheetRef={bottomSheetRef}
 *     snapPoints={snapPoints}
 *   >
 *    {children}
 *   </CustomBottomSheet>
 * </GestureHandlerRootView>
 */
export default function CustomBottomSheet({
  bottomSheetRef,
  snapPoints,
  children,
}: Props) {
  // get the theme
  const theme = useTheme();

  // dynamic styles
  const dynamicStyles = {
    bottomSheetBackgroundStyle: {
      backgroundColor: theme.cardBackgroundColor,
    },
    bottomSheetIndicatorStyle: {
      backgroundColor: theme.primary,
    },
  };

  // Function to render the backdrop (click outside to close)
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1} // Disappear when the bottom sheet is closed
        appearsOnIndex={0} // Appear when the bottom sheet is open
        opacity={0.2} // Dim the background a bit
        pressBehavior="close"
        {...props}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1} // Start closed
      snapPoints={snapPoints}
      enablePanDownToClose // Allow closing by swiping down
      // backdropComponent={renderBackdrop} // Render the backdrop to close when clicking outside
      backgroundStyle={dynamicStyles.bottomSheetBackgroundStyle}
      handleIndicatorStyle={dynamicStyles.bottomSheetIndicatorStyle}
    >
      <BottomSheetView style={styles.filterBottomSheetInnerView}>
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16, // Home screen padding (16 on left and right, total 32)
  },
  filterBottomSheetInnerView: {
    flex: 1,
    paddingHorizontal: 16, // Screen padding (16 on left and right, total 32)
  },
});
