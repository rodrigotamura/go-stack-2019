import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
/**
 * createAppContainer is like BrowserRouter from REactJS which contains the configurations
 * to make our routes to work.
 *
 * createStackNavigator has one type of route configuration.
 * If we start on Main and go to User, Main page will be behind (not close) User like a stack.
 *
 * If we use createSwtichNavigator and we are in Main and go to User, Main will be closed.
 *
 * createBottomTabNavigator will create tabs navigation at the bottom of the app.
 *
 * createMaterialTopNavigator, will create tabs on top.
 *
 * And we have a lot of kind of navigation (see [https://reactnavigation.org/docs/en/](https://reactnavigation.org/docs/en/))
 */

import Main from './pages/Main';
import User from './pages/User';


const Routes = createAppContainer(
  createStackNavigator({
    Main,
    User
  }, {
    headerLayoutPreset: 'center', // centering header title
    headerBackTitleVisible: false, // text of back will not appear
    defaultNavigationOptions: { // setting some config for all pages
      headerStyle: {
        backgroundColor: '#7159c1',
      },
      headerTintColor: '#FFF' // font color
    }
  }
  )
);

export default Routes;
