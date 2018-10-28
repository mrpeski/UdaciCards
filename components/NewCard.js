import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { addCardToDeck } from '../utils/DB'
import { addCard } from '../store/actions'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { H1, CenteredView, Input, Button, BtnText } from './DeckList'


class NewCard extends React.Component {

    state = {
        title: '',
        question: '',
        answer: ''
    }

    static navigationOptions = ({ navigation }) => {
        const { deck_title } = navigation.state.params;

        return {
            title: deck_title
        }
    }

    handlePress = () => {
        const {title, question, answer} = this.state

        this.props.dispatch(addCard({question,answer}, title))
        // alert(this.state.text)
        addCardToDeck(title, {question,answer})

        this.toHome()
    }

    componentDidMount() {
        const { deck_title } = this.props.navigation.state.params;
        this.setState({
            title: deck_title
        })
    }

    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: 'Deck'
        }))
    }

    render(){
        return (
            <CenteredView>
                <H1>
                    New Card
                </H1>
                <View style={styles.container}>
                    <Input placeholder="Question?" 
                    onChangeText={(question) => this.setState({question})}
                    style={{ marginBottom: 20 }}
                    value={this.state.question}
                    />
                    <Input placeholder="Answer" 
                    onChangeText={(answer) => this.setState({answer})}
                    style={{ marginBottom: 20 }}
                    value={this.state.answer}
                    />
                    <Button onPress={this.handlePress}>
                        <BtnText>
                            Submit
                        </BtnText>
                    </Button>
                </View>
            </CenteredView>
        )
    }
}

export default connect()(NewCard)

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