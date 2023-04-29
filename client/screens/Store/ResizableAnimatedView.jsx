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
 * @param {object} props.initial REQUIRED if not by percent - initial size (counted from real initial position)
 * @param {number | undefined} props.animatedDuration miliseconds; 500 by default
 * @param {number} props.byPercent determine value is calculated with pixel or percent
 * @param {object} ref ref to this component, which is used to call defined operations (initialized by useRef())
 */
const ResizableAnimatedView = forwardRef((props, ref) => {
  const duration = props.animatedDuration
  // const byPercent = props.byPercent

  const size = useRef(props.initial).current
  const animatedSize = useRef(new Animated.ValueXY({ x: size.width, y: size.height })).current
  const inputRange = useRef(props.byPercent ?
    [0, 5, 10, 20, 50, 100]
    : [0, 10, 50, 100, 500, 1000, 2000, 5000, 2000])
  const outputRange = useRef(props.byPercent ? inputRange?.current.map(value => value + '%') : inputRange?.current)

  useEffect(() => {
    const listener = animatedSize.addListener(value => {
      size.width = value.x
      size.height = value.y
      console.log(`LIST SIZE: { width: ${size.width} , height: ${size.height} }`) // TEST
    })

    return () => {
      animatedSize.removeListener(listener)
    }
  }, [])

  useImperativeHandle(
    ref,
    () => ({
      change, changeHeight, changeWidth
    }),
    [],
  )

  /**
   * Change element size directly with passed next_size
   * @param {object} next_size { width: number, height: number }
   * @param {number | undefined} new_duration
   * @param {function} callback
   */
  const change = (next_size, new_duration, callback) => {
    try {
      const { width: next_width, height: next_height } = next_size ?? { width: undefined, height: undefined }
      let dr = typeof dr == 'number' ? new_duration : duration

      if (typeof next_width != 'number' || typeof next_height != 'number') {
        throw Error("Position is not of type { width: number, height: number }")
      }

      Animated.timing(animatedSize, {
        toValue: { x: next_width, y: next_height },
        duration: dr,
        useNativeDriver: false,
      }).start(callback)

    } catch (err) {
      console.error(err)
    }
  }

  /**
   * Add to current height
   * @param {number} next_height
   * @param {function} callback
   */
  const changeHeight = (next_height, new_duration, callback) => {
    try {
      if (typeof next_height != 'number') {
        throw Error(`next_position is not of type number; found: ${next_height}`)
      }

      change({ width: size.width, height: next_height }, new_duration, callback)
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * Add to current width
   * @param {number} next_width
   * @param {function} callback
   */
  const changeWidth = (next_width, new_duration, callback) => {
    try {
      if (typeof next_width != 'number') {
        throw Error(`next_position is not of type number; found: ${next_width}`)
      }

      change({ width: next_width, height: size.height }, new_duration, callback)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Animated.View
      {...props}
      style={{
        ...props.style,
        width: animatedSize.x.interpolate({
          inputRange: inputRange.current,
          outputRange: outputRange.current,
        }),
        height: animatedSize.y.interpolate({
          inputRange: inputRange.current,
          outputRange: outputRange.current,
        }),
      }}
    >
      {props.children}
    </Animated.View>
  )
})

ResizableAnimatedView.propTypes = {
  initial: PropTypes.exact({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  animatedDuration: PropTypes.number,
  byPercent: PropTypes.bool,
}

ResizableAnimatedView.defaultProps = {
  initial: { width: 100, height: 100 }, //if calculated as percent
  animatedDuration: 300,
  byPercent: false,
}

export default ResizableAnimatedView

/**
 * 
 * @param {number} width 
 * @param {number} height 
 * @returns { { width: number, height: number } }
 */
export const initialize = (width, height) => {
  return { width, height }
}