import { getStateFromPath, useNavigation } from '@react-navigation/native'
import Checkbox from 'expo-checkbox'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { Pressable, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { OpacityAnimatedView } from './AnimatedView'
import { getPercentValue, HistoryRecordStyles as styles } from './style'
import { ResizableAnimatedView, initializeSize } from './AnimatedView'
import { ListItem, Button } from '@rneui/themed'
// import { Button } from 'react-native-elements'

const textViewSize = initializeSize(getPercentValue(styles.textContainer.width), 100) // unused

const showToast = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

/**
 * History record component
 */
const HistoryRecord = (props) => {
  const index = props.index
  const data = props.data
  const id = data.id
  const value = props.data.value // translated text
  const inDeletionMode = props.inDeletionMode
  const checked = props.checked
  const onDelete = props.onDelete // arrow function
  const openDeletionMode = props.onLongPress // arrow function
  const handleOnCheck = props.onCheck
  const onSwipeEnd = props.onSwipeEnd
  const listItems = props.listItems // get list items from parent to do unswipe, push

  const [isSaved, setIsSaved] = useState(data.saved)
  const [height, setHeight] = useState(styles.container.maxHeight) // initial list item height
  const [showCheckbox, setShowCheckbox] = useState(false)
  // const [textWidth, setTextWidth] = useState(getPercentValue(styles.textContainer.width))

  const bookmarkButton = useRef(null)
  // const deleteButton = useRef(null)
  const checkboxButton = useRef(null)
  // const textRef = useRef(null)
  const resetSwiping = useRef(null)

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
    if (!isSaved) {
      showToast("Đã lưu!")
    }
    else showToast("Hủy lưu!")

    setIsSaved(!isSaved)
    resetSwiping.current()
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

  // const leftContent = (reset, id) => {
  //   listItems.current.push({ id, reset })

  //   return (
  //     <Button
  //       title="Lưu"
  //       onPress={() => reset()}
  //       icon={{ name: 'save', color: 'white' }}
  //       buttonStyle={{ minHeight: '100%' }}
  //     />
  //   )
  // }

  const hiddenContent = (reset) => {
    // utilize this rendering function to store reset functions to listItems
    if (!listItems.find((item, idx) => idx == index)) {
      // need to remove items to be deleted
      listItems.push({ id: id, reset })
      resetSwiping.current = reset
    }

    return (
      <Button
        title="Xóa"
        icon={{ name: 'delete', color: 'white' }}
        buttonStyle={{ ...styles.singleDeleteButton }}
        onPress={() => onDelete(reset)}
      />
    )
  }

  return (
    <ListItem.Swipeable
      // key={index}
      style={styles.listItem}
      leftContent={inDeletionMode ? null : (reset) => hiddenContent(reset)}
      rightContent={inDeletionMode ? null : (reset) => hiddenContent(reset)}
      onSwipeEnd={onSwipeEnd} // determining swipeEnd is based on "stop dragging" event
      animation={{type: 'timing'}}
    >
      <ListItem.Content>
        <Pressable
          style={{ ...styles.container, height: height }}
          android_ripple={{ color: 'grey' }}
          onPress={handleOnCheck}
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
              android_ripple={{ color: 'grey' }}
              onPress={inDeletionMode ? handleOnCheck : navigateAndTranslate}
              onLongPress={inDeletionMode ? handleOnCheck : openDeletionMode}
            >
              <Text onLayout={handleTextLayout} style={styles.text}>
                {value}
              </Text>
            </Pressable>
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
      </ListItem.Content>
    </ListItem.Swipeable>
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