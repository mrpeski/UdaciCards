import {ADD_CARD, CREATE_DECK, DELETE_DECK, ADD_DECKS, SCORE, START_QUIZ } from './actions'

let obj = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ],
      score: null,
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ],
      score: null,
    }
  }

export function reducer(state=obj,action){
    switch(action.type){
        case ADD_CARD:
            state[action.deck].questions.push(action.card);
            return {
                ...state
            }
        case START_QUIZ:
            state[action.deck].score = 0;
            return {
                ...state
            }
        case SCORE:
            let score = state[action.deck].score;
            state[action.deck].score = score + 1;
            return {
                ...state
            }
        case CREATE_DECK:
            return {
                ...state,
                [action.title]: {
                    title: action.title,
                    questions: [],
                    score: null
                }
            }
        case DELETE_DECK:
            state[action.title] = null;
            delete state[action.title];
            return {
                ...state
            }
        case ADD_DECKS:
            return {...state,...action.decks};
        default:
            return state
    }
}