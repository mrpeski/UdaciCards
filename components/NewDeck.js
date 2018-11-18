import React from 'react'
import { View, Text, KeyboardAvoidingView, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import {createDeck} from '../store/actions'
import { _storeData } from '../utils/DB'
import { NavigationActions, withNavigation } from 'react-navigation'
import { H1, CenteredView, Input, Button, BtnText } from './DeckList'


class NewDeck extends React.Component {

    state = {
        title: '',
        questions: []
    }

    handlePress = () => {
        const {title} = this.state;
        if(title == '') return alert("Error! All fields are required!") ;
        this.props.dispatch(createDeck(this.state.title))
        this.setState({title: ''})
        _storeData(this.state.title,this.state).then((res) => {
            alert(res)
            this.toHome()
        })
    }

    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.navigate({
            routeName: 'DeckList',
        }))
    }

    render(){
        return (
            <KeyboardAvoidingView>
            <CenteredView>
                <H1>
                    New Deck
                </H1>
                
                <Text style={{ fontSize: 18, fontWeight: "400",lineHeight: 30, padding: 10}}>
                    Create new decks and quiz 😩 yourself on each deck. 
                </Text>
                <View style={{padding: 10}}>
                    <Input placeholder="Deck Title" style={{}}
                    onChangeText={(title) => this.setState({title})}
                    value={this.state.title}
                    />
                    <Button onPress={this.handlePress}>
                        <BtnText>
                            Create
                        </BtnText>
                    </Button>
                </View>
            </CenteredView>
            </KeyboardAvoidingView>
        )
    }
}

export default connect()(withNavigation(NewDeck))

let {width} = Dimensions.get('window');
width -= 20;
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
    },
    input: {borderColor: 'gray', borderWidth: 1, margin: 20, height: 40, width: width, alignSelf:'center',textAlign:'center'}
  });