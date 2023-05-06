import { useEffect, useRef, useState } from 'react'
import { Alert, FlatList, RefreshControl, View, Text } from 'react-native'
import { Divider } from 'react-native-elements'
import SavedRecord from './SavedRecord'
import { HistoryTabStyles as styles } from './style'

const SaveTab = () => {
  const [dataset, setDataset] = useState([])
  const [resfreshing, setResfreshing] = useState(false)

  const listItems = useRef([]).current // stores refs to list items; need to be refresh along with dataset
  const swipedItem = useRef(null) // sets new swiped item's index to this variable

  useEffect(() => {
    const new_dataset = [...require('./mock_dataset.json')]
    if (new_dataset.length >= 20) new_dataset.splice(0, 18)
    console.log("Save tab:") // TEST
    // console.log(new_dataset) // TEST
    setDataset(new_dataset)
  }, [])

  useEffect(() => {
    console.log("dataset after changed: ")
    dataset.forEach(data => console.log(data.id)) // TEST
  }, [dataset])

  const unsaveRecord = (index, id) => {
    // send DELETE request and/or store in local
    console.log("unsaving:")
    // if (index != dataset.findIndex(item => item.id === id)) return // redundant?

    setDataset(dataset.filter((item, idx) => item.id !== id))

    // refresh ref list based on id instead of index as listItems is created
    // based on element rendering, which cannot assure the right order as in dataset
    if (swipedItem.current === id) { // may place in useEffect
      listItems.splice(listItems.findIndex((item, idx) => item.id == id), 1)
      swipedItem.current = null
      // console.log("listItems after unsaving: ")
      // console.log(listItems) // TEST
    }
  }

  /**
   * Cause new elements are created at each rerendering, we should search for item by 
   * specified id to make sure we won't add them again to the list.
   */
  const updateRef = ({ id, ref }) => {
    const current_item = listItems.find(item => item.id == id)
    // console.log("Updating list: " + id + ref) // TEST
    if (ref == null) {
      listItems.splice(listItems.findIndex(item => item.id == id), 1)
    }

    if (current_item) current_item.ref = ref // only assign new ref if the item exists
    else listItems.push({ id, ref }) // removed element is stilled added with ref is null ??
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
    } catch (e) {
      console.log(e)
      setResfreshing(false)
    }
    // console.log("listItems before resfreshing: ")
    // console.log(listItems) // TEST
  }

  // Sometimes next id is not set, which leads to allow 2 item to be swiped at the same time ???
  const onSwipableOpen = (id) => {
    // unswipe the other
    const current = swipedItem.current
    if (current) {
      listItems.find(item => item.id == current)?.ref.unswipe()
    }

    console.log(`current: ${current}, next: ${id}`)
    swipedItem.current = id
  }

  const onSwipableClose = () => {
    swipedItem.current = null
  }

  const separator = () => (
    <View style={styles.separator}>
      <Divider orientation="vertical" />
    </View>
  )

  const emptyHistoryNotification = () => (
    <Text style={{ textAlign: 'center', fontSize: 16 }}>Danh sách trống</Text>
  )

  return (
    <View>
      <FlatList
        style={styles.recordList}
        ItemSeparatorComponent={separator}
        ListEmptyComponent={emptyHistoryNotification}
        refreshControl={
          <RefreshControl refreshing={resfreshing} onRefresh={refreshList} />
        }
        data={dataset}
        renderItem={({ item, index }) => (
          <SavedRecord
            id={item.id}
            value={item.value}
            saved={item.saved}
            onSwipableOpen={() => onSwipableOpen(item.id)}
            onSwipableClose={onSwipableClose}
            onUnsave={() => unsaveRecord(index, item.id)}
            ref={ref => updateRef({ id: item.id, ref })}
          />
        )}
      />
    </View>
  )
}

SaveTab.propTypes = {

}

export default SaveTab