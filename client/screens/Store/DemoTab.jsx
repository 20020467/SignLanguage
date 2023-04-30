import Checkbox from 'expo-checkbox'
import { useEffect, useRef, useState } from 'react'
import { Alert, BackHandler, FlatList, Pressable, RefreshControl, Text, TouchableOpacity, View } from 'react-native'
import { Divider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import HistoryRecord from './HistoryRecord'
import MovableAnimatedView, { initialize as initializePosition } from './MovableAnimatedView'
import ResizableAnimatedView, { initialize as initializeSize } from './ResizableAnimatedView'
import { HistoryTabStyles as styles } from './style'
import { ListItem, Button } from '@rneui/themed'
// import { Button } from 'react-native-elements'

// Store 2 main states of components: before and after changed
// Created by practical purpose in this component and only used here
function stateInfo(before, after) {
  return { before, after }
}

const deleteNavBarState = stateInfo(-16, 0) // y
const listState = stateInfo(0.5, 9) // y
const listSizeState = stateInfo(100, 83.5) // height
const deleteButtonState = stateInfo(80, 82) // y

// { x, y }
const deleteNavBarPosition = initializePosition(0, deleteNavBarState.before)
const listPosition = initializePosition(0, listState.before)
const deleteButtonPosition = initializePosition(0, deleteButtonState.before)
// { width, height }
const listSize = initializeSize(100, deleteButtonState.before)

const DemoTab = (props) => {
  const [dataset, setDataset] = useState([])
  const [resfreshing, setResfreshing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false) // deletion mode
  const [allChecked, setAllChecked] = useState(false)
  const [pendingSet, setPendingSet] = useState(new Set(null))

  // Store ref to Animated View
  const deleteNavBar = useRef(null)
  const movableList = useRef(null)
  const resizableList = useRef(null)
  const deleteButton = useRef(null)
  const listItems = useRef([]) // [...{id, reset}]
  const swipedItem = useRef(null) // stores id of item being swiped

  /**
 * GET data from server and render on screen
 */
  useEffect(() => {
    setDataset(require('./mock_dataset.json'))
    resizableList.current.changeHeight(listSizeState.before)
    // handle back gesture; not worked
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
   * Open deletion mode
   */
  useEffect(() => {
    if (isDeleting) {
      deleteNavBar.current.verticalShift(deleteNavBarState.after)
      movableList.current.verticalShift(listState.after)
      resizableList.current.changeHeight(listSizeState.after, null, () => console.log("resized list!"))
      deleteButton.current.verticalShift(deleteButtonState.after)
      resetSwipedItem()
    }
  }, [isDeleting])

  /**
   * Display alert before deleting
   * @param {number} id record's id
   */
  const askForDeletion = (id, cancelHandler) => {
    const is_id_list = typeof id == 'undefined'

    const ConfirmButton = {
      text: "Có",
      onPress: () => is_id_list ? deleteMultipleRecords() : deleteRecord(id),
    }

    const CancelButton = {
      text: "Không",
      onPress: cancelHandler ?? undefined,
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
        setDataset([...dataset, { id: next_id + 1, value: dataset[1].value + next_id, saved: false }])
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

    // console.log(`modifyPendingSet(): contains_all: ${contains_all}, specific_id: ${specific_id}.`)

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
    // backward vertical shift is not shown, elements disappeared immidiately
    movableList.current.verticalShift(listState.before)
    resizableList.current.changeHeight(listSizeState.before)
    // listItem.current.switchButtons()
    deleteNavBar.current.verticalShift(deleteNavBarState.before)
    deleteButton.current.verticalShift(deleteButtonState.before, null,
      () => setIsDeleting(false))

    resetSwipedItem()

    if (pendingSet.size != 0) setPendingSet(new Set())
  }

  /**
   * Set new dataset by removing records exist in pending set,
   * then clear the pending set and close deletion mode(included clearing pending set).
   * This 2 operations will run async if placing both in the same function, 
   * so consider to put later one in useEffect() or other solutions.
   */
  const deleteMultipleRecords = () => {
    // printPending() // TEST
    // send DELETE request, then reset dataset and pendingSet state.
    setDataset(dataset.filter((record) => !pendingSet.has(record.id)))
    closeDeletionMode()
  }

  // function printPending() { console.log("pending set: "); pendingSet.forEach((v) => { console.log(v) }) } // TEST
  // console.log("pendingSet.size = " + pendingSet.size) // TEST

  const separator = () => (
    <View style={styles.separator}>
      <Divider orientation="vertical" />
    </View>
  )

  const emptyHistoryNotification = () => (
    <Text style={{ textAlign: 'center', fontSize: 16 }}>Lịch sử trống</Text>
  )

  const leftContent = (reset, id) => {
    listItems.current.push({ id, reset })

    return (
      <Button
        title="Lưu"
        onPress={() => reset()}
        icon={{ name: 'save', color: 'white' }}
        buttonStyle={{ minHeight: '100%' }}
      />
    )
  }

  const rightContent = (reset, id) => {
    listItems.current.push({ id, reset })

    return (
      <Button
        title="Xóa"
        onPress={() => askForDeletion(id, reset)}
        icon={{ name: 'delete', color: 'white' }}
        buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
      />
    )
  }

  const resetSwipedItem = () => {
    const items = listItems.current
    for (i = 0; i < items.length; i++) {
      let item = items[i]
      if (typeof item.id == 'number' && typeof item.reset == 'function') {
        if (item.id == swipedItem.current) {
          item.reset()
          console.log(item);
          break
        }
      }
    }
  }

  const replaceSwipedItem = (id) => {
    resetSwipedItem()
    swipedItem.current = id
  }

  return (
    <View style={styles.container}>
      <MovableAnimatedView
        style={{
          ...styles.deleteNavigationBar,
          display: isDeleting ? 'flex' : 'none'
        }}
        initial={deleteNavBarPosition}
        byPercent={true}
        ref={deleteNavBar}
        onLayout={event => { console.log("deleteNavBar changed!"); console.log(event.nativeEvent.layout) }}
      >
        <View style={styles.cancelButtonView}>
          <Pressable
            style={styles.cancelButton}
            android_ripple={{ color: 'grey' }}
            onPress={closeDeletionMode}
          >
            <Icon
              name="times"
              size={styles.cancelButton.iconSize}
            />
          </Pressable>
        </View>
        <View style={styles.checkAllButtonGroup}>
          <Pressable
            style={styles.checkAllButton}
            android_ripple={{ color: 'grey' }}

            onPress={checkAll}
          >
            <Text style={{ marginRight: '1%' }}>Đã chọn: {pendingSet.size}</Text>
            <Pressable style={{}} android_ripple={{ color: 'grey' }}>
              <Checkbox value={allChecked} onValueChange={checkAll} />
            </Pressable>
          </Pressable>
        </View>
      </MovableAnimatedView>
      <MovableAnimatedView
        style={{ ...styles.recordListContainer }}
        initial={listPosition}
        byPercent={true}
        ref={movableList}
      >
        <ResizableAnimatedView
          style={{ ...styles.recordListView }}
          initial={listSize}
          byPercent={true}
          ref={resizableList}
        >
          <FlatList
            style={styles.recordList}
            ItemSeparatorComponent={separator}
            ListEmptyComponent={emptyHistoryNotification}
            refreshControl={
              <RefreshControl refreshing={resfreshing} onRefresh={refreshList} />
            }
            data={dataset}
            renderItem={({ item, index }) => (
              <ListItem.Swipeable
                key={index}
                leftContent={isDeleting ? null : (reset) => leftContent(reset, item.id)}
                rightContent={isDeleting ? null : (reset) => rightContent(reset, item.id)}
                onSwipeEnd={() => replaceSwipedItem(item.id)} // determining swipeEnd is based on "stop dragging" event
              >
                <ListItem.Content style={styles.listItem}>
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
                </ListItem.Content>
              </ListItem.Swipeable>
            )}
          />
        </ResizableAnimatedView>
      </MovableAnimatedView>
      <MovableAnimatedView
        style={{ ...styles.deleteButtonView, display: isDeleting ? 'flex' : 'none' }}
        initial={deleteButtonPosition}
        byPercent={true}
        ref={deleteButton}
      >
        <TouchableOpacity
          style={{ alignItems: 'center' }}
          onPress={() => askForDeletion()}
          disabled={pendingSet.size === 0}
        >
          <Icon
            name="trash"
            size={styles.deleteButtonView.iconSize}
          />
          <Text style={{ textAlign: 'center' }}>Xóa</Text>
        </TouchableOpacity>
      </MovableAnimatedView>
    </View>

  )
}

export default DemoTab