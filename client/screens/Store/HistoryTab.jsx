import { useEffect, useState } from 'react'
import { Alert, FlatList, View } from 'react-native'
import HistoryRecord from './HistoryRecord'

const HistoryTab = () => {
  const [dataset, setDataset] = useState([])

  useEffect(() => {
    // GET data from server
    setDataset([
      { id: 0, value: "Leonardo", saved: false },
      { id: 1, value: "Degea", saved: true },
      { id: 2, value: "Quyet", saved: true },
      { id: 3, value: "Thuy", saved: true },
      { id: 4, value: "Nam", saved: true },
      { id: 5, value: "Huy Anh", saved: false },
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
  
    Alert.alert("Bạn có muốn xóa không?", undefined, [ConfirmButton, CancelButton], {cancelable: true})
  }

  const deleteRecord = deletedId => {
    // send DELETE request at first
    console.log(deletedId)
    setDataset(dataset.filter(record => record.id != deletedId))
  }

  return (
    <View style={{paddingTop: 3}}>
      <FlatList
        data={dataset}
        renderItem={({ item }) => (
          <HistoryRecord 
            key={item.id} 
            value={item.value} 
            saved={item.saved} 
            onDelete={ e => askForDeletion(e, item.id) }
          />
        )}
      />
    </View>
  )
}

HistoryTab.propTypes = {

}

export default HistoryTab
