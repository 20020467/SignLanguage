import { StyleSheet } from 'react-native'
import COLOR from './Colors'


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
    backgroundColor: COLOR.Secondary_0,
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
    backgroundColor: COLOR.accent,
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
    height: '99.9%', // may create function to get this value's number part directly
    // top: '10%', // get overwritten
    // ...border,
    alignItems: 'center',
  },
  recordListView: { //resizable
    // flex: 1,
    height: '100%',
    alignItems: 'center',
  },
  recordList: {
    alignItems: 'center',
  },
  separator: {
    height: 1,
    justifyContent: 'center',
    marginVertical: '0.5%',
    // ...border,
  },
  deleteButtonView: {
    height: '9%',
    // top: '91%', // gets overwritten by translateY then causes error of being disappeared
    backgroundColor: "rgb(240, 60, 70)",
    alignItems: 'stretch',
    justifyContent: 'center',
    iconSize: 20,
  },
  emptyNotification: {
    textAlign: 'center',
    fontSize: 16,
    paddingTop: '5%',
  }
})

export const HistoryRecordStyles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%', // out of width range of listItem ???
    minHeight: 48,
    maxHeight: 70,
    marginVertical: '1%',
    // ...border,
    paddingHorizontal: '2%',
  },
  mainView: {
    width: '100%',
    height: '100%',
    // ...border,
    backgroundColor: COLOR.Background,
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: 'space-around',
  },
  textContainer: {
    flexDirection: "row",
    width: '85%', // default width; no longer resizing text field
    height: '100%',
    // ...border,
  },
  textWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    // ...border,
  },
  text: {
    fontSize: 18,
    // ...border,
  },
  buttonGroup: {
    width: '11%',
    // marginHorizontal: '1%',
    // ...border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: '100%',
    // ...border,
    // borderColor: 'black',
    // borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: PRIMARY_1,
    iconSize: 25,
  },
  deleteButton: {
    width: '25%',
    height: '100%',
    backgroundColor: COLOR.Error,
    // paddingLeft: 200,
    // flexWrap: 'wrap',
    // justifyContent: 'flex-end',
    // width: 200,
    iconSize: 25,
  },
})

export const SavedRecordStyles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
    minHeight: 52,
    maxHeight: 70,
    iconSize: 25,
  },
  textContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: "center",
  },
  textWrapper: {
    width: '100%',
    height: '100%',
    paddingHorizontal: '2%',
    backgroundColor: COLOR.Background,
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    // paddingLeft: 4,
  },
  button: {
    // flex: 2,
    // flexDirection: "row",
    // justifyContent: "space-around",
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: COLOR.Gray,
  },
});
