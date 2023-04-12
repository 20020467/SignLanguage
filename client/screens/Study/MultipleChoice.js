import { SafeAreaView } from "react-navigation";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-paper";

const Exercise = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      {/*header*/}
      <View
        style={{
          paddingTop: 20,
          marginBottom: 5,
          height: 85,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          backgroundColor: "#9FD0E6",
        }}
      >
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text
              style={{
                position: "absolute",
                top: 0,
                left: -100,
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Cau hoi trac nghiem
          </Text>
        </View>
      </View>
      <View>
        <Text>Chon goi cau hoi</Text>
        <Card>
          <Card.Title
            title="Hinh sau day la cua ki tu nao"
            subtitle="Dinh nghia"
          ></Card.Title>
          <Image source={require("../../assets/img/a.jpg")} />
          <Card.Content></Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
};
export default Exercise;
