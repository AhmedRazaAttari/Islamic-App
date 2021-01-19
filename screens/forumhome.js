import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Container, Header, Content, Item, Input, Button, Accordion } from 'native-base';
import fire from '../config';

export default function Forumhome({ navigation }) {

  const [SearchItem, SetSearchItem] = React.useState("")
  const [MatchedData, UpdateMatchData] = React.useState([])

  React.useEffect(() => {
    fire.database().ref("questions").once("value").then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        childSnapshot.forEach(function (anotherSnapshot) {

          var data = `${anotherSnapshot.val().question}`

          SearchItem.toLowerCase()
          if (data.toLowerCase().indexOf(SearchItem) > -1) {
            UpdateMatchData(anotherSnapshot.val())
          }
        })

      })
    })
  })

  return (
    <View style={{ marginTop: 40, padding: 10 }}>
      <Item rounded >
        <Input placeholder='Search question' style={{ paddingLeft: 20 }} onChangeText={val => SetSearchItem(val)} value={SearchItem} />
      </Item>
      <View style={{ padding: 10, width: Dimensions.get("window").width }}>

      </View>
      <Button rounded onPress={() => navigation.navigate("AllMolana")} style={{ padding: 10, backgroundColor: "green", marginTop: 40 }}>
        <Text style={{ color: "white" }}>Search Molana & Ask question</Text>
      </Button>
    </View>
  );
}

