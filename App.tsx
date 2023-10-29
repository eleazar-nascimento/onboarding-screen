import React from "react";
import Animated from "react-native-reanimated";
import { View, StyleSheet } from "react-native";
import data, { OnboardingData } from "./src/data/data";
import { RenderItem } from "./src/components/RenderItem";

export default function App() {

  return (
    <View
      style={styles.container}
    >
      <Animated.FlatList
        data={data} 
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} />
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
