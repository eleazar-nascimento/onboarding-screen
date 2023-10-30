import React from "react";
import { StyleSheet, View } from "react-native";
import { OnboardingData } from "../data/data";
import { SharedValue } from "react-native-reanimated";
import { Dot } from "./Dot";

type PaginationProps = {
  data: OnboardingData[];
  x: SharedValue<number>;
};

export function Pagination({ data, x }: PaginationProps) {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, index) => {
        return <Dot key={index} index={index} x={x} />
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
