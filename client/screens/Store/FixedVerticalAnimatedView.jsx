import PropTypes from 'prop-types'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { Animated } from 'react-native'

/**
 * Vertically movable view.
 * 
 * This component will help to move in vertical axis based on modifying the top style's value.
 * (Note that top's value is read with % (percent))
 * 
 * Usage: shiftDown(args), shiftUp(args)
 * args: callback is optional
 * 
 * Properties to be passed: ref (useRef), initial position (number)
 * @param {number} props.initial initial position
 * @param {number | undefined} props.animatedDuration miliseconds; 500 by default
 * @param {array | undefined} props.range array of number; [0, 10, 20] by default
 * @param {} ref ref to this component (initialized by useRef())
 */
const FixedVerticalAnimatedView = forwardRef((props, ref) => {
  const duration = props.animatedDuration ?? 300
  const inputRange = useRef(props.range ?? [0, 5, 8, 9, 10, 15, 20])
  const outputRange = useRef(inputRange?.current.map(value => value + '%') ?? ['0%', '5%', '8%', '9%', '10%', '15%', '20%'])

  const verticalPosition = useRef(new Animated.Value(props.initial ?? 2)).current

  const shift = (position, callback) => {
    Animated.timing(verticalPosition, {
      toValue: position,
      duration: duration,
      useNativeDriver: false,
    }).start(callback)
  }

  useImperativeHandle(
    ref,
    () => ({
      shift
    }),
    [],
  )

  return (
    <Animated.View
      {...props}
      style={{
        ...props.style,
        top: verticalPosition.interpolate({
          inputRange: inputRange.current,
          outputRange: outputRange.current,
        })
      }}
    >
      {props.children}
    </Animated.View>
  )
})

FixedVerticalAnimatedView.propTypes = {
  initial: PropTypes.number,
  animatedDuration: PropTypes.number,
  range: PropTypes.array,
  animatedDuration: PropTypes.number,
}

export default FixedVerticalAnimatedView
export const initialize = (before, after) => { 
  return { before, after } 
}