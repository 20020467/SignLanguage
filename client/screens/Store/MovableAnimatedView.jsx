import PropTypes from 'prop-types'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { Animated } from 'react-native'

/**
 * Movable 2D view.
 * 
 * This component will help to move in 2D axis based on modifying the top style's value.
 * (top's value is read with pixel (by default) or percent)
 * 
 * Operations: verticalShift(args), horizontalShift(args)
 * args: callback is optional
 * 
 * @param {object} props.initial initial position, by default { x: 0, y: 0 } (counted from real initial position)
 * @param {number | undefined} props.animatedDuration miliseconds; 500 by default
 * @param {number} props.byPercent determine value is calculated with pixel or percent
 * @param {object} ref ref to this component, which is used to call defined operations (initialized by useRef())
 */
const MovableAnimatedView = forwardRef((props, ref) => {
  const duration = props.animatedDuration

  const position = useRef(props.initial).current
  const animatedPosition = useRef(new Animated.ValueXY(props.initial)).current
  const inputRange = useRef(props.byPercent ?
    [0, 5, 10, 20, 50, 100] : [0, 10, 20, 50, 100, 500, 1000, 2000, 5000])
  const outputRange = useRef(props.byPercent ? inputRange?.current.map(value => value + '%') : inputRange.current)

  useEffect(() => {
    const listener = animatedPosition.addListener(value => {
      position.x = value.x
      position.y = value.y
    })

    return () => {
      animatedPosition.removeListener(listener)
    }
  }, [])


  useImperativeHandle(
    ref,
    () => ({
      shift, verticalShift, horizontalShift
    }),
    [],
  )

  /**
   * Dynamically move element with both x and y
   * @param {object} next_position { x: number, y: number }
   * @param {number | undefined} new_duration
   * @param {function} callback
   */
  const shift = (next_position, new_duration, callback) => {
    try {
      const { x, y } = next_position ?? { x: undefined, y: undefined }
      let dr = typeof dr == 'number' ? new_duration : duration

      if (typeof x != 'number' || typeof y != 'number') {
        throw Error("Position is not of type { x: number, y: number }")
      }

      Animated.timing(animatedPosition, {
        toValue: { x, y },
        duration: dr,
        useNativeDriver: false,
      }).start(callback)

    } catch (err) {
      console.error(err)
    }
  }

  /**
   * @param {number} next_position coordinate y (counted from initial position)
   * @param {function} callback
   */
  const verticalShift = (next_position, new_duration, callback) => {
    try {
      if (typeof next_position != 'number') {
        throw Error(`next_position is not of type number; found: ${next_position}`)
      }
      // may need to add current position to y if calculated by distance difference
      shift({ x: position.x, y: next_position }, new_duration, callback)
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * @param {number} next_position coordinate x (counted from initial position)
   * @param {function} callback
   */
  const horizontalShift = (next_position, new_duration, callback) => {
    try {
      if (typeof next_position != 'number') {
        throw Error(`next_position is not of type number; found: ${next_position}`)
      }
      // may need to add current position to x
      shift({ x: next_position, y: position.y }, new_duration, callback)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Animated.View
      {...props}
      style={{
        ...props.style,
        left: animatedPosition.x.interpolate({
          inputRange: inputRange.current,
          outputRange: outputRange.current,
        }),
        top: animatedPosition.y.interpolate({
          inputRange: inputRange.current,
          outputRange: outputRange.current,
        }),
      }}
    >
      {props.children}
    </Animated.View>
  )
})

MovableAnimatedView.propTypes = {
  initial: PropTypes.exact({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  animatedDuration: PropTypes.number,
  byPercent: PropTypes.bool,
}

MovableAnimatedView.defaultProps = {
  initial: { x: 0, y: 0 },
  animatedDuration: 300,
  byPercent: false,
}

export default MovableAnimatedView

/**
 * @param {number} x 
 * @param {number} y 
 * @returns { { x: number, y: number } }
 */
export const initialize = (x, y) => {
  return { x, y }
}