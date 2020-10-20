import React ,{useState,useEffect}from "react";
import { Text, StyleSheet ,Image ,View , TouchableOpacity} from "react-native";
import { Button, Overlay } from 'react-native-elements';
import { AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NavImage = props =>{


const [backArrow,setBackArrow] = useState(true)
  const [Login,setLogin] = useState(false)

  useEffect(() => {
 
  if  (props.navigation.navigation.state.routeName == "Home")
  {
    setBackArrow(false)
  }

})

return(

  <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
      {backArrow?(
     <TouchableOpacity onPress={()=>props.navigation.navigation.goBack()}>
       <Ionicons name="md-arrow-round-back" size={30} color="#4472C4" style={{marginRight:10}} />
       </TouchableOpacity>  
        ):null}

    <TouchableOpacity onPress={()=>props.navigation.navigation.navigate('Home')}>
    <Image source={require('../../assets/Images/header-logo.png')}/>
   </TouchableOpacity>
  </View>
)
}

export default NavImage