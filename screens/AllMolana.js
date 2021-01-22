import React, { useState, useEffect, useRef } from "react";

import { Text, StyleSheet, View, Image, TouchableOpacity, ScrollView, Alert, Button, FlatList } from 'react-native';
import { Ionicons, Entypo, EvilIcons, FontAwesome, AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import fire from "../config";
import { Content, Tab, Tabs, ScrollableTab } from 'native-base';
import { Dimensions } from "react-native";

var itm = [];

export default function AllMolana({ navigation }) {

    const [isloading, setloading] = useState(true);
    const [AllMolana, SetMolanas] = useState([])
    const [Sunni, UpdateSunni] = useState([])
    const [Deobandi, UpdateDeobandi] = useState([])
    const [Wahabi, UpdateWahabi] = useState([])
    const [AhlHadees, UpdateAhlHadees] = useState([])
    const [Shia, UpdateShia] = useState([])

    // Sunni
    // Deobandi
    // Wahabi
    // AhlHadees
    // Shia

    useEffect(() => {
        isloading && fetchedUsers()
    })

    function fetchedUsers() {

        var items = []
        var items2 = []
        var items3 = []
        var items4 = []
        var items5 = []


        fire.database().ref("Molana").child("Sunni").once("value").then(function (snapshot) {
            if (snapshot.exists()) {
                snapshot.forEach((anotherSnapshot) => {
                    items.push({
                        id: anotherSnapshot.val().id,
                        Name: anotherSnapshot.val().name,
                        email: anotherSnapshot.val().email,
                        fiqah: anotherSnapshot.val().fiqah,
                        phoneNo: anotherSnapshot.val().phoneNo,
                        city: anotherSnapshot.val().city,
                        profilePic: anotherSnapshot.val().profilePic
                    })
                })
            }
        }).then(() => {
            UpdateSunni(items)
            setloading(false)
        })

        fire.database().ref("Molana").child("Deobandi").once("value").then(function (snapshot) {
            if (snapshot.exists()) {
                snapshot.forEach((anotherSnapshot) => {
                    items2.push({
                        id: anotherSnapshot.val().id,
                        Name: anotherSnapshot.val().name,
                        email: anotherSnapshot.val().email,
                        fiqah: anotherSnapshot.val().fiqah,
                        phoneNo: anotherSnapshot.val().phoneNo,
                        city: anotherSnapshot.val().city,
                        profilePic: anotherSnapshot.val().profilePic
                    })
                })
            }
        }).then(() => {
            UpdateDeobandi(items2)
            setloading(false)

        })


        fire.database().ref("Molana").child("Wahabi").once("value").then(function (snapshot) {
            if (snapshot.exists()) {
                snapshot.forEach((anotherSnapshot) => {
                    items3.push({
                        id: anotherSnapshot.val().id,
                        Name: anotherSnapshot.val().name,
                        email: anotherSnapshot.val().email,
                        fiqah: anotherSnapshot.val().fiqah,
                        phoneNo: anotherSnapshot.val().phoneNo,
                        city: anotherSnapshot.val().city,
                        profilePic: anotherSnapshot.val().profilePic
                    })
                })
            }
        }).then(() => {
            UpdateWahabi(items3)
            setloading(false)

        })


        fire.database().ref("Molana").child("AhlHadees").once("value").then(function (snapshot) {
            if (snapshot.exists()) {
                snapshot.forEach((anotherSnapshot) => {
                    items4.push({
                        id: anotherSnapshot.val().id,
                        Name: anotherSnapshot.val().name,
                        email: anotherSnapshot.val().email,
                        fiqah: anotherSnapshot.val().fiqah,
                        phoneNo: anotherSnapshot.val().phoneNo,
                        city: anotherSnapshot.val().city,
                        profilePic: anotherSnapshot.val().profilePic
                    })
                })
            }
        }).then(() => {
            UpdateAhlHadees(items4)
            setloading(false)

        })

        fire.database().ref("Molana").child("Shia").once("value").then(function (snapshot) {
            if (snapshot.exists()) {
                snapshot.forEach((anotherSnapshot) => {
                    items5.push({
                        id: anotherSnapshot.val().id,
                        Name: anotherSnapshot.val().name,
                        email: anotherSnapshot.val().email,
                        fiqah: anotherSnapshot.val().fiqah,
                        phoneNo: anotherSnapshot.val().phoneNo,
                        city: anotherSnapshot.val().city,
                        profilePic: anotherSnapshot.val().profilePic
                    })
                })
            }
        }).then(() => {
            UpdateShia(items5)
            setloading(false)
        })
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1, width: '100%', height: Dimensions.get("window").height }}>
                {/* <Text>{"\n"}</Text> */}
                <View style={{ flexDirection: "row", padding: 18 }}>
                    <Text style={{ fontSize: 22, marginBottom: 15, fontWeight: "bold" }}>Select Molana by Fiqah</Text>
                    {/* <TouchableOpacity>
                        <Feather name="search" size={30} color="black" />
                    </TouchableOpacity> */}
                </View>
                <Tabs style={{ backgroundColor: "white" }} renderTabBar={() => <ScrollableTab />}>
                    <Tab heading="Sunni" activeTextStyle={{ color: '#fff', fontWeight: 'normal', borderBottomWidth: 1 }}>
                        <FlatList
                            data={Sunni}
                            keyExtractor={(item, index) => "key" + index}
                            renderItem={({ item }) => {
                                console.log("FLAAAAAAAAAATIST ==>", item)
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate("Chat", {
                                                name: item.Name,
                                                uid: item.id,
                                                fiqah: item.fiqah,
                                                title: item.Name
                                            })
                                        }}
                                    >
                                        <View style={{ flexDirection: "column" }} >
                                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", height: 80, marginBottom: 10, padding: 10 }}>
                                                <Image style={{ borderRadius: 100, backgroundColor: 'black', width: 50, height: 50, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "white" }} />
                                                <Text>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                                                <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.Name}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                        ></FlatList>
                    </Tab>
                    <Tab heading="Deo bandi" activeTextStyle={{ color: '#fff', fontWeight: 'normal', borderBottomWidth: 1 }}>
                        <FlatList
                            data={Deobandi}
                            keyExtractor={(item, index) => "key" + index}
                            renderItem={({ item }) => {
                                console.log("FLAAAAAAAAAATIST ==>", item)
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate("Chat", {
                                                name: item.Name,
                                                uid: item.id,
                                                fiqah: item.fiqah,
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
                    </Tab>
                    <Tab heading="Ahal-Hadees" activeTextStyle={{ color: '#fff', fontWeight: 'normal', borderBottomWidth: 1 }}>
                        <FlatList
                            data={AhlHadees}
                            keyExtractor={(item, index) => "key" + index}
                            renderItem={({ item }) => {
                                console.log("FLAAAAAAAAAATIST ==>", item)
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate("Chat", {
                                                name: item.Name,
                                                uid: item.id,
                                                fiqah: item.fiqah,
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
                    </Tab>
                    <Tab heading="Wahabi" activeTextStyle={{ color: '#fff', fontWeight: 'normal', borderBottomWidth: 1 }}>
                        <FlatList
                            data={Wahabi}
                            keyExtractor={(item, index) => "key" + index}
                            renderItem={({ item }) => {
                                console.log("FLAAAAAAAAAATIST ==>", item)
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate("Chat", {
                                                name: item.Name,
                                                uid: item.id,
                                                fiqah: item.fiqah,
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
                    </Tab>
                    <Tab heading="Shia" activeTextStyle={{ color: '#fff', fontWeight: 'normal', borderBottomWidth: 1 }}>
                        <FlatList
                            data={Shia}
                            keyExtractor={(item, index) => "key" + index}
                            renderItem={({ item }) => {
                                console.log("FLAAAAAAAAAATIST ==>", item)
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate("Chat", {
                                                name: item.Name,
                                                uid: item.id,
                                                fiqah: item.fiqah,
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
                    </Tab>
                </Tabs>

            </View>
        </ScrollView>
    )
}

