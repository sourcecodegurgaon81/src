import {NavigationActions} from 'react-navigation'


let _navigator;


function setTopLevelNavigator(navigationRef){
    _navigator = navigationRef;
}


function navigate(routeName,params){
    _navigator.dispatch(NavigationActions.navigate({
        routeName,
        params
    })
    )
}

export default{
    navigate,
    setTopLevelNavigator,
};