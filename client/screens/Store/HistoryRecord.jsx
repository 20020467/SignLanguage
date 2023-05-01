import { getStateFromPath, useNavigation } from '@react-navigation/native'
import Checkbox from 'expo-checkbox'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { Pressable, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import OpacityAnimatedView from './OpacityAnimatedView'
import { getPercentValue, HistoryRecordStyles as styles } from './style'
import ResizableAnimatedView, { initialize } from './ResizableAnimatedView'

const textViewSize = initialize(getPercentValue(styles.textContainer.width), 100)

/**
 * History record component
 */
const HistoryRecord = (props) => {
  const id = props.id
  const value = props.value // translated text
  const inDeletionMode = props.inDeletionMode
  const checked = props.checked
  const openPromt = props.onDelete // arrow function
  const openDeletionMode = props.onLongPress // arrow function
  const handleOnCheck = props.onCheck
  const reset = props.reset

  const [isSaved, setIsSaved] = useState(props.saved)
  const [height, setHeight] = useState(styles.container.maxHeight) // initial list item height
  const [showCheckbox, setShowCheckbox] = useState(false)
  // const [textWidth, setTextWidth] = useState(getPercentValue(styles.textContainer.width))

  const bookmarkButton = useRef(null)
  // const deleteButton = useRef(null)
  const checkboxButton = useRef(null)
  // const textRef = useRef(null)

  const navigation = useNavigation()

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

  const navigateAndTranslate = (e) => {
    navigation.navigate("HomeTab", { storedText: value })
  }

  const saveRecord = (e) => {
    // Send POST request to store in server and local
    // or store in local only
    setIsSaved(!isSaved)
    reset()
  }

  const showToast = () => {
    ToastAndroid.show('', ToastAndroid.SHORT);
  };

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

  return (
    <Pressable
      style={{ ...styles.container, height: height }}
      onPress={handleOnCheck}
    // onLayout={(e) => console.log(`TextContainer ${id}:`) || console.log(e.nativeEvent.layout)}
    >
      <ResizableAnimatedView
        style={styles.textContainer}
        initial={textViewSize}
        animatedDuration={300}
      // ref={textRef}
      >
        <TouchableOpacity
          style={styles.textWrapper}
          onPress={inDeletionMode ? handleOnCheck : navigateAndTranslate}
          onLongPress={inDeletionMode ? handleOnCheck : openDeletionMode}
        >
          <Text onLayout={handleTextLayout} style={styles.text}>
            {value}
          </Text>
        </TouchableOpacity>
      </ResizableAnimatedView>
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
          onValueChange={handleOnCheck}
        />
      </OpacityAnimatedView>
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
    </Pressable >
  )
}

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