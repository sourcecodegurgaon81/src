import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, Picker, SafeAreaView, ScrollView, Image, TextInput,TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import SearchItems from './SearchItems'
import DropDownPicker from 'react-native-dropdown-picker';
import { Tooltip, Input } from 'react-native-elements';
import * as font from 'expo-font';
import { FlatList } from 'react-native-gesture-handler';
import Http from '../../Api/Http'
import Favorate from './Favorate'
import SearchFields from './SearchFields'




//Search User Tab
function SearcUserTab(props) {
  return(
  
     <SearchFields  navigation={props.propName.prop}/>
 
  )

}








function SettingsScreen() {
  return (

    <Text>Hello</Text>

  );
}

function Favorates (props) {
  return (
    <Favorate navigation={props.propName.prop}/>
  )
}



const Tab = createBottomTabNavigator();

function MyTabs(props) {


  return (
    

    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Chat') {
          iconName = focused ? 'ios-chatbubbles' : 'ios-chatbubbles';
        } else if (route.name === 'Favorate') {
          iconName = focused ? 'ios-star' : 'ios-star';
        }
        else if (route.name === 'Search') {
          iconName = focused ? 'ios-search' : 'ios-search';
        }
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Chat" component={SettingsScreen} />
      <Tab.Screen name="Favorate" children={()=><Favorates propName={props}/>}/>
    <Tab.Screen name="Search"  children={()=><SearcUserTab propName={props}/>}/>
    </Tab.Navigator>
   
  );
}

const Tabs = props => {




  return (
    <NavigationContainer>
      <MyTabs prop={props} />
    </NavigationContainer>

  );
}
const styles = StyleSheet.create({

  mainContainerField: {
    flex: 1,backgroundColor:"white"
  },
  secondMainCotainer:
  {
    flex: 2,
    backgroundColor: "white",
    justifyContent: "center",

  },
  forgotPass: {

    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  upperText:
  {
    fontFamily: "Cairo-Bold",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
    marginHorizontal: 20,

  },
  endText: {
    fontFamily: "Cairo-Bold",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
    marginHorizontal: 20, color: "red"
  },
  secondContainer: {
    justifyContent: "center",
    flex: 2
  },
  iAmContainer: {
    borderWidth: 1,
    marginHorizontal: 10,
    fontFamily: 'Montserrat-ExtraLight'
  },
  labelText: {
    marginHorizontal: 10,
    marginVertical: 5,
    fontFamily: 'Montserrat-ExtraLight',
    fontSize: 16
  },
  mainContainerPicker:
  {
    marginVertical: 8
  },
  overflowContainer:
  {
    justifyContent: "center",
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    maxHeight: 80,
    overflow: "hidden"

  },
  upperTextHeading: {
    fontFamily: "Cairo-Bold",
    fontSize: 20,
    textAlign: "left",
    marginHorizontal: 10,
    marginVertical:10
  },
  tinyLogo: {
    height: 20,
    width: 20,
    marginTop: -20,
    marginLeft: 20
  },
  postocdeField: {
    flexDirection: "row",
    alignItems: "center",

  },
  dropDownStyle: {
    position: "relative",
    zIndex: 35,
    backgroundColor: '#fff',
    marginBottom:10
  },
  seconddropDownStyle:{
    position: "relative",
    zIndex: 30,
    backgroundColor: '#fff',
  },
  DropDown: {
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    height: 40
  },
  dropDownActive: {
    fontFamily: 'Montserrat-ExtraLight'
  },
  TextInput: {
    borderWidth: 1,
    height: 40,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    fontFamily: 'Montserrat-ExtraLight',
    borderRadius: 5,
    backgroundColor: "white"
  },


  // Result Conatiner Styles

  ResultsMainContainer: {
    flex: 2,

  },
  mainContainerOutput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    marginVertical: 20,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10
  },
  mainHeading:
  {
    marginHorizontal: 10,
    marginVertical: 10,
    fontSize: 23,
    fontFamily: 'Cairo-Bold'
  },
  textContainer: {
    marginHorizontal: 10
  },
 
  mainContainer: {
    backgroundColor: 'white',
    flex: 1
},


container: {

    marginBottom: 10,
    backgroundColor: "white"
},
mainHeading:
{
    marginHorizontal: 10,
    marginVertical: 10,
    fontSize: 23,
    fontFamily: 'Cairo-Bold'
},
secondContainer: {
    flex: 2,
    marginHorizontal: 10,
},

mainContainerOutput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    marginVertical: 20,
    borderRadius:3
},
textContainer: {
    marginHorizontal: 10
},
elipsText:
{ fontFamily: 'Montserrat-ExtraLight', color: 'black', fontSize: 15 ,marginRight:110}



})

export default  Tabs