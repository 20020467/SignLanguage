import { useNavigation } from '@react-navigation/native'
import Checkbox from 'expo-checkbox'
import PropTypes from 'prop-types'
import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Animated, Pressable, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useGlobalContext } from '../../context'
import { record } from '../../server_connector'
import { COLOR, getPercentValue, HistoryRecordStyles as styles } from '../styles'
import { OpacityAnimatedView, ResizableAnimatedView, initializeSize } from './AnimatedView'

const textViewSize = initializeSize(getPercentValue(styles.textContainer.width), 100) // unused

const showToast = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

/**
 * History record component
 *  data: { id, content, favour, viewTime }
 */
const HistoryRecord = forwardRef(({ index, data, inDeletionMode, checked, onCheck,
  onDelete, onLongPress, onSwipableOpen, onSwipableClose, setDataChanged }, ref) => {

  const translatedText = data.content // translated text

  const [isSaved, setIsSaved] = useState(data.favor)
  // should use Animated
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

  const { state: globalContext, dispatch } = useGlobalContext()

  useEffect(() => {
    setIsSaved(data.favor)
  }, [data]) // data always is changed

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

  const navigateAndTranslate = (e) => {
    navigation.navigate("HomeTab", { storedText: translatedText })
  }

  const saveRecord = (e) => {
    record.changeSaving(data.id, globalContext.token)
      .then(res => {
        if (!res?.data) throw res // forward error to catch()

        const saved = res.data.data.favor
        // check by response
        if (saved) {
          showToast("Đã lưu!")
        } else {
          showToast("Hủy lưu!")
        }

        setIsSaved(!isSaved)
      })
      .catch(err => {
        console.log(`Reject saving: ${err}`) // TRACE
        // console.log(Object.keys(err)) // TRACE
      })
    // resetSwiping.current()
  }

  const onCheckHandler = useCallback(() => {
    onCheck(data.id)
  }, [onCheck])
  const onDeleteHandler = useCallback(() => {
    onDelete(data.id)
  }, [onDelete])
  const onLongPressHandler = useCallback(() => {
    onLongPress(data.id)
  }, [onLongPress])
  const onSwipableOpenHandler = useCallback(() => {
    onSwipableOpen(data.id)
  }, [onSwipableOpen])

  // Set container height based on text element height at the first time of rendering
  const handleTextLayout = (event) => {
    const lines = event.nativeEvent.lines
    let textHeight = 0
    
    if (lines) {
      textHeight = lines.reduce((accumulative, current) => accumulative + current.height, 0)
    }
    
    // 4 is total added vertical padding
    if (textHeight < height - 4) {
      // console.log(`Text ${id}:`) || console.log(textHeight) // TEST
      if ((textHeight + 4) < styles.container.minHeight) {
        setHeight(styles.container.minHeight)
      } else setHeight(textHeight + 4)
    }
  }
    // }, [height, styles.container.minHeight, styles.container.maxHeight])

  const unswipe = useCallback(() => {
    swipableRef.current.close()
  }, [swipableRef])

  const renderLeftActions = useCallback((progress, dragX) => {
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
      <RectButton style={styles.deleteButton} onPress={onDeleteHandler}>
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
  }, [onDeleteHandler])

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
      <RectButton style={styles.deleteButton} onPress={onDeleteHandler}>
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
  }//, [onDeleteHandler])

  return (
    <Swipeable
      renderLeftActions={inDeletionMode ? (() => null) : renderLeftActions}
      renderRightActions={inDeletionMode ? (() => null) : renderRightActions}
      onSwipeableWillOpen={onSwipableOpenHandler}
      onSwipeableWillClose={onSwipableClose}
      containerStyle={[styles.container, { height: height }]}
      ref={swipableRef}
    >
      <View
        style={styles.mainView}
      // onLayout={(e) => console.log(`TextContainer ${id}:`) || console.log(e.nativeEvent.layout)}
      >
        <View
          style={styles.textContainer}
        // initial={textViewSize}
        // animatedDuration={300}
        // ref={textRef}
        >
          <Pressable
            style={styles.textWrapper}
            // android_ripple={{ color: 'grey' }}
            onPress={inDeletionMode ? onCheckHandler : navigateAndTranslate}
            onLongPress={inDeletionMode ? onCheckHandler : onLongPressHandler}
          >
            <Text
              numberOfLines={3}
              onTextLayout={handleTextLayout}
              style={styles.text}>
              {translatedText}
            </Text>
          </Pressable>
        </View>
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
              style={{ color: isSaved ? COLOR.ActiveStar : COLOR.InactiveStar }}
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
            onValueChange={onCheckHandler}
          />
        </OpacityAnimatedView>
      </View>
    </Swipeable>
  )
})

HistoryRecord.propTypes = {
  // based on data from server
  data: PropTypes.exact({
    id: PropTypes.number,
    content: PropTypes.string,
    favor: PropTypes.bool,
    viewTime: PropTypes.string,
  }),
  inDeletionMode: PropTypes.bool,
  checked: PropTypes.bool,
  onDelete: PropTypes.func,
  onLongPress: PropTypes.func,
  onCheck: PropTypes.func,
  onSwipableOpen: PropTypes.func,
  onSwipableClose: PropTypes.func,
}

export default memo(HistoryRecord)