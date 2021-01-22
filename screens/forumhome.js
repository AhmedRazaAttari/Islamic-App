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
    <View style={{ marginTop: 40, padding: 10 }}>
      <Item rounded >
        <Input placeholder='Search question' style={{ paddingLeft: 20 }} onChangeText={val => GetMatchedData(val)} value={SearchItem} />
      </Item>
      {/* {!isLoading && <View style={{ padding: 10, width: Dimensions.get("window").width - 20, flexDirection: "column", backgroundColor: "lightgrey", marginTop: 20, justifyContent: "space-around" }}>

        <View style={{ width: "100%", minHeight: 40 }}>
          <Text>afsfadasfahfkjashfkahfkashfkfkajfhkj</Text>
        </View>

        <View style={{
          width: "100%",
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
        }}></View>

        <View style={{ width: "100%", minHeight: 40 }}>
          <Text>afsfadasfahfkjashfkahfkashfkfkajfhkj</Text>
        </View>
      </View>} */}
      <FlatList
        data={FinalMatchedArr}
        keyExtractor={(item, index) => "key" + index}
        renderItem={({ item }) => {
          console.log("FLAAAAAAAAAATIST ==>", item)
          return (
            <View style={{ padding: 10, width: Dimensions.get("window").width - 20, flexDirection: "column", backgroundColor: "lightgrey", marginTop: 20, justifyContent: "space-around" }}>

              <View style={{ width: "100%", minHeight: 40 }}>
                <Text>{item.question}</Text>
              </View>

              <View style={{
                width: "100%",
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
              }}></View>

              <View style={{ width: "100%", minHeight: 40 }}>
                <Text>afsfadasfahfkjashfkahfkashfkfkajfhkj</Text>
              </View>
            </View>

          );
        }}
      ></FlatList>

      <Button rounded onPress={() => navigation.navigate("AllMolana")} style={{ padding: 10, backgroundColor: "green", marginTop: 40 }}>
        <Text style={{ color: "white" }}>Search Molana & Ask question</Text>
      </Button>
    </View>
  );
}

