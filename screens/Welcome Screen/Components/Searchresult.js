import { Text, StyleSheet, View, Picker, FlatList, TouchableOpacity, Image } from "react-native";

import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import React, { useState, Component, useEffect } from 'react';
import { Overlay } from 'react-native-elements';
import Http from '../../../Api/Http'
import UserResult from './UserResult'
import * as font from 'expo-font';
import Spinner from 'react-native-loading-spinner-overlay';
const SearchResult = props => {
    const { navigation } = props;
    const post = navigation.getParam('term')
    const [searchPostcode, setserachPostocde] = useState([])
    const country = navigation.getParam('selectedValue')
    const [visible, setVisible] = useState(false);

    //Spinner
    const [spinner ,setspinner] = useState(false)


    const toggleOverlay = () => {
        setVisible(!visible);
        navigation.goBack()
    };

    useEffect(() => {
        async function getKind() {
            setspinner(true)

            //Member Near you   
            const matchLevel = 0
            const postcode = post.substring(0, post.length - matchLevel)
            const responseUser = await Http.get('post-json', {
                params: {
                    postal_code: post.substring(0, post.length - matchLevel),
                    country: country,
                }

            }); const tempCurrPage = Object.keys(responseUser.data).map((i) => responseUser.data[i]);

           
    for (let i = 0; i < tempCurrPage.length; i++) {   
        if (tempCurrPage[i].Postal.substring(0,postcode.length - matchLevel) == postcode.substring(0, postcode.length - matchLevel))  
{
          if (tempCurrPage.length > 0) {
                const response = await Http.get('post-json', {
                    params: {
                        postal_code: post,
                        country: country
                    }
                }); 
                setserachPostocde(response.data.concat(tempCurrPage))
                setserachPostocde(response.data.filter(
                    (thing, index, self) =>
                      index === self.findIndex((t) => t.name === thing.name)
                  ))
                setspinner(false)
            }
         if(tempCurrPage.length < 10) {
                const conatctPostcode = post.substring(0, 3)
                const response = await Http.get('post-json', {
                    params: {
                        postal_code: conatctPostcode ,
                        country: country
                    }
                });setserachPostocde(response.data)
                   setspinner(false)

              
            }  
            if(tempCurrPage.length < 10){
                matchLevel++
                console.length(matchLevel++)
               }
          
            else{
                setVisible(true)
               setspinner(false)
            }
    
        }
    }


        }
        font.loadAsync({
            'Cairo-Bold': require('../../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../../assets/fonts/Montserrat-ExtraLight.ttf')
        });
        getKind();
    }, []);




    return (

        <View style={{ flex: 1, backgroundColor: "white" }}>
               <Spinner
          visible={spinner}
          textContent={'loading...'}
          textStyle={styles.spinnerTextStyle}
        />

            <UserResult searchPostcode={searchPostcode} tittle="Members near you"  navigation={navigation}/>
            <View style={{marginVertical:10}}>
            <Button title="Load More" />
            </View>


            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} >
                <View>
                    <TouchableOpacity>
                        <Image style={styles.ImageStyle} source={require('../../../../assets/Images/cross.png')} />
                    </TouchableOpacity>

                    <Text style={styles.notFoundText}>Looks like we have not yet expanded to your area. Click here to suggest that we come to you next!
                     Click here to suggest that we come to you next</Text>
                </View>
            </Overlay>

        </View>

    )


}



const styles = StyleSheet.create({
    ImageStyle: {
        height: 20,
        width: 20,
        justifyContent: "flex-end",
        position: "absolute",
        right: 10,
        marginTop: 10,

    },
    notFoundText: {
        paddingVertical: 25,
        textAlign: "center",
        fontFamily: "Montserrat-ExtraLight",
        fontSize: 17,
        marginTop: 10
    }




})

export default SearchResult