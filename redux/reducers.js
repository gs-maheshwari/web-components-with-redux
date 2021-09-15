import { combineReducers } from 'redux'

import { DOG_RESPONSE, CAT_RESPONSE } from "./actions";

const initialState = {
    dogData: null,
    catData: null
}

const animalReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch(type){
        case DOG_RESPONSE: {
            return { ...state, dogData: payload}
        }
        case CAT_RESPONSE: {
            return { ...state, catData: payload}
        }
        default: return state
    }
}

export const reducers = combineReducers({
    animalReducer
})
