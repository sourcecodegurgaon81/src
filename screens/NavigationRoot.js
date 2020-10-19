import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import UserDetails from './Details/UserDetails'



const NavigationRoot = createStackNavigator({

    UserDetails: {screen : UserDetails}

},optsNavigation)