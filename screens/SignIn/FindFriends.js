import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, Picker, SafeAreaView, ScrollView, Image, Platform, TouchableHighlight, TouchableOpacity } from "react-native";
import { Button } from 'react-native-elements';
import { Tooltip, Input } from 'react-native-elements';
import * as font from 'expo-font';
import { AsyncStorage } from 'react-native';
import Http from '../../Api/Http'


const FindFriends = props => {

    const [totalPercentage, setTotalPercentage] = useState("")

    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
        });


        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            if (UserDetail != null) {
                Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
                    if (response.status == 200) {
                        if (response.data.field_alcohol.length != undefined) {
                            if (response.data.field_alcohol.length == 0) {
                                var alcohol = 0
                            }
                        }
                        if (response.data.field_alcohol.length == undefined) {

                            var alcohol = 1
                        }
                        if (response.data.field_do_for_fun.length != undefined) {
                            if (response.data.field_do_for_fun.length == 0) {

                                var doforfun = 0
                            }
                        }
                        if (response.data.field_do_for_fun.length == undefined) {

                            var doforfun = 1

                        }

                        if (response.data.field_favorite_books.length != undefined) {
                            if (response.data.field_favorite_books.length == 0) {

                                var books = 0

                            }
                        }
                        if (response.data.field_favorite_books.length == undefined) {

                            var books = 1

                        }

                        if (response.data.field_favorite_movies.length != undefined) {
                            if (response.data.field_favorite_movies.length == 0) {

                                var movies = 0
                            }
                        }
                        if (response.data.field_favorite_movies.length == undefined) {

                            var movies = 1
                        }

                        if (response.data.field_favorite_music.length != undefined) {
                            if (response.data.field_favorite_music.length == 0) {
                                1
                                var musics = 0
                            }
                        }
                        if (response.data.field_favorite_music.length == undefined) {

                            var musics = 1
                        }
                        if (response.data.field_favorite_tv_shows.length != undefined) {
                            if (response.data.field_favorite_tv_shows.length == 0) {

                                var tvshows = 0
                            }
                        }
                        if (response.data.field_favorite_tv_shows.length == undefined) {

                            var tvshows = 1
                        }
                        if (response.data.field_friends_tend_to_be.length != undefined) {
                            if (response.data.field_friends_tend_to_be.length == 0) {

                                var tends = 0
                            }
                        }
                        if (response.data.field_friends_tend_to_be.length == undefined) {

                            var tends = 1
                        }
                        if (response.data.field_good_friend.length != undefined) {
                            if (response.data.field_good_friend.length == 0) {

                                var goodFriend = 0
                            }
                        }
                        if (response.data.field_good_friend.length == undefined) {

                            var goodFriend = 1
                        }

                        if (response.data.field_languages.length != undefined) {
                            if (response.data.field_languages.length == 0) {

                                var languages = 0
                            }
                        }
                        if (response.data.field_languages.length == undefined) {

                            var languages = 1
                        }
                        if (response.data.field_plans_get_cancelled.length != undefined) {
                            if (response.data.field_plans_get_cancelled.length == 0) {

                                var cancelled = 0
                            }
                        }
                        if (response.data.field_plans_get_cancelled.length == undefined) {

                            var cancelled = 1
                        }

                        if (response.data.field_spend_your_days.length != undefined) {
                            if (response.data.field_spend_your_days.length == 0) {

                                var spenddays = 0
                            }
                        }
                        if (response.data.field_spend_your_days.length == undefined) {

                            var spenddays = 1
                        }
                        if (response.data.field_talk_about.length != undefined) {
                            if (response.data.field_talk_about.length == 0) {

                                var talkAbout = 0
                            }
                        }
                        if (response.data.field_talk_about.length == undefined) {

                            var talkAbout = 1
                        }
                        if (response.data.field_you_say.length != undefined) {
                            if (response.data.field_you_say.length == 0) {

                                var yousay = 0
                            }
                        }

                        if (response.data.field_you_say.length == undefined) {

                            var yousay = 1
                        }




                        var total = 12 + alcohol + doforfun + books + movies + musics + tvshows + tends + goodFriend + languages + cancelled + spenddays + talkAbout + yousay


                        var percentage = total / 25 * 100
                        setTotalPercentage(percentage)


                        if (totalPercentage == 100) {
                            props.navigation.navigate('Tabs')

                        }



                    }


                    else
                    {
                        //props.navigation.navigate('Home')
                    }
                })
            }
        })











    }, [])


    return (
        <View style={styles.mainContainer}>
            <View style={styles.secondContainer}>
                <View>
                    <Text style={styles.upperText}>Hello! What would you like to do first?</Text>
                    <View >
                        <Button title="Find Friends"
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, fontFamily: 'Cairo-Bold' }}
                            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                            containerStyle={{ width: "100%" }}
                            onPress={() => props.navigation.navigate('Tabs')} />
                    </View>
                </View>
                <View>
                    <Text style={styles.upperText}>Or</Text>
                    <View >
                        <Button title="Finish My Profile"
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, fontFamily: 'Cairo-Bold' }}
                            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                            containerStyle={{ width: "100%" }} 
                            onPress={() => props.navigation.navigate('Optionaldetail')} />
                    </View>
                </View>
                <View>
                    <Text style={styles.upperText}>Your Profile is currently {totalPercentage} % complete. Our members who share more information in
      their profile get better results. But, if you don’t want to finish now you can add to your profile later at
      any time.</Text>
                    < TouchableOpacity onPress={() => props.navigation.navigate('Tabs')}>
                        <Text style={styles.upperText}>Update Profile Later</Text>
                    </TouchableOpacity>
                </View>





            </View>

        </View>




    )

}
const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor:"white"
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
    upperText:
    {
        fontFamily: "Montserrat-ExtraLight",
        fontSize: 20,
        textAlign: "center",
        marginVertical: 20,
        marginHorizontal: 20

    },
    secondContainer: {
        justifyContent: "center",
        flex: 2
    }



})

export default FindFriends