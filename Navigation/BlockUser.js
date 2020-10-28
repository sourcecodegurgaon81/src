import { Text, StyleSheet, View, Picker, FlatList, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, Component, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import * as font from 'expo-font';
import Http from '../Api/Http'
import { AsyncStorage } from 'react-native';
import { render } from "react-dom";
import { AppLoading } from 'expo';
import { useFonts, Cairo_700Bold} from '@expo-google-fonts/cairo';
import { Montserrat_200ExtraLight} from '@expo-google-fonts/montserrat';

const BlockUser = (props) => {
    const [search, setSearch] = useState("")
    const [activityValue, setactivity] = useState("")
    const [active, setactive] = useState("")

    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_200ExtraLight
      });
    useEffect(() => {
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            if (UserDetail != null) {
                Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
                    if (response.status == 200) {
                            const listFavorate = response.data.field_block_users.und[0].value;
                            const ParseFavorate = JSON.parse(listFavorate);
                            const uniqueFavorite = ParseFavorate
                            setSearch(uniqueFavorite)
                    }
                })
            }
        })




    }, [])

    const removeDuplicatesBy = (keyFn, array) => {
        console.log(keyFn)
        var mySet = new Set();
        return array.filter(function (x) {
            var key = keyFn(x),
                isNew = !mySet.has(key);
            if (isNew) mySet.add(key);
            return isNew;
        });


    }
    if(!fontsLoaded)
    {
        return(
        <AppLoading />)
    }
    else{
    return (
        <View style={styles.mainContainer}>

            <FlatList
                data={search}
                keyExtractor={item => item[0].uid}
                renderItem={({ item }) => {
                    const actvitity = JSON.stringify(item.activities)
                    //    var active = arrayActvity.join(', ')

                    for (let i = 0; i <= item[0].activities.length; i++) {

                        if (item[0].activities[i] != undefined) {
                     
                          setactive(item[0].activities[i].value)
                        }
                    }
                    return (
                        <TouchableOpacity onPress={()=> props.navigation.navigate('UserDetails',{
                            uid:item[0].uid
                        })} >
                            <View style={styles.secondContainer}>
                                <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                                    <ScrollView style={styles.scrollView}>
                                        <View style={styles.mainContainerOutput}>
                                            <View style={styles.Image}>
                                                <Image
                                                    style={styles.tinyLogo}
                                                    source={{ uri: item[0].picture }} style={{ width: 100, height: 100 }} />
                                            </View>
                                            <View style={styles.textContainer}>
                                                <Text style={{ fontFamily: 'Montserrat_200ExtraLight', color: 'black' }}>{item[0].name}</Text>
                                                <Text style={styles.activityText} numberOfLines={2}><Text style={{ fontFamily: 'Cairo_700Bold' }} >Activity :</Text>{active}</Text>   
                                        </View>
                                    </View>
                                </ScrollView>
                            </SafeAreaView>
                        </View>
                        </TouchableOpacity>

                    )

                }}
            />
        </View>




    )

}
}
const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        flex: 1
    },


    container: {
        marginBottom: 10,
        backgroundColor: "white"
    },
    mainHeading:
    {
        marginHorizontal: 10,
        marginVertical: 10,
        fontSize: 23,
        fontFamily: 'Cairo_700Bold'
    },
    secondContainer: {
        flex: 2,
        marginHorizontal: 10,
    },

    mainContainerOutput: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        marginVertical: 20,
        borderRadius:3
    },
    textContainer: {
    marginHorizontal: 10
    },
    activityText:
    { fontFamily: 'Montserrat_200ExtraLight', color: 'black', fontSize: 15,paddingRight:90 }

   


});

export default BlockUser