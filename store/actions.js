export const ADD_CARD = 'ADD_CARD'
export const CREATE_DECK = 'CREATE_DECK'
export const ADD_DECKS = 'ADD_DECKS'
export const FETCH_DECK = 'FETCH_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const SCORE = 'SCORE'
export const START_QUIZ = 'START_QUIZ'


export function addCard(card, deck) {
    return {
        type: ADD_CARD,
        card,
        deck
    }
}

export function score(deck) {
    return {
        type: SCORE,
        deck
    }
}

export function start_quiz(deck) {
    return {
        type: START_QUIZ,
        deck
    }
}

export function fetchDeck(deck) {
    return {
        type: FETCH_DECK,
        deck
    }
}

export function addDecks(decks) {
    return {
        type: ADD_DECKS,
        decks    
    }
}

export function createDeck(title) {
    return {
        type: CREATE_DECK,
        title
    }
}

export function deleteDeck(title) {
    return {
        type: DELETE_DECK,
        title
    }
}
