import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

//screens
import Home from '../screens/home'
import Forum from '../screens/forum';
import Forumhome from '../screens/forumhome';

import Aboutus from '../mainmenu/aboutus'
import Feedback from '../mainmenu/feedback'
import Settings from '../mainmenu/settings'
import Share from '../mainmenu/share'

// User - Screens
import Userlogin from '../screens/userlogin';
import Signup from '../screens/usersignup';
import AllMolana from '../screens/AllMolana';
import Chat from '../screens/Chat';

//Molana Screens
import Molanalogin from '../screens/molanalogin';
import Molanasignup from '../screens/molanasignup';
import Molanahome from '../screens/molanahome';


const Tab = createMaterialBottomTabNavigator();

function HomeScreen() {
  return (
    <Tab.Navigator initialRouteName="Home">


      <Tab.Screen name="Home" component={TabHome}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" color={color} size={20} />
          ),
        }}
      />

      <Tab.Screen name="Forum" component={TabForum}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="forum" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

// Tab naviation Screens


// Home Screen
function TabHome() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />

    </Stack.Navigator>
  );
}
// Forum Screen
function TabForum() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Forum" component={Forum} />
      <Stack.Screen name="UserLogin" component={Userlogin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForumHome" component={Forumhome} options={{headerShown : false}}/>
      <Stack.Screen name="MolanaLogin" component={Molanalogin} />
      <Stack.Screen name="MolanaSignup" component={Molanasignup} />
      <Stack.Screen name="MolanaHome" component={Molanahome} />

      <Stack.Screen name="AllMolana" component={AllMolana} />
      <Stack.Screen name="Chat" component={Chat} options={{headerShown : false}}/>
    </Stack.Navigator>
  );
}

// Drawer navigation screens
// Aboutus Screen
function TabAboutus() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Aboutus" component={Aboutus} />
    </Stack.Navigator>
  );
}
// Feedback Screen
function TabFeedback() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feedback" component={Feedback} />
    </Stack.Navigator>
  );
}
// Share Screen
function TabShare() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Share" component={Share} />
    </Stack.Navigator>
  );
}
// Setting Screen
function TabSettings() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();
export default function Appnavigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Aboutus" component={TabAboutus} />
        <Drawer.Screen name="Feedback" component={TabFeedback} />
        <Drawer.Screen name="Share" component={TabShare} />
        <Drawer.Screen name="Settings" component={TabSettings} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}