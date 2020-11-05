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
    const [enterSubject, setSubject] = useState("hello")
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

                <View style={styles.Textcontainer}>
                <Text style={styles.headingText}>Hello! What are you currently reading or listening to?</Text>

                <Text style={styles.headingText}>Hey there! What is one thing that always makes you laugh or puts a smile on your face?</Text>
                
                <Text style={styles.headingText}>Hiyah! What is one thing you are looking forward to in the next few months and wouldn’t miss for the world</Text>
                

                <Text style={styles.headingText}>Hi! What did you do on your best day ever? </Text>


                <Text style={styles.headingText}>Helloooo! What is the best gift you have ever given?</Text>

                </View>
   
              <View style={styles.FieldArea}>
                <TextInput
                    style={{ height: 40, borderColor: 'black', borderWidth: 1, borderRadius: 5, paddingLeft: 7 }}
                    onChangeText={text => setMessage(text)}
                    value={Message}
                    placeholder="Write your own message here"
                />

                

                <Button
                    title="Send" 
                    onPress={sendMessage} 
                    buttonStyle={{ backgroundColor: "green",textAlign:"center",borderRadius:10 , }}
                    containerStyle={{ marginHorizontal: 15, marginVertical: 15 ,   }}
                    titleStyle={{fontSize:20,    fontFamily: 'Cairo_700Bold' }}
                    />
</View>
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
 
        marginVertical: 5
    },
    mainTextContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white"

    },
    secondmainTextContainer: {
     
      
    },
    Textcontainer:{
      marginHorizontal:20,
      marginTop:10
    },
    FieldArea:{
        justifyContent:"center",
        marginHorizontal:20,
        marginVertical:20
    }
});


export default NewChat;


