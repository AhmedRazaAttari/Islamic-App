import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput, KeyboardAvoidingView, Keyboard, Button, ScrollView, Modal, TouchableHighlight, Alert } from 'react-native';
import { Ionicons, Entypo, EvilIcons, FontAwesome, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
// import Constants from 'expo-constants';
// import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { GiftedChat } from 'react-native-gifted-chat';
const screen = Dimensions.get('window');
import fire from '../config';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
// import { Keyboard } from "react-native";
import { TextInputComponent } from "react-native";
var itm = [];

export default function ChatRoom({ route, navigation }) {

    const [messages, setMessages] = useState([])
    const [isloading, setLoading] = useState(true)
    const [recording, setRecording] = React.useState();
    const [MessageId, setMessageID] = useState()
    const [IsMolana, setIsMolana] = useState()
    const { name, uid, fiqah } = route.params;
    // const { name, uid, fiqah, token } = route.params;

    const inputRef = React.createRef();
    // const [C_token, setToken] = useState("")
    const audioRecorderPlayer = new AudioRecorderPlayer();


    // async function StartRecording() {
    //     let device = navigator.mediaDevices.getUserMedia({ audio: true })
    //     let chunks = [];
    //     let recorder;
    //     // device.then(stream => {
    //     //     recorder = new MediaRecorder(stream);

    //     //     recorder
    //     // })
    // }

    // async function startRecording() {
    //     try {
    //         console.log('Requesting permissions..');
    //         await Audio.requestPermissionsAsync();
    //         await Audio.setAudioModeAsync({
    //             allowsRecordingIOS: true,
    //             playsInSilentModeIOS: true,
    //         });
    //         console.log('Starting recording..');
    //         const recording = new Audio.Recording();
    //         await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
    //         await recording.startAsync();
    //         setRecording(recording);
    //         console.log('Recording started');
    //     } catch (err) {
    //         console.error('Failed to start recording', err);
    //     }
    // }

    // async function stopRecording() {
    //     console.log('Stopping recording..');
    //     setRecording(undefined);
    //     const recording = new Audio.Recording();
    //     await recording.stopAndUnloadAsync();
    //     const uri = recording.getURI();
    //     console.log('Recording stopped and stored at', uri);
    // }

    function _keyboardDidShow() {
        console.log("Keyboard Shown")
    }

    useEffect(() => {
        // isRecording && startRecording();

        // setTimeout(function () {
        //     UpdateRecording(false)
        //     stopRecording()
        // }, 5000);

        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        var UserId = fire.auth().currentUser.uid;

        var tempArr = [];
        fire.database().ref("users/" + UserId).once("value").then(function (snapshot) {
            if (snapshot.exists()) {
                setIsMolana(false)
                // setToken(snapshot.val().token)
                fire.database().ref("users/" + UserId).child("ChatHeads" + "/" + uid + "/" + "ChatMsgs").once("value").then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        tempArr.push(childSnapshot.val())
                    })
                }).then(() => {
                    console.log("tempArr", tempArr)
                    tempArr.reverse();
                    setMessages(tempArr)
                })
            }
            else {
                // alert("MOLANA HAI")
                setIsMolana(true)
                fire.database().ref("Molana" + "/" + fiqah + "/" + UserId).child("ChatHeads" + "/" + uid + "/" + "ChatMsgs").once("value").then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        tempArr.push(childSnapshot.val())
                    })
                }).then(() => {
                    console.log("tempArr", tempArr)
                    tempArr.reverse();
                    setMessages(tempArr)
                })
            }
        })

    }, [])


    function onSend(newMessage = []) {

        var UserId = fire.auth().currentUser.uid;
        var displayName = fire.auth().currentUser.displayName;

        if (!IsMolana) {
            fire.database().ref("users/" + UserId).child("ChatHeads" + "/" + uid).update({
                name: name,
                uid: uid,
                fiqah: fiqah
            })

            fire.database().ref("Molana/" + fiqah + "/" + uid).child("ChatHeads" + "/" + UserId).update({
                name: displayName,
                uid: UserId,
                fiqah: fiqah
            })
        }
        else {

            fire.database().ref("Molana/" + fiqah + "/" + UserId).child("ChatHeads" + "/" + uid).update({
                name: name,
                uid: uid,
                fiqah: fiqah
            })

            fire.database().ref("users/" + uid).child("ChatHeads" + "/" + UserId).update({
                name: displayName,
                uid: UserId,
                fiqah: fiqah
            })
        }

        var newPostKey = fire.database().ref().child('posts').push().key;
        for (var i = 0; i < newMessage.length; i++) {
            console.log("newMessage*********", newMessage[i]._id)
            if (!IsMolana) {
                fire.database().ref("users/" + UserId).child("ChatHeads" + "/" + uid + "/" + "ChatMsgs" + "/" + newPostKey).set({
                    _id: newMessage[i]._id,
                    createdAt: newMessage[i].createdAt.toUTCString(),
                    text: newMessage[i].text,
                    user: {
                        _id: 1,
                    }
                })

                fire.database().ref("Molana/" + fiqah + "/" + uid).child("ChatHeads" + "/" + UserId + "/" + "ChatMsgs" + "/" + newPostKey).set({
                    _id: newMessage[i]._id,
                    createdAt: newMessage[i].createdAt.toUTCString(),
                    text: newMessage[i].text,
                    user: {
                        _id: 2,
                        avatar: fire.auth().currentUser.photoURL,
                    }
                })


                fire.database().ref("questions").child(UserId + "/" + newMessage[i]._id).set({
                    question: newMessage[i].text,
                })

                // fetch('https://exp.host/--/api/v2/push/send', {
                //     body: JSON.stringify({
                //         to: [token, C_token],
                //         title: "Message Received",
                //         body: "you Received Message from ",
                //         data: { message: `${"title"} - ${"Hello"}` },
                //     }),
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     method: 'POST',
                // });
            }
            else {
                fire.database().ref("Molana/" + fiqah).child(UserId + "/" + "ChatHeads" + "/" + uid + "/" + "ChatMsgs" + "/" + newPostKey).set({
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
                        // avatar: fire.auth().currentUser.photoURL,
                    }
                })

                // fire.database().ref("questions").child(uid).set({
                //     answer: newMessage[i].text,
                // })
                if (MessageId !== undefined && MessageId !== "" && MessageId !== null) {
                    fire.database().ref("questions").child(uid + "/" + MessageId).update({
                        answer: newMessage[i].text,
                    })
                }

            }

        }
        setMessages(GiftedChat.append(messages, newMessage))
        setMessageID(undefined)
    }

    function onLongPress(context, message) {
        console.log(context, message.user._id);
        const options = ['Reply', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        if (message.user._id === 2) {
            context.actionSheet().showActionSheetWithOptions({
                options,
                cancelButtonIndex
            }, (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        setMessageID(message._id)
                        _keyboardDidShow()
                        break;
                }
            });
        }
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
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="left" size={30} color="black" style={{ marginTop: 20, marginLeft: 20 }} />
                </TouchableOpacity>
                <Text style={{ marginLeft: 20, fontSize: 20, marginTop: 20, fontWeight: "bold" }}>{name}</Text>
            </View>

            <KeyboardAvoidingView style={styles.container} >
                <GiftedChat
                    isAnimated={true}
                    renderInputToolbar={IsMolana === true && MessageId === undefined ? () => null : undefined}
                    messages={messages}
                    textInputProps={{ autoFocus: IsMolana ? true : false }}
                    onSend={newMessages => onSend(newMessages)}
                    onLongPress={(context, msg) => IsMolana ? onLongPress(context, msg) : null}
                    user={{
                        _id: 1,
                    }}
                />
                {IsMolana && MessageId === undefined ? <View style={{ justifyContent: "center", alignItems: "center" }}><Text>Press and Hold on question to answer</Text></View> : null}
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