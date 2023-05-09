import { useEffect, useState } from 'react'
import { FlatList, View, Alert } from 'react-native'
import SavedRecord from './SavedRecord'

const SaveTab = () => {
  let [dataset, setDataset] = useState([])

  useEffect(() => {
    setDataset([
      { id: 0, value: "Leonardo", saved: true },
      { id: 1, value: "Degea", saved: true }
    ])
  }, [])

  const askForDeletion = (e, id) => {
    const ConfirmButton = {
      text: "Có",
      onPress: () => deleteRecord(id),
    }

    const CancelButton = {
      text: "Không"
    }

    Alert.alert("Bạn có muốn xóa không?", undefined, [ConfirmButton, CancelButton], { cancelable: true })
  }

  const deleteRecord = deletedId => {
    // send DELETE request and/or store in local
    console.log(deletedId)
    setDataset(dataset.filter(record => record.id != deletedId))
  }

  return (
    <View>
      <FlatList
        data={dataset}
        renderItem={({ item }) => (
          <SavedRecord 
            key={item.id} 
            value={item.value} 
            saved={item.saved}
            onDelete={ e => askForDeletion(e, item.id)}
          />
        )}
      />
    </View>
  )
}

SaveTab.propTypes = {

}

export default SaveTab