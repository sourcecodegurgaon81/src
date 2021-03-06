import React, {useState, useEffect} from "react";

import { Header } from 'react-native-elements';
import NavImage  from '../Components/NavImage'
import HelpImage from '../Components/HelpImage'
import { AsyncStorage } from 'react-native';
import { Linking } from 'react-native'

import { Text, StyleSheet, Image, View, TouchableHighlight, TouchableOpacity, SafeAreaView, ScrollView,RefreshControl ,ActivityIndicator} from "react-native";
import { Button, Overlay } from 'react-native-elements';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Cairo_700Bold} from '@expo-google-fonts/cairo';
import { Montserrat_200ExtraLight} from '@expo-google-fonts/montserrat';
const Navigationbar = (props) => {

const  rightImage = () =>{
  const [refreshing, setRefreshing] = useState(true);
const [visible, setVisible] = useState(false);
const [spinner ,setspinner] = useState(false); 
const [Login, setLogin] = useState(false)
const [helpChat, setHelpChat] = useState(false)

const toggleOverlay = () => {
  setVisible(!visible);
};

const toggleHelpchat = () =>{
  setHelpChat(!helpChat)
}

const forHelp = () =>{
  toggleHelpchat()
  Linking.openURL('mailto:contactus@not4dating.com')
}

let [fontsLoaded] = useFonts({
  Cairo_700Bold,
  Montserrat_200ExtraLight
});


const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const onRefresh = React.useCallback(() => {
  setRefreshing(true);
  wait(2000).then(() => setRefreshing(false));
}, []);

useEffect(() => {
  AsyncStorage.getItem('Token', (err, result) => {
      const UserDetail = JSON.parse(result)
      if (UserDetail != null) {
          setLogin(true)
      }
      else
      {
          setLogin(false)
      }

  })
})

const ViewEdit = () =>{
  toggleOverlay()
  props.navigation.navigate('Moreinfo')
}

const ViewBlockUser = () =>{
  toggleOverlay()
  props.navigation.navigate('BlockUser')
}
const AccountSetting = () =>{
  toggleOverlay()
  props.navigation.navigate('AccountSetting')
}

const LogOut = () => {
  setspinner(true)
  AsyncStorage.getItem('Token', (err, result) => {
      const LogoutToken = JSON.parse(result)
     
  //Logout
  axios.post('https://gowebtutorial.com/api/json/user/logout', {}, {
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': LogoutToken.data.sessid + "=" + LogoutToken.data.session_name, 'X-CSRF-Token': LogoutToken.data.token }
  }).then((response) => {
      onRefresh()
      AsyncStorage.clear();
      
       props.navigation.navigate('Home')
       setspinner(false) 
  }).catch(function (error) {
      setspinner(false)
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
  });

})
}


return (
  <View style={styles.mainContainer}  >
       <Spinner
    visible={spinner}
    textContent={'LogingOut...'}
    textStyle={styles.spinnerTextStyle}
  />
      {Login ? (
          <TouchableOpacity onPress={toggleOverlay} >
              <Image style={styles.Image} source={require('../../assets/Images/user.png')} />
          </TouchableOpacity>
      ) : null}

      <TouchableOpacity onPress={toggleHelpchat}>
      <Image style={styles.Image} source={require('../../assets/Images/question.png')} />
      </TouchableOpacity>
      <>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <View style={styles.overlaystyling}>
              <Button title="View/Edit Profile" buttonStyle={styles.buttonHeight} titleStyle={styles.titleStyles} onPress={ViewEdit } />
              <Button title="Account Settings" buttonStyle={styles.buttonHeight} titleStyle={styles.titleStyles} onPress={AccountSetting}/>
              <Button title="Blocked Users" buttonStyle={styles.buttonHeight} titleStyle={styles.titleStyles} onPress={ViewBlockUser}/>
              <Text style={styles.titleStyles} onPress={LogOut}>Log Out</Text>
          </View>
      </Overlay>
 


      <Overlay isVisible={helpChat} onBackdropPress={toggleHelpchat}>
          <View style={styles.contactOverLay}>
              <Button title="Contact Not4Dating"  containerStyle={{ marginHorizontal: 15, marginVertical: 10 ,   }} onPress={forHelp} titleStyle={{fontSize:20,    fontFamily: 'Cairo_700Bold' }}  buttonStyle={{ backgroundColor: "green",textAlign:"center",borderRadius:10 , }}/>
              <Button title="Close" onPress={toggleHelpchat}  containerStyle={{ marginHorizontal: 15 , marginVertical: 10 ,   }} titleStyle={{fontSize:20,    fontFamily: 'Cairo_700Bold' }}  buttonStyle={{ backgroundColor: "green",textAlign:"center",borderRadius:10 , }}/>
          </View>
      </Overlay>
      </>
  </View>
)

}


  




    return(
      <View style={{borderBottomWidth:1,backgroundColor:"white"}}>
        <Header
        containerStyle={{backgroundColor:"white", height:100,borderBottomWidth:1,zIndex:2}}
        placement="left"
        leftComponent={<NavImage  navigation={props}/>}
        rightComponent={rightImage}
      />
      </View>


    )
}


const styles = StyleSheet.create({

  Image: {
    height: 30,
    width: 30,
    marginRight: 8,
    zIndex: 1
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
    alignItems: "center",
    zIndex: 1,
    backgroundColor:"white"
  },
  overlaystyling: {
    backgroundColor: "white",
    height: 500,
    width: 300,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 40
  },
  buttonHeight: {
    width: 150,
    paddingVertical: 20,
    backgroundColor: "green",
    borderRadius: 10
  },
  titleStyles: {
    fontSize: 18
  },
  
  spinnerTextStyle: {
    color: 'black'
  },
  contactOverLay:{
    height:150,
    width:200,
    justifyContent:"center"
  },
  crossImage:{
    height:20,
    width:20
  },
  imageContainer:
  {
      alignItems: "flex-end",
      marginVertical:15
  },
  
  
  });

export default Navigationbar