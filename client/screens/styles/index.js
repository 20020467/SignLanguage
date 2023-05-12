import { Dimensions, StyleSheet } from 'react-native';
import COLOR from './Colors'

//dimention
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

export { COLOR }
export * from './Colors'

export const SIZES = {
  base: 10,
  width,
  height,
}

export * from './Store.styles'

export * from './Study.styles'

export * from './Home.styles'

export * from './Profile.styles'

export const HeaderStyles = StyleSheet.create({
  top: {
    paddingTop: 20,
    marginBottom: 5,
    height: 85,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: COLOR.Secondary_1,
  },
  title: {
    marginBottom: 10,
  },
  imgwrap: {
    position: "absolute",
    top: 35,
    right: 20,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  textSmall: {
    position: "absolute",
    top: 25,
    right: -20,
    fontSize: 10,
  },
});

export const SignInStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: '15%',
  },
  header: {
    marginTop: '15%',
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
