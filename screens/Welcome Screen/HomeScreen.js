import React ,{useEffect ,useState} from "react";
import { Text, StyleSheet, View ,SafeAreaView, ScrollView} from "react-native";

import { Button } from 'react-native-elements';
import * as font from 'expo-font';
import { AsyncStorage } from 'react-native';
import Http from '../../Api/Http'



const HomeScreen = props => {



  useEffect(() => {
    async function loadFont() {
      return await Font.loadAsync({
        'Cairo-Bold':{uri: require('../../../assets/fonts/Cairo-Bold.ttf')},
        'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')

      });
    }
  
        AsyncStorage.getItem('Token', (err, result) => {
          const UserDetail= JSON.parse(result)
          if(UserDetail != null)
          {
            Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {

              if(response.data.field_already_declared.und == undefined){
              props.navigation.navigate('Tophobbies')
              }
              else   
              { 
                props.navigation.navigate('FindFriends')
              }  
          })
          }     
        }) 
       
      }, []) 
 
    
  return (

 
    <View style={styles.mainTextContainer}>



      <View style={styles.mainTextContainerTwo}>
        <Text style={styles.text}>Welcome!</Text>
        <Text style={styles.textTwo}>We can help you make platonic connections in your local area.</Text>
        <Text style={styles.textTwo}>First, ONE BIG RULE:{"\n"}

Platonic = we will not help you
find a date or sexual partners. No
judgment if that is your goal, but
kindly save your energy and use another app.</Text>



        <Button 
        onPress ={() => props.navigation.navigate('Postcode')}
          containerStyle={{ marginHorizontal: 15, marginVertical: 15, borderRadius:10 ,    fontFamily:"Cairo-Bold"}}
          buttonStyle = {{    fontFamily:"Cairo-Bold"}}
          title="Sounds Cool! Who can I meet"
          titleStyle={{fontSize:20 ,    fontFamily:"Cairo-Bold"}}
        />
        <Button 
        onPress ={() => props.navigation.navigate('SignUp')}
          buttonStyle={{ backgroundColor: "green",textAlign:"center",borderRadius:10 ,    fontFamily:"Cairo-Bold" }}
              containerStyle={{ marginHorizontal: 15, marginVertical: 15 ,    fontFamily:"Cairo-Bold"}}
              titleStyle={{fontSize:20,    fontFamily:"Cairo-Bold"}}
          title="Awesome! Sign me up!"
        />

        <Text style={styles.textThree }  onPress ={() => props.navigation.navigate('SignIn')}>I am already a member</Text>
      </View>
     
    </View>

  )
  
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    marginVertical: 10,
    marginHorizontal: 15,
    fontFamily:"Montserrat-ExtraLight"

    

  },
  textTwo: {
    marginVertical: 10,
    marginHorizontal: 15,
    fontSize: 19,
    fontFamily:"Montserrat-ExtraLight"


  },
  textThree: {
    marginVertical: 10,
    marginHorizontal: 10,
    textAlign: "center",
    color: "green",
    fontSize: 20,
    fontFamily:"Cairo-Bold"
   

  },
  mainTextContainer: {
    justifyContent: "space-between",
    flex: 1,
    backgroundColor:"white"
  },
  mainTextContainerTwo: {
    justifyContent: "center",
    flex: 2
  }
});


export default HomeScreen;


