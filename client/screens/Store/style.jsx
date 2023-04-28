import { StyleSheet } from 'react-native'

// Colors
export const PRIMARY_0 = 'rgb(181, 178, 146)'
export const PRIMARY_1 = 'rgb(200, 197, 172)'
export const PRIMARY_2 = 'rgb(213, 211, 191)'
export const PRIMARY = 'rgb(163, 159, 122)'
export const SECONDARY_0 = 'rgb(227, 47, 2)' // rgb(191, 47, 11)
export const SECONDARY_1 = 'rgb(191, 78, 8)'
export const SECONDARY_2 = 'rgb(116, 140, 148)' // rgb(94, 110, 115)

export const StoreScreenStyles = StyleSheet.create({
    topTabBar: {
      backgroundColor: PRIMARY_0,
      height: '9%',
    },
    topTabBarButton: {
      alignItems: "center",
      justifyContent: "center",
    },
    topTabBarLabel: {
      fontSize: 12,
    },
    iconSize: 22,
  })
  
export const HistoryTabStyles = StyleSheet.create({
    deleteNavigationBar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '9%',
        backgroundColor: PRIMARY_1,
    },
    cancelButton: {
        flex: 1,
    },
    checkAllButtonGroup: { // checkAll is name of checkbox
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    checkAllButton: { /** Cannot ultilize 'space-around' style */
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginRight: '2%',
    },
    recordList: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%', // create function to get this value's number part directly
        top: '10%',
    },
    deleteButton: {
        alignItems: 'stretch',
        justifyContent: 'center',
        height: '9%',
        top: '82%',
        backgroundColor: SECONDARY_1,
    }
})

export const HistoryRecordStyles = StyleSheet.create({
    container: {
        // minHeight: '3%',
        height: 50,
        // maxHeight: '60%',
        borderColor: 'rgb(3, 40, 20)',
        borderWidth: 1,
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
        borderColor: 'rgb(58, 30, 18)',
        borderWidth: 1,
    },
    buttonGroup: {
        width: '25%',
        height: '80%',
        // flex: 2,
        // marginRight: '2%',
        borderColor: 'rgb(58, 30, 18)',
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    button: {
        width: '45%',
        height: '100%',
        // borderWidth: 2,
        // borderColor: 'black',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: PRIMARY_1,
    },
    checkboxButton: {
        marginRight: '2%',
    },
    iconSize: 25,
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
  