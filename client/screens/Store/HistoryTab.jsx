import Checkbox from 'expo-checkbox'
import { useEffect, useRef, useState } from 'react'
import { Alert, BackHandler, FlatList, Pressable, RefreshControl, Text, TouchableOpacity, View } from 'react-native'
import { Divider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import FixedHeightAnimatedView from './FixedHeightAnimatedView'
import FixedVerticalAnimatedView, { initialize } from './FixedVerticalAnimatedView'
import HistoryRecord from './HistoryRecord'
import { HistoryTabStyles as styles } from './style'

const HistoryTab = () => {
  // [before, after]
  const deleteNavBarPosition = initialize(-16, 0)
  const listPosition = initialize(1.2, 9)
  const listSize = initialize(97.8, 81.6)
  const deleteButtonPosition = initialize(91, 82)

  const [dataset, setDataset] = useState([])
  const [resfreshing, setResfreshing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false) // deletion mode
  const [allChecked, setAllChecked] = useState(false)
  const [pendingSet, setPendingSet] = useState(new Set(null))

  const deleteNavBar = useRef(null)
  const movableList = useRef(null)
  const resizingList = useRef(null)
  const deleteButton = useRef(null)
  /**
   * Used to auto-scroll when changing deletion mode state
   */
  const flatListRef = useRef(null)
  const deleteNavBarLayoutPosition = useRef({ before: 0, after: 0 })

  /**
   * GET data from server and render on screen
   */
  useEffect(() => {
    setDataset(require('./mock_dataset.json'))

    // handle back gesture
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (isDeleting) closeDeletionMode()
    })
  }, [])

  useEffect(() => {
    // Set 'all' checkbox value
    if (pendingSet.size == dataset.length) setAllChecked(true) // may happen due to async executing
    else setAllChecked(false)
  }, [pendingSet, dataset]) // run mainly based on pendingSet

  /**
   * Shift some components and change list size based on Deletion mode
   */
  useEffect(() => {
    if (isDeleting) {
      deleteNavBar.current.shift(deleteNavBarPosition.after)
      movableList.current.shift(listPosition.after)
      resizingList.current.change(listSize.after)
      deleteButton.current.shift(deleteButtonPosition.after)
    }
    else {
    }
  }, [isDeleting])

  /**
   * Display alert before deleting
   * @param {number} id record's id
   */
  const askForDeletion = (id) => {
    const is_id_list = typeof id == 'undefined'

    const ConfirmButton = {
      text: "Có",
      onPress: () => is_id_list ? deleteMultipleRecords() : deleteRecord(id),
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

  /**
   * Pull down to refresh data
   */
  const refreshList = () => {
    setResfreshing(true)
    try {
      // send GET request and reload the list
      setTimeout(() => {
        const next_id = dataset[dataset.length - 1].id
        setDataset([...dataset, { id: next_id + 1, value: "sentence 00" + next_id, saved: false }])
        if (isDeleting) closeDeletionMode()
        setResfreshing(false)
      }, 1010)
    } catch (e) {
      console.log(e)
      setResfreshing(false)
    }
  }

  const markAndOpenDeletionMode = (id) => {
    if (pendingSet.size != 0) setPendingSet(new Set())
    modifyPendingSet(false, id) // mark the record long-pressed
    setIsDeleting(true)
  }

  /**
   * Mark/Unmark all items in list.
   * This operation includes putting/removing all items into/from pending set
   * and set 'all' checkbox to true.
   */
  const checkAll = () => {
    let new_pending_set = new Set(pendingSet)

    // triggered by user (when mark full of list)
    if (!allChecked) {
      dataset.forEach(record => new_pending_set.add(record.id)) // user case
    } else new_pending_set = new Set() // user case; lack of auto case

    setPendingSet(new_pending_set)
    setAllChecked(!allChecked)
  }

  /**
   * Consider contains_all first, then get value of specific_id if contains_all is false.
   * @param {boolean} contains_all mostly not used
   * @param {number | undefined} specific_id
   * @param {boolean | undefined} is_added not used
   */
  const modifyPendingSet = (contains_all = false, specific_id = undefined) => {
    if (!contains_all && typeof specific_id !== 'number') throw (`Invalid arguments. 'specific_id' must be a number.`)

    console.log(`modifyPendingSet(): consider contains_all: ${contains_all}, specific_id: ${specific_id}.`)

    let new_pending_set = new Set(pendingSet)

    if (!contains_all) {
      if (new_pending_set.has(specific_id)) {
        new_pending_set.delete(specific_id)

      }
      else {
        new_pending_set.add(specific_id)
      }
    }

    setPendingSet(new_pending_set)
  }

  const closeDeletionMode = () => {
    if (!isDeleting) return

    deleteNavBar.current.shift(deleteNavBarPosition.before)
    movableList.current.shift(listPosition.before)
    resizingList.current.change(listSize.before)
    deleteButton.current.shift(deleteButtonPosition.before, () => setIsDeleting(false))

    if (pendingSet.size != 0) setPendingSet(new Set())
  }

  /**
   * Set new dataset by removing records exist in pending set,
   * then clear the pending set and close deletion mode(included clearing pending set).
   * This 2 operations will run async if placing both in the same function, 
   * so consider to put later one in useEffect() or other solutions.
   */
  const deleteMultipleRecords = () => {
    printPending() // TEST
    // send DELETE request, then reset dataset and pendingSet state.
    setDataset(dataset.filter((record) => !pendingSet.has(record.id)))
    closeDeletionMode()
  }

  function printPending() { console.log("pending set: "); pendingSet.forEach((v) => { console.log(v) }) } // TEST
  console.log("pendingSet.size = " + pendingSet.size) // TEST

  const separator = () => (
    <View style={{ minHeight: 10, justifyContent: 'center' }}>
      <Divider orientation="vertical" />
    </View>
  )

  const listHeader = () => <Text style={{ fontWeight: 700, fontSize: 21, }}>Lịch sử tìm kiếm</Text>

  const emptyHistoryNotification = () => (
    <Text style={{ textAlign: 'center', fontSize: 16 }}>Lịch sử trống</Text>
  )

  const autoScrollList = (event) => {
    const { x, y } = event.nativeEvent.layout
    const position = deleteNavBarLayoutPosition.current

    if (position.before == 0) position.before = y
    position.after = y

    flatListRef.current.scrollToOffset({ offset: 100/**position.after - position.before*/ })
    position.before = x
  }

  return (
    <View style={{ flex: 1 }}>
      <FixedVerticalAnimatedView
        style={{
          ...styles.deleteNavigationBar,
          display: isDeleting ? 'flex' : 'none'
        }}
        initial={deleteNavBarPosition.before}
        ref={deleteNavBar}
        onLayout={event => console.log(event.nativeEvent.layout)}
      >
        <View style={styles.cancelButton}>
          <Pressable
            style={{ flexDirection: 'row', maxWidth: 40, justifyContent: 'space-around' }}
            android_ripple={{ color: 'grey' }}
            onPress={closeDeletionMode}
          >
            <Icon
              name="times"
              size={20}
              style={{ height: 20 }}
            />
          </Pressable>
        </View>
        <View style={styles.checkAllButtonGroup}>
          <Pressable style={styles.checkAllButton} onPress={checkAll}>
            <Text style={{ marginRight: 8 }}>Đã chọn: {pendingSet.size}</Text>
            <Pressable style={{ marginRight: 4 }} android_ripple={{ color: 'grey' }}>
              <Checkbox value={allChecked} onValueChange={checkAll} />
            </Pressable>
          </Pressable>
        </View>
      </FixedVerticalAnimatedView>
      <FixedVerticalAnimatedView style={{ ...styles.recordList }} initial={listPosition.before} ref={movableList}>
        <FixedHeightAnimatedView style={{}} initial={listSize.before} ref={resizingList}>
          <FlatList
            ItemSeparatorComponent={separator}
            ListEmptyComponent={emptyHistoryNotification}
            // ListHeaderComponent={listHeader}
            // onLayout={autoScrollList}
            ref={flatListRef}
            data={dataset}
            renderItem={({ item, index, separators }) => (
              <HistoryRecord
                id={item.id}
                value={item.value}
                saved={item.saved}
                inDeletionMode={isDeleting}
                checked={pendingSet.has(item.id)}
                onCheck={() => modifyPendingSet(false, item.id)}
                onDelete={() => askForDeletion(item.id)}
                onLongPress={() => markAndOpenDeletionMode(item.id)}
              />
            )}
            refreshControl={
              <RefreshControl refreshing={resfreshing} onRefresh={refreshList} />
            }
          />
        </FixedHeightAnimatedView>
      </FixedVerticalAnimatedView>
      {
        isDeleting &&
        <FixedVerticalAnimatedView style={styles.deleteButton} initial={deleteButtonPosition.before} ref={deleteButton}>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={() => askForDeletion()}
            disabled={pendingSet.size === 0}
          >
            <Icon
              name="trash"
              size={20}
              style={{ height: 20 }}
            />
            <Text style={{ textAlign: 'center' }}>Xóa</Text>
          </TouchableOpacity>
        </FixedVerticalAnimatedView>
      }
    </View>
  )
}

HistoryTab.propTypes = {

}

export default HistoryTab
