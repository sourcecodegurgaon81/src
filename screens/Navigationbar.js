import React, {useState, useEffect} from "react";

import { Header } from 'react-native-elements';
import NavImage  from '../Components/NavImage'
import HelpImage from '../Components/HelpImage'
import { AsyncStorage } from 'react-native';

import { Text, StyleSheet, Image, View, TouchableHighlight, TouchableOpacity, SafeAreaView, ScrollView,RefreshControl ,ActivityIndicator} from "react-native";
import { Button, Overlay } from 'react-native-elements';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
const Navigationbar = (props) => {

const  rightImage = () =>{
  const [refreshing, setRefreshing] = useState(true);
const [visible, setVisible] = useState(false);
const [spinner ,setspinner] = useState(false); 
const [Login, setLogin] = useState(false)

const toggleOverlay = () => {
  setVisible(!visible);
};
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
       setspinner(false)  
       props.navigation.navigate('Home')
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
    textContent={'Signing...'}
    textStyle={styles.spinnerTextStyle}
  />
      {Login ? (
          <TouchableOpacity onPress={toggleOverlay} >
              <Image style={styles.Image} source={require('../../assets/Images/user.png')} />
          </TouchableOpacity>
      ) : null}
      <Image style={styles.Image} source={require('../../assets/Images/question.png')} />
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <View style={styles.overlaystyling}>
              <Button title="View/Edit Profile" buttonStyle={styles.buttonHeight} titleStyle={styles.titleStyles} onPress={ViewEdit } />
              <Button title="Account Settings" buttonStyle={styles.buttonHeight} titleStyle={styles.titleStyles} />
              <Button title="Blocked Users" buttonStyle={styles.buttonHeight} titleStyle={styles.titleStyles} />
              <Text style={styles.titleStyles} onPress={LogOut}>Log Out</Text>
          </View>
      </Overlay>
  </View>
)
}


  




    return(
      <View style={{borderBottomWidth:1}}>
        <Header
        containerStyle={{backgroundColor:"white", height:100,borderBottomWidth:1,zIndex:2}}
        placement="left"
        leftComponent={<NavImage />}
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
    zIndex: 1
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
  
  
  
  });

export default Navigationbar