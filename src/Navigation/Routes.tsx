import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, {Component} from 'react';
import { screenNames } from '../Constants/ScreenNames';
import HomeScreen from '../Screens/HomeScreen';
import LogicScreen from '../Screens/LogicScreen';
import { colors } from '../Themes/Colors';

const Stack = createStackNavigator();

class Routes extends Component {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name={screenNames.HomeScreen} component={HomeScreen} options={{ headerStyle: {backgroundColor: colors.blue}, headerTintColor: colors.white, headerTitle: 'Scratch'}}/>
                    <Stack.Screen name={screenNames.LogicScreen} component={LogicScreen} options={{ headerStyle: {backgroundColor: colors.blue}, headerTintColor: colors.white, headerTitle: 'Scratch'}}/>
                </Stack.Navigator>
            </NavigationContainer>
            
        )
    }
}

export default Routes;