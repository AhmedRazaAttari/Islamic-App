import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
export default class Forum extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent:'space-evenly',
          alignItems: 'center',
        }}>

        <Button rounded
              style={{ width:220, alignSelf:'center'}}
              onPress={() => this.props.navigation.navigate('UserLogin')}
              >
            <Text style={{fontSize:22, color:"white", marginLeft:60}}>User Login</Text>
          </Button>
          <Button rounded
              style={{ width:220, alignSelf:'center'}}
              onPress={() => this.props.navigation.navigate('MolanaLogin')}
              >
            <Text style={{fontSize:22, color:"white", marginLeft:50}}>Molana Login</Text>
          </Button>
      </View>
    );
  }
}