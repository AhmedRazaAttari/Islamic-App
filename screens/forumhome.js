import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import { Container, Header, Content, Item, Input, Button, Accordion } from 'native-base';
import fire from '../config';

export default function Forumhome({ navigation }) {

  const [SearchItem, SetSearchItem] = React.useState("")
  const [MatchedData, UpdateMatchData] = React.useState([])
  const [FinalMatchedArr, UpdateFinalMatchedArr] = React.useState([])

  const [isLoading, SetLoading] = useState(true)

  React.useEffect(() => {
    console.log("FINAL MATCHED ARRAY ==>", FinalMatchedArr)
  })

  function GetMatchedData(val) {
    SetSearchItem(val)
    fire.database().ref("questions").once("value").then(function (snapshot) {
      var tempArr = [];
      snapshot.forEach(function (childSnapshot) {
        childSnapshot.forEach(function (anotherSnapshot) {
          // console.log("*****************&&", childSnapshot.val())
          var data = `${anotherSnapshot.val().question}`

          SearchItem.toLowerCase()
          // var result = data.toLowerCase().indexOf(SearchItem) > -1
          if (data.toLowerCase().indexOf(SearchItem) > -1) {
            UpdateMatchData(anotherSnapshot.val())
            tempArr.push(MatchedData)
          }
        })
        console.log("+++++tempArr++++++", tempArr)
        UpdateFinalMatchedArr(tempArr)
        SetLoading(false)
        // console.log("+++++MatchedData++++++", MatchedData)

      })
    })
  }

  return (
    <View style={{ marginTop: 30, padding: 10 }}>

      <Button rounded onPress={() => navigation.navigate("AllMolana")} style={{ padding: 10, backgroundColor: "green", marginTop: 40 }}>
        <Text style={{ color: "white" }}>Search Molana & Ask question</Text>
      </Button>
      <Item rounded style={{ marginTop: 10 }}>
        <Input placeholder='Search question' style={{ paddingLeft: 20 }} onChangeText={val => GetMatchedData(val)} value={SearchItem} />
      </Item>
      <FlatList
        data={FinalMatchedArr}
        keyExtractor={(item, index) => "key" + index}
        renderItem={({ item }) => {
          console.log("FLAAAAAAAAAATIST ==>", item)
          return (
            <View style={{ padding: 10, width: Dimensions.get("window").width - 50, minHeight: 100, marginBottom: 20, padding: 10, flexDirection: "column", backgroundColor: "#f0f2f5", marginTop: 20, justifyContent: "space-around", elevation: 3, borderRadius: 10, alignSelf: "center" }}>

              <View style={{ width: "100%", minHeight: 40 }}>
                <Text style={{fontSize : 15, fontWeight : "bold"}}> Question : {item.question}</Text>
              </View>

              <View style={{
                width: "100%",
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
              }}></View>

              <View style={{ width: "100%", minHeight: 35 }}>
                <Text style={{fontSize : 15, fontWeight : "bold"}}>Answer :  {item.answer}</Text>
              </View>
            </View>

          );
        }}
      ></FlatList>

    </View>
  );
}

