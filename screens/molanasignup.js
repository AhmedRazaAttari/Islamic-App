import React, { Component } from 'react';
import {
  ActivityIndicator,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  View, KeyboardAvoidingView, TouchableOpacity, ScrollView
} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Icon, Picker } from 'native-base';
// import Constants from 'expo';
import * as ImagePicker from 'expo-image-picker';
// import Constants from 'expo-constants';
// import Notifications from 'expo-notifications';

import Permissions from 'expo';
import fire from '../config';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

export default class Molanasignup extends Component {


  constructor() {

    super();

    this.state = {
      name: "",
      email: "",
      fiqah: "",
      city: "",
      phoneNo: "",
      pass: "",
      repass: "",
      image: "",
      token : "",
      uploading: false,
      profilePic: ""
    }
  }

  // async componentDidMount() {

  //   let token;
  //   if (Constants.isDevice) {
  //     const { status: existingStatus } = await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== 'granted') {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== 'granted') {
  //       alert('Failed to get push token for push notification!');
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log(token);
  //   } else {
  //     alert('Must use physical device for Push Notifications');
  //   }

  //   this.setState({
  //     token: token
  //   })
  //   return token
  // }

  async Registermolana() {
    const { name, profilePic, email, fiqah, city, phoneNo, pass, repass } = this.state;
    if (profilePic !== "" && profilePic !== undefined && fiqah !== "" && fiqah !== undefined && city !== "" && city !== undefined && email !== "" && email !== undefined && name !== "" && name !== undefined && phoneNo !== "" && phoneNo !== undefined && pass !== "" && pass !== undefined &&
      repass !== "" && repass !== undefined) {
      if (pass === repass) {
        const response = await fetch(this.state.profilePic);
        const blob = await response.blob();
        var ref = fire.storage().ref("images").child(new Date().toDateString());
        ref.put(blob)
          .then((result) => {
            result.ref.getDownloadURL()
              .then((url) => {
                console.log(url);
                // setUploadedUrl(url)
                this.setState({
                  UploadedImg: url
                })

                fire.auth().createUserWithEmailAndPassword(email, pass)
                  .then(res => {
                    fire.database().ref("Molana").child(fiqah + "/" + res.user.uid).set({
                      id: res.user.uid,
                      name: name,
                      email: email,
                      fiqah: fiqah,
                      city: city,
                      // token : this.state.token,
                      phoneNo: phoneNo,
                      profilePic: url,
                      time: Date.now()
                    })
                    res.user.updateProfile({
                      displayName: name,
                    })
                    this.props.navigation.push("MolanaHome", {
                      fiqah: fiqah
                    })
                  })

              })
          })

        // fire.auth().createUserWithEmailAndPassword(email, pass)
        //   .then(res => {
        //     fire.database().ref("Molana").child(fiqah + "/" + res.user.uid).set({
        //       id: res.user.uid,
        //       name: name,
        //       email: email,
        //       fiqah: fiqah,
        //       city: city,
        //       phoneNo: phoneNo,
        //       profilePic: this.state.profilePic,
        //       time: Date.now()
        //     })
        //     this.props.navigation.push("MolanaHome", {
        //       fiqah: fiqah
        //     })
        //   })
      }
      else {
        alert("Password and repassword should match")
      }
    }
    else {
      alert("Please Fill All fields First")
    }

  }


