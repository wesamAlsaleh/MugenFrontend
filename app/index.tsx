import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";

export default function index() {
  return <Redirect href="/(tabs)/home" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
