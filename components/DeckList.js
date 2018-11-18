import React from 'react'
import { Text,ScrollView } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { getDecks, _retrieveData } from '../utils/DB'
import { addDecks } from '../store/actions'
import { connect } from 'react-redux'
import styled from 'styled-components/native'

export const Button = styled.TouchableOpacity`
  background: blueviolet;
  border-radius: 3px;
`

export const BtnText = styled.Text`
    color: white;
    padding: 12px 20px;
    text-align: center;
`
export const Input = styled.TextInput`
    background: transparent;
    border-radius: 3px;
    color: black;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
    min-width: 100%;
`

export const CenteredView = styled.View`
  background: white;
  padding: 10px 15px;
  min-height: 100%;
`

const DeckText = styled.Text`
    padding: 25px;
    font-weight: 600;
    align-self:center;
    background: whitesmoke;
`

const Touch = styled.TouchableOpacity`
    background: whitesmoke;
    flex-direction: row;
    padding: 20px 10px;
    margin: 20px 0;
`

export const H1 = styled.Text`
    font-size: 36px; font-weight: 600;
    margin-bottom: 40px;
`

class DeckList extends React.Component {

    state = {}
    
    componentDidMount() {
        const {dispatch} = this.props;
        _retrieveData();
        getDecks().then((decks) => {
            dispatch(addDecks(decks))
        })
    }

    render(){
        // console.log('store', this.props.store)

        const {navigate} = this.props.navigation;
        const decks = this.props.store
        
        let UI = null
        if(Object.keys(decks)) {
            const arr = Object.keys(decks)
            UI = arr.map((deck, index) => ( 
                <Touch  key={index} onPress={() => navigate('Deck', {deck_id: deck})}>
                    <Text style={{ flex: 2, fontSize: 24}}>
                        {decks[deck].title ? decks[deck].title : ''}
                    </Text>
                    <Text style={{ flex: 1, alignSelf: "center",justifyContent:"flex-end"}}>
                        {decks[deck].questions ? `${decks[deck].questions.length} Cards` : `0 Cards`}
                    </Text>
                 </Touch>
                 ));
        }
        return (
            <ScrollView>
                <SafeAreaView>
                {(UI) ? 
                <CenteredView>
                    <H1>
                        Home
                    </H1>
                    <Text style={{ fontSize: 18, fontWeight: "400",lineHeight: 30, padding: 10}}>
                        Welcome to Mobile 📱 flash card. Add flash cards to each deck,
                        create new decks and quiz 😩 yourself on each deck. 
                        Happy quizing 😊
                    </Text>
                {UI}
                </CenteredView> : null}
                </SafeAreaView>
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
  return {
      store: state
  }
}

export default connect(mapStateToProps)(DeckList)

const styles = {
    card: { marginBottom: 30, padding:10, borderBottomWidth: 1, borderBottomColor:'whitesmoke'}
}