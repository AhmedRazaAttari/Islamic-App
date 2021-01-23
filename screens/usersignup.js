import React, { Component } from 'react';
import {
  Text,
  View, KeyboardAvoidingView, TouchableOpacity, StyleSheet, ScrollView
} from 'react-native';
import { Item, Input, Label, Button } from 'native-base';
import fire from '../config';

export default class Signup extends Component {

  constructor() {
    super();

    this.state = {
      email: "",
      name: "",
      phoneNo: "",
      pass: "",
      repass: "",
    }
  }


  RegisterUser() {

    const { name, email, phoneNo, pass, repass } = this.state;
    if (email !== "" && email !== undefined && name !== "" && name !== undefined && phoneNo !== "" && phoneNo !== undefined && pass !== "" && pass !== undefined &&
      repass !== "" && repass !== undefined) {
      if (pass === repass) {
        fire.auth().createUserWithEmailAndPassword(email, pass)
          .then(res => {
            fire.database().ref("users").child(res.user.uid).set({
              id: res.user.uid,
              name: name,
              email: email,
              phoneNo: phoneNo,
              time: Date.now()
            })
            res.user.updateProfile({
              displayName : name,
            })
            this.props.navigation.push("ForumHome")
          })
      }
      else {
        alert("Password and repassword should match")
      }
    }
    else {
      alert("Please Fill All fields First")
    }
  }



  render() {

    return (
      <ScrollView>
        <KeyboardAvoidingView
          style={styles.Container}
        >
          <Item floatingLabel>
            <Label>User Name</Label>
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
          <Item floatingLabel>
            <Label>Phone Number</Label>
            <Input
              placeholder='03XX-XXXXXXX'
              keyboardType='numeric'
              value={this.state.num}
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
          <View>
            <Button rounded
              style={{ margin: 50, width: 220, justifyContent: 'center' }}
              onPress={() =>
                this.RegisterUser()
              }
            >
              <Text style={{ fontSize: 22, color: "white" }}>Signup Request</Text>
            </Button>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('UserLogin')}
            >
              <Text style={{ textAlign: 'center', color: 'green' }}>already have an account ?</Text>
            </TouchableOpacity>
          </View>

        </KeyboardAvoidingView>
      </ScrollView >
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20

  }
})