  onValueChange2 = (value) => {
    this.setState({
      fiqah: value
    });
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({
        profilePic: result.uri,
        AvailableImg: true
      })
      // setImageUrl(result.uri);
      // setAvailableImg(true)
    }
  };


  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!pickerResult.cancelled) {
      this.setState({
        profilePic: pickerResult.uri,
        AvailableImg: true
      })
    }
  };

  uploadImage = async () => {
    // var _ = this;
    const response = await fetch(this.state.profilePic);
    const blob = await response.blob();
    var ref = fire.storage().ref("images").child(new Date().toDateString());
    ref.put(blob)
      .then((result) => {
        result.ref.getDownloadURL()
          .then((url) => {
            console.log(url);
            // setUploadedUrl(url)
            this.setState({
              UploadedImg: url
            })
          })
      })
  }




  render() {
    let { image } = this.state;

    return (
      <ScrollView>
        <KeyboardAvoidingView
          style={styles.Container}
        >
          <Item floatingLabel>
            <Label>Molana Name</Label>
            <Input
              placeholder='e.g.,ali'
              value={this.state.name}
              onChangeText={(name) => this.setState({ name: name })}
            />
          </Item>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              textContentType="emailAddress"
              placeholder='e.g.,abc@gmail.com'
              keyboardType="email-address"
              value={this.state.email}
              onChangeText={(email) => this.setState({ email: email })}
            />
          </Item>
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined, marginTop: 10, paddingLeft: 0 }}
              placeholder="Select your Fiqah"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.fiqah}
              onValueChange={(value) => this.onValueChange2(value)}
            >
              <Picker.Item label="Select Fiqah" value="" />
              <Picker.Item label="Sunni" value="Sunni" />
              <Picker.Item label="Deo-bandi" value="Deobandi" />
              <Picker.Item label="Wahabi" value="Wahabi" />
              <Picker.Item label="Ahl-hadees" value="AhlHadees" />
              <Picker.Item label="Shia" value="Shia" />

            </Picker>
          </Item>
          <Item floatingLabel>
            <Label>City and Country</Label>
            <Input
              value={this.state.city}
              onChangeText={(city) => this.setState({ city: city })}
            />
          </Item>
          <Item floatingLabel>
            <Label>Phone Number</Label>
            <Input
              placeholder='03XX-XXXXXXX'
              keyboardType='numeric'
              value={this.state.phoneNo}
              onChangeText={(num) => this.setState({ phoneNo: num })}
            />
          </Item>
          <Item floatingLabel style={{ marginTop: 10 }}>
            <Label>Enter Password</Label>
            <Input
              secureTextEntry={true}
              value={this.state.pass}
              onChangeText={(pass) => this.setState({ pass: pass })}
            />
          </Item>
          <Item floatingLabel style={{ marginTop: 10 }}>
            <Label>Re-Enter Password</Label>
            <Input
              secureTextEntry={true}
              value={this.state.repass}
              onChangeText={(repass) => this.setState({ repass: repass })}
            />
          </Item>

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>

            <Button bordered light iconRight
              onPress={this.pickImage}
            >
              <Text>  Choose Image Certificate  </Text>
              <Icon name="attach" />
            </Button>
            <Button bordered light iconRight
              onPress={this._takePhoto}
            >
              <Text> Take a Photo  </Text>
              <Icon name="camera" />
            </Button>

            <StatusBar barStyle="default" />
          </View>
          {/* {this._maybeRenderImage()}
          {this._maybeRenderUploadingOverlay()} */}
          <View>
            <Button rounded
              style={{ margin: 50, width: 220, justifyContent: 'center' }}
              onPress={() => this.Registermolana()}
            >
              <Text style={{ fontSize: 22, color: "white" }}>Signup Request</Text>
            </Button>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('MolanaLogin')}
            >
              <Text style={{ textAlign: 'center', color: 'green' }}>already have an account ?</Text>
            </TouchableOpacity>
          </View>

        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

//   _maybeRenderUploadingOverlay = () => {
//     if (this.state.uploading) {
//       return (
//         <View
//           style={[
//             StyleSheet.absoluteFill,
//             {
//               backgroundColor: 'rgba(0,0,0,0.4)',
//               alignItems: 'center',
//               justifyContent: 'center',
//             },
//           ]}>
//           <ActivityIndicator color="#fff" animating size="large" />
//         </View>
//       );
//     }
//   };

//   _maybeRenderImage = () => {
//     let { image } = this.state;
//     if (!image) {
//       return;
//     }

//     return (
//       <View
//         style={{
//           marginTop: 30,
//           width: 250,
//           borderRadius: 3,
//           elevation: 2,
//         }}>
//         <View
//           style={{
//             borderTopRightRadius: 3,
//             borderTopLeftRadius: 3,
//             shadowColor: 'rgba(0,0,0,1)',
//             shadowOpacity: 0.2,
//             shadowOffset: { width: 4, height: 4 },
//             shadowRadius: 5,
//             overflow: 'hidden',
//           }}>
//           <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
//         </View>


//       </View>
//     );
//   };

//   _takePhoto = async () => {
//     let pickerResult = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//     });
//     this._handleImagePicked(pickerResult);
//   };

//   _pickImage = async () => {
//     let pickerResult = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//     });
//     this._handleImagePicked(pickerResult);
//   };

//   _handleImagePicked = async pickerResult => {
//     try {

//       this.setState({ uploading: true });

//       if (!pickerResult.cancelled) {
//         let uploadUrl = await uploadImageAsync(pickerResult.uri);
//         this.setState({ image: uploadUrl });
//       }
//     }
//     catch (e) {
//       console.log(e);
//       alert('Upload failed, sorry :(');

//     }
//     finally {
//       this.setState({ uploading: false });
//     }
//   };
// }
// async function uploadImageAsync(uri) {

//   const blob = await new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.onload = function () {
//       resolve(xhr.response);
//     };
//     xhr.onerror = function (e) {
//       console.log(e);
//       reject(new TypeError('Network request failed'));
//     };
//     xhr.responseType = 'blob';
//     xhr.open('GET', uri, true);
//     xhr.send(null);
//   });

//   const ref = firebase
//     .storage()
//     .ref("m-c-images")
//     .child(uuid.v4());
//   const snapshot = await ref.put(blob);

//   // We're done with the blob, close and release it
//   blob.close();

//   return await snapshot.ref.getDownloadURL();
// }
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20

  }
})




