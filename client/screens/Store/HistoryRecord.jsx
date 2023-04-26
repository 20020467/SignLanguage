import PropTypes from 'prop-types'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useState, useEffect, useRef } from 'react'
import Checkbox from 'expo-checkbox'

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    textAlign: "center",
    height: 40,
  },
  text: {
    fontSize: 18,
    flex: 7,
    paddingLeft: 4,
  },
  buttonGroup: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  checkboxButton: {
    marginRight: 4,
  },
  iconSize: 25,
});

/**
 * History record
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
  const [isChecked, setIsChecked] = useState(false)
  // const previousChecked = useRef(false)
  const navigation = useNavigation()

  useEffect(() => {
    // handleOnCheck(id, isChecked)
    // previousChecked.current = isChecked // save previous state
  }, [isChecked])
  
  const handlePress = (e) => {
    navigation.navigate("HomeTab", { storedText: value })
  }

  const saveRecord = (e) => {
    // Send POST request to store in server and local
    // or store in local only
    setIsSaved(!isSaved)
  }

  const check = (value) => {
    if (value === undefined) setIsChecked(!isChecked)
    else if (typeof value === 'boolean') setIsChecked(value)
    else throw(`Passed argument is not of boolean; data type of ${value} is  + ${typeof value}.`)
  }

  // The 'isChecked' state's value varies on the 'checked' property
  // run when 'checked' prop's value is changed from outside
  // if (isChecked != checked) check(checked) | console.log(`State: ${isChecked} \n Prop: ${checked}`)

  return (
    <TouchableOpacity
      onPress={inDeletionMode ? handleOnCheck : handlePress}
      onLongPress={inDeletionMode ? handleOnCheck : openDeletionMode}
      style={styles.container}
    >
      <Text style={styles.text}>
        {value}
      </Text>
      {
        inDeletionMode ?
          <Checkbox style={styles.checkboxButton} value={checked}/>
          :
          <View style={styles.buttonGroup}>
            <TouchableOpacity onPress={saveRecord}>
              <Icon
                name="bookmark"
                size={styles.iconSize}
                style={styles.saveButton}
                solid={isSaved}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={openPromt}>
              <Icon
                name="trash"
                size={styles.iconSize}
                style={styles.deleteButton}
              />
            </TouchableOpacity>
          </View>
      }
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