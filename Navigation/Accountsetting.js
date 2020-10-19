import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Image, View, TouchableHighlight, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { Button, Overlay } from 'react-native-elements';
import { Tooltip, Input } from 'react-native-elements';
import { CheckBox } from 'react-native-elements'
import * as font from 'expo-font';



const AccountSetting = props => {
    useEffect(() => {
        async function getKind() {
            font.loadAsync({
                'Cairo-Bold': require('../../assets/fonts/Cairo-Bold.ttf'),
                'Montserrat-ExtraLight': require('../../assets/fonts/Montserrat-ExtraLight.ttf')
            });
        }
        getKind()
    }, [])
    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.secondMainCotainer}>
                <TouchableOpacity style={styles.imageContainer}>
                    <Image style={styles.Image} source={require('../../assets/Images/cross.png')} />
                </TouchableOpacity>
                <ScrollView>

                    <View style={styles.thirdContainer}>
                        <Text style={styles.upperHeading}>Comunication Prefrences</Text>
                        <Input
                            style={{ borderWidth: 1, paddingHorizontal: 8, marginTop: 4 }}
                            labelStyle={{ fontFamily: 'Montserrat-ExtraLight' }}
                        />
                        <Text style={styles.upperHeading}>Change App Subscription:</Text>
                        <CheckBox
                            title='Switch to Monthly'
                        />
                        <CheckBox
                            title='Switch to Annual'
                        />
                        <CheckBox
                            title='Freeze Subscription'
                        />
                        <CheckBox
                            title='Cancel App Subscription'
                        />



                        <Button containerStyle={{ marginHorizontal: 20, marginVertical: 15 }}
                            onPress={() => SecondRoute}
                            title="Update Billing Info"
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, height: 50, fontFamily: 'Cairo-Bold' }}
                            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}

                        />
                        <Text style={styles.upperHeading}>New Password</Text>
                        <Input
                            placeholder='New password'
                            style={{ borderWidth: 1, paddingHorizontal: 8, marginTop: 4 }}
                            labelStyle={{ fontFamily: 'Montserrat-ExtraLight' }}
                            secureTextEntry={true}
                        />
                        <Input
                            placeholder='Type again to confirm'
                            style={{ borderWidth: 1, paddingHorizontal: 8, marginTop: 4 }}
                            labelStyle={{ fontFamily: 'Montserrat-ExtraLight' }}
                            secureTextEntry={true}
                        />
                        <Button containerStyle={{ marginHorizontal: 20, marginVertical: 15 }}
                            onPress={() => SecondRoute}
                            title="Save Settings"
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, height: 50, fontFamily: 'Cairo-Bold' }}
                            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                        />
                    </View>
                    <Text style={styles.bottomText}>Close Account</Text>
                    <Text style={styles.bottomText}>(Delete all My Info)</Text>

                </ScrollView>
            </SafeAreaView>



        </View>
    )



}

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1, backgroundColor: "#08080885",

    },
    secondMainCotainer:
    {
        justifyContent: "space-around",
        backgroundColor: "white",
        justifyContent: "center",
        flex: 2,
        marginHorizontal: 30,
        marginVertical: 30

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
        fontFamily: 'Cairo-Bold'
    },
    buttonstyle: {
        marginHorizontal: 20
    },
    bottomText: {
        textAlign: "center",
        fontFamily: 'Cairo-Bold',
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
    }



})


export default AccountSetting