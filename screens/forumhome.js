import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import { Container, Header, Content, Item, Input, Button, Accordion, Tab, Tabs, ScrollableTab } from 'native-base';
import fire from '../config';

export default function Forumhome({ navigation }) {

  const [SearchItem, SetSearchItem] = React.useState("")
  const [MatchedData, UpdateMatchData] = React.useState([])
  const [FinalMatchedArr, UpdateFinalMatchedArr] = React.useState([])
  const [Sunni, UpdateSunni] = React.useState([])
  const [Deobandi, UpdateDeobandi] = React.useState([])
  const [Wahabi, UpdateWahabi] = React.useState([])
  const [AhlHadees, UpdateAhlHadees] = React.useState([])
  const [Shia, UpdateShia] = React.useState([])

  // For Filters Searching Result
  const [FilterResult_Sunni, UpdateFilterResult_Sunni] = React.useState([])
  const [FilterResult_Deobandi, UpdateFilterResult_Deobandi] = React.useState([])
  const [FilterResult_Wahabi, UpdateFilterResult_Wahabi] = React.useState([])
  const [FilterResult_AhlHadees, UpdateFilterResult_AhlHadees] = React.useState([])
  const [FilterResult_Shia, UpdateFilterResult_Shia] = React.useState([])


  const [isloading, setloading] = React.useState(true)

  React.useEffect(() => {
    isloading && fetchedQuestions()
  })

  function fetchedQuestions() {

    var items = []
    var items2 = []
    var items3 = []
    var items4 = []
    var items5 = []

    fire.database().ref("questions").child("Sunni").once("value").then(function (snapshot) {
      if (snapshot.exists()) {
        snapshot.forEach(function (childSnapshot) {
          items.push({
            question: childSnapshot.val().question,
            answer: childSnapshot.val().answer
          })
        })
      }
    }).then(() => {
      UpdateSunni(items)
      setloading(false)
    })


    fire.database().ref("questions").child("Deobandi").once("value").then(function (snapshot) {
      if (snapshot.exists()) {
        snapshot.forEach(function (childSnapshot) {
          items2.push({
            question: childSnapshot.val().question,
            answer: childSnapshot.val().answer
          })
        })
      }
    }).then(() => {
      UpdateDeobandi(items2)
      setloading(false)
    })

    fire.database().ref("questions").child("Wahabi").once("value").then(function (snapshot) {
      if (snapshot.exists()) {
        snapshot.forEach(function (childSnapshot) {
          items3.push({
            question: childSnapshot.val().question,
            answer: childSnapshot.val().answer
          })
        })
      }
    }).then(() => {
      UpdateWahabi(items3)
      setloading(false)
    })

    fire.database().ref("questions").child("AhlHadees").once("value").then(function (snapshot) {
      if (snapshot.exists()) {
        snapshot.forEach(function (childSnapshot) {
          items4.push({
            question: childSnapshot.val().question,
            answer: childSnapshot.val().answer
          })
        })
      }
    }).then(() => {
      UpdateAhlHadees(items4)
      setloading(false)
    })


    fire.database().ref("questions").child("Shia").once("value").then(function (snapshot) {
      if (snapshot.exists()) {
        snapshot.forEach(function (childSnapshot) {
          items5.push({
            question: childSnapshot.val().question,
            answer: childSnapshot.val().answer
          })
        })
      }
    }).then(() => {
      UpdateShia(items5)
      setloading(false)
    })

  }


  function GetMatchedData(val) {
    var items = []
    var items2 = []
    var items3 = []
    var items4 = []
    var items5 = []

    SetSearchItem(val)

    // SearchItem.toLowerCase();
    if (Sunni.indexOf(SearchItem) > -1) {
      items.push(Sunni)
      UpdateFilterResult_Sunni(items)
      console.log(FilterResult_Sunni)
    }


    // fire.database().ref("questions").once("value").then(function (snapshot) {
    //   var tempArr = [];
    //   snapshot.forEach(function (childSnapshot) {
    //     childSnapshot.forEach(function (anotherSnapshot) {
    //       // console.log("*****************&&", childSnapshot.val())
    //       // var data = `${anotherSnapshot.val().question}`

    //       // SearchItem.toLowerCase()
    //       // // var result = data.toLowerCase().indexOf(SearchItem) > -1
    // // if (data.toLowerCase().indexOf(SearchItem) > -1) {
    // tempArr.push(anotherSnapshot.val())
    // // }
    //     })
    //     UpdateFinalMatchedArr(tempArr)
    //     console.log("+++++tempArr++++++", tempArr)
    //     // UpdateFinalMatchedArr(tempArr)
    //     // SetLoading(false)
    //     // console.log("+++++MatchedData++++++", MatchedData)

    //   })
    // })
  }

  return (
    <View style={{ marginTop: 30, flex: 1 }}>

      <Button rounded onPress={() => navigation.navigate("AllMolana")} style={{ padding: 10, backgroundColor: "green", marginTop: 40 }}>
        <Text style={{ color: "white" }}>Search Molana & Ask question</Text>
      </Button>
      <Item rounded style={{ marginTop: 10, marginBottom: 20, elevation: 2, width: "90%" }}>
        <Input placeholder='Search question' style={{ paddingLeft: 20 }} onChangeText={val => GetMatchedData(val)} value={SearchItem} />
      </Item>
      <Tabs style={{ backgroundColor: "white" }} renderTabBar={() => <ScrollableTab />}>
        <Tab heading="Sunni" activeTextStyle={{ color: '#fff', fontWeight: 'normal' }}>
          {/* <Text>Sunni Questions</Text> */}
          {FilterResult_Sunni.length > 1 ? <FlatList
            data={FilterResult_Sunni}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item }) => {
              console.log("FLAAAAAAAAAATIST ==>", item)
              return (
                <View style={{ padding: 10, width: Dimensions.get("window").width - 50, minHeight: 100, marginBottom: 20, padding: 10, flexDirection: "column", backgroundColor: "#f0f2f5", marginTop: 20, justifyContent: "space-around", elevation: 3, borderRadius: 10, alignSelf: "center" }}>

                  <View style={{ width: "100%", minHeight: 40 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}> Question : {item.question}</Text>
                  </View>

                  <View style={{
                    width: "100%",
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                  }}></View>

                  <View style={{ width: "100%", minHeight: 35 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Answer :  {item.answer}</Text>
                  </View>
                </View>

              );
            }}
          ></FlatList> : <FlatList
            data={Sunni}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item }) => {
              console.log("FLAAAAAAAAAATIST ==>", item)
              return (
                <View style={{ padding: 10, width: Dimensions.get("window").width - 50, minHeight: 100, marginBottom: 20, padding: 10, flexDirection: "column", backgroundColor: "#f0f2f5", marginTop: 20, justifyContent: "space-around", elevation: 3, borderRadius: 10, alignSelf: "center" }}>

                  <View style={{ width: "100%", minHeight: 40 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}> Question : {item.question}</Text>
                  </View>

                  <View style={{
                    width: "100%",
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                  }}></View>

                  <View style={{ width: "100%", minHeight: 35 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Answer :  {item.answer}</Text>
                  </View>
                </View>

              );
            }}
          ></FlatList>}
        </Tab>
        <Tab heading="Deobandi" activeTextStyle={{ color: '#fff', fontWeight: 'normal', borderBottomWidth: 1 }}>
          <FlatList
            data={Deobandi}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item }) => {
              console.log("FLAAAAAAAAAATIST ==>", item)
              return (
                <View style={{ padding: 10, width: Dimensions.get("window").width - 50, minHeight: 100, marginBottom: 20, padding: 10, flexDirection: "column", backgroundColor: "#f0f2f5", marginTop: 20, justifyContent: "space-around", elevation: 3, borderRadius: 10, alignSelf: "center" }}>

                  <View style={{ width: "100%", minHeight: 40 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}> Question : {item.question}</Text>
                  </View>

                  <View style={{
                    width: "100%",
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                  }}></View>

                  <View style={{ width: "100%", minHeight: 35 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Answer :  {item.answer}</Text>
                  </View>
                </View>

              );
            }}
          ></FlatList>
        </Tab>
        <Tab heading="Ahal-Hadees" activeTextStyle={{ color: '#fff', fontWeight: 'normal', borderBottomWidth: 1 }}>
          <FlatList
            data={AhlHadees}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item }) => {
              console.log("FLAAAAAAAAAATIST ==>", item)
              return (
                <View style={{ padding: 10, width: Dimensions.get("window").width - 50, minHeight: 100, marginBottom: 20, padding: 10, flexDirection: "column", backgroundColor: "#f0f2f5", marginTop: 20, justifyContent: "space-around", elevation: 3, borderRadius: 10, alignSelf: "center" }}>

                  <View style={{ width: "100%", minHeight: 40 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}> Question : {item.question}</Text>
                  </View>

                  <View style={{
                    width: "100%",
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                  }}></View>

                  <View style={{ width: "100%", minHeight: 35 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Answer :  {item.answer}</Text>
                  </View>
                </View>

              );
            }}
          ></FlatList>
        </Tab>
        <Tab heading="Wahabi" activeTextStyle={{ color: '#fff', fontWeight: 'normal', borderBottomWidth: 1 }}>
          <FlatList
            data={Wahabi}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item }) => {
              console.log("FLAAAAAAAAAATIST ==>", item)
              return (
                <View style={{ padding: 10, width: Dimensions.get("window").width - 50, minHeight: 100, marginBottom: 20, padding: 10, flexDirection: "column", backgroundColor: "#f0f2f5", marginTop: 20, justifyContent: "space-around", elevation: 3, borderRadius: 10, alignSelf: "center" }}>

                  <View style={{ width: "100%", minHeight: 40 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}> Question : {item.question}</Text>
                  </View>

                  <View style={{
                    width: "100%",
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                  }}></View>

                  <View style={{ width: "100%", minHeight: 35 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Answer :  {item.answer}</Text>
                  </View>
                </View>

              );
            }}
          ></FlatList>
        </Tab>
        <Tab heading="Shia" activeTextStyle={{ color: '#fff', fontWeight: 'normal', borderBottomWidth: 1 }}>
          <FlatList
            data={Shia}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item }) => {
              console.log("FLAAAAAAAAAATIST ==>", item)
              return (
                <View style={{ padding: 10, width: Dimensions.get("window").width - 50, minHeight: 100, marginBottom: 20, padding: 10, flexDirection: "column", backgroundColor: "#f0f2f5", marginTop: 20, justifyContent: "space-around", elevation: 3, borderRadius: 10, alignSelf: "center" }}>

                  <View style={{ width: "100%", minHeight: 40 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}> Question : {item.question}</Text>
                  </View>

                  <View style={{
                    width: "100%",
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                  }}></View>

                  <View style={{ width: "100%", minHeight: 35 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Answer :  {item.answer}</Text>
                  </View>
                </View>

              );
            }}
          ></FlatList>
        </Tab>
      </Tabs>


    </View >
  );
}