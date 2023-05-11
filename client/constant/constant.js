import { Dimensions } from "react-native";
const {width, height} = Dimensions.get('window');

export const COLORS = {
    primary: "#252c4a",
    secondary: '#1E90FF',
    accent: '#3498db',
    
    success: '#00C851',
    error: '#ff4444',

    white: "#171717",
    black: "#FFFFFF",
    background: "white"
}


export const SIZES = {
    base: 10,
    width,
    height
}