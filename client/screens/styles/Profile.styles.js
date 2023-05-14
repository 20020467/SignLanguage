import { StyleSheet } from 'react-native';
import COLOR from './Colors'

export const ProfileScreenStyles = StyleSheet.create({
	background: {
		flex: 1,
	},
	header: {
		// marginTop: 40,
		justifyContent: "center",
		alignItems: "center",
	},
	headerText: {
		color: COLOR.Secondary_3,
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
