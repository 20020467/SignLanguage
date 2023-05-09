import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { FlatList, RefreshControl, Text, View } from 'react-native'
import { Divider } from 'react-native-elements'
import { useFetch } from '../../server_connector'
import SavedRecord from './SavedRecord'
import { HistoryTabStyles as styles } from './style'
import { StoreContext } from './StoreScreen'

const SaveTab = ({ route }) => {
  const [dataset, setDataset] = useState([])
  const [resfreshing, setResfreshing] = useState(false)

  const listItems = useRef([]).current // stores refs to list items; need to be refresh along with dataset
  const swipedItem = useRef(null) // sets new swiped item's index to this variable
  const selfClosed = useRef(true) // determine close action of an item called by itself or other item

  const { focused, setFocused, dataChanged, setDataChanged } = useContext(StoreContext)

  const request = useFetch('sentence')

  useFocusEffect(
    useCallback(() => {
      let willReload = false
      console.log(dataChanged)

      if (focused) {
        setFocused(false)
        willReload = true
      }

      if (willReload || dataChanged) {
        setDataChanged(false)

        request.getSavedRecords().then(res => {
          setDataset(res.data.data)
        }).catch(msg => console.log(`Get saved records: ${msg}`)) // TRACE
      }
    }, [])
  )

  useEffect(() => {
    request.getSavedRecords().then(res => {
      setDataset(res.data.data)
    }).catch(msg => console.log(`Get saved records: ${msg}`)) // TRACE
  }, [])

  const unsaveRecord = (id) => {
    // send POST request and/or store in local
    request.changeSaving(id)
      .then(res => {
        setDataChanged(true) // 
        setDataset(dataset.filter((item, idx) => item.id !== id))
      })
      .catch(msg => console.log(`unsaveRecord: ${msg}`)) // TRACE

    if (swipedItem.current === id) { // may place in useEffect
      listItems.splice(listItems.findIndex((item, idx) => item.id == id), 1)
      swipedItem.current = null
    }
  }

  /**
   * Cause new elements are created each rerendering, we should search for item by 
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
    // send GET request and reload the list
    request.getSavedRecords()
      .then(res => {
        setDataset(res.data.data)
      })
      .catch(msg => {
        console.log(`refreshList: ${msg}`) // TRACE
      })
      .finally(() => setResfreshing(false))
  }

  // Sometimes next id is not set, which leads to allow 2 item to be swiped at the same time ???
  const onSwipableOpen = (id) => {
    if (typeof id !== 'number' || id < 0) throw "onSwipableOpen: Invalid passed id."

    const current = swipedItem.current
    const hasSecondItemSwiped = typeof current == 'number' && current != id

    // unswipe the other
    if (hasSecondItemSwiped) {
      listItems.find(item => item.id == current)?.ref.unswipe()
      selfClosed.current = false // indicates that the previous item is unswiped by another.
    }

    swipedItem.current = id
  }

  const onSwipableClose = () => {
    if (selfClosed.current) swipedItem.current = null
    else selfClosed.current = true
  }

  const separator = () => (
    <View style={styles.separator}>
      <Divider orientation="vertical" />
    </View>
  )

  const emptyHistoryNotification = () => (
    <Text style={styles.emptyNotification}>Danh sách trống</Text>
  )

  return (
    <View style={{ flex: 1 }}>
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
            data={item}
            onSwipableOpen={() => onSwipableOpen(item.id)}
            onSwipableClose={onSwipableClose}
            onUnsave={() => unsaveRecord(item.id)}
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