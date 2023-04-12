import PropTypes from 'prop-types'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import Icon from 'react-native-vector-icons/FontAwesome5'

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
  button: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  iconSize: 25,
});

const SavedRecord = props => {
  const value = props.value
  const isSaved = props.saved
  const openPromt = props.onDelete

  const navigation = useNavigation()

  const handlePress = () => {
    navigation.navigate("HomeTab", { storedText: value })
  }

  return (
      <TouchableOpacity onPress={handlePress} style={styles.container} >
        <Text style={styles.text}>
          {value}
        </Text>
        <TouchableOpacity onPress={openPromt} style={styles.button}>
            <Icon
              name="bookmark"
              size={styles.iconSize}
              style={styles.saveButton}
              solid={isSaved}
            />
        </TouchableOpacity>
      </TouchableOpacity>
  )
}

SavedRecord.propTypes = {  
  key: PropTypes.number,
  data: PropTypes.string,
  saved: PropTypes.bool,
}

export default SavedRecord