import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface PositionViewProps {
    X: any,
    Y: any
}

interface PositionViewState {}

class PositionView extends Component<PositionViewProps, PositionViewState> {
    constructor(props: PositionViewProps) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.blockContainer}>
                    <Text style={styles.spritText}>Sprit</Text>
                    <View style={styles.block}>
                        <Text>Cat</Text>
                    </View>
                </View>
                <View style={styles.blockContainer}>
                    <Text style={styles.spritText}>X</Text>
                    <View style={styles.blockXY}>
                        <Text numberOfLines={1}>{this.props.X}</Text>
                    </View>
                </View>
                <View style={styles.blockContainer}>
                    <Text style={styles.spritText}>Y</Text>
                    <View style={styles.blockXY}>
                        <Text numberOfLines={1}>{this.props.Y}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    block: {
        width: 50,
        height: 30,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    blockXY: {
        width: 80,
        height: 30,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    blockContainer: {
        flexDirection: 'row'
    },
    spritText: {
        marginTop: 5
    }
})

export default PositionView;