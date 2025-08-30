import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";

const LoadingSpinner = () => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator color={"gray"} size={100} />
    </View>
  );
};

export default LoadingSpinner;
