import React, { createContext, useReducer, useContext } from 'react'

import { themes } from './themes'
export const StateContext = createContext()

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>{children}</StateContext.Provider>
)

export const useStateValue = () => useContext(StateContext)

const mapCardsState = () => {
  const cardSet = ['a', 'b', 'c', 'd', 'e', 'f']

  return themes.map(({ name, maxCards }) => {
    const halfCardsIndex = maxCards / 2 - 1
    let themeCards = []

    for (let i = 0; i < maxCards; i++) {
      themeCards.push({
        id: i,
        set: i > halfCardsIndex ? cardSet[i - (halfCardsIndex + 1)] : cardSet[i],
        cardFlipped: false,
        cardMatched: false,
        frontSrc: `./images/${name}/card-${i > halfCardsIndex ? i - (halfCardsIndex + 1) : i}.png`,
        backSrc: `./images/${name}/${name}.png`,
      })
    }

    return themeCards
  })
}

export const initialState = {
  cards: mapCardsState(),
}
