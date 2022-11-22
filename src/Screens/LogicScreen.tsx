import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import { actionsList } from '../Constants/ActionsList';
import { screenNames } from '../Constants/ScreenNames';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { DraxProvider, DraxView, DraxList } from 'react-native-drax';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../Themes/Colors';


const actionsArray = [
    {
        id: '0',
        title: actionsList.SayHello
    },
    {
        id: '1',
        title: actionsList.MoveXBy50
    },
    {
        id: '2',
        title: actionsList.MoveYBy50
    },
    {
        id: '3',
        title: actionsList.Rotate360AlongZAxis
    },
    {
        id: '4',
        title: actionsList.GoToOrigin
    },
    {
        id: '5',
        title: actionsList.MoveX50Y50
    },
    {
        id: '6',
        title: actionsList.GoToRandomPosition
    },
    {
        id: '7',
        title: actionsList.SayHelloFor1Sec
    },
    {
        id: '8',
        title: actionsList.Rotate360AlongXAxis
    },
    {
        id: '9',
        title: actionsList.Rotate360AlongYAxis
    },
]

interface LogicScreenProps {
    navigation: any,
    route: any
}

interface LogicScreenState {
    receiverArray: any,
    selectedIndex: any,
}

class LogicScreen extends Component<LogicScreenProps, LogicScreenState> {
    id = 0;
    constructor(props: LogicScreenProps) {
        super(props)
        this.state = {
            receiverArray: [],
            selectedIndex: 0
        }
    }

    componentDidMount() {
        const selectedObj = this.props?.route?.params?.selectedObject;
        this.setState({receiverArray: selectedObj?.actions, selectedIndex: selectedObj?.id});
    }

    // componentDidUpdate(prevProps: any, prevState: any) {
    //     console.log('in componentDidUpdate')
    //     if (prevProps?.route?.params?.selectedObject != this.props.route?.params?.selectedObject) {
    //         console.log('in componentDidUpdate')
    //     }
    // }

    // UNSAFE_componentWillReceiveProps(nextProps: any, nextState: any) {
    //     console.log('bbbbbb')
    //     if (nextProps?.route?.params?.isFromHomeScreen) {
    //       console.log('aaaaa', nextProps?.route?.params?.selectedObject)
    //     }
    //   }

    onPressSave = () => {
        const obj = {
            id: this.state.selectedIndex,
            actions: this.state.receiverArray
        }
        this.props.navigation.navigate(screenNames.HomeScreen, {isFromLogicScreen: true, receiverArray: this.state.receiverArray, selectedObject: obj});
    }

    onPressCancel = () => {
        this.id = 0;
        this.setState({receiverArray: []});
    }

    renderDragContent = ({item, index}: any) => {
        return (
            <DraxView
                style={styles.dragItem}
                draggingStyle={styles.dragging}
                dragReleasedStyle={styles.dragging}
                dragPayload={index}
                longPressDelay={150}
                key={index}
            >
                <Text style={styles.whiteText}>{item.title}</Text>
            </DraxView>
        )
    }

    renderReceiverContent = ({item, index}: any) => {
        return (
            <View
                style={styles.dragItem}
            >
                <Text style={styles.whiteText}>{item.title}</Text>
            </View>
        )
    }

    onReceiveDrag = (event: any) => {
        let receiverArray = this.state.receiverArray; 
        const draggedEntity = actionsArray.find(({id}) => id === event?.dragged?.payload.toString());
        const modifiedDraggedEntity = {id: this.id, title: draggedEntity?.title};
        receiverArray.push(modifiedDraggedEntity)
        this.id += 1;
        this.setState({receiverArray: receiverArray})
    }

    render() {
        return (
            <GestureHandlerRootView style={styles.container}>
                <DraxProvider>
                <View style={styles.containerBlock}>
                    <View style={styles.componentsListBlock}>
                        <View style={styles.codeBlock}>
                            <Icon
                                name='code'
                                size={20}
                                style={styles.iconColor}
                            />
                            <Text style={styles.codeText}>Code</Text>
                        </View>
                        <DraxView
                            style={styles.draggable}
                        >
                            <DraxList
                                data={actionsArray}
                                renderItemContent={this.renderDragContent}
                                keyExtractor={(item, index) => index.toString()}
                                scrollEnabled={true}
                            />
                        </DraxView>
                    </View>
                    <View style={styles.logicListBlock}>
                        <View style={[styles.codeBlock, {borderColor: colors.green}]}>
                            <Icon
                                name='step-forward'
                                size={20}
                                style={[styles.iconColor, {color: colors.green}]}
                            />
                            <Text style={[styles.codeText, {color: colors.green}]}>Actions</Text>
                        </View>
                        <DraxView
                            onReceiveDragDrop={this.onReceiveDrag}
                            style={styles.receiver}
                        >
                            <FlatList
                                data={this.state.receiverArray}
                                renderItem={this.renderReceiverContent}
                                keyExtractor={(item, index) => index.toString()}
                                scrollEnabled={true}
                                extraData={this.state.receiverArray}
                            />
                        </DraxView>
                    </View>
                </View>
                <View style={styles.buttonBlock}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.onPressSave}
                    >
                        <Text>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.onPressCancel}
                        style={styles.button}
                    >
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                </View>
                </DraxProvider>
            </GestureHandlerRootView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerBlock: {
        flex: 0.8,
        flexDirection: 'row',
        borderBottomWidth: 1
    },
    buttonBlock: {
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    componentsListBlock: {
        flex: 0.5,
        borderRightWidth: 1
    },
    logicListBlock: {
        flex: 0.5
    },
    button: {
        padding: 5,
        backgroundColor: colors.yellow,
        width: 100,
        height: 40,
        justifyContent:'center',
        borderRadius: 5,
        alignItems: 'center',
        borderWidth: 1
    },
    dragItem: {
        height: 50,
        padding: 10,
        backgroundColor: colors.blue,
        marginVertical: 5,
        marginHorizontal: 5,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    whiteText: {
        color: colors.white,
    },
    codeBlock: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.blue
    },
    codeText: {
        fontSize: 16, 
        fontWeight:'bold',
        marginLeft: 10,
        color: colors.blue,
    },
    iconColor: {
        color: colors.blue
    },
    dragging: {
        opacity: 0.2
    },
    draggable: {
        flex: 1,
    },
    receiver: {
        flex: 1
    }

})

export default LogicScreen;