import { Text, StyleSheet, View, Picker, FlatList ,TouchableOpacity} from "react-native";

import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import React, { useState, Component, useEffect } from 'react';
import { Overlay } from 'react-native-elements';
import Http from '../../../Api/Http'
import UserResult from './UserResult'
import * as font from 'expo-font';

const SearchResult = props => {
    const { navigation } = props;
    const post = navigation.getParam('term')
    const [searchPostcode, setserachPostocde] = useState([])
    const country = navigation.getParam('selectedValue')
    const [visible, setVisible] = useState(false);

    console.log(post + country)
    const toggleOverlay = () => {
      setVisible(!visible);
    };
    useEffect(() => {
        async function getKind() {
            const response = await Http.get('post-json', {
                params: {
                    postal_code: post,
                    country: country
                }
            });setserachPostocde(response.data)
        }

        font.loadAsync({
            'Cairo-Bold': require('../../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../../assets/fonts/Montserrat-ExtraLight.ttf')
              });
        getKind();
    }, []);
    return (
    
        <View style={{flex:1,backgroundColor:"white"}}>
            <UserResult searchPostcode={searchPostcode} tittle="Members near you"   /> 
        </View>

    )


}





export default SearchResult