import React, { useState, useEffect, useRef } from "react";

import { Text, StyleSheet, View, Image, TouchableOpacity, ScrollView, Alert, Button, FlatList } from 'react-native';
import { Ionicons, Entypo, EvilIcons, FontAwesome, AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import fire from "../config";

var itm = [];

export default function AllMolana({ navigation }) {

    const [isloading, setloading] = useState(true);
    const [AllMolana, SetMolanas] = useState([])

    useEffect(() => {
        isloading && fetchedUsers()
    })

    function fetchedUsers() {

        var items = []

        fire.database().ref("Molana").once("value").then((snapshot) => {
            snapshot.forEach((anotherSnapshot) => {
                items.push({
                    id: anotherSnapshot.val().id,
                    Name: anotherSnapshot.val().name,
                    email: anotherSnapshot.val().email,
                    fiqah: anotherSnapshot.val().fiqah,
                    phoneNo: anotherSnapshot.val().phoneNo,
                    city: anotherSnapshot.val().city
                })
            })
        }).then(() => {
            SetMolanas(items)
            setloading(false)
        })
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1, width: '100%', padding: 18 }}>
                {/* <Text>{"\n"}</Text> */}
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 22, marginBottom: 15, fontWeight: "bold" }}>Select Receipent</Text>
                    <TouchableOpacity>
                        <Feather name="search" size={30} color="black" />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={AllMolana}
                    keyExtractor={(item, index) => "key" + index}
                    renderItem={({ item }) => {
                        console.log("FLAAAAAAAAAATIST ==>", item)
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Chat", {
                                        name: item.Name,
                                        uid: item.id,
                                        title: item.Name
                                    })
                                }}
                            >
                                <View style={{ flexDirection: "column" }} >
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", height: 60, marginBottom: 10 }}>
                                        <Image style={{ borderRadius: 100, backgroundColor: 'black', width: 50, height: 50, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "white" }} />
                                        <Text>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.Name}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                ></FlatList>
            </View>
        </ScrollView>
    )
}

