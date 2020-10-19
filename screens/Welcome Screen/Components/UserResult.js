import { Text, StyleSheet, View, Picker, FlatList, SafeAreaView, TouchableOpacity, ScrollView, CheckBox } from "react-native";
import React, { useState, Component, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import * as font from 'expo-font';
import { Overlay } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const UserResult = props => { 
    const [isSelected, setSelection] = useState(true);
    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../../assets/fonts/Montserrat-ExtraLight.ttf')
        });



        


    }, []);
    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
    };
    return (


        <View style={styles.container}>
            <Text style={styles.mainHeading}>{props.tittle}</Text>
            <FlatList
                data={props.searchPostcode}
                keyExtractor={item => item.uid}
                renderItem={({ item }) => {
                    var active = item.Activity.join(', ')
                    return (
                        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} >
                            <ScrollView style={styles.scrollView}>
                                <TouchableOpacity onPress={toggleOverlay}>
                                    <View style={styles.mainContainer} >
                                        <View style={styles.Image}>

                                            <Image
                                                style={styles.tinyLogo}
                                                source={{ uri: item.Picture[0] }}
                                                style={{ width: 150, height: 130 }}
                                                PlaceholderContent={<ActivityIndicator />}
                                            />
                                        </View>
                                        <View style={styles.textContainer}>
                                            <Text style={{ fontFamily: 'Montserrat-ExtraLight' }}>{item.name}</Text>
                                            <Text style={styles.activityText} numberOfLines = {2}><Text style={{ fontFamily: 'Cairo-Bold' }}>Activity :</Text> {active} </Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>


                            </ScrollView>


                        </SafeAreaView>


                    )

                }}
            />

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{ marginHorizontal: 30, paddingVertical: 20 }} backdropStyle={{ backgroundColor: "#000000a3" }}>

                <View>
                    <Text style={styles.popupTopMessage}>Sorry!  Only Members can view detailed profiles</Text>
                    <Text style={styles.popupTopHeading}>Who's on the site?</Text>
                    <View style={styles.checkboxContainer}>
                        <Image style={styles.ImageCheck} source={require('../../../../assets/Images/check.png')} />

                        <Text style={styles.label}>Our youngest member is 18,our oldest member is 85</Text>

                    </View>
                    <View style={styles.checkboxContainer}>
                        <Image style={styles.ImageCheck} source={require('../../../../assets/Images/check.png')} />

                        <Text style={styles.label}>64% in a Realtionship,36% Not in a Realtionship</Text>

                    </View>
                    <Button

                        containerStyle={{ marginHorizontal: 15, marginVertical: 15, height: 50, borderRadius: 10 }}
                        buttonStyle={{ height: 50 }}
                        title="Sounds Cool! Who can I meet"
                        titleStyle={{ fontSize: 20 }}
                    />
                    <Button
                        onPress={() => props.navigation.navigate('SignUp')}
                        buttonStyle={{ backgroundColor: "green", textAlign: "center", height: 50, borderRadius: 10 }}
                        containerStyle={{ marginHorizontal: 15, marginVertical: 15 }}
                        titleStyle={{ fontSize: 20 }}
                        title="Awesome! Sign me up!"
                    />
                </View>

            </Overlay>
        </View>

    )

}
const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        marginVertical: 10,
        marginHorizontal: 10,
        borderWidth: 1,
        backgroundColor: 'white',
    },
    textContainer: {
        justifyContent: "center",
        marginLeft: 10,
        flex: 1,

    },

    container: {
        flex: 1,
        marginBottom: 10,
        backgroundColor: "white"
    },
    mainHeading:
    {
        marginHorizontal: 10,
        marginVertical: 10,
        fontSize: 23,
        fontFamily: 'Cairo-Bold'
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        marginHorizontal: 20
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
        fontFamily: "Montserrat-ExtraLight",
        fontSize: 16
    },
    ImageCheck: {
        height: 20,
        width: 20
    },
    popupTopMessage: {
        fontFamily: "Montserrat-ExtraLight",
        fontSize: 20,
        textAlign: "center",
        paddingVertical: 20,

    },
    popupTopHeading: {
        fontFamily: "Cairo-Bold",
        fontSize: 24,
        marginHorizontal: 20

    },
    activityText:
    { fontFamily: 'Montserrat-ExtraLight', color: 'black', fontSize: 15,marginRight:20 }

});


export default UserResult