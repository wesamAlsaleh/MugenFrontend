import { useTheme } from "@/hooks/use-theme";
import React, { Dispatch } from "react";
import {
  DimensionValue,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Separator from "./Separator";

// Modal component props
type Props = {
  modalVisible: boolean;
  setModalVisible: Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
  closeButtonText?: string;
  closeButtonAction?: () => void;
  height: DimensionValue | undefined;
  width: DimensionValue | undefined;
};

export default function CustomModal({
  modalVisible,
  setModalVisible,
  children,
  closeButtonText = "Close",
  closeButtonAction,
  height,
  width,
}: Props) {
  // Function to handle closing the modal
  const closeModal = () => {
    // Perform any additional actions if needed
    closeButtonAction?.();

    // Close the modal
    setModalVisible(false);
  };

  // Get the theme
  const theme = useTheme();

  // Dynamic styles
  const dynamicStyles = {
    childrenContainer: {
      borderWidth: 1,
      backgroundColor: theme.cardBackgroundColor,
      borderColor: theme.cardBorderColor,
      height: height,
      width: width,
    },
    closeButtonContainer: {
      backgroundColor: theme.primary,
      borderColor: theme.cardBorderColor,
    },
    closeButtonText: {
      color: theme.primaryText,
    },
  };

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        {/* Main Container */}
        <View style={styles.container}>
          {/* Children Container */}
          <View
            style={[styles.childrenContainer, dynamicStyles.childrenContainer]}
          >
            {/* Modal content goes here */}
            {children}

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
              <Separator />

              {/* Close button or gesture can be added here */}
              <TouchableOpacity
                onPress={closeModal}
                style={[
                  styles.closeButtonContainer,
                  dynamicStyles.closeButtonContainer,
                ]}
              >
                <Text
                  style={[
                    styles.closeButtonText,
                    dynamicStyles.closeButtonText,
                  ]}
                >
                  {closeButtonText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Center the modal container
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  childrenContainer: {
    borderRadius: 8,
    shadowColor: "#000", // For iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    }, // For iOS shadow
    shadowOpacity: 0.25, // For iOS shadow
    shadowRadius: 4, // For iOS shadow
    elevation: 5, // For Android shadow
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%", // Full width of the children container
    gap: 10, // Space between elements in the bottom section

    // Always stick to the bottom
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  closeButtonContainer: {
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  closeButtonText: {
    color: "black",
  },
});
