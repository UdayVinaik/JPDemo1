import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import UIView from '../Components/UIView';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { screenNames } from '../Constants/ScreenNames';
import PositionView from '../Components/PositionView';
import { colors } from '../Themes/Colors';

interface HomeScreenProps {
  navigation: any
}

interface HomeScreenState {
  receiverArray: any,
  xPosition: number,
  yPosition: number,
  isShowAnimations: boolean,
  isResetAnimations: boolean,
  actionsArray: any,
  selectedIndex: number,
}

class HomeScreen extends Component<HomeScreenProps, HomeScreenState> {
  constructor(props: HomeScreenProps) {
    super(props);
    this.state = {
      receiverArray: [],
      xPosition: 200,
      yPosition: 200,
      isShowAnimations: false,
      isResetAnimations: false,
      actionsArray: [{id: 0, actions: []}],
      selectedIndex: 0,
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: any, nextState: any) {
    if (nextProps?.route?.params?.isFromLogicScreen) {
      let actionsArray1 = [...this.state.actionsArray];
      const selectedObject = nextProps?.route?.params?.selectedObject;
      actionsArray1.map((item: any) => {
        if (item?.id === selectedObject?.id) {
          const actions = selectedObject?.actions;
          item['actions'] = [...actions];
        }
      });
      console.log('actions::::::::', actionsArray1[0]?.actions);
      this.setState({receiverArray: nextProps?.route?.params?.receiverArray, actionsArray: actionsArray1});
    }
  }

  navigateToLogicBuildingScreen = () => {
    this.setState({receiverArray: []});
    this.props.navigation.navigate(screenNames.LogicScreen);
  }

  onPressPlay = () => {
    this.setState({isShowAnimations: true})
  }

  onPressReload = () => {
    this.setState({receiverArray: [], isResetAnimations: true})
  }

  getXAndYCoordinates = (x: number, y: number) => {
    this.setState({xPosition: x, yPosition: y});
  }

  setIsShowAnimations = () => {
    this.setState({isShowAnimations: false})
  }

  setResetAnimations = () => {
    this.setState({isResetAnimations: false});
  }

  onSelectItem = (index: any) => {
    this.setState({selectedIndex: index});
  }

  renderItem = ({item, index}: any) => {
    return (
      <TouchableOpacity 
        style={[styles.listItemView, index === this.state.selectedIndex ? {backgroundColor: colors.lightPurple} : {backgroundColor: colors.white}]}
        onPress={() => this.onSelectItem(index)}
      >
        <Text>{item?.id}</Text>
      </TouchableOpacity>
    )
  }

  onClickOpenSelectedSpirit = () => {
    const selectedObj = this.state.actionsArray?.find((item: any) => item?.id === this.state.selectedIndex);
    if (selectedObj) {
      this.props.navigation.navigate(screenNames.LogicScreen, {selectedObject: selectedObj, isFromHomeScreen: true});
    }
  }

  onClickAddNewSpirit = () => {
    const actionsArray: any[] = [...this.state.actionsArray];
    const lengthofActionsList = this.state.actionsArray?.length;
    const newObj = {
      id: lengthofActionsList,
      actions: []
    }
    actionsArray.push(newObj);
    this.setState({selectedIndex: lengthofActionsList, actionsArray: actionsArray});
  }

  getArrayOfSelectedIndex = () => {
    const array = this.state.actionsArray?.filter((item: any) => {
      if (item?.id === this.state.selectedIndex) {
        return true;
      }
      return false;
    });
    return array[0]?.actions;
  }

  render() {
    const {xPosition = 0, yPosition = 0} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.uiView}>
            <UIView 
              getXAndYCoordinates={this.getXAndYCoordinates}
              receiverArray={this.getArrayOfSelectedIndex()}
              isShowAnimations={this.state.isShowAnimations}
              setIsShowAnimations={this.setIsShowAnimations}
              isResetAnimations={this.state.isResetAnimations}
              setResetAnimations={this.setResetAnimations}
            />
            <View style={styles.playAndReloadBlock}>
              <TouchableOpacity 
                style={styles.playIconBlock}
                onPress={this.onPressPlay}
              >
                <Icon
                  name='play'
                  size={25}
                  style={styles.playIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.reloadIconBlock}
                onPress={this.onPressReload}
              >
                <Icon
                  name='redo'
                  size={25}
                  style={styles.playIcon}
                />
              </TouchableOpacity>
            </View>
        </View>
        <View style={styles.positionView}>
          <PositionView
            X={JSON.stringify(xPosition)} 
            Y={JSON.stringify(yPosition)}
          />
        </View>
        <View style={styles.logicView}>
            <View style={styles.listOfSpiritsView}>
              <FlatList
                data={this.state.actionsArray}
                renderItem={this.renderItem}
                keyExtractor={(item: any, index: any) => index.toString()}
                horizontal={true}
              />
            </View>
            <View style={styles.openSelectedSpritView}>
              <TouchableOpacity 
                style={styles.makeLogicButton}
                onPress={this.onClickOpenSelectedSpirit}
              >
                <Text style={styles.whiteText}>Open Selected Spirit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.addNewSpiritView}>
              <TouchableOpacity 
                style={styles.makeLogicButton}
                onPress={this.onClickAddNewSpirit}
              >
                <Text style={styles.whiteText}>Add New Spirit</Text>
              </TouchableOpacity>
            </View>
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  uiView: {
    flex: 0.7,
    borderBottomWidth: 1,
  },
  positionView: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1
  },
  logicView: {
    flex: 0.2,
  },
  makeLogicButton: {
    padding: 5,
    backgroundColor: colors.blue,
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 10
  },
  playAndReloadBlock: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 0.2
  },
  playIcon: {
    color: colors.white,
  },
  playIconBlock: {
    borderRadius: 20,
    padding: 10,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue,
  },
  reloadIconBlock: {
    borderRadius: 20,
    padding: 10,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green,
    marginLeft: 20,
    marginRight: 20
  },
  plusIcon: {
    color: colors.white
  },
  whiteText: {
    color: colors.white
  },
  listOfSpiritsView: {
    flex: 0.3,
  },
  openSelectedSpritView: {
    flex: 0.3,
  },
  addNewSpiritView: {
    flex: 0.3
  },
  listItemView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    borderWidth: 1
  }
})

export default HomeScreen;
