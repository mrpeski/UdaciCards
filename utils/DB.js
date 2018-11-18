import { AsyncStorage } from 'react-native'

export const STORAGE_KEY = 'UdaciCards:app'


export function getDecks() {
 return AsyncStorage.getItem(STORAGE_KEY).then((data)=>{
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

// AsyncStorage.removeItem(STORAGE_KEY);

saveDeckTitle = async (title) => {
    try {
        const value = await AsyncStorage.getItem(STORAGE_KEY);
        if (value != null) {
            let decks = JSON.parse(value);
            // let _keys = Object.keys(decks);
            decks[title] = {title, question:[]}
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
        }
    }
    catch (error) {
        // Error retrieving data
        console.log(error)
    }
}

_retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      console.log(value);
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
     } catch (error) {
       // Error retrieving data
       console.log('error', error);
     }
  }

  _storeData = async (key, body) => {
    try {
        const state = {[key]:body};
      await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(state));
      return `${key} added successfully`
    } catch (error) {
      // Error saving data
    }
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

export { saveDeckTitle, _retrieveData, _storeData }