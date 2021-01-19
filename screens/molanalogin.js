import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
import fire from '../config';


export default class Molanalogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: "",
      pass: "",
      mylist: []
    }
  }


  molanalogin() {
    const { email, pass } = this.state;

    if (email !== "" && email !== undefined && pass !== "" && pass !== undefined) {
      fire
        .auth()
        .signInWithEmailAndPassword(email, pass)
        .then(res => {
          console.log(res);
          alert("User logged-in successfully!");
          this.props.navigation.navigate("MolanaHome");
        })
        .catch(error => Alert.alert(error.message));
    }
    else {
      alert("Please enter email and password")
    }

  }

  
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.Container}
      >
        <Item floatingLabel>
          <Label>Email</Label>
          <Input
            placeholder='03XX-XXXXXXX'
            keyboardType="email-address"
            value={this.state.num}
            onChangeText={(num) => this.setState({ num: num })}
          />

        </Item>
        <Item floatingLabel style={{ marginTop: 10 }}>
          <Label>Password</Label>
          <Input
            secureTextEntry={true}
            value={this.state.pass}
            onChangeText={(pass) => this.setState({ pass: pass })}
          />
        </Item>

        <View>
          <Button rounded
            style={{ margin: 50, width: 220, justifyContent: 'center' }}
            onPress={() => this.molanalogin()}
          >
            <Text style={{ fontSize: 22, color: "white" }}>Login</Text>
          </Button>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('MolanaSignup')}
          >
            <Text style={{ textAlign: 'center', color: 'green' }}>don't have an account ?</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
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