import { Dimensions, StyleSheet } from 'react-native';

//dimention
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

export const StudyScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    height: 120,
    width: 170,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: '#9FD0E6',

  },
  item1: {
    marginRight: width / 15,
    marginLeft: width / 15,

    marginTop: 10,
    backgroundColor: '#9FD0E6',
    fontSize: 24,
    padding: 10,
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center'

  },
  item2: {
    marginRight: width / 15,
    marginLeft: width / 15,
    marginTop: 10,
    backgroundColor: '#FFFF99',
    fontSize: 24,
    padding: 10,
    borderRadius: 10
  },
  suggest: {

  },
  text: {
    marginLeft: 10
  }
})

export const FlashCardStyles = StyleSheet.create({
  img: {
    resizeMode: 'contain',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  hidden: {
    backfaceVisibility: 'hidden'

  },
  back: {
    position: 'absolute',
    top: 0
  },
  text: {
    alignContent: 'center',
    justifyContent: 'center',
    fontSize: 24,
    fontWeight: 'bold'
  },
  icon: {
    marginTop: 150,
    marginLeft: 150

  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  card: {
    height: height / 4,
    width: width / 2,
    marginLeft: width / 4,
    marginRight: width / 4,
    marginHorizontal: 10,
    marginBottom: 10,
    margin: 10,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: '#9FD0E6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardback: {
    height: height / 4,
    width: width / 2,
    marginLeft: width / 4,
    marginRight: width / 4,
    marginHorizontal: 10,
    marginBottom: 10,
    margin: 10,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  suggestionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 20
  },
  suggestionContainer: {
    marginLeft: width / 15,
    marginRight: width / 15,
  },
})