import React from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import LottieView from "lottie-react-native";
import { OnboardingData } from "../data/data";
import Animated, { Extrapolate, SharedValue, interpolate, useAnimatedStyle } from "react-native-reanimated";
import { transform } from "typescript";

type RenderItemProps = {
  item: OnboardingData;
  index: number;
  x: SharedValue<number>;
}

export function RenderItem({
  index,
  item,
  x,
}: RenderItemProps) {
  const {width: SCREEN_WIDTH} = useWindowDimensions();

  const circleAnimation = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [1, 4,4],
      Extrapolate.CLAMP
    );
    return {
      transform: [{scale: scale}]
    }
  })

  return(
    <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
      <View style={styles.circleContainer}>
        <Animated.View style={[
          { 
            width: SCREEN_WIDTH, 
            height: SCREEN_WIDTH, 
            backgroundColor: item.backgroundColor,
            borderRadius: SCREEN_WIDTH / 2,
          }, circleAnimation]} 
        />
      </View>
      <View>
        <LottieView 
          source={item.animation} 
          style={{ width: SCREEN_WIDTH * 0.9, height: SCREEN_WIDTH * 0.9  }} 
          autoPlay
          loop
        />
      </View>
      <Text style={[styles.itemText, { color: item.textColor }]}>{item.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 120
  },
  itemText: {
    textAlign: 'center',
    fontSize: 44,
    fontWeight: 'bold',
    marginBottom: 10,
    marginHorizontal: 20
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
  }
})