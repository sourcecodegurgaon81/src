import React, { useState, useEffect } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text, Image,
    View,
    TouchableOpacity,
    TextInput,
    SafeAreaView, ScrollView,
} from "react-native";
import Navigationbar from '../Navigationbar';
import { Button } from 'react-native-elements';
import { Tooltip, Input } from 'react-native-elements';
import * as font from 'expo-font';
import { Header } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';


const ComponentLeft = () => {
    return (
        <View  >
            <TouchableOpacity style={styles.leftContainer}>
                <Ionicons name="ios-arrow-back" style={{ fontSize: 20 }} />
                <Image
                    source={require('../../../assets/Images/p1.jpg')}
                    style={styles.profileImage}
                />
                <Text>RimaKhanna</Text>
            </TouchableOpacity>




        </View>
    );
};


const Personalchat = () => {
    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
        });
    }, [])
    return (
        <View style={styles.mainContainer}>
            <Navigationbar />
            <View style={styles.mainSecondContainer}>
                <Header
                    containerStyle={{ backgroundColor: "white", height: "1%" }}
                    placement="left"
                    leftComponent={<ComponentLeft />}
                //rightComponent={<HelpImage />}
                />
            </View>

            <View style={styles.mainThirdContainer}>
                <View style={styles.leftChat}>
                    <Text style={styles.chatText}>Hello</Text>
                </View>

                <View style={styles.rightChatMain}>
                    <View style={styles.rightChat}>
                        <Text style={styles.leftchatText}>Howz you?</Text>
                    </View>
                </View>
            </View>



            <SafeAreaView>
            <ScrollView>
            <View style={styles.typingBar}>
                <View style={{ flex: 19 }}>
                    <TextInput
                        style={styles.inputFieldStyle}
                        placeholder="Enter message here"
                    />
                </View>

                <View style={{ flex: 2 }}>
                    <Ionicons name="ios-send" style={{ fontSize: 18 }} />
                </View>
            </View>

            </ScrollView>
            </SafeAreaView>



        </View>


    )

}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    mainSecondContainer: {
        flex: 2,
        backgroundColor: "white",
    },
    mainThirdContainer: {
        flex: 20,
        backgroundColor: "white",

    },
    profileImage: {
        height: 50, width: 50, borderRadius: 50, marginHorizontal: 10
    },
    leftContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    typingBar: {
        backgroundColor: "#d3d3d31c",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 65
    },
    inputFieldStyle: {
        borderWidth: 1,
        borderRadius: 50,
        paddingLeft: 10,
        height: 26,
        marginHorizontal: 10


    },
    leftChat: {
        backgroundColor: "#0182FF",
        width: "49%",
        paddingVertical: 10, paddingHorizontal: 10, borderRadius: 20, marginHorizontal: 8
    },
    chatText: {
        color: "white",
        fontFamily: "Cairo-Bold"
    },
    leftchatText: {
        color: "black",
        fontFamily: "Cairo-Bold"
    },
    rightChat: {
        backgroundColor: "#E7E7EB",
        width: "49%",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 20,
        marginHorizontal: 8,
        marginVertical: 20,
    },
    rightChatMain: {

        justifyContent: "flex-end",
        alignItems: "flex-end"
    }





});
export default Personalchat 