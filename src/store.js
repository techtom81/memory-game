import React, { createContext, useReducer, useContext } from 'react'

import { themes } from './themes'
export const StateContext = createContext()

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>{children}</StateContext.Provider>
)

export const useStateValue = () => useContext(StateContext)

const mapInitialState = () => {
  const setIds = ['a', 'b', 'c', 'd', 'e', 'f']

  return themes.map(theme => {
    let themeCards = []

    for (let i = 0; i < 6; i++) {
      themeCards.push({
        id: i,
        set: setIds[i],
        cardFlipped: false,
        cardMatched: false,
        frontSrc: `./images/${theme.name}/card-${i}.png`,
        backSrc: `./images/${theme.name}/${theme.name}.png`,
      })
    }

    for (let i = 6; i < 12; i++) {
      themeCards.push({
        id: i,
        set: setIds[i - 6],
        cardFlipped: false,
        cardMatched: false,
        frontSrc: `./images/${theme.name}/card-${i - 6}.png`,
        backSrc: `./images/${theme.name}/${theme.name}.png`,
      })
    }

    return themeCards
  })
}

export const initialState = {
  cards: mapInitialState(),
}
