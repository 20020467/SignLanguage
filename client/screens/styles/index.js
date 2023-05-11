import { Dimensions, StyleSheet } from 'react-native';
import COLOR from './Colors'

//dimention
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

export { COLOR }

export const SIZES = {
  base: 10,
  width,
  height,
}

export * from './Store.styles'

export * from './Study.styles'

export const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.Background,
    // backgroundColor: "white",
  },
  body: {
    flex: 1,
    // backgroundColor: "pink",
    marginBottom: 10,
    paddingHorizontal: 13,
    paddingTop: 7,
  },
  sentence: {
    minHeight: 70,
    backgroundColor: COLOR.Background,
    borderRadius: 10,
    elevation: 5,
    // justifyContent: "center",
    // alignItems: "center",
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
  },
  text: {
    fontSize: 17,
    display: "flex",
    flexWrap: "wrap-reverse",
    flexDirection: "column",
    padding: 15,
    marginRight: 23,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  star: {
    fontSize: 30,
    position: "absolute",
    top: 17,
    right: 10,
  },

  test: {
    elevation: 20,
    backgroundColor: "white",
  },
  inputwrap: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR.Gray,
  },
  input: {
    flex: 1,
    height: 50,
    marginHorizontal: 12,
    padding: 10,
    paddingRight: 15,
    marginRight: 10,
    fontSize: 17,
  },
  recording: {
    marginTop: 13,
    marginRight: 15,
    fontSize: 25,
    color: COLOR.Secondary_1,
  },
  noRecording: {
    marginTop: 13,
    marginRight: 15,
    fontSize: 25,
    color: COLOR.Grey,
  },
  send: {
    marginTop: 13,
    marginRight: 15,
    fontSize: 25,
    color: COLOR.Secondary_1,
  },
});

export const ResultStyles = StyleSheet.create({
  item: {
    flexDirection: "column",
    backgroundColor: "pink",

    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  imgWrap: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap-reverse",

    gap: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginTop: 10,
  },
  imgWrapItem: {
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  img: {
    width: 105,
    height: 105,
    borderRadius: 10,
  },
  text: {
    fontSize: 25,
    marginTop: 9,
    marginLeft: 5,
    marginBottom: 10,
  },
});

export const ProfileScreenStyles = StyleSheet.create({
  background: {
    flex: 1,
  },
  header: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: COLOR.Secondary,
    marginTop: 10,
  },
  body: {
    marginBottom: 40,
    padding: 15,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  item: {
    marginVertical: 10,
  },
  text: {
    opacity: 0.5,
    marginBottom: 5,
  },
  inputText: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: "#607D8B",
    marginBottom: 10,
  },
  update: {
    position: "absolute",
    right: 0,
    top: -50,
    opacity: 0.5,
  },
});

export const SignInStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    marginTop: 110,
    marginLeft: 24,
  },
  login: {
    fontSize: 28,
    fontWeight: 400,
  },
  body: {
    paddingHorizontal: 24,
    marginVertical: 20,
  },
  item: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 20,
  },
  input: {
    paddingHorizontal: 12,
    gap: 10,
    height: 43,
    borderRadius: 4,
    borderColor: "#A2A2A6",
    borderStyle: "solid",
    borderWidth: 1,
  },
  show: {
    position: "absolute",
    fontSize: 25,
    right: 15,
    top: 37,
  },
  noAccount: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});