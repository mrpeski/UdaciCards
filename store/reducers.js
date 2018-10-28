import {ADD_CARD, CREATE_DECK, DELETE_DECK } from './actions'


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
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }

export function reducer(state=obj,action){
    switch(action.type){
        case ADD_CARD:
            state[action.deck].questions.push(action.card);
            return {
                ...state
            }
        case CREATE_DECK:
            return {
                ...state,
                [action.title]: {
                    title: action.title,
                    questions: []
                }
            }
        case DELETE_DECK:
            state[action.title] = null;
            delete state[action.title];
            return {
                ...state
            }            
        default:
            return state
    }
}