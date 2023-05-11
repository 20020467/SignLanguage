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

export * from './Home.styles'

export * from './Profile.styles'

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
