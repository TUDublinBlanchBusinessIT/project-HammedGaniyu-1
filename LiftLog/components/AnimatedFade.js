import React, { useEffect } from "react";
import Animated, { 
  useSharedValue, 
  withTiming, 
  useAnimatedStyle 
} from "react-native-reanimated";

export default function AnimatedFade({ children, delay = 0, style }) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20); // slide up effect

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 600, delay });
    translateY.value = withTiming(0, { duration: 600, delay });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
}
