import React from "react";
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { View, StyleSheet, FlatList } from "react-native";
import data, { OnboardingData } from "./src/data/data";
import { RenderItem } from "./src/components/RenderItem";

export default function App() {
  const flatListRef = useAnimatedRef<FlatList<OnboardingData>>();
  const x = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x
    }
  })
  return (
    <View
      style={styles.container}
    >
      <Animated.FlatList
        data={data}
        onScroll={onScroll}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} x={x} />
        }}
        keyExtractor={item => item.id}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
