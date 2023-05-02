import { useNavigation } from '@react-navigation/core'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { SavedRecordStyles as styles } from './style'

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
          size={styles.container.iconSize}
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