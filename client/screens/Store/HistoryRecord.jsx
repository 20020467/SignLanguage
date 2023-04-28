import { useNavigation } from '@react-navigation/native'
import Checkbox from 'expo-checkbox'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Animated, Text, ToastAndroid, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { HistoryRecordStyles as styles } from './style'

/**
 * History record component
 */
const HistoryRecord = props => {
  const id = props.id
  const value = props.value // translated text
  const inDeletionMode = props.inDeletionMode
  const checked = props.checked
  const openPromt = props.onDelete // arrow function
  const openDeletionMode = props.onLongPress // arrow function
  const handleOnCheck = props.onCheck

  const [isSaved, setIsSaved] = useState(props.saved)
  const navigation = useNavigation()

  useEffect(() => { // may be called by ref
    if (inDeletionMode) {
      // swipe(functionButtonAnimation, 10, () => {
      //   swipe(checkboxAnimation, 0)
      // })
    } else {
      // swipe(checkboxAnimation, 10, () => {
      //   swipe(functionButtonAnimation, 0)
      // })
    }
  }, [inDeletionMode])

  const handlePress = (e) => {
    navigation.navigate("HomeTab", { storedText: value })
  }

  const saveRecord = (e) => {
    // Send POST request to store in server and local
    // or store in local only
    setIsSaved(!isSaved)
  }

  // const swipe = (animationObject, position, callback) => {
  //   Animated.timing(animationObject, {
  //     toValue: position,
  //     duration: 300,
  //     useNativeDriver: false,
  //   }).start(callback)
  // }

  const showToast = () => {
    ToastAndroid.show('', ToastAndroid.SHORT);
  };

  return (
    <TouchableOpacity
      onPress={inDeletionMode ? handleOnCheck : handlePress}
      onLongPress={inDeletionMode ? handleOnCheck : openDeletionMode}
      style={styles.container}
    >
      <Text style={styles.text}>
        {value}
      </Text>
      <Animated.View
        style={{
          ...styles.checkboxButton,
          display: inDeletionMode ? 'flex' : 'none',
          // left: 
        }}
      >
        <Checkbox
          value={checked}
        />
      </Animated.View>
      <Animated.View
        style={{
          ...styles.buttonGroup,
          display: inDeletionMode ? 'none' : 'flex',
          // left: 
        }}
      >
        <TouchableOpacity onPress={saveRecord} style={styles.button}>
          <Icon
            name="bookmark"
            size={styles.iconSize}
            style={styles.saveButton}
            solid={isSaved}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={openPromt} style={styles.button}>
          <Icon
            name="trash"
            size={styles.iconSize}
            style={styles.deleteButton}
          />
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
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