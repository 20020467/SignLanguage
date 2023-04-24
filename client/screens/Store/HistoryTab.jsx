import { useEffect, useState } from 'react'
import { Alert, FlatList, RefreshControl, View } from 'react-native'
import HistoryRecord from './HistoryRecord'

const HistoryTab = () => {
  const [dataset, setDataset] = useState([])
  const [resfreshing, setResfreshing] = useState(false)

  useEffect(() => {
    // GET data from server
    setDataset([
      { id: 0, value: "Leonardo", saved: false },
      { id: 1, value: "Vangogh", saved: true },
      { id: 2, value: "sentence 001", saved: false },
      { id: 3, value: "sentence 002", saved: true },
      { id: 4, value: "sentence 003", saved: false },
      { id: 5, value: "sentence 004", saved: false },
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
    // send DELETE request at first
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

console.log(resfreshing)

  return (
    <View style={{ paddingTop: 3 }}>
      <FlatList
        data={dataset}
        renderItem={({ item }) => (
          <HistoryRecord
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

HistoryTab.propTypes = {

}

export default HistoryTab
