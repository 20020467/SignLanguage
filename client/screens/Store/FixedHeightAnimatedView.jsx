import PropTypes from 'prop-types'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { Animated } from 'react-native'

/**
 * Changable height view.
 * 
 * This component will help to alter height size based on modifying the height value.
 * (Note that height value is read with % (percent))
 * 
 * Operations: change(args)
 * args: callback is optional
 * 
 * Properties to be passed: ref (useRef), initial position (number)
 * @param {number} props.initial initial position
 * @param {number | undefined} props.animatedDuration miliseconds; 500 by default (optional)
 * @param {array | undefined} props.range array of number (optional)
 * @param {} ref ref to this component (initialized by useRef())
 */
const FixedHeightAnimatedView = forwardRef((props, ref) => {
  const duration = props.animatedDuration ?? 300
  const inputRange = useRef(props.range ?? [0, 20, 40, 60, 80, 100, 200])
  const outputRange = useRef(inputRange?.current.map(value => value + '%') ?? ['0%', '20%', '40%', '60%', '80%', '100%', '200%'])

  const heightSize = useRef(new Animated.Value(props.initial ?? 100)).current

  const change = (size, callback) => {
    console.log("Called list changing with size " + size)
    Animated.timing(heightSize, {
      toValue: size,
      duration: duration,
      useNativeDriver: false,
    }).start(callback)
  }

  useImperativeHandle(
    ref,
    () => ({
      change
    }),
    [],
  )

  return (
    <Animated.View
      {...props}
      style={{
        ...props.style,
        height: heightSize.interpolate({
          inputRange: inputRange.current,
          outputRange: outputRange.current,
        })
      }}
    >
      {props.children}
    </Animated.View>
  )
})

FixedHeightAnimatedView.propTypes = {
  initial: PropTypes.number,
  animatedDuration: PropTypes.number,
  range: PropTypes.array,
  animatedDuration: PropTypes.number,
}

export default FixedHeightAnimatedView