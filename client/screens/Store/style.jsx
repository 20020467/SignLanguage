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

// helper function
export function getPercentValue(str) {
  if (typeof str != 'string' || str[str.length - 1] != '%') {
    throw "Input is not of valid percent value"
  }

  let result = ""
  
  for (i = 0; i < str.length - 1; i++) {
    result += str[i]
  }

  return Number(result)
}

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
    // ...border,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  checkAllButton: { /** Cannot ultilize 'space-around' style */
    // ...border,
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
    height: '99%', // may create function to get this value's number part directly
    // top: '10%', // get overwritten
    // ...border,
    alignItems: 'center',
  },
  recordListView: { //resizable
    // flex: 1,
    // ...border,
    height: '100%',
  },
  recordList: {
  },
  listItem: {
    width: '100%',
  },
  singleDeleteButton: {
    minHeight: '100%', 
    backgroundColor: 'rgb(255, 0, 0)',
    // paddingLeft: 200,
    // flexWrap: 'wrap',
    // justifyContent: 'flex-end',
    // width: 200,
  },
  separator: {
    minHeight: 10,
    justifyContent: 'center'
  },
  deleteButtonView: {
    height: '9%',
    // top: '91%', // gets overwritten by translateY then causes error of being disappeared
    backgroundColor: SECONDARY_1,
    alignItems: 'stretch',
    justifyContent: 'center',
    iconSize: 20,
  }
})

export const HistoryRecordStyles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%', // out of width range of listItem ???
    minHeight: 30,
    maxHeight: 80,
    // ...border,
    marginVertical: 2,
    // marginHorizontal: '2%',
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: "row",
    width: '88%', // default width; no longer resizing text field
    height: '100%',
    // paddingLeft: '1%',
    // ...border,
    justifyContent: 'center',
  },
  textWrapper: {
    width: '100%', 
    height: '100%',
    // ...border,
  },
  text: {
    fontSize: 18,
    // ...border,
  },
  buttonGroup: {
    width: '7%',
    marginHorizontal: '4%',
    // ...border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 36,
    height: 36,
    // ...border,
    // borderWidth: 2,
    // borderColor: 'black',
    // borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: PRIMARY_1,
    iconSize: 25,
  },
  // checkboxButton: {
  //   width: '7%',
  //   marginRight: '2%',
  //   // ...border,
  //   justifyContent: 'center',
  // },
})

export const SavedRecordStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
    height: 40,
    iconSize: 25,
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
});
