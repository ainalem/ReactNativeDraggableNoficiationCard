import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Dimensions,
  ViewStyle,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'flex-end',
    position: 'absolute',
    width: '100%',
  },
});

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

type Props = {
  children: React.ReactNode;
  style: ViewStyle;
  threshold: number;
  onOut?: () => void;
};

const NotificationContainer = ({
  children,
  style,
  threshold,
  onOut = () => {},
}: Props) => {
  const pan = useRef<Animated.Value>(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    Animated.timing(pan, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: (_, gestureState) => {
        const newY =
          gestureState.dy < 0 ? -Math.sqrt(-gestureState.dy) : gestureState.dy;

        Animated.event([null, {dy: pan}], {
          useNativeDriver: false,
        })(_, {dy: newY});
      },
      onPanResponderRelease: (_, gestureState) => {
        pan.flattenOffset();
        if (gestureState.dy > threshold) {
          // Dragging exceeds threshold, animate pane out of screen
          Animated.timing(pan, {
            toValue: SCREEN_HEIGHT,
            duration: 300,
            useNativeDriver: true,
          }).start(onOut);
        } else {
          // Dragging is less than threshold, animate pane back to start position
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: true,
            friction: 5,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[style, {transform: [{translateY: pan}]}]}
        {...panResponder.panHandlers}>
        {children}
      </Animated.View>
    </View>
  );
};

export default NotificationContainer;
