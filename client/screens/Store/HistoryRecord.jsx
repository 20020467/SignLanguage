import { useNavigation } from '@react-navigation/native'
import Checkbox from 'expo-checkbox'
import PropTypes from 'prop-types'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Pressable, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import OpacityAnimatedView from './OpacityAnimatedView'
import { HistoryRecordStyles as styles } from './style'

/**
 * History record component
 */
const HistoryRecord = forwardRef((props, ref) => {
  const id = props.id
  const value = props.value // translated text
  const inDeletionMode = props.inDeletionMode
  const checked = props.checked
  const openPromt = props.onDelete // arrow function
  const openDeletionMode = props.onLongPress // arrow function
  const handleOnCheck = props.onCheck

  const [isSaved, setIsSaved] = useState(props.saved)
  const [height, setHeight] = useState(80) // initial list item height

  const bookmarkButton = useRef(null)
  const deleteButton = useRef(null)
  const checkboxButton = useRef(null)

  const navigation = useNavigation()

  // useEffect(() => { // may be called by ref
  // }, [inDeletionMode])

  useImperativeHandle(ref, () => ({
    switchButtons
  }), [])

  const switchButtons = () => {
    if (!inDeletionMode) { // may be null ?? or previous state when called
      bookmarkButton.current.fade(0)
      deleteButton.current.fade(0)
      checkboxButton.current.fade(1)
    } else {
      bookmarkButton.current.fade(1)
      deleteButton.current.fade(1)
      checkboxButton.current.fade(0)
    }
  }

  const navigateAndTranslate = (e) => {
    navigation.navigate("HomeTab", { storedText: value })
  }

  const saveRecord = (e) => {
    // Send POST request to store in server and local
    // or store in local only
    setIsSaved(!isSaved)
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
    <Pressable style={{ ...styles.container, height: height }} onPress={handleOnCheck}>
      <TouchableOpacity
        style={styles.text}
        onPress={inDeletionMode ? handleOnCheck : navigateAndTranslate}
        onLongPress={inDeletionMode ? handleOnCheck : openDeletionMode}
      >
        <Text onLayout={handleTextLayout}>
          {value}
        </Text>
      </TouchableOpacity>
      <OpacityAnimatedView
        style={{
          ...styles.checkboxButton,
          display: inDeletionMode ? 'flex' : 'none',
        }}
        animatedDuration={600}
        ref={checkboxButton}
      >
        <Checkbox
          value={checked}
          onValueChange={handleOnCheck}
        />
      </OpacityAnimatedView>
      <View
        style={{
          ...styles.buttonGroup,
          display: inDeletionMode ? 'none' : 'flex',
        }}
      >
        <OpacityAnimatedView style={{ flex: 1 }} animatedDuration={600} ref={bookmarkButton}>
          <TouchableOpacity onPress={saveRecord} style={styles.button}>
            <Icon
              name="bookmark"
              size={styles.button.iconSize}
              style={styles.saveButton}
              solid={isSaved}
            />
          </TouchableOpacity>
        </OpacityAnimatedView>
        <OpacityAnimatedView style={{ flex: 1 }} animatedDuration={600} ref={deleteButton}>
          <TouchableOpacity onPress={openPromt} style={styles.button}>
            <Icon
              name="trash"
              size={styles.button.iconSize}
              style={styles.deleteButton}
            />
          </TouchableOpacity>
        </OpacityAnimatedView>
      </View>
    </Pressable >
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