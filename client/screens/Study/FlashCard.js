
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Icon } from "react-native-elements";
const Flashcard = ()=>{
    const navigation = useNavigation()
    return (
        <SafeAreaView >
            <View style= {{ paddingTop: 20,
            marginBottom: 5,
            height: 85,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            backgroundColor: "#9FD0E6",}}>

            <View>
            <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
           
          >
            <Text  style={{
              position: "absolute",
              top: 0,
              left: -150,
            }}>
                Back
            </Text>
          </TouchableOpacity>
            </View>
            <View>
                <Text style = {{fontWeight:'bold', fontSize:20}}>
                    Flashcard
                </Text>
            </View>
            </View>
            <View>
                
            </View>


        </SafeAreaView>
        
        
    )
    
}
export default Flashcard;