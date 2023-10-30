import React from "react";
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { View, StyleSheet, FlatList, ViewToken } from "react-native";
import data, { OnboardingData } from "./src/data/data";
import { RenderItem } from "./src/components/RenderItem";
import {Pagination} from "./src/components/Pagination";
import { CustomButton } from "./src/components/CustomButton";

export default function App() {
  const flatListRef = useAnimatedRef<FlatList<OnboardingData>>();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const onViewableItemsChanged = ({ viewableItems }: {viewableItems: ViewToken[]} ) => {
    if(viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index;
    }
  }

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
        ref={flatListRef}
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
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          miniumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <View style={styles.bottomContainer}>
        <Pagination data={data} x={x} />
        <CustomButton 
          flatlistRef={flatListRef}
          flatlistIndex={flatListIndex}
          dataLength={data.length}
          x={x}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    marginHorizontal: 30,
    paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})
