import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

export const STORAGE_KEY = 'UdaciCards:app'
export const NOTIFICATION_KEY = 'UdaciCards:notification'


// let obj = {
//     React: {
//       title: 'React',
//       questions: [
//         {
//           question: 'What is React?',
//           answer: 'A library for managing user interfaces'
//         },
//         {
//           question: 'Where do you make Ajax requests in React?',
//           answer: 'The componentDidMount lifecycle event'
//         }
//       ]
//     },
//     JavaScript: {
//       title: 'JavaScript',
//       questions: [
//         {
//           question: 'What is a closure?',
//           answer: 'The combination of a function and the lexical environment within which that function was declared.'
//         }
//       ]
//     }
//   }

export function getDecks() {
 return AsyncStorage.getItem(STORAGE_KEY).then((data) => {
     return JSON.parse(data)
    });
}

export function getDeck(id) {
    return AsyncStorage.getItem(STORAGE_KEY).then((data) => {
        let decks = JSON.parse(data);
        let keys = Object.keys(decks);
        if (keys.includes(id)){
            return decks[id];
        } else {
          return "Not Found"
        }
       });
}

export function deleteDeck(id) {
  return AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      let decks = JSON.parse(data);
      decks[id] = null;
      delete decks[id]
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
        return `Card Removed!`;
  })
}
_initData = async (obj) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
    } catch (error) {
      return error
    }
  }

// AsyncStorage.removeItem(STORAGE_KEY);

export function saveDeckTitle(title) {
    return AsyncStorage.getItem(STORAGE_KEY).then((data) => {
        let decks = JSON.parse(data);
        let keys = Object.keys(decks);

        if (keys.includes(title)){
            console.log('if')
            return "Please choose a different Deck title!"
        }
        decks[title] = {title};
        AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(decks));
        console.log(decks)
        return `${title} Deck Added!`;
       });
}


export function addCardToDeck(title, card) {
    return AsyncStorage.getItem(STORAGE_KEY).then((data) => {
        let decks = JSON.parse(data);
        // let keys = Object.keys(decks);
        let deck = decks[title];
        if (deck.questions) {
          deck.questions.push(card);
        } else {
          deck.questions = [{...card}]
        }

        decks[title] = deck;
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
        return `Card Added!`;
       });
}



export { _initData }