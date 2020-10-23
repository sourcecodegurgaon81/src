import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View ,TextInput} from "react-native";
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import Http from '../../Api/Http'
import axios from 'axios';
import * as font from 'expo-font';
import APIKit, { setClientToken } from '../../Api/APIKit'
import Spinner from 'react-native-loading-spinner-overlay';
import { AsyncStorage } from 'react-native';
import { Overlay } from 'react-native-elements';
import Moment from 'moment';



const SignIn = props => {
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')

    // OverLay 
    const [error, setError] = useState("")
    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
    };



    //Spinner
    const [spinner ,setspinner] = useState(false)




    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
        });
        AsyncStorage.getItem('Token', (err, result) => {
            const LogoutToken = JSON.parse(result)
            if(LogoutToken != null)
            {

                Http.get('user/' + LogoutToken.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': LogoutToken.data.sessid + "=" + LogoutToken.data.session_name, 'X-CSRF-Token': LogoutToken.data.token } }).then((response) => {
                    if(LogoutToken.data.user.field_trial_period_start_date.length == undefined) 
                    {
                        becomeCerified()
                    }
                 })
                 
           
            }
          })
    }, [])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
      }, []);



    const Login = () => {
        setspinner(true)
            //Login User Api
            axios.post('https://gowebtutorial.com/api/json/user/login', { username: user, password: pass }, {
                headers: {'Accept': 'application/json','Content-Type': 'application/json'}
               }).then((response) => {
                setspinner(false) 
               AsyncStorage.setItem('Token',JSON.stringify(response))
               AsyncStorage.getItem('Token', (err, result) => {
                const LogoutToken = JSON.parse(result)
                //Connect Api
                axios.post('http://gowebtutorial.com/api/json/system/connect', {}, {
                    headers: {'Accept': 'application/json','Content-Type': 'application/json','X-Cookie' : LogoutToken.data.sessid + "=" + LogoutToken.data.session_name ,'X-CSRF-Token' :LogoutToken.data.token}
                   }).then((response)=>{
                       if(response.status == 200)
                       {
                        AsyncStorage.setItem('Connected',JSON.stringify(response))
                        setspinner(false)
                        Http.get('user/' + LogoutToken.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': LogoutToken.data.sessid + "=" + LogoutToken.data.session_name, 'X-CSRF-Token': LogoutToken.data.token } }).then((response) => {
                           if(LogoutToken.data.user.field_trial_period_start_date.length == undefined) 
                           {
                            becomeCerified()
                           }
                           else 
                           {
                            props.navigation.navigate('Becomeverified')
                           }
                        })
                       }
                       
                    
                   })
                  
              });
            }).catch(function (error) {    
                //setspinner(false)
                if (error.response.status) {
                    setspinner(false)
                    setVisible(true)
                }
            });

        
    }



  const becomeCerified = () =>{
    AsyncStorage.getItem('Token', (err, result) => {
    const LogoutToken = JSON.parse(result)
    if(LogoutToken.data.user.field_trial_period_start_date.length == undefined) 
    {
    var msDiff =  new Date().getTime() - new Date(LogoutToken.data.user.field_trial_period_start_date.und[0].value).getTime();    //Future date - current date
    }
    var daysTill30June2035 = Math.floor(msDiff / (1000 * 60 * 60 * 24));
  
     if(daysTill30June2035 > 8)
     {
        props.navigation.navigate('FindFriends')
        //props.navigation.navigate('Tabs')

     }
     else
     {
        props.navigation.navigate('FindFriends')
     }


    });
  }


    return (
        <View style={styles.mainContainer}>
            <Spinner
          visible={spinner}
          textContent={'Signing...'}
          textStyle={styles.spinnerTextStyle}
        />

            <View style={styles.secondMainCotainer}>

                <Text style={styles.TextContainer}>Login with Username</Text>
                <View style={styles.FieldContainer}>
                        <TextInput
                            style={styles.TextInput}
                            onChangeText={newValue => setUser(newValue)}
                            value={user}
                            labelStyle={{ fontFamily: 'Montserrat-ExtraLight' }}
                            placeholderStyle={{ fontFamily: 'Montserrat-ExtraLight' }}
                            placeholder='Username'
                        />
                    </View>
                    <View style={styles.FieldContainer}>
                        <TextInput
                            style={styles.TextInput}
                            onChangeText={newValues => setPass(newValues)}
                            value={pass}
                            labelStyle={{ fontFamily: 'Montserrat-ExtraLight' }}
                            placeholderStyle={{ fontFamily: 'Montserrat-ExtraLight' }}
                            placeholder='Password'
                            secureTextEntry={true}
                        />
                    </View>
                    
                <Text style={styles.forgotPasswprdText} onPress={() => props.navigation.navigate('Forgotpassword')}>Forgot password ?</Text>

                <View >
                    <Button title="Sign In" onPress={Login}
                        buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10,  fontFamily: 'Cairo-Bold' }}
                        titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                        containerStyle={{ width: "100%" }} />
                </View>

            </View>

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <Text style={styles.errorText}>Wrong username or password</Text>
                <Button title="Ok" containerStyle={styles.buttoncontainerStyle} buttonStyle={styles.successButton} titleStyle={styles.tittleText} onPress={toggleOverlay} />
            </Overlay>

            
        </View>
    )

}

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1
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
    forgotPasswprdText: {
        textAlign: "right",
        marginHorizontal: 20, fontSize: 15,fontFamily: 'Montserrat-ExtraLight',
        marginVertical:10
    },
    TextContainer: {
        textAlign: "center",
        fontFamily: "Cairo-Bold",
        fontSize: 20
    },
    spinnerTextStyle: {
        color: 'black'
      },
      labelText: {
        marginHorizontal: 10,
        marginVertical: 5,
        fontFamily: 'Montserrat-ExtraLight',
        fontSize: 16
    },
    TextInput: {
        borderWidth: 1,
        height: 45,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        fontFamily: 'Montserrat-ExtraLight',
        borderRadius: 5
    },
    FieldContainer:{
        marginVertical:10
    },
    redButton: {
        backgroundColor: "#DC3545"
    },
    successButton: {
        backgroundColor: "#28A745"
    },
    tittleText: {
        fontFamily: "Cairo-Bold",
        paddingHorizontal: 20,
        paddingVertical: 20,
        fontSize: 16
    },
    buttoncontainerStyle: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    errorText: {
        fontFamily: "Cairo-Bold",
        paddingHorizontal: 20,
        paddingVertical: 20,
        fontSize: 16,
        textAlign: "center"
    }

})
export default SignIn