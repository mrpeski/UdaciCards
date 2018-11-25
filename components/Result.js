import React from 'react'
import { Text, View } from 'react-native'
import { H1, CenteredView, Input, Button, BtnText } from './DeckList'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { start_quiz } from '../store/actions'
import { setLocalNotification, clearLocalNotification } from '../utils/helpers'



class Result extends React.Component {
    componentDidMount() {
        clearLocalNotification().then(setLocalNotification)
    }
    gotoDeck = async () => {
        const { navigation, dispatch } = this.props;
        const deck_title = navigation.getParam('deck_title');
        const tt = await dispatch(start_quiz(deck_title))
        navigation.navigate('Deck', {deck_id: deck_title})
    }
    
   
    restartQuiz = async () => {
        const { navigation, dispatch } = this.props;
        const deck_title = navigation.getParam('deck_title');
        const tt = await dispatch(start_quiz(deck_title));
        navigation.navigate('Quiz', {deck_title: deck_title})
    }

    render() {
        const { navigation, store } = this.props;
        const deck_title = navigation.getParam('deck_title');
        const score = store ? store[deck_title].score : 0;
        const length = store ? store[deck_title].questions.length : 0;


        return (<CenteredView style={{justifyContent: "center"}}>
                    <View style={{ 
                        alignItems: "center",
                        minHeight: 400, width: "100%", 
                        paddingTop:  12,
                        backgroundColor: "whitesmoke"}}>
                        <Text style={{margin: 30}}>Score</Text>
                        <Text style={{ fontSize: 96, color:"coral"}}>
                            {`${score}/${length}`}
                        </Text>
                        <View style={{ flexDirection: "row",justifyContent: "space-between" }}>
                            <Button style={{marginRight: 10}} onPress={ this.gotoDeck }>
                                <BtnText >
                                    Back to Deck
                                </BtnText>
                            </Button>
                            <Button style={{marginLeft: 10}} onPress={ this.restartQuiz }>
                                <BtnText >Retake</BtnText>
                            </Button>
                        </View>
                    </View>
                </CenteredView>)
    }
}

function mapStateToProps(state, ownProps){
    return {
        store: state,
    }
}

export default withNavigation(connect(mapStateToProps)(Result))
