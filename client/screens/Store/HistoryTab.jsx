import { useEffect, useState } from 'react'
import { Alert, FlatList, RefreshControl, View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import HistoryRecord from './HistoryRecord'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Checkbox from 'expo-checkbox'

const HistoryTab = () => {
  const [dataset, setDataset] = useState([])
  const [resfreshing, setResfreshing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [allChecked, setAllChecked] = useState(false)
  const [pendingSet, setPendingSet] = useState(new Set(null))

  // GET data from server and render on screen
  useEffect(() => {
    setDataset([
      { id: 0, value: "Leonardo", saved: false },
      { id: 1, value: "Vangogh jiofdasjkl;sdaj n oljgsilajo n. gjoae. gsaflgjsa. gfajgr. rfagreasg, reger,gh ht6; fgreg5h", saved: true },
      { id: 2, value: "sentence 001", saved: false },
      { id: 3, value: "sentence 002", saved: true },
      { id: 4, value: "sentence 003", saved: false },
      { id: 5, value: "sentence 004", saved: false },
    ])
  }, [])

  // Check/Uncheck all records by one click
  useEffect(() => {
    console.log(allChecked)
    let new_pending_set = new Set(pendingSet)

    // triggered by user or auto-triggered (when mark full of list)
    if (allChecked) {
      if (pendingSet.size == dataset.length) return // auto case
      else dataset.forEach(record => new_pending_set.add(record.id)) // user case
    } else new_pending_set = new Set() // user case; lack of auto case

    setPendingSet(new_pending_set)
  }, [allChecked])

  useEffect(() => {
    if (pendingSet.size == dataset.length) setAllChecked(true)
    else setAllChecked(false)
  }, [])

  const askForDeletion = (id) => {
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
    } catch (e) {
      console.log(e)
      setResfreshing(false)
    }
  }

  const openDeletionMode = () => setIsDeleting(true)

  const checkAll = () => {
    setAllChecked(!allChecked)
  }

  // may be rewritten to achieve the reuse purpose
  // in which this may allow to put/remove 1 or all records into/from list.
  /**
   * Consider contains_all first, then get value of specific_id if contains_all is false.
   * @param {boolean} contains_all mostly not used
   * @param {number | undefined} specific_id
   * @param {boolean | undefined} is_added not used
   */
  const modifyPendingSet = (contains_all = false, specific_id = undefined, is_added = undefined) => {
    if (!contains_all && typeof specific_id !== 'number') throw(`Invalid arguments. 'specific_id' must be a number.`)
    
    console.log(`modifyPendingSet(): consider contains_all: ${contains_all}, specific_id: ${specific_id}.`)
    
    let new_pending_set = new Set(pendingSet)
    // considering 'isAdded' parameter may be removed
    if (typeof is_added !== 'undefined') {
      if (is_added) {
        if (contains_all) dataset.forEach(record => new_pending_set.add(record.id))
        else if (typeof specific_id == 'number') new_pending_set.add(specific_id)
        else throw("Invalid arguments.")
      } else if (!is_added) {
        if (contains_all) new_pending_set = new Set()
        else if (typeof specific_id == 'number') new_pending_set.delete(specific_id)
        else throw("Invalid arguments.")
      }
    } else {
      if (!contains_all) {
        if (new_pending_set.has(specific_id)) new_pending_set.delete(specific_id)
        else new_pending_set.add(specific_id)
      }
    }

    setPendingSet(new_pending_set)
  }

  console.log("pendingSet: " + pendingSet)

  return (
    <>
      { // determine to render deletion nav bar based on the list is in deletion mode or not.
        isDeleting &&
        <View style={styles.deleteNavigationBar} >
          <View style={styles.cancelButton}>
            <Pressable
              style={{ maxWidth: 40 }}
              android_ripple={{ color: 'grey' }}
              onPress={() => setIsDeleting(false)}
            >
              <Icon
                name="times"
                size={20}
                style={{ height: 20 }}
              />
            </Pressable>
          </View>
          <Pressable style={styles.checkAllButton} onPress={checkAll}>
            <Text>Đã chọn: {pendingSet.size}</Text>
            <Pressable style={{ maxWidth: 80 }} android_ripple={{ color: 'grey' }}>
              <Checkbox value={allChecked} />
            </Pressable>
          </Pressable>
        </View>
      }
      <View style={{ flex: 1, paddingTop: 5 }}>
        <FlatList
          data={dataset}
          renderItem={({ item }) => (
            <HistoryRecord
              id={item.id}
              value={item.value}
              saved={item.saved}
              inDeletionMode={isDeleting}
              checked={pendingSet.has(item.id)}
              onCheck={() => modifyPendingSet(false, item.id)}
              onDelete={() => askForDeletion(item.id)}
              onLongPress={openDeletionMode}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={resfreshing} onRefresh={refreshList} />

          }
        />
      </View>
      {
        isDeleting &&
        <View style={styles.deleteButton}>
          <TouchableOpacity style={{ alignItems: 'center' }} disabled={pendingSet.size === 0}>
            <Icon
              name="trash"
              size={20}
              style={{ height: 20 }}
            />
            <Text style={{ textAlign: 'center' }}>Xóa</Text>
          </TouchableOpacity>
        </View>
      }
    </>
  )
}

HistoryTab.propTypes = {

}

export default HistoryTab

const styles = StyleSheet.create({
  deleteNavigationBar: {
    flexDirection: 'row',
    alignItem: 'center',
    height: 50,
    backgroundColor: 'rgb(160, 0, 20)'
  },
  cancelButton: {
    flex: 1,
    alignSelf: 'center'
  },
  checkAllButton: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  deleteButton: {
    alignItems: 'stretch',
    justifyContent: 'center',
    height: 50,
    backgroundColor: 'pink',
  }
})