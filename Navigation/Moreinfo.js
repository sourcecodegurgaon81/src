import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Image, View, TouchableHighlight, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { Button, Overlay } from 'react-native-elements';
import { Tooltip, Input } from 'react-native-elements';
import { CheckBox } from 'react-native-elements'
import * as font from 'expo-font';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Cairo_700Bold} from '@expo-google-fonts/cairo';
import { Montserrat_200ExtraLight} from '@expo-google-fonts/montserrat';


const Moreinfo = props => {

    const [userName, setuserName] = useState();
    const [userLastName, setuserLastName] = useState();
    const [userMail, setuserMail] = useState();
    const [userActivity, setuserActivity] = useState();
    const [userActivityShow, setuserActivityShow] = useState();
    const [Picture, setuserPicture] = useState();
    const [name, setName] = useState();

    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_200ExtraLight
      });
    useEffect(() => {
   
        

        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            setuserName(UserDetail.data.user.field_first_name.und[0].value),
                setuserLastName(UserDetail.data.user.field_last_name.und[0].value),
                setuserMail(UserDetail.data.user.mail)
            setuserPicture(UserDetail.data.user.picture.url)
            setName(UserDetail.data.user.name)
         setuserActivity(UserDetail.data.user.field_activities_interests.und[0].value)

        })

    }, [])
    if(!fontsLoaded) {
        return(
        <AppLoading/>)
    }
    else{
    return (


        <View style={{ flex: 1 }}>
            <View style={styles.mainContainer}>
                <View style={styles.secondMainCotainer}>
                    <View >
                        <View style={styles.topImage}>
                            <Image style={styles.LeftImage}
                                source={{
                                    uri: Picture,
                                }} />
                            <Text style={styles.rightText}>{name}</Text>
                        </View>
                        <View style={styles.thirdContainer}>
                            <View>
                                <Text style={styles.upperHeading}>FullName</Text>
                                <Text style={styles.upperHeadingOutput}>{userName} {userLastName}</Text>
                            </View>

                            <View>
                                <Text style={styles.upperHeading}>Email</Text>
                                <Text style={styles.upperHeadingOutput}>{userMail}</Text>
                            </View>
                            <View>
                                <Text style={styles.upperHeading}>Activities:</Text>
                                <Text style={styles.upperHeadingOutput}>{userActivity}</Text>
                            </View>






                            <Button containerStyle={{ marginHorizontal: 20, marginVertical: 15 }}
                                onPress={() => props.navigation.navigate('Editprofile')}
                                title="Add More Info"
                                buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10,  fontFamily: 'Cairo_700Bold' }}
                                titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}/>
                        </View>
                    </View>


                </View>

            </View>
        </View>
    )

 }

}

const styles = StyleSheet.create({

    mainContainer: {
        flex: 2, backgroundColor: "#08080885",
        justifyContent: "center",


    },
    secondMainCotainer:
    {
      
        backgroundColor: "white",
        marginHorizontal: 20,
        marginVertical: 20,
        justifyContent:"center",
        paddingVertical:20
       
    },
    forgotPass: {

        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    thirdContainer: {
        marginHorizontal: 20
    },
    upperHeading: {
        fontSize: 18,
        marginHorizontal: 16,
        marginVertical: 10,
        fontFamily: 'Cairo_700Bold'
    },
    buttonstyle: {
        marginHorizontal: 20
    },
    bottomText: {
        textAlign: "center",
        fontFamily: 'Cairo_700Bold',
        color: "red",
        fontSize: 16
    },
    Image:
    {
        width: 20,
        height: 20,
    },
    imageContainer:
    {

        alignItems: "flex-end",
        marginHorizontal: 10, marginVertical: 10
    },
    upperHeadingOutput: {
        fontFamily: 'Montserrat_200ExtraLight',
        marginHorizontal: 15
    },
    topImage: {
        flexDirection: "row",
        alignItems: "center"
    },
    LeftImage: {
        height: 100,
        width: 100,
        marginHorizontal: 20

    },
    rightText: {
        justifyContent: "center",
        fontFamily: 'Montserrat_200ExtraLight',
    }



})


export default Moreinfo