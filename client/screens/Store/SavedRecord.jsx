import { useNavigation } from '@react-navigation/core'
import PropTypes from 'prop-types'
import { forwardRef, memo, useImperativeHandle, useRef, useState } from 'react'
import { Animated, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { SavedRecordStyles as styles } from '../styles'

const SavedRecord = forwardRef(({ data, onUnsave, onSwipableOpen, onSwipableClose }, ref) => {
  const translatedText = data.content

  const [height, setHeight] = useState(styles.container.maxHeight) // initial list item height

  const swipableRef = useRef(null)

  const navigation = useNavigation()

  useImperativeHandle(ref, () => ({
    unswipe
  }), [])

  const handlePress = () => {
    navigation.navigate("HomeTab", { storedText: translatedText })
  }

  const unswipe = () => {
    swipableRef.current.close()
  }

  const handleTextLayout = (event) => {
    const lines = event.nativeEvent.lines
    let textHeight = 0

    if (lines) {
      textHeight = lines.reduce((accumulative, current) => accumulative + current.height, 0)
      // console.log(textHeight)
    }

    // 4 is total added vertical padding
    if (textHeight < height - 4) {
      // console.log(`Text ${id}:`) || console.log(layout) // TEST
      if ((textHeight + 4) < styles.container.minHeight) {
        setHeight(styles.container.minHeight)
      } else setHeight(textHeight + 4)
    }
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
      containerStyle={[styles.container, {height}]}
      ref={swipableRef}
    >
      <RectButton onPress={handlePress} style={styles.textContainer} >
      <View style={styles.textWrapper}>
        <Text
          numberOfLines={3}
          onTextLayout={handleTextLayout}
          style={styles.text}
        >
          {translatedText}
        </Text>
        {/* <TouchableOpacity onPress={onUnsave} style={styles.button}>
        <Icon
          name="bookmark"
          size={styles.container.iconSize}
          style={styles.saveButton}
          solid={isSaved}
        />
      </TouchableOpacity> */}
      </View>
      </RectButton>
    </Swipeable>
  )
})

SavedRecord.propTypes = {
  // based on data from server
  data: PropTypes.exact({
    id: PropTypes.number,
    content: PropTypes.string,
    favor: PropTypes.bool,
    viewTime: PropTypes.string,
  }),
  onUnsave: PropTypes.func,
  onSwipableOpen: PropTypes.func,
  onSwipableClose: PropTypes.func,
}

export default memo(SavedRecord)