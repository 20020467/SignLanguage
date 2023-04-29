import { StyleSheet } from 'react-native'

// Colors
export const PRIMARY_0 = 'rgb(181, 178, 146)'
export const PRIMARY_1 = 'rgb(200, 197, 172)'
export const PRIMARY_2 = 'rgb(213, 211, 191)'
export const PRIMARY = 'rgb(163, 159, 122)'
export const SECONDARY_0 = 'rgb(227, 47, 2)' // rgb(191, 47, 11)
export const SECONDARY_1 = 'rgb(191, 78, 8)'
export const SECONDARY_2 = 'rgb(116, 140, 148)' // rgb(94, 110, 115)

const border = { borderWidth: 1, borderColor: 'black' } // dev purpose

export const StoreScreenStyles = StyleSheet.create({
  topTabBar: {
    backgroundColor: PRIMARY_0,
    height: '9%',
  },
  topTabBarButton: {
    alignItems: "center",
    justifyContent: "center",
    iconSize: 22, // custom style
  },
  topTabBarLabel: {
    fontSize: 12,
  },
})

export const HistoryTabStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deleteNavigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '9%',
    backgroundColor: PRIMARY_1,
  },
  cancelButtonView: {
    width: '12%', // replacement of flex: 1
    height: '75%', // may not equal to width
    marginLeft: '2%',
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    iconSize: 20, // custom style
  },
  checkAllButtonGroup: { // checkAll is the name of checkbox
    width: '86%', // subtract cancel button element
    height: '100%',
    ...border,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  checkAllButton: { /** Cannot ultilize 'space-around' style */
    ...border,
    width: '42%',
    height: '100%',
    paddingRight: '3%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  recordListContainer: { // movable
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%', // create function to get this value's number part directly
    top: '10%',
    ...border,
    alignItems: 'center',
  },
  recordListView: { //resizable
  },
  recordList: {
    flex: 1,
  },
  separator: {
    minHeight: 10,
    justifyContent: 'center'
  },
  deleteButtonView: {
    alignItems: 'stretch',
    justifyContent: 'center',
    height: '9%',
    top: '82%',
    backgroundColor: SECONDARY_1,
    iconSize: 20,
  }
})

export const HistoryRecordStyles = StyleSheet.create({
  container: {
    // display: 'none',
    height: 50,
    // ...border,
    marginVertical: 2,
    marginHorizontal: '2%',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    width: '75%',
    maxHeight: '100%',
    // flex: 7,
    fontSize: 18,
    paddingLeft: '1%',
    // ...border,
  },
  buttonGroup: {
    width: '25%',
    height: '80%',
    // flex: 2,
    // ...border,
    // marginRight: '2%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: '85%',
    height: '100%',
    // borderWidth: 2,
    // borderColor: 'black',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_1,
    iconSize: 25,
  },
  checkboxButton: {
    marginRight: '2%',
  },
})

export const SavedRecordStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
    height: 40,
  },
  text: {
    fontSize: 18,
    flex: 7,
    paddingLeft: 4,
  },
  button: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  iconSize: 25,
});
