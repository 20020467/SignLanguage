import { useNavigation } from '@react-navigation/core'
import PropTypes from 'prop-types'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { Text, TouchableHighlight, TouchableOpacity, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { SavedRecordStyles as styles } from './style'
import { RectButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'

const SavedRecord = forwardRef(({ id, value, isSaved, onUnsave, onSwipableOpen, onSwipableClose }, ref) => {
  // const value = props.value
  // const isSaved = props.saved
  // const onUnsave = props.onUnsave

  const swipableRef = useRef(null)

  const navigation = useNavigation()

  useImperativeHandle(ref, () => ({
    unswipe
  }), [])
  const handlePress = () => {
    navigation.navigate("HomeTab", { storedText: value })
  }

  const unswipe = () => {
    swipableRef.current.close()
  }

  const renderRightActions = (progress, dragX) => {
    const onLayoutChange = (event) => {
    }

    const translateX = dragX.interpolate({
      inputRange: [-100, -50, 0], // convert percent to pixel
      outputRange: [0, 0, 40],
    })

    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    })

    return (
      <RectButton style={styles.button} onPress={onUnsave}>
        <Animated.Text
          onLayout={onLayoutChange}
          style={
            {
              flex: 1,
              transform: [{ translateX }],
              fontSize: 15,
              paddingLeft: '50%',
            }
          }
        >
          Xóa
        </Animated.Text>
      </RectButton>
    )
  }

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      onSwipeableWillOpen={(direction) => onSwipableOpen()}
      onSwipeableWillClose={(direction) => onSwipableClose()}
      containerStyle={styles.container}
      ref={swipableRef}
    >
      <RectButton onPress={handlePress} style={styles.textWrapper} >
        <Text style={styles.text}>
          {value}
        </Text>
        {/* <TouchableOpacity onPress={onUnsave} style={styles.button}>
        <Icon
          name="bookmark"
          size={styles.container.iconSize}
          style={styles.saveButton}
          solid={isSaved}
        />
      </TouchableOpacity> */}
      </RectButton>
    </Swipeable>
  )
})

SavedRecord.propTypes = {
  key: PropTypes.number,
  data: PropTypes.string,
  saved: PropTypes.bool,
}

export default SavedRecord