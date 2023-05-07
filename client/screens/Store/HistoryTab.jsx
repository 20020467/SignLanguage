import Checkbox from 'expo-checkbox'
import { useEffect, useRef, useState } from 'react'
import { Alert, BackHandler, FlatList, Pressable, RefreshControl, Text, TouchableOpacity, View } from 'react-native'
import { Divider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { LoadingModal } from 'react-native-loading-modal'
import HistoryRecord from './HistoryRecord'
import { MovableAnimatedView, initializePosition } from './AnimatedView'
import { ResizableAnimatedView, initializeSize } from './AnimatedView'
import { HistoryTabStyles as styles } from './style'
import { useFetch } from './axios'

// Store 2 main states of components: before and after changed
// Created by practical purpose in this component and only used here
function stateInfo(before, after) {
  return { before, after }
}

/** Following constants are only called once while starting UI  */
// before-after position or size
const deleteNavBarState = stateInfo(-16, 0) // y
const listState = stateInfo(0, 9) // y
const listSizeState = stateInfo(100, 83) // height
const deleteButtonState = stateInfo(91, 82) // y; doesn't really move down after closing deletion mode ?

// { x, y }
const deleteNavBarPosition = initializePosition(0, deleteNavBarState.before)
const listPosition = initializePosition(0, listState.before)
const deleteButtonPosition = initializePosition(0, deleteButtonState.before)
// { width, height }
const listSize = initializeSize(100, listSizeState.before)

/**
 * Displays translated texts of user in the past.
 * 
 * Maintains 2 states which are normal (before) and deletion (after) mode
 * where deletion mode allows user to delete search results in bulk.
 * @param {object} props 
 * @returns 
 */
const HistoryTab = (props) => {
  const [dataset, setDataset] = useState([]) // [...{ id, content, favour, viewTime }]
  const [resfreshing, setResfreshing] = useState(false)
  const [inDeletionMode, setInDeletionMode] = useState(false) // deletion mode
  const [isDeleting, setIsDeleting] = useState(false) // determine to open loading modal
  const [allChecked, setAllChecked] = useState(false)
  const [pendingSet, setPendingSet] = useState(new Set(null))
  const [containerSize, setContainerSize] = useState(initializeSize(0, 0))

  // Store ref to Animated View
  const deleteNavBar = useRef(null)
  const movableList = useRef(null)
  const resizableList = useRef(null)
  const deleteButton = useRef(null)
  const listItems = useRef([]).current // [...{id, reset}]
  const swipedItem = useRef(null) // stores id of item being swiped
  const selfClosed = useRef(true) // determine close action of an item called by itself or other item
  // const containerSize = useRef(initializeSize(0, 0))

  const request = useFetch('sentence')

  /**
   * GET data from server and render on screen
   */
  useEffect(() => {
    request.getHistory().then(res => {
      setDataset(res.data.data)
    }).catch(msg => console.log(`Get history records: ${msg}`)) // TRACE

    resizableList.current.changeHeight(listSizeState.before)

    // handle back gesture; not worked
    // BackHandler.addEventListener("hardwareBackPress", () => {
    //   if (inDeletionMode) closeDeletionMode()
    // })
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
    if (inDeletionMode) {
      deleteNavBar.current.verticalShift(deleteNavBarState.after)
      movableList.current.verticalShift(listState.after)
      resizableList.current.changeHeight(listSizeState.after)
      deleteButton.current.verticalShift(deleteButtonState.after)
      unswipeItem(true)
    }
  }, [inDeletionMode])

  /**
   * Display alert before deleting
   * @param {number} id record's id
   * @param {function | undefined} cancelHandler
   */
  const askForDeletion = (id, cancelHandler) => {
    const isMultiDeletion = typeof id == 'undefined'

    const ConfirmButton = {
      text: "Có",
      onPress: () => isMultiDeletion ? deleteMultipleRecords() : deleteRecord(id),
    }

    const CancelButton = {
      text: "Không",
      onPress: cancelHandler ?? undefined,
    }

    Alert.alert("Bạn có muốn xóa không?", undefined, [ConfirmButton, CancelButton], { cancelable: true })
  }

  const deleteRecord = (deletedId) => {
    // send DELETE request first
    request.delete(deletedId).then(res => {
      setDataset(dataset.filter(record => record.id != deletedId))

      console.log(res.data) // TEST
    }).catch(msg => console.log(`deleteRecord: ${msg}`)) // TRACE
  }

  /**
   * Send DELETE requests first. If done, set new dataset by removing records exist in pending set,
   * then clear the pending set and close deletion mode (together with clearing pending set).
   * This 2 operations will run async if placing both in the same function, 
   * so consider to put later one in useEffect() or other solutions.
   */
  const deleteMultipleRecords = () => {
    setIsDeleting(true) // open loading modal

    const promises = new Array()

    Promise.allSettled([...pendingSet].map(id => request.delete(id)))
      .then((results) => {
        setIsDeleting(false) // close loading modal
        console.log(results) // TEST
        // create an array contains rejected results (if any). An element has form: { id, reason }
        const reasons = new Array()

        results.forEach((res, index) =>
          res.reason ? reasons.push({ id: Array.from(pendingSet)[index], reason: res.reason }) : null)

        return reasons
      })
      .then(reasons => {
        // if (reasons.length == 0) { // deleting all the specified has done
        //   setDataset(dataset.filter((record) => !pendingSet.has(record.id)))
        // } else {
        // keep records that cannot be removed
        const remaining = (id) => !pendingSet.has(id) || reasons.find(value => value.id == id)
        setDataset(dataset.filter((record) => remaining(record.id)))
        // }

        if (reasons.length == 0) { // deleting all the specified has done
          Alert.alert("Xóa thành công")
        } else Alert.alert("Xóa thất bại")

        closeDeletionMode()
      })

  }

  /**
   * Pull down to refresh data
   */
  const refreshList = () => {
    setResfreshing(true)
    // send GET request and reload the list
    request.getHistory().then(res => {
      setDataset(res.data.data)
      setResfreshing(false)
    }).catch(msg => {
      console.log(`Refresh history records: ${msg}`) // TRACE
      setResfreshing(false)
    })
  }

  const markAndOpenDeletionMode = (id) => {
    if (pendingSet.size != 0) setPendingSet(new Set())
    modifyPendingSet(false, id) // mark the record long-pressed
    setInDeletionMode(true)
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
    if (!inDeletionMode) return

    setInDeletionMode(false)
    // backward vertical shift is not shown, elements disappeared immidiately
    movableList.current.verticalShift(listState.before)
    resizableList.current.changeHeight(listSizeState.before)
    // listItem.current.switchButtons()
    deleteNavBar.current.verticalShift(deleteNavBarState.before)
    deleteButton.current.verticalShift(deleteButtonState.before)

    // unswipeItem()

    if (pendingSet.size != 0) setPendingSet(new Set())
  }

  // function printPending() { console.log("pending set: "); pendingSet.forEach((v) => { console.log(v) }) } // TEST
  // console.log("pendingSet.size = " + pendingSet.size) // TEST

  // may refactor this
  const unswipeItem = (setNull = false) => {
    const current = swipedItem.current // number
    if (typeof current == 'number' && current >= 0) {
      listItems.find(item => item.id == current)?.ref.unswipe()
      if (setNull) swipedItem.current = null
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

  // Sometimes next id is not set, which leads to allow 2 item to be swiped at the same time ???
  const onSwipableOpen = (id) => {
    if (typeof id !== 'number' || id < 0) throw "onSwipableOpen: Invalid passed id."

    const hasSecondItemSwiped = typeof swipedItem.current == 'number' && swipedItem.current != id

    // unswipe the other
    if (hasSecondItemSwiped) {
      unswipeItem() // calling with this condition allows user to swipe further without closing.
      selfClosed.current = false // indicates that the previous item is unswiped by another.
    }

    swipedItem.current = id
  }

  const onSwipableClose = () => {
    if (selfClosed.current) swipedItem.current = null
    else selfClosed.current = true
  }

  const getContainerSize = (event) => {
    const layout = event.nativeEvent.layout
    // containerSize.current.width = event.nativeEvent.x
    // containerSize.current.height = event.nativeEvent.y
    setContainerSize({
      width: layout.width,
      height: layout.height,
    })
  }

  const separator = () => (
    <View style={styles.separator}>
      <Divider orientation="vertical" />
    </View>
  )

  const emptyHistoryNotification = () => (
    <Text style={{ textAlign: 'center', fontSize: 16 }}>Lịch sử trống</Text>
  )

  return (
    <View style={styles.container} onLayout={getContainerSize}>
      <MovableAnimatedView
        style={{
          ...styles.deleteNavigationBar,
          display: inDeletionMode ? 'flex' : 'none'
        }}
        initial={deleteNavBarPosition}
        byPercent={true}
        parentSize={containerSize}
        ref={deleteNavBar}
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
        parentSize={containerSize}
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
            renderItem={({ item, index }) => {
              return (
                <HistoryRecord
                  index={index}
                  data={item}
                  inDeletionMode={inDeletionMode}
                  checked={pendingSet.has(item.id)}
                  onCheck={() => modifyPendingSet(false, item.id)}
                  onDelete={(reset) => askForDeletion(item.id, reset)}
                  onLongPress={() => markAndOpenDeletionMode(item.id)}
                  onSwipableOpen={() => onSwipableOpen(item.id)}
                  onSwipableClose={onSwipableClose}
                  ref={ref => updateRef({ id: item.id, ref })}
                />
              )
            }}
          />
        </ResizableAnimatedView>
      </MovableAnimatedView>
      <MovableAnimatedView
        style={{ ...styles.deleteButtonView, display: inDeletionMode ? 'flex' : 'none' }}
        initial={deleteButtonPosition}
        byPercent={true}
        parentSize={containerSize}
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
      <LoadingModal modalVisible={isDeleting} task='Đang xóa...'></LoadingModal>
    </View>
  )
}

HistoryTab.propTypes = {

}

export default HistoryTab