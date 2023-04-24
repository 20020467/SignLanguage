import { useEffect, useState } from 'react'
import { Alert, FlatList, RefreshControl, View } from 'react-native'
import SavedRecord from './SavedRecord'

const SaveTab = () => {
  const [dataset, setDataset] = useState([])
  const [resfreshing, setResfreshing] = useState(false)

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

  const refreshList = e => {
    setResfreshing(true)
    try {
      // send GET request and reload the list
      setTimeout(() => {
        const next_id = dataset[dataset.length - 1].id
        setDataset([...dataset, { id: next_id + 1, value: "sentence 00" + next_id, saved: false }])
        setResfreshing(false)
      }, 1010)
    } catch(e) {
      console.log(e)
      setResfreshing(false)
    }
  }

  return (
    <View>
      <FlatList
        data={dataset}
        renderItem={({ item }) => (
          <SavedRecord
            id={item.id}
            value={item.value}
            saved={item.saved}
            onDelete={e => askForDeletion(e, item.id)}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={resfreshing} onRefresh={refreshList} />

        }
      />
    </View>
  )
}

SaveTab.propTypes = {

}

export default SaveTab