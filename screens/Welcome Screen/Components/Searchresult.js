import { Text, StyleSheet, View, Picker, FlatList, TouchableOpacity, Image } from "react-native";

import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import React, { useState, Component, useEffect } from 'react';
import { Overlay } from 'react-native-elements';
import Http from '../../../Api/Http'
import UserResult from './UserResult'
import * as font from 'expo-font';
import Spinner from 'react-native-loading-spinner-overlay';
import { AppLoading } from 'expo';
import { useFonts, Cairo_700Bold} from '@expo-google-fonts/cairo';
import { Montserrat_200ExtraLight} from '@expo-google-fonts/montserrat';
const SearchResult = props => {
const { navigation } = props;
const post = navigation.getParam('term')
const [searchPostcode, setSearchPostcode] = useState({ items: []});
const country = navigation.getParam('selectedValue')
const [visible, setVisible] = useState(false);
const [concatPostCode,setconcatPostCode] = useState()
const [matchLevel, setMatchLevel] = useState({count: 0});
const [pageIndex, setPageIndex] = useState({count: 0});

//Spinner
const [spinner ,setspinner] = useState(false)


const [currPages,setcurrPage] = useState()

let [fontsLoaded] = useFonts({
    Cairo_700Bold,
    Montserrat_200ExtraLight
    });

const toggleOverlay = () => {
    setVisible(!visible);
    navigation.goBack()
};

useEffect(() => {
    function getKind() {
    
    getSearchData()
    }
    
    getKind();
}, []);

const  getSearchData  =  async () =>{        
    setspinner(true)
    const postcode = post.substring(0,post.length - matchLevel.count)            

    // Axios Api Calling
    const responseUser = await Http.get('post-json', {
        params: {
            postal_code: postcode,
            country: country,
            page:pageIndex.count
        }
    }); 

    //Set Output in tempCurrPage
    const tempCurrPage = Object.keys(responseUser.data).map((i) => responseUser.data[i]);

    //Check tempCurrPage Length
    if(tempCurrPage.length == 0){
    setVisible(true)
    setspinner(false) 
}          

    //Check tempCurrPage Length is more than 0
        if (tempCurrPage.length > 0) {
            setSearchPostcode(state => ({
                            ...state,
                            items: searchPostcode.items.concat(tempCurrPage)
            }));

            // setSearchPostcode(searchPostcode.data.filter(
            //     (thing, index, self) =>
            //         index === self.findIndex((t) => t.name === thing.name)
            //     ))

            setspinner(false)
        }
        
        // Check pageLegth  make Matchlevel ++  and page Inde -1
        if (tempCurrPage.length < 10) {
            
            // setMatchLevel(incrementCount);
            setMatchLevel(state => ({
                ...state,
                count: state.count + 1
            }));

            setPageIndex(state => ({
                ...state,
                count: -1
            }));
            // setPageIndex(0);
            setspinner(false)
        }
            
        
        // if (searchPostcode.length == 0) {
        //      setPageIndex(state => ({
        //          ...state,
        //          count: state.count + 1
        //      }));

        //     // getSearchData()
        //         return;
        // }

            setspinner(false)
              setPageIndex(state => ({
                  ...state,
                  count: state.count + 1
              }));

    console.log("Page Index " + pageIndex.count);
    console.log("search postcode " + searchPostcode.items.length);
    console.log("Match level is " + matchLevel.count + "\n");
}

if(!fontsLoaded)
{
return(<AppLoading />)
}
else{


return (

    <View style={{ flex: 1, backgroundColor: "white" }}>
            <Spinner
        visible={spinner}
        textContent={'loading...'}
        textStyle={styles.spinnerTextStyle}
    />

        <UserResult searchPostcode={searchPostcode.items} tittle="Members near you"  navigation={navigation}/>
        <View style={{marginVertical:10}}>
        <Button title="Show More"
       containerStyle={{marginBottom:20}}
         buttonStyle={{ backgroundColor: "lightgrey"}}
         titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 15 , color:"black"}}
        onPress={getSearchData}/>
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
    fontFamily: "Montserrat_200ExtraLight",
    fontSize: 17,
    marginTop: 10
}




})

export default SearchResult