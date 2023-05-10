import PropTypes from 'prop-types'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { Animated } from 'react-native'

/**
 * Flexible opacity view.
 * 
 * This component will help to change opacity of inside elements based on modifying the opacity value.
 * Note that opacity value is from 0 to 1.
 * 
 * Operations: shiftDown(args), shiftUp(args)
 * args: callback is optional
 * 
 * @param {number | undefined} props.initial initial opacity, default value is 1
 * @param {number | undefined} props.animatedDuration miliseconds; 500 by default
 * @param {boolean | undefined} props.turnBack false be default 
 * @param {object} ref ref to this component (initialized by useRef())
 */
const OpacityAnimatedView = forwardRef((props, ref) => {
  const opacityValue = useRef(new Animated.Value(props.initial)).current
  const duration = props.animatedDuration
  const turnBack = props.turnBack // waiting

  useImperativeHandle(ref,
    () => ({
      fade, fadeIn, fadeOut
    }),
    [],
  )

  /**
   * @param {number} value opacity value
   * @param {number | undefined} new_duration 
   * @param {function} callback
   */
  const fade = (value, new_duration, callback) => {
    try {
      let dr = typeof dr == 'number' ? new_duration : duration

      if (typeof value != 'number') {
        throw Error(`value is not of type number; found: ${value}`)
      }

      Animated.timing(opacityValue, {
        toValue: value,
        duration: dr,
        useNativeDriver: true,
      }).start(callback)
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * @param {number | undefined} new_duration 
   * @param {function} callback
   */
  const fadeIn = (new_duration, callback) => {
    fade(1, new_duration, callback)
  }

  /**
   * @param {number | undefined} new_duration 
   * @param {function} callback
   */
  const fadeOut = (new_duration, callback) => {
    fade(0, new_duration, callback)
  }

  return (
    <Animated.View
      {...props}
      style={{
        ...props.style,
        opacity: opacityValue
      }}
    >
      {props.children}
    </Animated.View>
  )
})

OpacityAnimatedView.propTypes = {
  initial: PropTypes.number,
  animatedDuration: PropTypes.number,
}

OpacityAnimatedView.defaultProps = {
  initial: 1,
  animatedDuration: 300,
}

export default OpacityAnimatedView
