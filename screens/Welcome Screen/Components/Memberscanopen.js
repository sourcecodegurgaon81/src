import { Text, StyleSheet, View, Picker ,FlatList } from "react-native";
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import React, { useState, Component ,useEffect} from 'react';
import { Overlay } from 'react-native-elements';



const Membersscanopen = () =>{
    const getSearchDataNew = async() =>{
 
        setspinner(true)
   
        const postcode = post.substring(0, post.length - matchLevel)
        const responseUser = await Http.get('post-json', {
            params: {
                postal_code: post.substring(0, post.length - matchLevel),
                country: country,
                page:pageIndex
            }
    
        }); const tempCurrPage = Object.keys(responseUser.data).map((i) => responseUser.data[i]);
          
       if(tempCurrPage.length == 0){
        setVisible(true)
        setspinner(false)
           }
       
            if (tempCurrPage.length > 0) {
                setserachPostocde(responseUser.data.concat(tempCurrPage))
                setserachPostocde(responseUser.data.filter(
                    (thing, index, self) =>
                      index === self.findIndex((t) => t.name === thing.name)
                  ))
                setspinner(false)
            }
          
 
            if (tempCurrPage.length < 10) {
              //matchLevel++;
              //pageIndex = -1;
              console.log(searchPostcode)
            
            if (searchPostcode.length == 0) {
                pageIndex++;
   
              return;
            }
          }

        pageIndex++;


        console.log(pageIndex)

    
      
}
return(
    <View>
        <Text>Hello</Text>
    </View>
)
}

export default Membersscanopen 