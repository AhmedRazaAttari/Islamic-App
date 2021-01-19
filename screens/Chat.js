import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput, KeyboardAvoidingView, Keyboard, Button, ScrollView, Modal, TouchableHighlight, Alert } from 'react-native';
import { Ionicons, Entypo, EvilIcons, FontAwesome, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
// import { Camera } from 'expo-camera';
import { GiftedChat } from 'react-native-gifted-chat';
import { Audio } from 'expo-av';
const screen = Dimensions.get('window');
import fire from '../config';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { Keyboard } from "react-native";
import { TextInputComponent } from "react-native";
var itm = [];
// import SoundRecorder from 'react-native-sound-recorder';
export default function ChatRoom({ route, navigation }) {

    const [messages, setMessages] = useState([])
    const [isloading, setLoading] = useState(true)
    const [recording, setRecording] = React.useState();
    const [MessageId, setMessageID] = useState()
    const { name, uid } = route.params;
    const inputRef = React.createRef();
    const audioRecorderPlayer = new AudioRecorderPlayer();


    async function StartRecording() {
        let device = navigator.mediaDevices.getUserMedia({ audio: true })
        let chunks = [];
        let recorder;
        // device.then(stream => {
        //     recorder = new MediaRecorder(stream);

        //     recorder
        // })
    }

    function _keyboardDidShow() {
        console.log("Keyboard Shown")
    }

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        var UserId = fire.auth().currentUser.uid;

        var tempArr = [];
        fire.database().ref("users/" + UserId).child("ChatHeads" + "/" + uid + "/" + "ChatMsgs").once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                tempArr.push(childSnapshot.val())
            })
        }).then(() => {
            console.log("tempArr", tempArr)
            tempArr.reverse();
            setMessages(tempArr)
        })

    }, [])


    function onSend(newMessage = []) {

        var UserId = fire.auth().currentUser.uid;

        fire.database().ref("users/" + UserId).child("ChatHeads" + "/" + uid).update({
            name: name,
            uid: uid,
        })

        fire.database().ref("Molana/" + uid).child("ChatHeads" + "/" + UserId).update({
            name: name,
            uid: UserId,
        })

        var newPostKey = fire.database().ref().child('posts').push().key;
        for (var i = 0; i < newMessage.length; i++) {
            fire.database().ref("users/" + UserId).once("value").then(function (snapshot) {
                if (snapshot.exists()) {
                    fire.database().ref("users/" + UserId).child("ChatHeads" + "/" + uid + "/" + "ChatMsgs" + "/" + newPostKey).set({
                        _id: newMessage[i]._id,
                        createdAt: newMessage[i].createdAt.toUTCString(),
                        text: newMessage[i].text,
                        user: {
                            _id: 1,
                        }
                    })

                    fire.database().ref("Molana/" + uid).child("ChatHeads" + "/" + UserId + "/" + "ChatMsgs" + "/" + newPostKey).set({
                        _id: newMessage[i]._id,
                        createdAt: newMessage[i].createdAt.toUTCString(),
                        text: newMessage[i].text,
                        user: {
                            _id: 2,
                            avatar: fire.auth().currentUser.photoURL,
                        }
                    })
                }
                else {
                    fire.database().ref("Molana/" + UserId).child("ChatHeads" + "/" + uid + "/" + "ChatMsgs" + "/" + newPostKey).set({
                        _id: newMessage[i]._id,
                        createdAt: newMessage[i].createdAt.toUTCString(),
                        text: newMessage[i].text,
                        user: {
                            _id: 1,
                        }
                    })

                    fire.database().ref("users/" + uid).child("ChatHeads" + "/" + UserId + "/" + "ChatMsgs" + "/" + newPostKey).set({
                        _id: newMessage[i]._id,
                        createdAt: newMessage[i].createdAt.toUTCString(),
                        text: newMessage[i].text,
                        user: {
                            _id: 2,
                            avatar: fire.auth().currentUser.photoURL,
                        }
                    })
                }
            })

            if (MessageId !== undefined && MessageId !== "" && MessageId !== null) {
                fire.database().ref("questions").child(newMessage[i]._id + "/" + "answer").set({
                    answer: newMessage[i].text,
                })
            }
            // fire.database().ref("questions").child(newMessage[i]._id)
            fire.database().ref("questions").child(newMessage[i]._id).set({
                question: newMessage[i].text,
            })
        }
        setMessages(GiftedChat.append(messages, newMessage))

    }

    function onLongPress(context, message) {
        console.log(context, message);
        const options = ['Reply', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        context.actionSheet().showActionSheetWithOptions({
            options,
            cancelButtonIndex
        }, (buttonIndex) => {
            switch (buttonIndex) {
                case 0:
                    Clipboard.setString(message._id);
                    setMessageID(message._id)
                    _keyboardDidShow()
                    break;
            }
        });
    }


    function CustomView() {
        return <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
            <TouchableOpacity>
                <Ionicons name="ios-camera" size={30} color="#3e7af0" />
            </TouchableOpacity>
            <TouchableOpacity >
                <Ionicons name="md-images" size={29} color="#3e7af0" />
            </TouchableOpacity>
            <TouchableOpacity>
                <EvilIcons name="location" size={29} color="#3e7af0" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => startRecording()}>
                <FontAwesome name="microphone" size={24} color="#3e7af0" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => stopRecording()}>
                <Entypo name="emoji-happy" size={22} color="#3e7af0" />
            </TouchableOpacity>
            <TouchableOpacity>
                <AntDesign name="like1" size={26} color="#3e7af0" />
            </TouchableOpacity>
        </View>
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", height: 80, width: "100%", backgroundColor: "white", alignItems: "center" }}>
                <TouchableOpacity
                    // style={{ position: "absolute", top: 50, left: 20 }}
                    onPress={() => navigation.navigate("Chat")}
                >
                    <AntDesign name="left" size={30} color="black" style={{ marginTop: 20, marginLeft: 20 }} />
                </TouchableOpacity>
                <Text style={{ marginLeft: 20, fontSize: 20, marginTop: 20, fontWeight: "bold" }}>{name}</Text>
            </View>

            <KeyboardAvoidingView style={styles.container} >
                <GiftedChat
                    isAnimated={true}
                    onLongPress={() => onLongPress()}
                    // renderAccessory={CustomView}
                    // renderSend={this.SendBtn}
                    messages={messages}
                    onSend={newMessages => onSend(newMessages)}
                    user={{
                        _id: 1,
                    }}
                />
            </KeyboardAvoidingView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        width: 80,
    },
    ImageStyle: {
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
    }
});