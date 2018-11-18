import React from 'react'
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    Animated,
    ScrollView } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux'
import { setLocalNotification, clearLocalNotification } from '../utils/helpers'



class Quiz extends React.Component {

    state = {
        title: '',
        fadeIn: new Animated.Value(0),
        fadeOut: new Animated.Value(1),
        questions: [],
        answers: [],
        next: 0,
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Quiz'
        }
    }

    componentDidMount() {
        let { navigation } = this.props;
        let deck_title = navigation.getParam('deck_title')
        let answer = navigation.getParam('answer', null)
        let {questions} = this.props.store[deck_title] ? this.props.store[deck_title] : [];
        let next = navigation.getParam('question_index', 0)
        this.setState((prevState) => ({
            title: deck_title,
            questions,
            next: next,
            answers: prevState.answers.push(answer)
        }));
    }
    
    handleTransform = () => {
        let fa = Animated.timing(this.state.fadeOut,{toValue: 0,duration: 1000,});
        fa.start(({finished}) => {
            Animated.timing(this.state.fadeIn,{toValue: 1,duration: 500,}).start();
        });
    }

    handleCorrect = () => {
        let {next,questions} = this.state;
        this.props.navigation.push('Quiz', {
            question_index: next < questions.length ? next + 1 : 0,
            deck_title: this.state.title,
            answer: 1
          })
        
        clearLocalNotification().then(setLocalNotification)
    }

    handleInCorrect = () => {
        let {next,questions} = this.state;
        this.props.navigation.push('Quiz', {
            question_index: next < questions.length - 1 ? next + 1 : 0,
            deck_title: this.state.title,
            answer: 0
          })
        // console.log(this.state)
        clearLocalNotification().then(setLocalNotification)
    }

    render(){
        const {navigation} = this.props;
        const question_index = this.state.next;
        let deck_title = navigation.getParam('deck_title');
        let { fadeOut, fadeIn, next } = this.state;
        let {questions} = this.props.store[deck_title] ? this.props.store[deck_title] : [];

        
        if(!questions) {
            return <View>
                <Text style={{ fontSize: 16, alignSelf:'center'}}>Sorry, you cannot quiz on this deck. There are no cards in the deck.</Text>
            </View>
        }
        questions = questions ? questions : [];
        let item = questions[question_index];
         return (
            <ScrollView>
                <SafeAreaView>
                        <View>
                            <Text>{next+1}/{questions.length}</Text>
                            <View style={{ margin: 30, position: 'relative', height: 200, backgroundColor: 'white'}} >
                                <Animated.View style={{
                                position: 'absolute',opacity: fadeOut,
                                transform: [{rotateY: this.state.fadeIn.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '180deg'] 
                                    })}
                                ]}}>`
                                    <View style={{ }}>
                                        <Text style={{ textAlign: 'center', fontSize: 24, justifyContent: "center"}}>
                                            {!!item ? item.question : '' }
                                        </Text>
                                    </View>
                                </Animated.View>

                                <Animated.View style={{opacity: fadeIn, 
                                transform: [{
                                    rotateY: this.state.fadeIn.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['180deg', '0deg'] 
                                    })}
                                ]}}>
                                    <Text style={{ textAlign:'center', fontSize: 24}}>
                                        {!!item ? item.answer : ''}
                                    </Text>
                                </Animated.View>
                            </View>

                            <View style={{ position: 'relative'}}>
                                <Text onPress={this.handleTransform} style={{ textAlign: 'center'}}>
                                    Show Answer
                                </Text>
                                <TouchableOpacity style={[styles.btn, styles.btnSec]} onPress={this.handleCorrect}>
                                    <Text style={styles.btnText}>
                                        Correct
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn} underlayColor="#4c32aa" onPress={this.handleInCorrect}>
                                    <Text style={styles.btnText}>
                                        Incorrect
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                </SafeAreaView>
            </ScrollView>
        )
    }
}

function mapStateToProps(state){
    return {
        store: state
    }
}

export default connect(mapStateToProps)(Quiz)

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
    },
    flipCard: {
        backgroundColor: "transparent",
        width: 300,
        height: 200,
      },
    flipCardInner: {
        position: "relative",
        width: "100%",
        height: "100%",
      },
      
      flipCardFront: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backfaceVisibility: "hidden",
        backgroundColor: "#bbb",
      },
      flipCardBack: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backfaceVisibility: "hidden",
        backgroundColor: "dodgerblue",
        transform: [{
            rotateY: "180deg"
        }]
      }
  });