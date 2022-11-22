import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View, Text, StyleSheet, PanResponder, Animated} from 'react-native';
import { actionsList } from '../Constants/ActionsList';
import { goToOriginAnimation, goToRandomPositionAnimation, moveXAndYBy50Animation, moveXBy50Animation, moveYBy50Animation, resetAnimation, rotate360DegreesAnimation, sayHelloAnimationStart, sayHelloAnimationStop, sayHelloFor1SecAnimationStart, sayHelloFor1SecAnimationStop } from '../Helper/AnimationManager';
import { colors } from '../Themes/Colors';

interface UIViewProps {
    getXAndYCoordinates: any,
    receiverArray: any,
    isShowAnimations: boolean,
    setIsShowAnimations: any,
    isResetAnimations: boolean,
    setResetAnimations: any
}

interface UIViewState {
    pan: any,
    fadeAnimation: any,
    rotateValueHolderZ: any,
    rotateValueHolderY: any,
    rotateValueHolderX: any
}

class UIView extends Component<UIViewProps, UIViewState> {
    panResponder;
    constructor(props: UIViewProps) {
        super(props);
        this.state = {
            pan: new Animated.ValueXY({x: 200, y: 200}),
            fadeAnimation: new Animated.Value(0),
            rotateValueHolderZ: new Animated.Value(0),
            rotateValueHolderY: new Animated.Value(0),
            rotateValueHolderX: new Animated.Value(0)
        }
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, {dx: this.state.pan.x, dy: this.state.pan.y}]),
            onPanResponderRelease: () => {
                this.props.getXAndYCoordinates(this.state.pan.x, this.state.pan.y);
            }
        })
    }

    showAnimations =  (array: any) => {
        const animationsArray: any = [];
        if (array.length > 0) {
            array.map((item: any) => {
                switch(item?.title) {
                    case actionsList.MoveXBy50:
                        animationsArray.push( moveXBy50Animation(this.state.pan.x, this.state.pan.x));
                        break;
                    case actionsList.MoveYBy50:
                        animationsArray.push( moveYBy50Animation(this.state.pan.y, this.state.pan.y));
                        break;
                    case actionsList.MoveX50Y50:
                        animationsArray.push(moveXAndYBy50Animation(this.state.pan.x, this.state.pan.x, this.state.pan.y, this.state.pan.y));
                        break;
                    case actionsList.SayHello:
                        animationsArray.push(sayHelloAnimationStart(this.state.fadeAnimation));
                        animationsArray.push(sayHelloAnimationStop(this.state.fadeAnimation));
                        break;
                    case actionsList.GoToOrigin:
                        animationsArray.push(goToOriginAnimation(this.state.pan.x, this.state.pan.y));
                        break;
                    case actionsList.Rotate360AlongZAxis:
                        animationsArray.push(rotate360DegreesAnimation(this.state.rotateValueHolderZ));
                        break;
                    case actionsList.Rotate360AlongXAxis:
                        animationsArray.push(rotate360DegreesAnimation(this.state.rotateValueHolderX));
                        break;
                    case actionsList.Rotate360AlongYAxis:
                        animationsArray.push(rotate360DegreesAnimation(this.state.rotateValueHolderY));
                        break;
                    case actionsList.SayHelloFor1Sec:
                        animationsArray.push(sayHelloFor1SecAnimationStart(this.state.fadeAnimation));
                        animationsArray.push(sayHelloFor1SecAnimationStop(this.state.fadeAnimation));
                        break;
                    case actionsList.GoToRandomPosition:
                        animationsArray.push(goToRandomPositionAnimation(this.state.pan.x, this.state.pan.x, this.state.pan.y, this.state.pan.y))
                    default:
                        break;
                }
            });
            Animated.sequence(animationsArray).start(({finished}) => this.isAnimationFinished(finished));
        }
        this.props.setIsShowAnimations();
    }

    isAnimationFinished = (finished: any) => {
        this.props.getXAndYCoordinates(this.state.pan.x, this.state.pan.y);
        this.setState({rotateValueHolderZ: new Animated.Value(0), rotateValueHolderX: new Animated.Value(0), rotateValueHolderY: new Animated.Value(0)});
    }

     UNSAFE_componentWillReceiveProps(nextProps: any, nextState: any) {
        if (nextProps.isShowAnimations) {
             this.showAnimations(nextProps.receiverArray)
        }
        if (nextProps.isResetAnimations) {
            resetAnimation(this.state.pan.x, this.state.pan.y).start(({finished}) => this.isResetAnimationFinished(finished));
            this.props.setResetAnimations();
        }
    }

    isResetAnimationFinished = (finished: any) => {
        this.props.getXAndYCoordinates(this.state.pan.x, this.state.pan.y);
    }

    render() {
        const panStyle = {transform: this.state.pan.getTranslateTransform()}
        const rotationz = this.state.rotateValueHolderZ.interpolate({
            inputRange: [0,1],
            outputRange: ['0deg', '360deg']
        });
        const rotationy = this.state.rotateValueHolderY.interpolate({
            inputRange: [0,1],
            outputRange: ['0deg', '360deg']
        });
        const rotationx = this.state.rotateValueHolderX.interpolate({
            inputRange: [0,1],
            outputRange: ['0deg', '360deg']
        });
        return (
            <View style={styles.container}>
                <Animated.View
                    style={[styles.helloBlock, {opacity: this.state.fadeAnimation}]}
                >
                    <Text style={styles.whiteText}>Hello!!!!</Text>
                </Animated.View>
                <Animated.View
                    {...this.panResponder.panHandlers}
                    style={[panStyle, {transform: [{rotateZ: rotationz}, {translateX: this.state.pan.x}, {translateY: this.state.pan.y}, {rotateX: rotationx}, {rotateY: rotationy}]}, {width: 50, height: 50}]}
                >
                    
                        <Icon
                            name='cat'
                            size={40}
                        />
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0.8
    },
    helloBlock: {
        backgroundColor: colors.helloBlockPurple,
        padding: 10,
        height: 50,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        left: 150,
        top: 20
    },
    whiteText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default UIView;