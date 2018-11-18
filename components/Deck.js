import React from 'react'
import { Text, TouchableOpacity, StyleSheet} from 'react-native'
import { getDeck, deleteDeck } from '../utils/DB'
import { NavigationActions, withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { H1, CenteredView, Button, BtnText } from './DeckList'
import { deleteDeck as delAction } from '../store/actions'


class Deck extends React.Component {
    state = {
        title: '',
        questions: null
    }

    static navigationOptions = ({ navigation }) => {
        const { deck_id } = navigation.state.params;
        return {
            title: deck_id
        }
    }

    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: 'DeckList'
        }))
    }

    handleDeckDelete = () => {
        const { dispatch } = this.props;
        const { deck_id } = this.props.navigation.state.params;
        
        dispatch(delAction(deck_id))

        deleteDeck(deck_id).then((res) => {
            alert(res)
            this.toHome()
        })
    }

    componentDidMount() {
       
        const { deck_id } = this.props.navigation.state.params;
        this.setState({
            ...this.props.store[deck_id]
        })
    }
    render() {
        const { navigate } = this.props.navigation;
        const { deck_id } = this.props.navigation.state.params;
        const {title, questions} = this.state

        const ques  = questions ? `${questions.length} Cards` : `0 Cards`
        return (
        <CenteredView> 
                <H1>
                    { title }
                 </H1>
                 <Text style={{ fontSize: 18, fontWeight: "400",lineHeight: 30, padding: 10}}>
                    Welcome to the {title} deck. There are {ques} in this deck.
                </Text>

            <Button underlayColor="#4c32aa" onPress={() => navigate('Quiz', {deck_title: deck_id})}>
                <BtnText>
                    Start Quiz
                </BtnText>
            </Button>

            <TouchableOpacity style={[styles.btn, styles.btnSec]} onPress={() => navigate('NewDeck', {deck_title: deck_id})}>
                <Text style={styles.btnText}>
                    Add Card
                </Text>
            </TouchableOpacity>

            <Text onPress={this.handleDeckDelete} style={{ textAlign: 'center'}}>
                Delete Deck
            </Text>
        </CenteredView>);
    }
}

function mapStateToProps(state) {
    return {
        store: state
    }
  }
  
export default connect(mapStateToProps)(withNavigation(Deck))

const styles = StyleSheet.create({
    btnSec: {
        backgroundColor: 'teal',
      },
    btn: {
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      paddingLeft: 40,
      paddingRight: 40,
      borderRadius: 10,
      margin: 10
    },
    btnText: {
        color: 'white'
    }
  });