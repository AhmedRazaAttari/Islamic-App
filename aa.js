import React from 'react';
import {StyleSheet, View, Text,Button, Modal, TextInput, ScrollView} from 'react-native';


class App extends React.Component{
    constructor(){
        super();
        this.state={
        show:false
        
        }
        this.state={
            show2:false
            
            }
    }
    show1=() =>
    {
        alert('Your Account Created Succesfully.');
    }
    show3=() =>
    {
        alert('You are logged.');
    }
    render(){
        return(
            <View style={{flex:1,margin:100, alignItems:'center'}}>
                <Text style={{fontSize:30}}>Welcome</Text>
                <View style={{marginTop:100}}>
                <Button title='sign up' onPress={()=>(this.setState({show:true}))}
                />
                <Text>Password field member carefully!</Text>
                <Button title='Login' onPress={()=>(this.setState({show2:true}))}/>
                </View>
                <ScrollView>
                <Modal
                 transparent={true} 
                 visible={this.state.show}
                
                >
                    <View style={{flex:1,backgroundColor:'#000000aa' }}>
                        <View style={{margin:50,padding:20, backgroundColor:'#fff', flex:1}}>
                           <Text style={{fontSize:20, paddingLeft:50 }}> sign up info</Text>
                           <Text>Enter Name</Text>
                           <TextInput
                           style={styles.input}
                           placeholder=' e.g, ali'
                           />
                           <Text>Enter Email</Text>
                           <TextInput
                           style={styles.input}
                           placeholder=' e.g, @gmail.com'
                           />
                           <Text>Enter Password</Text>
                           <TextInput
                           style={styles.input}
                           secureTextEntry={true}
                           />
                           <Text>Re-Enter Password</Text>
                           <TextInput
                           style={styles.input}
                           secureTextEntry={true}
                           />
                           <Button title='sign up' onPress={this.show1} />
                           <Text onPress={()=>(this.setState({show:false}))} style={{color:'blue',marginTop:30, }}> Go Home and Login</Text>
                        </View>
                    </View>
                </Modal>
                </ScrollView>
                <ScrollView>
                <Modal
                 transparent={true} 
                 visible={this.state.show2}
                
                >
                    <View style={{flex:1,backgroundColor:'#000000aa' }}>
                        <View style={{margin:50,padding:10, backgroundColor:'#fff', flex:1}}>
                           <Text style={{fontSize:20 ,paddingLeft:80 }}> Login </Text>
                           
                           
                           <Text>Enter Email</Text>
                           <TextInput
                           style={styles.input}
                           placeholder=' e.g, @gmail.com'
                           />
                           <Text>Enter Password</Text>
                           <TextInput
                           style={styles.input}
                           secureTextEntry={true}
                           />
                           
                           <Button title='Login' onPress={this.show3} />
                           <Text onPress={()=>(this.setState({show2:false}))} style={{color:'blue',marginTop:30, marginLeft:15,}}> Go Back</Text>
                        </View>
                    </View>
                </Modal>
                </ScrollView>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    input:{
        borderWidth:1,
        borderColor:'#777',
        
        
    },
})
export default App;

/* import React from "react"
import { StyleSheet, Text, View, Image, Button } from "react-native"
import Expo from "expo"

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      name: "",
      photoUrl: ""
    }
  }
  signIn = async () => {
    try {
      const result = await Expo.Google.logInAsync({
       // androidClientId:
        //  "833456763323-ig9ndr0tbvb62jv4ddn6j8pos3a49m35.apps.googleusercontent.com",
        //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
       iosClientId: '1000985626457-tv3u2mro6bvgnrkftb5q9eedg2kmgs5q.apps.googleusercontent.com',
        scopes: ["profile", "email"]
      })

      if (result.type === "success") {
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl
        })
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.signedIn ? (
          <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} />
        ) : (
          <LoginPage signIn={this.signIn} />
        )}
      </View>
    )
  }
}

const LoginPage = props => {
  return (
    <View>
      <Text style={styles.header}>Sign In With Google</Text>
      <Button title="Sign in with Google" onPress={() => props.signIn()} />
    </View>
  )
}

const LoggedInPage = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome:{props.name}</Text>
      <Image style={styles.image} source={{ uri: props.photoUrl }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
}) */



/* import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import firebase from 'firebase';
class LoginScreen extends Component {
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  onSignIn = googleUser => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInAndRetrieveDataWithCredential(credential)
            .then(function(result) {
              console.log('user signed in ');
              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now()
                  })
                  .then(function(snapshot) {
                    // console.log('Snapshot', snapshot);
                  });
              } else {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .update({
                    last_logged_in: Date.now()
                  });
              }
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log('User already signed-in Firebase.');
        }
      }.bind(this)
    );
  };
  signInWithGoogleAsync = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        // androidClientId: YOUR_CLIENT_ID_HERE,
        behavior: 'web',
        iosClientId: '1000985626457-tv3u2mro6bvgnrkftb5q9eedg2kmgs5q.apps.googleusercontent.com', //enter ios client id
        scopes: ['profile', 'email']
      });

      if (result.type === 'success') {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Sign In With Google"
          onPress={() => this.signInWithGoogleAsync()}
        />
      </View>
    );
  }
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
}); */