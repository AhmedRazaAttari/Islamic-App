import * as React from "react";
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import fire from "../config";



export default function Molanahome() {

  const [Chatheads, setChatheads] = React.useState([]);

  React.useEffect(() => {
    var UserId = fire.auth().currentUser.uid;
    var ChatHeadsArr = [];

    fire.database().ref("Molana/" + UserId).child("ChatHeads").once("value").then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        for (var i = 0; i < childSnapshot.val.length; i++) {
          ChatHeadsArr.push({
            name: childSnapshot.val().name,
            uid: childSnapshot.val().uid,
          })
        }

        setChatheads(ChatHeadsArr)

      })
    })
  })


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, width: '100%', padding: 18 }}>
        
        <FlatList
          data={Chatheads}
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item }) => {
            console.log("FLAAAAAAAAAATIST ==>", item)
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Chat", {
                    name: item.name,
                    uid: item.uid,
                    title: item.name
                  })
                }}
              >
                <View style={{ flexDirection: "column" }} >
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", height: 60, marginBottom: 10 }}>
                    <Image style={{ borderRadius: 100, backgroundColor: 'black', width: 50, height: 50, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "white" }} />
                    <Text>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        ></FlatList>
      </View>
    </ScrollView>
  );
}