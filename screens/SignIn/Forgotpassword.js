import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, Picker, SafeAreaView, ScrollView, Image, Platform, TextInput } from "react-native";
import { Button } from 'react-native-elements';
import { Tooltip, Input } from 'react-native-elements';
import * as font from 'expo-font';
import Http from '../../Api/Http'
import { Overlay } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { AppLoading } from 'expo';
import { useFonts, Cairo_700Bold} from '@expo-google-fonts/cairo';
import { Montserrat_200ExtraLight} from '@expo-google-fonts/montserrat';
const Forgotpassword = props => {
    const [user, setUser] = useState('')
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState("")
    const [spinner, setspinner] = useState(false)
    const [successvisible, setSuccessVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    
    const SuccessOverlay = () => {
        setSuccessVisible(!successvisible);
    };

    const backtoScreen = () => {
        props.navigation.goBack()
        setSuccessVisible(!successvisible);
    }
    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_200ExtraLight
      });


    const resetPassword = () => {

        setspinner(true)
        Http.post('user/request_new_password', { name: user })
            .then((response) => {
                if (response.status == 200) {
                    setspinner(false)
                    setError("We have sent a password reset request to your registered email")
                    setSuccessVisible(true)
                }
            }).catch(function (error) {
                if (error.response.status) {
                    setspinner(false)
                    setError("Wrong username or email id")
                    setVisible(true)
                }
            })
    }
    if(!fontsLoaded)
    {
      return(<AppLoading />)
    }
    else{

    return (

        <View style={styles.mainContainer} >

            <Spinner
                visible={spinner}
                textContent={'Sending mail...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.secondmainContainer}>
                <Text style={styles.TextContainer}>Reset with Email or Username</Text>
                <View style={styles.FieldContainer}>
                    <TextInput
                        style={styles.TextInput}
                        value={user}
                        onChangeText={newValue => setUser(newValue)}
                        labelStyle={{ fontFamily: 'Montserrat_200ExtraLight' }}
                        placeholderStyle={{ fontFamily: 'Montserrat_200ExtraLight' }}
                        placeholder='User Name/Email'
                    />
                </View>


                <Button
                    containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8, alignItems: "center", justifyContent: "center" }}
                    buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10 }}
                    title="Continue"
                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                    onPress={resetPassword}
                />

                <Button
                    containerStyle={{ marginHorizontal: 10, marginVertical: 8, paddingBottom: 10 }}
                    buttonStyle={{ backgroundColor: "#F64225", borderRadius: 10 }}
                    title="Previous"
                    onPress={() => props.navigation.navigate('SignIn')}

                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}

                />

            </View>

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <Text style={styles.errorText}>{error}</Text>
                <Button title="Ok" containerStyle={styles.buttoncontainerStyle} buttonStyle={styles.successButton} titleStyle={styles.tittleText} onPress={toggleOverlay} />

            </Overlay>

            <Overlay isVisible={successvisible} onBackdropPress={SuccessOverlay}>
                <Text style={styles.errorText}>{error}</Text>
                <Button title="Ok" containerStyle={styles.buttoncontainerStyle} buttonStyle={styles.successButton} titleStyle={styles.tittleText} onPress={backtoScreen} />

            </Overlay>


        </View>


    )



    }

}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "white"
    },
    secondmainContainer: {
        flex: 2,
        justifyContent: "center"
    },
    TextContainer: {
        textAlign: "center",
        fontFamily: "Cairo_700Bold",
        fontSize: 20
    },
    labelText: {
        marginHorizontal: 10,
        marginVertical: 5,
        fontFamily: 'Montserrat_200ExtraLight',
        fontSize: 16
    },
    TextInput: {
        borderWidth: 1,
        height: 45,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        fontFamily: 'Montserrat_200ExtraLight',
        borderRadius: 5
    },
    FieldContainer: {
        marginVertical: 10
    },
    redButton: {
        backgroundColor: "#DC3545"
    },
    successButton: {
        backgroundColor: "#28A745"
    },
    tittleText: {
        fontFamily: "Cairo_700Bold",
        paddingHorizontal: 20,
        paddingVertical: 20,
        fontSize: 16
    },
    buttoncontainerStyle: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    errorText: {
        fontFamily: "Cairo_700Bold",
        paddingHorizontal: 20,
        paddingVertical: 20,
        fontSize: 16,
        textAlign: "center"
    }

});

export default Forgotpassword

