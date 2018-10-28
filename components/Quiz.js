import React from 'react'
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    Animated,
    ScrollView } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import FlipCard from 'react-native-flip-card'
import { getDeck } from '../utils/DB'
import { connect } from 'react-redux'



class Quiz extends React.Component {

    state = {
        title: '',
        fadeIn: new Animated.Value(0),
        fadeOut: new Animated.Value(1),
    }

    static navigationOptions = ({ navigation }) => {
        const { deck_title } = navigation.state.params;
        return {
            title: deck_title
        }
    }

    componentDidMount() {
        let { deck_title } = this.props.navigation.state.params;

        this.setState({
            title: deck_title
        })
        // Animated.timing(
        //     this.state.fadeIn,
        //     {
        //         toValue: 1,
        //         duration: 10000,
        //     }
        // ).start();
    }
    
    handleTransform = () => {
        let fa = Animated.timing(this.state.fadeOut,{toValue: 0,duration: 1000,});
        fa.start(({finished}) => {
            Animated.timing(this.state.fadeIn,{toValue: 1,duration: 500,}).start();
        });
    }

    render(){
        const {navigate} = this.props.navigation;
        const { deck_title } = this.props.navigation.state.params;

        let { fadeOut, fadeIn } = this.state;
        let {questions} = this.props.store[deck_title] ? this.props.store[deck_title] : [];
        if(!questions) {
            return <View>
                <Text style={{ fontSize: 16, alignSelf:'center'}}>Sorry, you cannot quiz on this deck. There are no cards in the deck.</Text>
            </View>
        }
        questions = questions ? questions : [];
        return (
            <ScrollView>
                <SafeAreaView>
                    { questions.map((item, index) => (
                        <View key={index}>
                            <View style={{ margin: 30, position: 'relative', height: 200, backgroundColor: 'white'}} >
                                <Animated.View style={{
                                position: 'absolute',opacity: fadeOut,
                                transform: [{rotateY: this.state.fadeIn.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '180deg'] 
                                    })}
                                ]}}>
                                    <View style={{ }}>
                                        <Text style={{ textAlign: 'center', fontSize: 24, justifyContent: "center"}}>
                                            {item.question}
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
                                        {item.answer}
                                    </Text>
                                </Animated.View>
                            </View>

                            <View style={{ position: 'relative'}}>
                                <Text onPress={this.handleTransform} style={{ textAlign: 'center'}}>
                                    Show Answer
                                </Text>
                                <TouchableOpacity style={[styles.btn, styles.btnSec]} onPress={() => navigate('NewDeck')}>
                                    <Text style={styles.btnText}>
                                        Yes
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn} underlayColor="#4c32aa" onPress={() => navigate('Quiz')}>
                                    <Text style={styles.btnText}>
                                        No
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
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
        // perspective: 1000,
      },
    flipCardInner: {
        position: "relative",
        width: "100%",
        height: "100%",
        // textAlign: "center",
        // transition: "transform 0.8s",
        // transformStyle: "preserve-3d",
      },
      
    //   .flip-card:hover .flip-card-inner {
    //     transform: rotateY(180deg);
    //   }
      
      /* Position the front and back side */
      flipCardFront: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backfaceVisibility: "hidden",
        backgroundColor: "#bbb",
        // color: "black",
      },
      flipCardBack: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backfaceVisibility: "hidden",
        backgroundColor: "dodgerblue",
        // color: "white",
        transform: [{
            rotateY: "180deg"
        }]
      }
  });