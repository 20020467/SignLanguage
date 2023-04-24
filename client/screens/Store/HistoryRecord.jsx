import PropTypes from 'prop-types'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useState } from 'react'

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  button: {

  },
  iconSize: 25,
});

/**
 * History record
 */
const HistoryRecord = props => {
  const value = props.value // translated text
  const openPromt = props.onDelete // arrow function

  const [isSaved, setIsSaved] = useState(props.saved)
  const navigation = useNavigation()

  const handlePress = (e) => {
    navigation.navigate("HomeTab", { storedText: value })
  }

  const saveRecord = (e) => {
    // Send POST request to store in server and local
    // or store in local only
    setIsSaved(!isSaved)
  }

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container} >
      <Text style={styles.text}>
        {value}
      </Text>
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
    </TouchableOpacity>
  )
}

HistoryRecord.propTypes = {
  key: PropTypes.number,
  value: PropTypes.string,
  saved: PropTypes.bool,
  onDelete: PropTypes.func,
}

export default HistoryRecord