import React from 'react';
import {StyleSheet, View, Image, ImageBackground, Text, TouchableOpacity, Button, Modal, TextInput, ScrollView} from 'react-native';


class Home extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }
  
    render(){
     return(
          <View style={styles.screen}>
          <Text>HomeScreen</Text>
        
        </View>
        )
    }
}
const styles=StyleSheet.create({
    screen:{
      flex:1,
        borderWidth:1,
        borderColor:'#777',
        
        
    }
})
export default Home;