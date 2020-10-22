import React, { useState, useEffect ,useLayoutEffect} from 'react';
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
import Chats from './Chats'
import { AsyncStorage } from 'react-native';
import { any } from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';

 
//Search User Tab
function SearcUserTab(props) {
  return(
  
     <SearchFields  navigation={props.propName.prop}/>
 
  )

}








function SettingsScreen (props) {
  const [chatmessage,chatMessages] = useState()
  const [counterPartcipants,setcounterparticinats] = useState()
      //Spinner
      const [spinner ,setspinner] = useState(false)
   var Chatting = any


   const ParseFavorate =[];
    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
        });


        setspinner(true)
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            Http.get('privatemsg' , { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((responses) => {
          var meassages =  responses.data
  
          
        {
              for (var i = 0; i < meassages.length; i++) {
                    for(var participants in meassages[i].participants){
                        if (meassages[i].participants[participants].uid != UserDetail.data.user.uid ) {

 
                     // Add subject and time in participant object
                     meassages[i].participants[participants].subject = meassages[i].subject;
                     meassages[i].participants[participants].time=meassages[i].last_updated;
                     meassages[i].participants[participants].thread_id = meassages[i].thread_id;
                    ParseFavorate.push(meassages[i].participants[participants]);          
                    chatMessages(ParseFavorate)
                    setspinner(false)
                  
                    }  
                        
                  }       
 
                    
                    } 
 
                }

            
                  })
              
        })  
    }, []);
   const removeDuplicatesBy = (keyFn, array)=>{
      var mySet = new Set();
      return array.filter(function (x) {
        var key = keyFn(x),
          isNew = !mySet.has(key);
        if (isNew) mySet.add(key);
        return isNew;
      });
    }
  
  
 
  return (
    <View style={{flex:1}}>
    <Spinner
          visible={spinner}
          textContent={'Loading Chats...'}
          textStyle={styles.spinnerTextStyle}
        />
    <Chats chatmessage={chatmessage} navigation={props.propName.prop}/>
    </View>

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
      <Tab.Screen name="Chat"  children={()=><SettingsScreen propName={props}/>}/>
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