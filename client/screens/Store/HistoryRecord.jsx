import { getStateFromPath, useNavigation } from '@react-navigation/native'
import Checkbox from 'expo-checkbox'
import PropTypes from 'prop-types'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Animated, Pressable, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { OpacityAnimatedView } from './AnimatedView'
import { getPercentValue, HistoryRecordStyles as styles } from './style'
import { ResizableAnimatedView, initializeSize } from './AnimatedView'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { RectButton } from 'react-native-gesture-handler'
import { useFetch } from './axios'

const textViewSize = initializeSize(getPercentValue(styles.textContainer.width), 100) // unused

const showToast = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

/**
 * History record component
 *  data: { id, content, favour, viewTime }
 */
const HistoryRecord = forwardRef(({ index, data, inDeletionMode, checked, onCheck,
  onDelete, onLongPress, onSwipableOpen, onSwipableClose }, ref) => {

  const value = data.content // translated text

  const [isSaved, setIsSaved] = useState(data.favour)
  const [height, setHeight] = useState(styles.container.maxHeight) // initial list item height
  const [showCheckbox, setShowCheckbox] = useState(false)
  // const [textWidth, setTextWidth] = useState(getPercentValue(styles.textContainer.width))

  const bookmarkButton = useRef(null)
  // const deleteButton = useRef(null)
  const checkboxButton = useRef(null)
  // const textRef = useRef(null)
  // const resetSwiping = useRef(null)
  const swipableRef = useRef(null)

  const navigation = useNavigation()

  const request = useFetch('sentence')

  // Consider to change text width and display checkbox
  useEffect(() => {
    if (!inDeletionMode) { // not in deletion mode
      setShowCheckbox(false)
      bookmarkButton.current.fadeIn()
      checkboxButton.current.fadeOut(510)
      // textRef.current.changeWidth(textViewSize.width) // "before" state
    } else {
      setShowCheckbox(true)
      checkboxButton.current.fadeIn()
      bookmarkButton.current.fadeOut(110)
      // textRef.current.changeWidth(86) // "after" state
    }
  }, [inDeletionMode])

  // Allows to call to the following functions by ref
  useImperativeHandle(ref, () => ({
    unswipe
  }), [])

  const handlePress = (e) => {
    navigation.navigate("HomeTab", { storedText: value })
  }

  const saveRecord = (e) => {
    // Send POST request to store in server and local
    // or store in local only
    if (!isSaved) {
      request.save(id).then(res => {
        showToast("Đã lưu!")
        console.log(res.data)
      }).catch(msg => console.log(`Reject saving: ${msg}`))

    }
    else {
      console.log(Axios.getUri())
      request.save(id).then(res => {
        showToast("Hủy lưu!")
        console.log(res.data)
      }).catch(msg => console.log(`Reject saving: ${msg}`))
    }

    setIsSaved(!isSaved)
    // resetSwiping.current()
  }

  // Set container height based on text element height at the first time of rendering
  const handleTextLayout = (event) => {
    const layout = event.nativeEvent.layout // text layout
    // 4: magic number
    if (layout.height < height - 4) {
      // console.log(`Text ${id}:`) || console.log(layout) // TEST
      if ((layout.height + 4) < styles.container.minHeight) {
        setHeight(styles.container.minHeight)
      } else setHeight(layout.height + 4)
    }
  }

  const unswipe = () => {
    swipableRef.current.close()
  }

  const renderLeftActions = (progress, dragX) => {
    const translateX = dragX.interpolate({
      inputRange: [0, 50, 100], // convert percent to pixel
      outputRange: [-90, -70, -40],
    })

    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    })

    return (
      <RectButton style={styles.deleteButton} onPress={onDelete}>
        <Animated.View
          style={
            {
              flex: 1,
              transform: [{ translateX }],
              fontSize: 15,
              paddingLeft: '50%',
              justifyContent: 'center',
              alignItems: 'center',
            }
          }
        >
          <Icon
            name="trash"
            size={styles.deleteButton.iconSize}
          />
          <Text style={{ textAlign: 'center' }}>Xóa</Text>
        </Animated.View>
      </RectButton>
    )
  }
  const renderRightActions = (progress, dragX) => {
    const translateX = dragX.interpolate({
      inputRange: [-100, -50, 0], // convert percent to pixel
      outputRange: [0, 30, 50],
    })

    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    })

    return (
      <RectButton style={styles.deleteButton} onPress={onDelete}>
        <Animated.View
          style={
            {
              flex: 1,
              transform: [{ translateX }],
              fontSize: 15,
              paddingLeft: '50%',
              justifyContent: 'center',
              alignItems: 'center',
            }
          }
        >
          <Icon
            name="trash"
            size={styles.deleteButton.iconSize}
          />
          <Text style={{ textAlign: 'center' }}>Xóa</Text>
        </Animated.View>
      </RectButton>
    )
  }

  return (
    <Swipeable
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onSwipeableWillOpen={(direction) => onSwipableOpen()}
      onSwipeableWillClose={(direction) => onSwipableClose()}
      containerStyle={{ ...styles.container, height: height }}
      ref={swipableRef}
    >
      <Pressable
        style={{ ...styles.mainView }}
        // android_ripple={{ color: 'grey' }}
        onPress={inDeletionMode ? onCheck : handlePress}
        onLongPress={inDeletionMode ? onCheck : onLongPress}
      // onLayout={(e) => console.log(`TextContainer ${id}:`) || console.log(e.nativeEvent.layout)}
      >
        <ResizableAnimatedView
          style={styles.textContainer}
          initial={textViewSize}
          animatedDuration={300}
        // ref={textRef}
        >
          <Pressable
            style={styles.textWrapper}
            // android_ripple={{ color: 'grey' }}
            onPress={inDeletionMode ? onCheck : handlePress}
            onLongPress={inDeletionMode ? onCheck : onLongPress}
          >
            <Text onLayout={handleTextLayout} style={styles.text}>
              {value}
            </Text>
          </Pressable>
        </ResizableAnimatedView>
        <OpacityAnimatedView
          style={{
            ...styles.buttonGroup,
            display: showCheckbox ? 'none' : 'flex',
          }}
          animatedDuration={250}
          ref={bookmarkButton}
        >
          <TouchableOpacity onPress={saveRecord} style={styles.button}>
            <Icon
              name="star"
              size={styles.button.iconSize}
              style={{ ...styles.saveToggle, color: isSaved ? 'rgb(191, 47, 11)' : 'black' }}
              solid={isSaved}
            />
          </TouchableOpacity>
        </OpacityAnimatedView>
        <OpacityAnimatedView
          style={{
            ...styles.buttonGroup,
            display: showCheckbox ? 'flex' : 'none',
          }}
          animatedDuration={250}
          ref={checkboxButton}
        >
          <Checkbox
            value={checked}
            onValueChange={onCheck}
          />
        </OpacityAnimatedView>
      </Pressable>
    </Swipeable>
  )
})

HistoryRecord.propTypes = {
  id: PropTypes.number,
  value: PropTypes.string,
  saved: PropTypes.bool,
  inDeletionMode: PropTypes.bool,
  checked: PropTypes.bool,
  onDelete: PropTypes.func,
  onLongPress: PropTypes.func,
  onCheck: PropTypes.func,
}

export default HistoryRecord