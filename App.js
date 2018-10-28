import React from 'react';
import { StyleSheet,AppRegistry, Text, View, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Deck from './components/Deck'
import NewDeck from './components/NewDeck'
import { createBottomTabNavigator,createStackNavigator, SafeAreaView } from 'react-navigation'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Constants } from 'expo';
import NewCard from './components/NewCard';
import Quiz from './components/Quiz';
import DeckList from './components/DeckList';
import { setLocalNotification, _initData } from './utils/DB'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import {reducer} from './store/reducers'
import middlewares from './middleware'



function CusStatus({backgroundColor, ...props}){
  return (
    <View style={{backgroundColor, height:Constants.statusBarHeight}}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: {
      title: 'Decks',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='home' size={24} color={tintColor}/>,
    }
  },
  New: {
    screen: NewDeck,
    navigationOptions: {
      title: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus' size={24} color={tintColor}/>
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: 'red',
    style: {
      height: 56,
    }
  }
})

const MainNavigator = createStackNavigator({
  Home : {
    screen: Tabs,
    navigationOptions: {
      title: false
    }
  },
  NewDeck : {
    screen: NewCard,
  },
  Deck : {
    screen: Deck,
  },
  Quiz: {
    screen: Quiz,
  }
})


const store = createStore(reducer, middlewares);

export default class App extends React.Component {

  componentDidMount() {
    // setLocalNotification()
    // _initData()
  }
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
        <CusStatus backgroundColor={'#34e'} barStyle='dark-content'/>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('App', () => App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  btnSec: {
    backgroundColor: 'teal',
  },
  btn: {
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    padding: 10,
    alignSelf: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    margin: 10
  },
  btnText: {
      color: 'white'
  }
});
