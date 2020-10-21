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
    const currPage = [];
    var matchLevel = 0
    var pageIndex = 0
    //Spinner
    const [spinner ,setspinner] = useState(false)


    const [currPages,setcurrPage] = useState()



    const toggleOverlay = () => {
        setVisible(!visible);
        navigation.goBack()
    };

    useEffect(() => {
       function getKind() {
       
        getSearchData()
        }
        font.loadAsync({
            'Cairo-Bold': require('../../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../../assets/fonts/Montserrat-ExtraLight.ttf')
        });
        getKind();
    }, []);

    const  getSearchData  =  async () =>{
        setspinner(true)
   
        const postcode = post.substring(0, post.length - matchLevel)

        // Axios Api Calling
        const responseUser = await Http.get('post-json', {
            params: {
                postal_code: postcode,
                country: country,
                page:pageIndex
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
        //add data to variable & contacta that data

                setserachPostocde(responseUser.data.concat(tempCurrPage))
                setserachPostocde(responseUser.data.filter(
                    (thing, index, self) =>
                      index === self.findIndex((t) => t.name === thing.name)
                  ))
                setspinner(false)
            }
          
 
            // Check pageLegth  make Matchlevel ++  and page Inde -1
            if (tempCurrPage.length < 10) {
              matchLevel++;
              pageIndex = -1;

              console.log(pageIndex)
              setspinner(false)
                //checky output result length  & page Index ++
            if (searchPostcode.length == 0) {
                pageIndex++;
                getSearchData()
                 return;
            }
          } 
   
          setspinner(false)
        pageIndex++;


}





    return (

        <View style={{ flex: 1, backgroundColor: "white" }}>
               <Spinner
          visible={spinner}
          textContent={'loading...'}
          textStyle={styles.spinnerTextStyle}
        />

            <UserResult searchPostcode={searchPostcode} tittle="Members near you"  navigation={navigation}/>
            <View style={{marginVertical:10}}>
            <Button title="Show More"  onPress={getSearchData}/>
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