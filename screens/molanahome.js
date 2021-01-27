import * as React from "react";
import { Image, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import fire from "../config";

export default function Molanahome({ route, navigation }) {

  const [Chatheads, setChatheads] = React.useState([]);
  const [fiqah, setFiqah] = React.useState();
  const [isLoading, setLoading] = React.useState(true)
  const [token, setToken] = React.useState("")

  // const { fiqah } = route.params;
  React.useEffect(() => {
    // var fiqah;
    isLoading && fetchedData()
  })


  async function fetchedData() {
    var UserId = fire.auth().currentUser.uid;
    var ChatHeadsArr = [];

    await fire.database().ref("Molana/").once("value").then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        childSnapshot.forEach(function (anotherSnapsot) {
          if (anotherSnapsot.key === UserId) {
            console.log(anotherSnapsot.val().fiqah)
            // setToken(anotherSnapsot.val().token)
            // setFiqah(anotherSnapsot.val().fiqah) 
            fire.database().ref("Molana/" + anotherSnapsot.val().fiqah + "/" + UserId).child("ChatHeads").once("value").then(function (snapshot2) {
              snapshot2.forEach(function (childSnapshot2) {
                // console.log(childSnapshot2.val())
                var items = [];
                items = [childSnapshot2.val()]
                for (var i = 0; i < items.length; i++) {
                  ChatHeadsArr.push({
                    name: items[i].name,
                    uid: items[i].uid,
                    fiqah: items[i].fiqah,
                  })
                }
                console.log(ChatHeadsArr)
                setChatheads(ChatHeadsArr)
                // ChatHeadsArr = items

              })
            })
            setLoading(false)
            // fetchedChats(anotherSnapsot.val().fiqah)
          }
        })
      })
    })

    // console.log(fiqah)
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, width: '100%', padding: 10 }}>
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
                    fiqah: item.fiqah,
                    title: item.name,
                    // token : token
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