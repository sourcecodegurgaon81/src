import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, SafeAreaView, ScrollView } from "react-native";

import { Button } from 'react-native-elements';
import * as font from 'expo-font';
import { AsyncStorage } from 'react-native';
import Http from '../../Api/Http'
import { TextInput } from 'react-native';
import Textarea from 'react-native-textarea';
import Spinner from 'react-native-loading-spinner-overlay';
import { AppLoading } from 'expo';
import { useFonts, Cairo_700Bold} from '@expo-google-fonts/cairo';
import { Montserrat_200ExtraLight} from '@expo-google-fonts/montserrat';
const NewChat = props => {
    const [enterSubject, setSubject] = useState()
    const [Message, setMessage] = useState()
          //Spinner
          const [spinner ,setspinner] = useState(false)



    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_200ExtraLight
      });
    
    useEffect(() => {

        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            if (UserDetail != null) {
            }
        })
    }, [])

    const sendMessage = () =>{
        setspinner(true)
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            Http.post('privatemsg/',{
                recipients: props.navigation.state.params.Name,
                subject:enterSubject,
                body:Message
            }, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((responses) => {
                const userSendMessages = responses.data.messages;
                setspinner(false)
                props.navigation.goBack()
            })
        })
    }
    if(!fontsLoaded)
    {
      return(<AppLoading />)
    }
    else{

    return (


        <View style={styles.mainTextContainer}>
                <Spinner
          visible={spinner}
          textContent={'Sending...'}
          textStyle={styles.spinnerTextStyle}
        />

            <View style={styles.secondmainTextContainer}>
                <Text style={styles.headingText}>Create new chat thread</Text>

                <TextInput
                    style={{ height: 40, borderColor: 'black', borderWidth: 1, borderRadius: 5, paddingLeft: 7 }}
                    onChangeText={text => setSubject(text)}
                    value={enterSubject}
                    placeholder=" Enter Subject"
                />

                <View style={styles.TextAreaContainer}>
                    <View style={styles.FieldContainer}>

                        <Textarea
                            containerStyle={styles.textareaContainer}
                            style={styles.textarea}
                            onChangeText={text => setMessage(text)}
                            maxLength={120}
                            value={Message}
                            placeholder={' Type message here'}
                            placeholderTextColor={'#c7c7c7'}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>

                </View>
                <Button
                    title="Send" onPress={sendMessage}/>

            </View>
        </View>

    )

};
}

const styles = StyleSheet.create({
    FieldContainer: {
        marginVertical: 10,

    },
    textareaContainer: {
        height: 140,
        padding: 5,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        fontFamily: 'Montserrat_200ExtraLight'
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 140,
        fontSize: 14,
        color: '#333',
        fontFamily: 'Montserrat_200ExtraLight'
    },
    headingText: {
        fontFamily: 'Montserrat_200ExtraLight',
        fontSize: 20,
        textAlign: "center",
        marginVertical: 5
    },
    mainTextContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white"

    },
    secondmainTextContainer: {
        textAlign: "center",
        marginHorizontal: 20
    }
});


export default NewChat;


