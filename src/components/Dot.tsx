import { StyleSheet, View, useWindowDimensions } from "react-native";
import Animated, { Extrapolate, SharedValue, interpolate, interpolateColor, useAnimatedStyle } from "react-native-reanimated";

type DotProps = {
  index: number;
  x: SharedValue<number>;
}

export function Dot({
  index,
  x,
}: DotProps) {
  const {width: SCREEN_WIDTH} = useWindowDimensions();

  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH
      ],
      [10, 20, 10],
      Extrapolate.CLAMP
    );

    const opacityAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH
      ],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP
    );
    return {
      width: widthAnimation,
      opacity: opacityAnimation,
    }
  });

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ['#005b4f', '#1e2169', '#f15937'],
    )
    return {
      backgroundColor: backgroundColor,
    }
  });

  return(
    <Animated.View style={[styles.dot, animatedDotStyle, animatedColor]} />
  );
}

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  }
})