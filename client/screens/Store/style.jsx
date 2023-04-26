import { StyleSheet } from 'react-native'

export const HistoryTabStyles = StyleSheet.create({
    deleteNavigationBar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '9%',
        backgroundColor: 'rgb(140, 67, 20)',
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
        height: '81%', // flexible; consider to write inline
        top: '10%',
    },
    deleteButton: {
        alignItems: 'stretch',
        justifyContent: 'center',
        height: '9%',
        top: '82%',
        backgroundColor: 'pink',
    }
})

export const HistoryRecordStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        textAlign: "center",
        maxHeight: '100%',
        marginVertical: '1%',
        marginLeft: '2%',
    },
    text: {
        fontSize: 18,
        flex: 7,
        paddingLeft: '1%',
        maxHeight: 120,
    },
    buttonGroup: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "space-around",
        marginRight: '2%',
    },
    checkboxButton: {
        marginRight: '2%',
    },
    iconSize: 25,
})
